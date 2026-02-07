# スキマラーニング - IT資格試験対策サービス

スキマ時間で効率的に学習できるIT資格試験対策のオンラインサービスです。

## 📁 フォルダ構成

```
sukima-learning/
├── index.html              # トップページ（https://sukima-learning.com/）
├── README.md              # このファイル
│
└── aws/                   # AWS認定試験対策（https://sukima-learning.com/aws/）
    ├── index.html         # AWS認定トップページ
    ├── clf.html          # Cloud Practitioner 問題
    ├── aif.html          # AI Practitioner 問題
    ├── saa.html          # Solutions Architect Associate 問題
    ├── dva.html          # Developer Associate 問題
    ├── login.html        # ログインページ
    ├── signup.html       # 会員登録ページ
    ├── pricing.html      # 料金プラン
    ├── contact.html      # お問い合わせ
    ├── faq.html          # よくある質問
    ├── terms.html        # 利用規約
    │
    ├── questions-clf.js  # CLF問題データ
    ├── questions-aif.js  # AIF問題データ
    ├── questions-saa.js  # SAA問題データ
    ├── questions-dva.js  # DVA問題データ
    │
    ├── nav-component.js  # ナビゲーションコンポーネント
    ├── nav-styles.css    # ナビゲーションスタイル
    ├── membership-access.js  # 会員アクセス制御
    │
    └── server/           # バックエンドサーバー
        ├── server.js     # メインサーバー
        ├── .env          # 環境変数（要設定）
        ├── .env.example  # 環境変数サンプル
        ├── package.json  # 依存パッケージ
        │
        ├── routes/       # APIルート
        │   ├── auth.js           # 認証API
        │   ├── membership.js     # 会員管理API
        │   ├── stripe-webhook.js # Stripe Webhook
        │   └── contact.js        # お問い合わせAPI
        │
        ├── database/     # データベース
        │   └── supabase.js       # Supabase接続
        │
        └── middleware/   # ミドルウェア
            └── errorHandler.js   # エラーハンドラー
```

## 🚀 クイックスタート

### 1. フロントエンド起動

```bash
cd sukima-learning
python -m http.server 8000
```

ブラウザで以下にアクセス：
- トップページ: http://localhost:8000/
- AWS認定: http://localhost:8000/aws/

### 2. バックエンド起動

```bash
cd sukima-learning/aws/server
npm install
npm run dev
```

サーバーが http://localhost:3000 で起動します。

## 📚 対応資格

### 提供中
- ☁️ **AWS認定試験**
  - Cloud Practitioner (CLF)
  - AI Practitioner (AIF)
  - Solutions Architect Associate (SAA)
  - Developer Associate (DVA)

### 準備中
- 💼 ITパスポート試験
- 💻 基本情報技術者試験
- 🎓 応用情報技術者試験
- 🔒 情報セキュリティマネジメント試験
- 🗄️ データベーススペシャリスト試験

## 🔧 セットアップ

### 環境変数設定

`sukima-learning/aws/server/.env` ファイルを作成：

```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_secret_key

# JWT
JWT_SECRET=your_jwt_secret

# SMTP（お問い合わせフォーム用）
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Stripe（決済機能用）
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# サーバー設定
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8000
```

詳細は `sukima-learning/aws/server/.env.example` を参照。

## 📖 ドキュメント

### セットアップガイド
- [STARTUP_GUIDE.md](aws/STARTUP_GUIDE.md) - 起動方法
- [SETUP_GUIDE.md](aws/SETUP_GUIDE.md) - セットアップ手順
- [SUPABASE_SETUP_GUIDE.md](aws/server/SUPABASE_SETUP_GUIDE.md) - Supabase設定

### 機能ガイド
- [MEMBERSHIP_SYSTEM.md](aws/MEMBERSHIP_SYSTEM.md) - 会員システム
- [ACCESS_CONTROL_GUIDE.md](aws/ACCESS_CONTROL_GUIDE.md) - アクセス制御
- [CONTACT_FORM_SETUP.md](aws/server/CONTACT_FORM_SETUP.md) - お問い合わせフォーム

### デプロイガイド
- [DEPLOYMENT.md](aws/DEPLOYMENT.md) - デプロイ方法
- [DOMAIN_PURCHASE_GUIDE.md](aws/DOMAIN_PURCHASE_GUIDE.md) - ドメイン取得

## 💳 料金プラン

| プラン | 料金 | 機能 |
|--------|------|------|
| **Free** | ¥0 | 基本問題（各資格20問）、詳細な解説 |
| **Standard** | ¥980/月 | 全問題、ランダム出題、模擬試験 |
| **Advanced** | ¥1,980/月 | 複数資格、優先サポート、合格保証 |

## 🌐 デプロイ先

- **本番環境**: https://sukima-learning.com
- **AWS認定**: https://sukima-learning.com/aws/

## 📧 お問い合わせ

- Email: info@sukima-learning.com
- お問い合わせフォーム: https://sukima-learning.com/aws/contact.html

## 📝 ライセンス

© 2026 スキマラーニング. All rights reserved.

## 🔄 更新履歴

### 2026-02-04
- フォルダ構成を変更（sukima-learning/配下に統合）
- トップページ作成（index.html）
- お問い合わせフォームのメール送信機能実装
- 独自ドメイン取得ガイド作成

### 2026-01-23
- AWS認定試験対策サービス公開
- Supabase（PostgreSQL）対応
- Stripe決済連携
- 会員システム実装