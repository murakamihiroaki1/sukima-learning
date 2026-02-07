# Supabaseデプロイ手順書（完全版）

このガイドでは、AWS Quiz AppをSupabase + Cloudflareでデプロイする手順を詳しく説明します。

---

## 📋 目次

1. [事前準備](#1-事前準備)
2. [Gitリポジトリ準備](#2-gitリポジトリ準備)
3. [Supabaseセットアップ](#3-supabaseセットアップ)
4. [Cloudflare Pagesセットアップ](#4-cloudflare-pagesセットアップ)
5. [Cloudflare Workersセットアップ](#5-cloudflare-workersセットアップ)
6. [Stripeセットアップ](#6-stripeセットアップ)
7. [ドメイン設定](#7-ドメイン設定)
8. [動作確認](#8-動作確認)

---

## 1. 事前準備

### 必要なアカウント

- [ ] GitHubアカウント（無料）
- [ ] Supabaseアカウント（無料）
- [ ] Cloudflareアカウント（無料）
- [ ] Stripeアカウント（無料）
- [ ] ドメイン（お名前.com等で取得、年間1,000円程度）

### 必要なツール

```bash
# Node.js（v18以上）
node --version

# Git
git --version

# Wrangler CLI（Cloudflare Workers用）
npm install -g wrangler
```

---

## 2. Gitリポジトリ準備

### 2.1 リポジトリ構造の整理

現在の`aws/`フォルダを以下の構造に整理します：

```
aws-quiz-app/
├── .gitignore
├── README.md
├── wrangler.toml          # Cloudflare Workers設定
├── package.json           # Workers依存関係
├── public/                # 静的ファイル（Cloudflare Pages用）
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── clf.html
│   ├── saa.html
│   ├── aif.html
│   ├── dva.html
│   ├── pricing.html
│   ├── faq.html
│   ├── contact.html
│   ├── terms.html
│   ├── questions-clf.js
│   ├── questions-saa.js
│   ├── questions-aif.js
│   └── questions-dva.js
├── src/                   # Workers APIコード
│   ├── index.js          # メインエントリーポイント
│   ├── auth.js           # 認証API
│   ├── membership.js     # 会員管理API
│   └── stripe.js         # Stripe API
└── supabase/             # Supabaseマイグレーション
    └── migrations/
        └── 001_initial_schema.sql
```

### 2.2 .gitignoreファイル作成

```bash
# .gitignore
node_modules/
.env
.env.local
.wrangler/
dist/
*.log
.DS_Store
```

### 2.3 GitHubリポジトリ作成

```bash
# 1. GitHubで新規リポジトリ作成
# https://github.com/new
# リポジトリ名: aws-quiz-app
# Public または Private を選択

# 2. ローカルでGit初期化
cd c:/Users/HIROAKIMURAKAMI/Box/IBM/IBM_Bob/aws
git init

# 3. ファイルを追加
git add .
git commit -m "Initial commit"

# 4. GitHubにプッシュ
git remote add origin https://github.com/YOUR_USERNAME/aws-quiz-app.git
git branch -M main
git push -u origin main
```

---

## 3. Supabaseセットアップ

### 3.1 Supabaseプロジェクト作成

1. https://supabase.com にアクセス
2. 「Start your project」をクリック
3. GitHubでサインイン
4. 「New Project」をクリック
5. プロジェクト情報を入力：
   - **Name**: aws-quiz-app
   - **Database Password**: 強力なパスワードを生成（保存しておく）
   - **Region**: Northeast Asia (Tokyo)
   - **Pricing Plan**: Free

### 3.2 データベーススキーマ作成

Supabase Dashboard → SQL Editor で以下を実行：

```sql
-- ユーザーテーブル
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Free',
    membership_expiry TIMESTAMP,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- リフレッシュトークンテーブル
CREATE TABLE refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- パスワードリセットテーブル
CREATE TABLE password_resets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_password_resets_user_id ON password_resets(user_id);
CREATE INDEX idx_password_resets_token ON password_resets(token);

-- Row Level Security (RLS) 有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;

-- RLSポリシー（ユーザーは自分のデータのみアクセス可能）
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);
```

### 3.3 Supabase認証情報取得

Supabase Dashboard → Settings → API で以下を取得：

- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` （秘密鍵）

これらを保存しておきます。

---

## 4. Cloudflare Pagesセットアップ

### 4.1 Cloudflareアカウント作成

1. https://dash.cloudflare.com/sign-up にアクセス
2. メールアドレスとパスワードで登録
3. メール認証を完了

### 4.2 Cloudflare Pagesプロジェクト作成

1. Cloudflare Dashboard → Pages → 「Create a project」
2. 「Connect to Git」を選択
3. GitHubを接続
4. リポジトリ選択: `aws-quiz-app`
5. ビルド設定：
   - **Framework preset**: None
   - **Build command**: （空欄）
   - **Build output directory**: `public`
6. 環境変数を設定：
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
7. 「Save and Deploy」をクリック

### 4.3 デプロイ確認

デプロイが完了すると、以下のようなURLが発行されます：
```
https://aws-quiz-app.pages.dev
```

ブラウザでアクセスして、静的ページが表示されることを確認します。

---

## 5. Cloudflare Workersセットアップ

### 5.1 Wrangler CLI設定

```bash
# Wranglerにログイン
wrangler login

# プロジェクトディレクトリに移動
cd c:/Users/HIROAKIMURAKAMI/Box/IBM/IBM_Bob/aws

# Wrangler初期化
wrangler init
```

### 5.2 wrangler.toml作成

```toml
name = "aws-quiz-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

[env.production]
routes = [
  { pattern = "yourdomain.com/api/*", zone_name = "yourdomain.com" }
]

[vars]
SUPABASE_URL = "https://xxxxx.supabase.co"

[[kv_namespaces]]
binding = "SESSIONS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 5.3 Workers APIコード作成

#### src/index.js

```javascript
import { handleAuth } from './auth';
import { handleMembership } from './membership';
import { handleStripe } from './stripe';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // CORS設定
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // OPTIONSリクエスト（プリフライト）
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      // ルーティング
      if (url.pathname.startsWith('/api/auth')) {
        return await handleAuth(request, env, corsHeaders);
      }
      
      if (url.pathname.startsWith('/api/membership')) {
        return await handleMembership(request, env, corsHeaders);
      }
      
      if (url.pathname.startsWith('/api/stripe')) {
        return await handleStripe(request, env, corsHeaders);
      }
      
      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
```

#### src/auth.js

```javascript
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

export async function handleAuth(request, env, corsHeaders) {
  const url = new URL(request.url);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  
  // POST /api/auth/signup
  if (url.pathname === '/api/auth/signup' && request.method === 'POST') {
    const { email, username, password } = await request.json();
    
    // パスワードハッシュ化
    const passwordHash = await bcrypt.hash(password, 10);
    
    // ユーザー作成
    const { data, error } = await supabase
      .from('users')
      .insert({
        email,
        username,
        password_hash: passwordHash,
        membership_level: 'Free'
      })
      .select()
      .single();
    
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ user: data }), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // POST /api/auth/login
  if (url.pathname === '/api/auth/login' && request.method === 'POST') {
    const { email, password } = await request.json();
    
    // ユーザー取得
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error || !user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // パスワード検証
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // JWT発行（Supabase Auth使用）
    const { data: session, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: user.password_hash // 実際にはSupabase Authを使う場合は別の方法
    });
    
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        membershipLevel: user.membership_level,
        membershipExpiry: user.membership_expiry
      },
      token: session?.access_token
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}
```

#### src/membership.js

```javascript
import { createClient } from '@supabase/supabase-js';

export async function handleMembership(request, env, corsHeaders) {
  const url = new URL(request.url);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  
  // GET /api/membership/status
  if (url.pathname === '/api/membership/status' && request.method === 'GET') {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    // JWT検証
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // ユーザー情報取得
    const { data: userData, error: dbError } = await supabase
      .from('users')
      .select('membership_level, membership_expiry')
      .eq('id', user.id)
      .single();
    
    if (dbError) {
      return new Response(JSON.stringify({ error: dbError.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}
```

#### src/stripe.js

```javascript
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function handleStripe(request, env, corsHeaders) {
  const url = new URL(request.url);
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  
  // POST /api/stripe/create-checkout-session
  if (url.pathname === '/api/stripe/create-checkout-session' && request.method === 'POST') {
    const { priceId, userId } = await request.json();
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `${env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_URL}/pricing`,
      client_reference_id: userId,
    });
    
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // POST /api/stripe/webhook
  if (url.pathname === '/api/stripe/webhook' && request.method === 'POST') {
    const signature = request.headers.get('stripe-signature');
    const body = await request.text();
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // checkout.session.completed イベント処理
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.client_reference_id;
      
      // 会員情報更新
      await supabase
        .from('users')
        .update({
          membership_level: 'Standard',
          membership_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          stripe_customer_id: session.customer,
          stripe_subscription_id: session.subscription
        })
        .eq('id', userId);
    }
    
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}
```

### 5.4 package.json作成

```json
{
  "name": "aws-quiz-api",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "wrangler dev",
    "deploy": "wrangler deploy"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "bcryptjs": "^2.4.3",
    "stripe": "^14.10.0"
  },
  "devDependencies": {
    "wrangler": "^3.22.0"
  }
}
```

### 5.5 依存関係インストール

```bash
npm install
```

### 5.6 環境変数設定

```bash
# Cloudflare Workers Secretsに環境変数を設定
wrangler secret put SUPABASE_SERVICE_KEY
# → Supabase service_role keyを入力

wrangler secret put STRIPE_SECRET_KEY
# → Stripe Secret Keyを入力

wrangler secret put STRIPE_WEBHOOK_SECRET
# → Stripe Webhook Secretを入力

wrangler secret put FRONTEND_URL
# → https://yourdomain.com を入力
```

### 5.7 Workersデプロイ

```bash
wrangler deploy
```

デプロイが完了すると、以下のようなURLが発行されます：
```
https://aws-quiz-api.YOUR_SUBDOMAIN.workers.dev
```

---

## 6. Stripeセットアップ

### 6.1 Stripeアカウント作成

1. https://dashboard.stripe.com/register にアクセス
2. メールアドレスで登録
3. ビジネス情報を入力

### 6.2 商品・価格作成

1. Stripe Dashboard → Products → 「Add product」
2. Standard プラン作成：
   - **Name**: Standard Plan
   - **Price**: ¥980
   - **Billing period**: Monthly
   - **Price ID**: `price_xxxxxxxxxxxxx` （保存）

3. Advanced プラン作成：
   - **Name**: Advanced Plan
   - **Price**: ¥1,980
   - **Billing period**: Monthly
   - **Price ID**: `price_yyyyyyyyyyyyy` （保存）

### 6.3 Webhook設定

1. Stripe Dashboard → Developers → Webhooks → 「Add endpoint」
2. Endpoint URL: `https://aws-quiz-api.YOUR_SUBDOMAIN.workers.dev/api/stripe/webhook`
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Webhook signing secret を取得: `whsec_xxxxxxxxxxxxx`

### 6.4 APIキー取得

Stripe Dashboard → Developers → API keys で以下を取得：

- **Publishable key**: `pk_test_xxxxxxxxxxxxx`
- **Secret key**: `sk_test_xxxxxxxxxxxxx`

---

## 7. ドメイン設定

### 7.1 ドメイン購入

お名前.comやムームードメインで独自ドメインを購入（年間1,000円程度）

### 7.2 Cloudflareにドメイン追加

1. Cloudflare Dashboard → 「Add a site」
2. ドメイン名を入力（例: `aws-quiz.com`）
3. プランを選択: Free
4. ネームサーバーが表示される：
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

### 7.3 ネームサーバー変更

お名前.comの管理画面で、ネームサーバーをCloudflareのものに変更

### 7.4 Cloudflare Pagesにカスタムドメイン設定

1. Cloudflare Pages → プロジェクト → Custom domains
2. 「Set up a custom domain」をクリック
3. ドメイン名を入力: `aws-quiz.com`
4. DNS設定が自動で追加される

### 7.5 メール転送設定（ImprovMX）

1. https://improvmx.com にアクセス
2. ドメインを追加: `aws-quiz.com`
3. MXレコードをCloudflare DNSに追加：
   ```
   Type: MX
   Name: @
   Priority: 10
   Value: mx1.improvmx.com
   
   Type: MX
   Name: @
   Priority: 20
   Value: mx2.improvmx.com
   ```
4. エイリアス設定:
   - `support@aws-quiz.com` → `your-email@gmail.com`
   - `noreply@aws-quiz.com` → `your-email@gmail.com`

---

## 8. 動作確認

### 8.1 静的ページ確認

```
https://aws-quiz.com
https://aws-quiz.com/clf.html
https://aws-quiz.com/pricing.html
```

### 8.2 API確認

```bash
# サインアップテスト
curl -X POST https://aws-quiz.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# ログインテスト
curl -X POST https://aws-quiz.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 8.3 決済テスト

1. `https://aws-quiz.com/pricing.html` にアクセス
2. Standard プランを選択
3. Stripeテストカードで決済:
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 任意の未来の日付
   - CVC: 任意の3桁
4. 決済完了後、会員レベルが更新されることを確認

---

## 9. 継続的デプロイ設定

### 9.1 GitHub Actionsワークフロー作成

`.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare

on:
  push:
    branches:
      - main

jobs:
  deploy-pages:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: aws-quiz-app
          directory: public

  deploy-workers:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - name: Deploy to Cloudflare Workers
        run: npx wrangler deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

### 9.2 GitHub Secrets設定

GitHub リポジトリ → Settings → Secrets and variables → Actions で以下を追加：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

これで、`main`ブランチにプッシュするたびに自動デプロイされます！

---

## ✅ デプロイ完了チェックリスト

- [ ] GitHubリポジトリ作成
- [ ] Supabaseプロジェクト作成
- [ ] データベーススキーマ作成
- [ ] Cloudflare Pages デプロイ
- [ ] Cloudflare Workers デプロイ
- [ ] Stripe商品・価格作成
- [ ] Stripe Webhook設定
- [ ] ドメイン設定
- [ ] メール転送設定
- [ ] 動作確認（サインアップ、ログイン、決済）
- [ ] GitHub Actions設定

---

## 🎉 完了！

おめでとうございます！AWS Quiz Appが本番環境にデプロイされました。

**アクセスURL**: `https://aws-quiz.com`

**月額コスト**: 83円（ドメイン代のみ）

---

## 📚 参考リンク

- [Supabase Documentation](https://supabase.com/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Stripe Documentation](https://stripe.com/docs)
