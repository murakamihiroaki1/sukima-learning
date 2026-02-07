const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// メール送信エンドポイント
router.post('/send', async (req, res) => {
    console.log('📧 Contact form submission received');
    console.log('Request body:', req.body);
    
    try {
        const { name, email, category, subject, message } = req.body;

        // バリデーション
        if (!name || !email || !category || !subject || !message) {
            console.log('❌ Validation failed: missing required fields');
            return res.status(400).json({
                error: 'すべての必須項目を入力してください'
            });
        }

        console.log('✅ Validation passed');
        console.log('SMTP Config:', {
            service: process.env.EMAIL_SERVICE,
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD ? '***' : 'NOT SET',
            from: process.env.EMAIL_FROM
        });

        // メールトランスポーターの設定
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        console.log('📮 Transporter created, verifying connection...');
        
        // 接続テスト
        await transporter.verify();
        console.log('✅ SMTP connection verified');

        // カテゴリーの日本語変換
        const categoryMap = {
            'login': 'ログイン関連',
            'bug': '不具合の報告',
            'feature': '機能の要望',
            'other': 'その他'
        };

        // メール本文
        const mailBody = `
【お問い合わせ内容】

お名前: ${name}
メールアドレス: ${email}
お問い合わせ種別: ${categoryMap[category] || category}
件名: ${subject}

お問い合わせ内容:
${message}

---
送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
        `.trim();

        // メール送信
        const mailOptions = {
            from: `"${process.env.EMAIL_FROM}" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_FROM || 'info@sukima-learning.com',
            replyTo: email,
            subject: `【お問い合わせ】${subject}`,
            text: mailBody
        };

        console.log('📤 Sending email to info@sukima-learning.com...');
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully:', info.messageId);

        // 自動返信メール（オプション）
        console.log('📤 Sending auto-reply to:', email);
        const autoReplyOptions = {
            from: '"AWS認定試験対策サポート" <info@sukima-learning.com>',
            replyTo: 'info@sukima-learning.com',
            to: email,
            subject: 'お問い合わせを受け付けました - AWS認定試験対策',
            text: `
${name} 様

この度は、AWS認定試験対策サービスにお問い合わせいただき、誠にありがとうございます。

以下の内容でお問い合わせを受け付けました。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
【お問い合わせ内容】
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

件名: ${subject}
お問い合わせ種別: ${categoryMap[category] || category}

お問い合わせ内容:
${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

通常2-3営業日以内にご返信いたします。
※土日祝日は対応できない場合がございます。予めご了承ください。

今後ともよろしくお願いいたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AWS認定試験対策サービス
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Website: https://sukima-learning.com

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※本メールは送信専用アドレスから自動送信されています。
※このメールには返信できません。
※ご返信が必要な場合は、上記のお問い合わせ内容を確認後、
  担当者より info@sukima-learning.com からご連絡いたします。
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            `.trim()
        };

        const autoReplyInfo = await transporter.sendMail(autoReplyOptions);
        console.log('✅ Auto-reply sent successfully:', autoReplyInfo.messageId);

        res.json({
            success: true,
            message: 'お問い合わせを受け付けました'
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code,
            command: error.command
        });
        
        res.status(500).json({
            error: '送信中にエラーが発生しました: ' + error.message
        });
    }
});

module.exports = router;

// Made with Bob
