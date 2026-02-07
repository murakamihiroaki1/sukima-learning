# Supabaseデプロイ手順書（サブディレクトリ構成）

`sukima-learning.com/aws/` でAWS Quiz Appをデプロイする手順です。

---

## 🏗️ サイト構成

```
sukima-learning.com/
├── /                    # トップページ（学習項目一覧）
├── /aws/                # AWS認定試験対策アプリ
├── /python/             # Python学習（将来追加予定）
├── /docker/             # Docker学習（将来追加予定）
└── /kubernetes/         # Kubernetes学習（将来追加予定）
```

---

## 📋 目次

1. [アーキテクチャ概要](#1-アーキテクチャ概要)
2. [Gitリポジトリ構成](#2-gitリポジトリ構成)
3. [Supabaseセットアップ](#3-supabaseセットアップ)
4. [Cloudflare Pagesセットアップ](#4-cloudflare-pagesセットアップ)
5. [Cloudflare Workersセットアップ](#5-cloudflare-workersセットアップ)
6. [Stripeセットアップ](#6-stripeセットアップ)
7. [ドメイン設定](#7-ドメイン設定)
8. [動作確認](#8-動作確認)

---

## 1. アーキテクチャ概要

### URL構成

```
https://sukima-learning.com/              # トップページ
https://sukima-learning.com/aws/          # AWS Quiz トップ
https://sukima-learning.com/aws/clf.html  # CLF試験
https://sukima-learning.com/aws/saa.html  # SAA試験
https://sukima-learning.com/aws/aif.html  # AIF試験
https://sukima-learning.com/aws/dva.html  # DVA試験

# API
https://sukima-learning.com/api/aws/auth/*
https://sukima-learning.com/api/aws/membership/*
https://sukima-learning.com/api/aws/stripe/*
```

### プロジェクト構成

```
sukima-learning/
├── .gitignore
├── README.md
├── wrangler.toml              # Cloudflare Workers設定
├── package.json               # Workers依存関係
├── public/                    # 静的ファイル
│   ├── index.html            # トップページ
│   ├── aws/                  # AWSアプリ
│   │   ├── index.html
│   │   ├── login.html
│   │   ├── signup.html
│   │   ├── clf.html
│   │   ├── saa.html
│   │   ├── aif.html
│   │   ├── dva.html
│   │   ├── pricing.html
│   │   ├── faq.html
│   │   ├── contact.html
│   │   ├── terms.html
│   │   ├── questions-clf.js
│   │   ├── questions-saa.js
│   │   ├── questions-aif.js
│   │   └── questions-dva.js
│   ├── python/               # 将来追加
│   ├── docker/               # 将来追加
│   └── kubernetes/           # 将来追加
├── src/                      # Workers APIコード
│   ├── index.js             # メインルーター
│   └── aws/                 # AWS専用API
│       ├── auth.js
│       ├── membership.js
│       └── stripe.js
└── supabase/                # Supabaseマイグレーション
    └── migrations/
        └── 001_aws_schema.sql
```

---

## 2. Gitリポジトリ構成

### 2.1 リポジトリ作成

```bash
# 1. GitHubで新規リポジトリ作成
# https://github.com/new
# リポジトリ名: sukima-learning
# Public または Private を選択

# 2. ローカルで新規ディレクトリ作成
cd c:/Users/HIROAKIMURAKAMI/Box/IBM/IBM_Bob
mkdir sukima-learning
cd sukima-learning

# 3. Git初期化
git init
```

### 2.2 ディレクトリ構造作成

```bash
# ディレクトリ作成
mkdir -p public/aws
mkdir -p src/aws
mkdir -p supabase/migrations

# トップページ作成
echo "<!DOCTYPE html><html><head><title>Sukima Learning</title></head><body><h1>Sukima Learning</h1></body></html>" > public/index.html
```

### 2.3 既存のAWSファイルをコピー

```bash
# 現在のawsフォルダから必要なファイルをコピー
# Windows PowerShellで実行
Copy-Item -Path "../IBM_Bob/aws/*.html" -Destination "public/aws/"
Copy-Item -Path "../IBM_Bob/aws/questions-*.js" -Destination "public/aws/"
```

または手動で以下のファイルをコピー：
- `index.html`
- `login.html`
- `signup.html`
- `clf.html`
- `saa.html`
- `aif.html`
- `dva.html`
- `pricing.html`
- `faq.html`
- `contact.html`
- `terms.html`
- `questions-clf.js`
- `questions-saa.js`
- `questions-aif.js`
- `questions-dva.js`

### 2.4 HTMLファイルのパス修正

すべてのHTMLファイルで、リンクとスクリプトのパスを修正します：

**修正前**:
```html
<a href="index.html">ホーム</a>
<a href="clf.html">CLF</a>
<script src="questions-clf.js"></script>
```

**修正後**:
```html
<a href="/aws/">ホーム</a>
<a href="/aws/clf.html">CLF</a>
<script src="/aws/questions-clf.js"></script>
```

### 2.5 .gitignore作成

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

### 2.6 GitHubにプッシュ

```bash
git add .
git commit -m "Initial commit: AWS Quiz App"
git remote add origin https://github.com/YOUR_USERNAME/sukima-learning.git
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
   - **Name**: sukima-learning-aws
   - **Database Password**: 強力なパスワードを生成（保存しておく）
   - **Region**: Northeast Asia (Tokyo)
   - **Pricing Plan**: Free

### 3.2 データベーススキーマ作成

Supabase Dashboard → SQL Editor で以下を実行：

```sql
-- AWS Quiz App用スキーマ
CREATE SCHEMA IF NOT EXISTS aws;

-- ユーザーテーブル
CREATE TABLE aws.users (
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
CREATE TABLE aws.refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES aws.users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- パスワードリセットテーブル
CREATE TABLE aws.password_resets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES aws.users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_aws_users_email ON aws.users(email);
CREATE INDEX idx_aws_users_username ON aws.users(username);
CREATE INDEX idx_aws_refresh_tokens_user_id ON aws.refresh_tokens(user_id);
CREATE INDEX idx_aws_refresh_tokens_token ON aws.refresh_tokens(token);
CREATE INDEX idx_aws_password_resets_user_id ON aws.password_resets(user_id);
CREATE INDEX idx_aws_password_resets_token ON aws.password_resets(token);

-- Row Level Security (RLS) 有効化
ALTER TABLE aws.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE aws.refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE aws.password_resets ENABLE ROW LEVEL SECURITY;

-- RLSポリシー
CREATE POLICY "Users can view own data" ON aws.users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON aws.users
    FOR UPDATE USING (auth.uid() = id);
```

### 3.3 Supabase認証情報取得

Supabase Dashboard → Settings → API で以下を取得：

- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
- **service_role key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

---

## 4. Cloudflare Pagesセットアップ

### 4.1 Cloudflare Pagesプロジェクト作成

1. Cloudflare Dashboard → Pages → 「Create a project」
2. 「Connect to Git」を選択
3. GitHubを接続
4. リポジトリ選択: `sukima-learning`
5. ビルド設定：
   - **Project name**: sukima-learning
   - **Production branch**: main
   - **Framework preset**: None
   - **Build command**: （空欄）
   - **Build output directory**: `public`
6. 環境変数を設定：
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
7. 「Save and Deploy」をクリック

### 4.2 デプロイ確認

デプロイが完了すると、以下のようなURLが発行されます：
```
https://sukima-learning.pages.dev
https://sukima-learning.pages.dev/aws/
https://sukima-learning.pages.dev/aws/clf.html
```

---

## 5. Cloudflare Workersセットアップ

### 5.1 wrangler.toml作成

```toml
name = "sukima-learning-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

[env.production]
routes = [
  { pattern = "sukima-learning.com/api/*", zone_name = "sukima-learning.com" }
]

[vars]
SUPABASE_URL = "https://xxxxx.supabase.co"

[[kv_namespaces]]
binding = "SESSIONS"
id = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 5.2 Workers APIコード作成

#### src/index.js

```javascript
import { handleAwsAuth } from './aws/auth';
import { handleAwsMembership } from './aws/membership';
import { handleAwsStripe } from './aws/stripe';

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
      // AWS API ルーティング
      if (url.pathname.startsWith('/api/aws/auth')) {
        return await handleAwsAuth(request, env, corsHeaders);
      }
      
      if (url.pathname.startsWith('/api/aws/membership')) {
        return await handleAwsMembership(request, env, corsHeaders);
      }
      
      if (url.pathname.startsWith('/api/aws/stripe')) {
        return await handleAwsStripe(request, env, corsHeaders);
      }
      
      // 将来の拡張用
      // if (url.pathname.startsWith('/api/python/')) { ... }
      // if (url.pathname.startsWith('/api/docker/')) { ... }
      
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

#### src/aws/auth.js

```javascript
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

export async function handleAwsAuth(request, env, corsHeaders) {
  const url = new URL(request.url);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  
  // POST /api/aws/auth/signup
  if (url.pathname === '/api/aws/auth/signup' && request.method === 'POST') {
    const { email, username, password } = await request.json();
    
    // パスワードハッシュ化
    const passwordHash = await bcrypt.hash(password, 10);
    
    // ユーザー作成
    const { data, error } = await supabase
      .from('aws.users')
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
  
  // POST /api/aws/auth/login
  if (url.pathname === '/api/aws/auth/login' && request.method === 'POST') {
    const { email, password } = await request.json();
    
    // ユーザー取得
    const { data: user, error } = await supabase
      .from('aws.users')
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
    
    // セッショントークン生成（簡易版）
    const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 24 * 60 * 60 * 1000 }));
    
    return new Response(JSON.stringify({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        membershipLevel: user.membership_level,
        membershipExpiry: user.membership_expiry
      },
      token
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}
```

#### src/aws/membership.js

```javascript
import { createClient } from '@supabase/supabase-js';

export async function handleAwsMembership(request, env, corsHeaders) {
  const url = new URL(request.url);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  
  // GET /api/aws/membership/status
  if (url.pathname === '/api/aws/membership/status' && request.method === 'GET') {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '');
    
    // トークン検証（簡易版）
    let userId;
    try {
      const decoded = JSON.parse(atob(token));
      if (decoded.exp < Date.now()) {
        throw new Error('Token expired');
      }
      userId = decoded.userId;
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // ユーザー情報取得
    const { data: userData, error: dbError } = await supabase
      .from('aws.users')
      .select('membership_level, membership_expiry')
      .eq('id', userId)
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

#### src/aws/stripe.js

```javascript
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function handleAwsStripe(request, env, corsHeaders) {
  const url = new URL(request.url);
  const stripe = new Stripe(env.STRIPE_SECRET_KEY);
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_KEY);
  
  // POST /api/aws/stripe/create-checkout-session
  if (url.pathname === '/api/aws/stripe/create-checkout-session' && request.method === 'POST') {
    const { priceId, userId } = await request.json();
    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price: priceId,
        quantity: 1,
      }],
      success_url: `${env.FRONTEND_URL}/aws/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.FRONTEND_URL}/aws/pricing`,
      client_reference_id: userId,
      metadata: {
        app: 'aws'
      }
    });
    
    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  // POST /api/aws/stripe/webhook
  if (url.pathname === '/api/aws/stripe/webhook' && request.method === 'POST') {
    const signature = request.headers.get('stripe-signature');
    const body = await request.text();
    
    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET_AWS);
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Webhook signature verification failed' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    
    // checkout.session.completed イベント処理
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // AWSアプリのWebhookのみ処理
      if (session.metadata?.app === 'aws') {
        const userId = session.client_reference_id;
        
        // 会員情報更新
        await supabase
          .from('aws.users')
          .update({
            membership_level: 'Standard',
            membership_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            stripe_customer_id: session.customer,
            stripe_subscription_id: session.subscription
          })
          .eq('id', userId);
      }
    }
    
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  return new Response('Not Found', { status: 404, headers: corsHeaders });
}
```

### 5.3 package.json作成

```json
{
  "name": "sukima-learning-api",
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

### 5.4 依存関係インストールとデプロイ

```bash
npm install

# 環境変数設定
wrangler secret put SUPABASE_SERVICE_KEY
wrangler secret put STRIPE_SECRET_KEY
wrangler secret put STRIPE_WEBHOOK_SECRET_AWS
wrangler secret put FRONTEND_URL
# → https://sukima-learning.com を入力

# デプロイ
wrangler deploy
```

---

## 6. Stripeセットアップ

### 6.1 商品・価格作成

1. Stripe Dashboard → Products → 「Add product」
2. Standard プラン作成：
   - **Name**: AWS Quiz Standard Plan
   - **Description**: AWS認定試験対策 Standardプラン
   - **Price**: ¥980
   - **Billing period**: Monthly
   - **Metadata**: `app=aws`
   - **Price ID**: `price_xxxxxxxxxxxxx` （保存）

3. Advanced プラン作成：
   - **Name**: AWS Quiz Advanced Plan
   - **Description**: AWS認定試験対策 Advancedプラン
   - **Price**: ¥1,980
   - **Billing period**: Monthly
   - **Metadata**: `app=aws`
   - **Price ID**: `price_yyyyyyyyyyyyy` （保存）

### 6.2 Webhook設定

1. Stripe Dashboard → Developers → Webhooks → 「Add endpoint」
2. Endpoint URL: `https://sukima-learning.com/api/aws/stripe/webhook`
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Webhook signing secret を取得: `whsec_xxxxxxxxxxxxx`

---

## 7. ドメイン設定

### 7.1 ドメイン購入

お名前.comやムームードメインで `sukima-learning.com` を購入

### 7.2 Cloudflareにドメイン追加

1. Cloudflare Dashboard → 「Add a site」
2. ドメイン名を入力: `sukima-learning.com`
3. プランを選択: Free
4. ネームサーバーをメモ：
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```

### 7.3 ネームサーバー変更

お名前.comの管理画面で、ネームサーバーをCloudflareのものに変更

### 7.4 Cloudflare Pagesにカスタムドメイン設定

1. Cloudflare Pages → sukima-learning → Custom domains
2. 「Set up a custom domain」をクリック
3. ドメイン名を入力: `sukima-learning.com`
4. DNS設定が自動で追加される

### 7.5 メール転送設定（ImprovMX）

1. https://improvmx.com にアクセス
2. ドメインを追加: `sukima-learning.com`
3. MXレコードをCloudflare DNSに追加
4. エイリアス設定:
   - `support@sukima-learning.com` → `your-email@gmail.com`
   - `aws@sukima-learning.com` → `your-email@gmail.com`

---

## 8. 動作確認

### 8.1 静的ページ確認

```
https://sukima-learning.com/
https://sukima-learning.com/aws/
https://sukima-learning.com/aws/clf.html
https://sukima-learning.com/aws/pricing.html
```

### 8.2 API確認

```bash
# サインアップテスト
curl -X POST https://sukima-learning.com/api/aws/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'

# ログインテスト
curl -X POST https://sukima-learning.com/api/aws/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 8.3 決済テスト

1. `https://sukima-learning.com/aws/pricing.html` にアクセス
2. Standard プランを選択
3. Stripeテストカードで決済
4. 決済完了後、会員レベルが更新されることを確認

---

## 9. 将来の拡張

### 9.1 新しい学習項目の追加

```bash
# 例: Python学習アプリを追加
mkdir -p public/python
mkdir -p src/python

# HTMLファイルを追加
# public/python/index.html

# APIを追加
# src/python/auth.js
# src/python/progress.js

# src/index.jsにルーティング追加
if (url.pathname.startsWith('/api/python/')) {
  return await handlePythonApi(request, env, corsHeaders);
}
```

### 9.2 Supabaseスキーマ追加

```sql
-- Python学習用スキーマ
CREATE SCHEMA IF NOT EXISTS python;

CREATE TABLE python.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    -- ...
);
```

---

## ✅ デプロイ完了チェックリスト

- [ ] GitHubリポジトリ作成（sukima-learning）
- [ ] ディレクトリ構造作成（public/aws/、src/aws/）
- [ ] 既存ファイルをコピー
- [ ] HTMLファイルのパス修正（/aws/）
- [ ] Supabaseプロジェクト作成（sukima-learning-aws）
- [ ] データベーススキーマ作成（aws.users）
- [ ] Cloudflare Pages デプロイ
- [ ] Cloudflare Workers デプロイ
- [ ] Stripe商品・価格作成（metadata: app=aws）
- [ ] Stripe Webhook設定
- [ ] ドメイン設定（sukima-learning.com）
- [ ] メール転送設定
- [ ] 動作確認

---

## 🎉 完了！

**トップページ**: `https://sukima-learning.com/`
**AWSアプリ**: `https://sukima-learning.com/aws/`

**月額コスト**: 83円（ドメイン代のみ）

将来的に他の学習項目も同じ構成で追加できます！