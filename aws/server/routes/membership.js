const express = require('express');
const router = express.Router();
const supabase = require('../database/supabase');
const { authenticateToken } = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {
    MEMBERSHIP_LEVELS,
    calculateExpiryDate,
    formatMembershipInfo,
    isMembershipValid
} = require('../models/membership');

/**
 * Stripeチェックアウトセッションを作成
 * POST /api/membership/create-checkout-session
 */
router.post('/create-checkout-session', authenticateToken, async (req, res, next) => {
    try {
        const { plan } = req.body;
        const user = req.user;

        // プランの検証
        if (!plan || ![MEMBERSHIP_LEVELS.STANDARD, MEMBERSHIP_LEVELS.ADVANCED].includes(plan)) {
            return res.status(400).json({
                error: '無効なプランです',
                validPlans: [MEMBERSHIP_LEVELS.STANDARD, MEMBERSHIP_LEVELS.ADVANCED]
            });
        }

        // 価格IDを設定（環境変数から取得、なければデフォルト）
        const priceId = plan === MEMBERSHIP_LEVELS.STANDARD
            ? process.env.STRIPE_STANDARD_PRICE_ID || 'price_standard_monthly'
            : process.env.STRIPE_ADVANCED_PRICE_ID || 'price_advanced_monthly';

        // チェックアウトセッションを作成
        const session = await stripe.checkout.sessions.create({
            customer_email: user.email,
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: 'jpy',
                    product_data: {
                        name: plan === MEMBERSHIP_LEVELS.STANDARD ? 'Standard プラン' : 'Advanced プラン',
                        description: plan === MEMBERSHIP_LEVELS.STANDARD
                            ? '月額980円 - すべての問題へのアクセス、見直し機能'
                            : '月額1,980円 - Professional認定を含むすべての機能',
                    },
                    unit_amount: plan === MEMBERSHIP_LEVELS.STANDARD ? 98000 : 198000, // 円単位（980円 = 98000）
                    recurring: {
                        interval: 'month',
                    },
                },
                quantity: 1,
            }],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/index.html?payment=success&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:8080'}/pricing.html?payment=cancelled`,
            metadata: {
                user_id: user.id,
                user_email: user.email,
                plan: plan
            }
        });

        res.json({ url: session.url });

    } catch (error) {
        console.error('Stripe checkout session creation error:', error);
        next(error);
    }
});

/**
 * 決済完了後の会員レベル更新（テスト用）
 * POST /api/membership/update-after-payment
 */
router.post('/update-after-payment', authenticateToken, async (req, res, next) => {
    try {
        const { plan, session_id } = req.body;
        const userId = req.user.id;

        // プランの検証
        if (!plan || ![MEMBERSHIP_LEVELS.STANDARD, MEMBERSHIP_LEVELS.ADVANCED].includes(plan)) {
            return res.status(400).json({
                error: '無効なプランです'
            });
        }

        // 会員レベルを更新
        const expiryDate = calculateExpiryDate();
        await supabase
            .from('users')
            .update({
                membership_level: plan,
                membership_expiry: expiryDate.toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        // 更新後のユーザー情報を取得
        const { data: user, error } = await supabase
            .from('users')
            .select('id, username, email, membership_level, membership_expiry')
            .eq('id', userId)
            .single();

        if (error) {
            throw error;
        }

        const membershipInfo = formatMembershipInfo(user);

        console.log(`✅ Updated user ${user.username} to ${plan} plan (expires: ${expiryDate})`);

        res.json({
            message: `${membershipInfo.displayName}プランへのアップグレードが完了しました`,
            membership: {
                ...membershipInfo,
                username: user.username,
                membership_level: user.membership_level,
                membership_expiry: user.membership_expiry
            }
        });

    } catch (error) {
        console.error('Update membership error:', error);
        next(error);
    }
});

/**
 * 現在の会員情報を取得
 * GET /api/membership/info
 */
router.get('/info', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;

        const { data: user, error } = await supabase
            .from('users')
            .select('id, username, email, membership_level, membership_expiry')
            .eq('id', userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ error: 'ユーザーが見つかりません' });
        }

        const membershipInfo = formatMembershipInfo(user);

        res.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            membership: membershipInfo
        });

    } catch (error) {
        next(error);
    }
});

/**
 * プランをアップグレード
 * POST /api/membership/upgrade
 * Body: { plan: 'standard' | 'advanced' }
 */
