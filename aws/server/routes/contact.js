const express = require('express');
const router = express.Router();
const supabase = require('../database/supabase');

// お問い合わせ送信エンドポイント（Supabaseに保存）
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

        // カテゴリーの日本語変換
        const categoryMap = {
            'content_error': '問題・回答・解説の誤り',
            'login': 'ログイン関連',
            'bug': '不具合の報告',
            'feature': '機能の要望',
            'other': 'その他'
        };

        // Supabaseに保存
        console.log('💾 Saving to Supabase...');
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([
                {
                    name,
                    email,
                    category,
                    category_ja: categoryMap[category] || category,
                    subject,
                    message,
                    status: 'new',
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            console.error('❌ Supabase error:', error);
            throw error;
        }

        console.log('✅ Saved to Supabase successfully:', data);

        res.json({
            success: true,
            message: 'お問い合わせを受け付けました。2-3営業日以内にご返信いたします。'
        });

    } catch (error) {
        console.error('❌ Contact form error:', error);
        console.error('Error details:', {
            message: error.message,
            code: error.code
        });
        
        res.status(500).json({
            error: '送信中にエラーが発生しました。しばらくしてから再度お試しください。'
        });
    }
});

module.exports = router;

// Made with Bob
