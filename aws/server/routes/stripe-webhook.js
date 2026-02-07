const express = require('express');
const router = express.Router();
const supabase = require('../database/supabase');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { calculateExpiryDate } = require('../models/membership');

// Stripe Webhookエンドポイント
// 注意: このエンドポイントではexpress.json()を使用しない（rawBodyが必要）
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
        // Stripeからのイベントを検証
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
        console.log('✅ Webhook verified:', event.type);
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // イベントタイプに応じて処理
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                await handleCheckoutCompleted(event.data.object);
                break;

            case 'customer.subscription.created':
                await handleSubscriptionCreated(event.data.object);
                break;

            case 'customer.subscription.updated':
                await handleSubscriptionUpdated(event.data.object);
                break;

            case 'customer.subscription.deleted':
                await handleSubscriptionDeleted(event.data.object);
                break;

            case 'invoice.payment_succeeded':
                await handlePaymentSucceeded(event.data.object);
                break;

            case 'invoice.payment_failed':
                await handlePaymentFailed(event.data.object);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Webhook processing failed' });
    }
});

/**
 * チェックアウト完了時の処理
 */
async function handleCheckoutCompleted(session) {
    console.log('💳 Checkout completed:', session.id);

    const customerEmail = session.customer_email || session.customer_details?.email;
    const metadata = session.metadata || {};
    const plan = metadata.plan || 'standard'; // デフォルトはstandard

    if (!customerEmail) {
        console.error('❌ No customer email found in session');
        return;
    }

    // ユーザーを検索
    const { data: users, error: userError } = await supabase
        .from('users')
        .select('id, username, email')
        .eq('email', customerEmail);

    if (userError || !users || users.length === 0) {
        console.error(`❌ User not found: ${customerEmail}`);
        return;
    }

    const user = users[0];

    // 会員レベルを更新
    const expiryDate = calculateExpiryDate();
    await supabase
        .from('users')
        .update({
            membership_level: plan,
            membership_expiry: expiryDate.toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

    console.log(`✅ Updated user ${user.username} to ${plan} plan (expires: ${expiryDate})`);

    // 決済履歴を記録（オプション）
    await recordPayment(user.id, session);
}

/**
 * サブスクリプション作成時の処理
 */
async function handleSubscriptionCreated(subscription) {
    console.log('📝 Subscription created:', subscription.id);

    const customerEmail = subscription.customer_email;
    const plan = subscription.metadata?.plan || 'standard';

    if (!customerEmail) {
        console.error('❌ No customer email found in subscription');
        return;
    }

    // ユーザーの会員レベルを更新
    const expiryDate = new Date(subscription.current_period_end * 1000);
    
    await supabase
        .from('users')
        .update({
            membership_level: plan,
            membership_expiry: expiryDate.toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail);

    console.log(`✅ Subscription activated for ${customerEmail}`);
}

/**
 * サブスクリプション更新時の処理
 */
async function handleSubscriptionUpdated(subscription) {
    console.log('🔄 Subscription updated:', subscription.id);

    const customerEmail = subscription.customer_email;
    const expiryDate = new Date(subscription.current_period_end * 1000);

    if (!customerEmail) {
        console.error('❌ No customer email found in subscription');
        return;
    }

    // 有効期限を更新
    await supabase
        .from('users')
        .update({
            membership_expiry: expiryDate.toISOString(),
            updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail);

    console.log(`✅ Subscription updated for ${customerEmail}`);
}

/**
 * サブスクリプション削除（キャンセル）時の処理
 */
async function handleSubscriptionDeleted(subscription) {
    console.log('❌ Subscription deleted:', subscription.id);

    const customerEmail = subscription.customer_email;

    if (!customerEmail) {
        console.error('❌ No customer email found in subscription');
        return;
    }

    // Freeプランにダウングレード
    await supabase
        .from('users')
        .update({
            membership_level: 'free',
            membership_expiry: null,
            updated_at: new Date().toISOString()
        })
        .eq('email', customerEmail);

    console.log(`✅ User ${customerEmail} downgraded to Free plan`);
}

/**
 * 支払い成功時の処理
 */
async function handlePaymentSucceeded(invoice) {
    console.log('💰 Payment succeeded:', invoice.id);

    const customerEmail = invoice.customer_email;
    const subscription = invoice.subscription;

    if (!customerEmail) {
        console.error('❌ No customer email found in invoice');
        return;
    }

    // サブスクリプション情報を取得して有効期限を更新
    if (subscription) {
        const sub = await stripe.subscriptions.retrieve(subscription);
        const expiryDate = new Date(sub.current_period_end * 1000);

        await supabase
            .from('users')
            .update({
                membership_expiry: expiryDate.toISOString(),
                updated_at: new Date().toISOString()
            })
            .eq('email', customerEmail);

        console.log(`✅ Payment processed for ${customerEmail}`);
    }
}

/**
 * 支払い失敗時の処理
 */
async function handlePaymentFailed(invoice) {
    console.log('⚠️ Payment failed:', invoice.id);

    const customerEmail = invoice.customer_email;

    if (!customerEmail) {
        console.error('❌ No customer email found in invoice');
        return;
    }

    // 支払い失敗を記録（オプション）
    // 必要に応じてユーザーに通知を送信

    console.log(`⚠️ Payment failed for ${customerEmail}`);
}

/**
 * 決済履歴を記録（オプション）
 */
async function recordPayment(userId, session) {
    try {
        await supabase
            .from('payment_history')
            .insert({
                user_id: userId,
                stripe_session_id: session.id,
                amount: session.amount_total,
                currency: session.currency,
                status: session.payment_status,
                created_at: new Date().toISOString()
            });
        console.log(`✅ Payment recorded for user ${userId}`);
    } catch (error) {
        // payment_historyテーブルが存在しない場合はスキップ
        console.log('ℹ️ Payment history table not found, skipping record');
    }
}

module.exports = router;

// Made with Bob
