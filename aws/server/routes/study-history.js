const express = require('express');
const router = express.Router();
const supabase = require('../database/supabase');
const { authenticateToken } = require('../middleware/auth');

const FREE_SESSION_LIMIT = 10; // Freeプランが保持できる最大セッション数

/**
 * セッション保存
 * POST /api/history/sessions
 * Body: { exam_type, mode, category, total_q, correct_q, elapsed_sec, answers? }
 * answers (Standard以上): [{ question_id, selected, correct, is_correct }, ...]
 */
router.post('/sessions', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { exam_type, mode, category, total_q, correct_q, elapsed_sec, answers } = req.body;

        // バリデーション
        if (!exam_type || !mode || total_q == null || correct_q == null) {
            return res.status(400).json({ error: 'exam_type, mode, total_q, correct_q は必須です' });
        }

        // セッション保存
        const { data: session, error: sessionError } = await supabase
            .from('study_sessions')
            .insert({
                user_id: userId,
                exam_type,
                mode,
                category: category || null,
                total_q: parseInt(total_q),
                correct_q: parseInt(correct_q),
                elapsed_sec: elapsed_sec ? parseInt(elapsed_sec) : null
            })
            .select()
            .single();

        if (sessionError) throw sessionError;

        // 問題単位の回答記録（Standard/Advanced会員のみ、answersが提供された場合）
        if (answers && Array.isArray(answers) && answers.length > 0) {
            const answerRows = answers.map(a => ({
                session_id: session.id,
                user_id: userId,
                exam_type,
                question_id: parseInt(a.question_id),
                selected: parseInt(a.selected),
                correct: parseInt(a.correct),
                is_correct: Boolean(a.is_correct)
            }));

            const { error: answersError } = await supabase
                .from('study_answers')
                .insert(answerRows);

            if (answersError) {
                // answersの保存失敗はセッション保存を巻き戻さずログのみ
                console.error('study_answers insert error:', answersError);
            }
        }

        // Freeプランの場合、古いセッションを削除（直近10件を超えたら）
        await trimFreeSessionsIfNeeded(userId);

        res.status(201).json({ session_id: session.id, message: '学習履歴を保存しました' });

    } catch (error) {
        next(error);
    }
});

/**
 * セッション一覧取得
 * GET /api/history/sessions?exam_type=clf&limit=20&offset=0
 */
router.get('/sessions', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { exam_type, limit = 20, offset = 0 } = req.query;

        let query = supabase
            .from('study_sessions')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(parseInt(limit))
            .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1);

        if (exam_type) {
            query = query.eq('exam_type', exam_type);
        }

        const { data: sessions, error } = await query;
        if (error) throw error;

        res.json({ sessions });

    } catch (error) {
        next(error);
    }
});

/**
 * 試験別統計情報取得（Standard以上推奨）
 * GET /api/history/stats?exam_type=clf
 */
router.get('/stats', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { exam_type } = req.query;

        let query = supabase
            .from('study_sessions')
            .select('exam_type, total_q, correct_q, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (exam_type) {
            query = query.eq('exam_type', exam_type);
        }

        const { data: sessions, error } = await query;
        if (error) throw error;

        // 試験別に集計
        const statsMap = {};
        sessions.forEach(s => {
            if (!statsMap[s.exam_type]) {
                statsMap[s.exam_type] = {
                    exam_type: s.exam_type,
                    session_count: 0,
                    total_questions: 0,
                    total_correct: 0,
                    recent_sessions: []
                };
            }
            const st = statsMap[s.exam_type];
            st.session_count++;
            st.total_questions += s.total_q;
            st.total_correct += s.correct_q;
            if (st.recent_sessions.length < 10) {
                st.recent_sessions.push({
                    created_at: s.created_at,
                    total_q: s.total_q,
                    correct_q: s.correct_q,
                    accuracy: s.total_q > 0 ? Math.round((s.correct_q / s.total_q) * 100) : 0
                });
            }
        });

        const stats = Object.values(statsMap).map(st => ({
            ...st,
            overall_accuracy: st.total_questions > 0
                ? Math.round((st.total_correct / st.total_questions) * 100)
                : 0
        }));

        res.json({ stats });

    } catch (error) {
        next(error);
    }
});

/**
 * 苦手問題リスト取得（Standard以上）
 * GET /api/history/weak-questions?exam_type=clf&limit=20
 */
router.get('/weak-questions', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { exam_type, limit = 20 } = req.query;

        let query = supabase
            .from('study_answers')
            .select('question_id, is_correct, exam_type')
            .eq('user_id', userId);

        if (exam_type) {
            query = query.eq('exam_type', exam_type);
        }

        const { data: answers, error } = await query;
        if (error) throw error;

        // 問題ごとに正解率を集計
        const questionMap = {};
        answers.forEach(a => {
            const key = `${a.exam_type}_${a.question_id}`;
            if (!questionMap[key]) {
                questionMap[key] = { exam_type: a.exam_type, question_id: a.question_id, total: 0, correct: 0 };
            }
            questionMap[key].total++;
            if (a.is_correct) questionMap[key].correct++;
        });

        // 正解率でソートして下位を返す（2回以上解いた問題のみ）
        const weakQuestions = Object.values(questionMap)
            .filter(q => q.total >= 2)
            .map(q => ({
                ...q,
                accuracy: Math.round((q.correct / q.total) * 100)
            }))
            .sort((a, b) => a.accuracy - b.accuracy)
            .slice(0, parseInt(limit));

        res.json({ weak_questions: weakQuestions });

    } catch (error) {
        next(error);
    }
});

/**
 * Freeプランのセッション上限を超えた場合に古いものを削除
 */
async function trimFreeSessionsIfNeeded(userId) {
    // ユーザーの会員レベルを確認
    const { data: user, error } = await supabase
        .from('users')
        .select('membership_level')
        .eq('id', userId)
        .single();

    if (error || !user) return;
    if (user.membership_level !== 'free' && user.membership_level !== 'Free') return;

    // セッション数を確認
    const { count } = await supabase
        .from('study_sessions')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', userId);

    if (count <= FREE_SESSION_LIMIT) return;

    // 古いセッションを取得して削除
    const { data: oldSessions } = await supabase
        .from('study_sessions')
        .select('id')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
        .limit(count - FREE_SESSION_LIMIT);

    if (oldSessions && oldSessions.length > 0) {
        const ids = oldSessions.map(s => s.id);
        await supabase.from('study_sessions').delete().in('id', ids);
    }
}

module.exports = router;

// Made with Bob