router.post('/upgrade', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { plan } = req.body;

        // プランの検証
        if (!plan || ![MEMBERSHIP_LEVELS.STANDARD, MEMBERSHIP_LEVELS.ADVANCED].includes(plan)) {
            return res.status(400).json({
                error: '無効なプランです',
                validPlans: [MEMBERSHIP_LEVELS.STANDARD, MEMBERSHIP_LEVELS.ADVANCED]
            });
        }

        // 有効期限を計算（現在日時 + 30日）
        const expiryDate = calculateExpiryDate();

        // データベースを更新
        await supabase
            .from('users')
            .update({
                membership_level: plan,
                membership_expiry: expiryDate.toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        const { data: user, error } = await supabase
            .from('users')
            .select('id, username, email, membership_level, membership_expiry')
            .eq('id', userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ error: 'ユーザーが見つかりません' });
        }

        const membershipInfo = formatMembershipInfo(user);

        res.json({
            message: `${membershipInfo.displayName}プランへのアップグレードが完了しました`,
            membership: membershipInfo
        });

    } catch (error) {
        next(error);
    }
});

/**
 * プランを更新（延長）
 * POST /api/membership/renew
 */
router.post('/renew', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;

        // 現在の会員情報を取得
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('membership_level, membership_expiry')
            .eq('id', userId)
            .single();

        if (userError || !user) {
            return res.status(404).json({ error: 'ユーザーが見つかりません' });
        }

        // Free会員は更新できない
        if (user.membership_level === MEMBERSHIP_LEVELS.FREE) {
            return res.status(400).json({
                error: 'Free会員は更新できません。プランをアップグレードしてください。'
            });
        }

        // 新しい有効期限を計算
        // 現在の有効期限が未来の場合はそこから30日、過去の場合は今から30日
        let newExpiry;
        const now = new Date();
        const currentExpiry = user.membership_expiry ? new Date(user.membership_expiry) : now;

        if (currentExpiry > now) {
            // 有効期限が残っている場合は、その日付から30日延長
            newExpiry = new Date(currentExpiry);
            newExpiry.setDate(newExpiry.getDate() + 30);
        } else {
            // 有効期限が切れている場合は、今日から30日
            newExpiry = calculateExpiryDate();
        }

        // データベースを更新
        await supabase
            .from('users')
            .update({
                membership_expiry: newExpiry.toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        const { data: updatedUser, error: updateError } = await supabase
            .from('users')
            .select('id, username, email, membership_level, membership_expiry')
            .eq('id', userId)
            .single();

        if (updateError) {
            throw updateError;
        }

        const membershipInfo = formatMembershipInfo(updatedUser);

        res.json({
            message: 'プランの更新が完了しました',
            membership: membershipInfo
        });

    } catch (error) {
        next(error);
    }
});

/**
 * プランをダウングレード（Freeに戻す）
 * POST /api/membership/downgrade
 */
router.post('/downgrade', authenticateToken, async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Freeプランに戻す（有効期限をNULLに）
        await supabase
            .from('users')
            .update({
                membership_level: MEMBERSHIP_LEVELS.FREE,
                membership_expiry: null,
                updated_at: new Date().toISOString()
            })
            .eq('id', userId);

        const { data: user, error } = await supabase
            .from('users')
            .select('id, username, email, membership_level, membership_expiry')
            .eq('id', userId)
            .single();

        if (error || !user) {
            return res.status(404).json({ error: 'ユーザーが見つかりません' });
        }

        const membershipInfo = formatMembershipInfo(user);

        res.json({
            message: 'Freeプランにダウングレードしました',
            membership: membershipInfo
        });

    } catch (error) {
        next(error);
    }
});

/**
 * 利用可能なプラン一覧を取得
 * GET /api/membership/plans
 */
router.get('/plans', async (req, res, next) => {
    try {
        const plans = [
            {
                level: MEMBERSHIP_LEVELS.FREE,
                name: 'Free',
                price: 0,
                description: '基本機能のみ利用可能',
                features: [
                    '基本問題へのアクセス',
                    '学習履歴の保存',
                    '広告表示あり'
                ]
            },
            {
                level: MEMBERSHIP_LEVELS.STANDARD,
                name: 'Standard',
                price: 980,
                description: '標準機能が利用可能',
                features: [
                    'すべての問題へのアクセス',
                    '詳細な学習分析',
                    '広告非表示',
                    '模擬試験機能'
                ]
            },
            {
                level: MEMBERSHIP_LEVELS.ADVANCED,
                name: 'Advanced',
                price: 1980,
                description: 'すべての機能が利用可能',
                features: [
                    'Standardの全機能',
                    '個別学習プラン',
                    '優先サポート',
                    '新機能の先行アクセス',
                    'オフライン学習機能'
                ]
            }
        ];

        res.json({ plans });

    } catch (error) {
        next(error);
    }
});

module.exports = router;

// Made with Bob
