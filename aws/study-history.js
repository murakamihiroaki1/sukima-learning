/**
 * study-history.js — 学習履歴フロントエンドヘルパー
 *
 * 使い方:
 *   <script src="study-history.js"></script>
 *   // クイズ終了後に呼ぶ
 *   await saveStudyHistory({
 *     examType: 'clf',
 *     mode: selectedMode,
 *     category: selectedCategory,
 *     totalQ: questions.length,
 *     correctQ: score,
 *     elapsedSec: null,     // 模擬試験の場合は経過秒数
 *     questions: questions,
 *     userAnswers: userAnswers,
 *     membershipLevel: 'standard'  // 'free' の場合は問題単位データを送らない
 *   });
 */

const HISTORY_API_BASE = 'https://sukima-learning.onrender.com/api/history';

/**
 * 学習セッションを保存する
 * @param {Object} opts
 * @param {string}   opts.examType        試験種別 'clf' | 'aif' | 'saa' | 'dva'
 * @param {string}   opts.mode            出題モード
 * @param {string|null} opts.category     カテゴリ名（カテゴリモード時）
 * @param {number}   opts.totalQ          出題数
 * @param {number}   opts.correctQ        正解数
 * @param {number|null} opts.elapsedSec   所要秒数（模擬試験で使用）
 * @param {Array}    opts.questions       問題配列
 * @param {Array}    opts.userAnswers     ユーザー回答配列（インデックス）
 * @param {string}   opts.membershipLevel 会員レベル 'free'|'standard'|'advanced'
 */
async function saveStudyHistory(opts) {
    const token = localStorage.getItem('accessToken');
    if (!token) return; // 未ログインはスキップ（エラーなし）

    const {
        examType, mode, category = null,
        totalQ, correctQ, elapsedSec = null,
        questions = [], userAnswers = [],
        membershipLevel = 'free'
    } = opts;

    const body = {
        exam_type: examType,
        mode,
        category,
        total_q: totalQ,
        correct_q: correctQ,
        elapsed_sec: elapsedSec
    };

    // Standard/Advanced 会員のみ問題単位の回答も送信
    const level = (membershipLevel || 'free').toLowerCase();
    if (level === 'standard' || level === 'advanced') {
        body.answers = questions.map((q, i) => ({
            question_id: q.id || (i + 1),
            selected: userAnswers[i] !== null && userAnswers[i] !== undefined ? userAnswers[i] : -1,
            correct: q.correctAnswer,
            is_correct: userAnswers[i] === q.correctAnswer
        })).filter(a => a.selected !== -1); // 未回答は除外
    }

    try {
        await fetch(`${HISTORY_API_BASE}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
    } catch (e) {
        // 学習体験を妨げないようにエラーはサイレントに処理
        console.warn('saveStudyHistory: failed to save', e);
    }
}

/**
 * 学習セッション一覧を取得する
 * @param {Object} opts
 * @param {string} [opts.examType]  試験種別でフィルタ
 * @param {number} [opts.limit]     取得件数（デフォルト20）
 * @param {number} [opts.offset]    オフセット
 * @returns {Promise<Array>} sessions
 */
async function fetchStudySessions(opts = {}) {
    const token = localStorage.getItem('accessToken');
    if (!token) return [];

    const params = new URLSearchParams();
    if (opts.examType) params.set('exam_type', opts.examType);
    if (opts.limit)    params.set('limit', String(opts.limit));
    if (opts.offset)   params.set('offset', String(opts.offset));

    try {
        const res = await fetch(`${HISTORY_API_BASE}/sessions?${params}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.sessions || [];
    } catch (e) {
        return [];
    }
}

/**
 * 統計情報を取得する
 * @param {string} [examType]
 * @returns {Promise<Array>} stats
 */
async function fetchStudyStats(examType) {
    const token = localStorage.getItem('accessToken');
    if (!token) return [];

    const params = new URLSearchParams();
    if (examType) params.set('exam_type', examType);

    try {
        const res = await fetch(`${HISTORY_API_BASE}/stats?${params}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.stats || [];
    } catch (e) {
        return [];
    }
}

/**
 * 苦手問題リストを取得する
 * @param {string} [examType]
 * @returns {Promise<Array>} weak_questions
 */
async function fetchWeakQuestions(examType) {
    const token = localStorage.getItem('accessToken');
    if (!token) return [];

    const params = new URLSearchParams();
    if (examType) params.set('exam_type', examType);

    try {
        const res = await fetch(`${HISTORY_API_BASE}/weak-questions?${params}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.weak_questions || [];
    } catch (e) {
        return [];
    }
}

// Made with Bob
