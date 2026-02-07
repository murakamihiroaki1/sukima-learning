# Supabaseアーキテクチャ詳細（AWS Quiz App）

## 🏗️ システムアーキテクチャ図

```
┌─────────────────────────────────────────────────────────────────┐
│                         ユーザー                                  │
│                    (ブラウザ / スマホ)                            │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Cloudflare CDN                                │
│              (グローバルエッジネットワーク)                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  - DDoS保護                                               │  │
│  │  - SSL/TLS終端                                            │  │
│  │  - キャッシング                                            │  │
│  │  - 静的ファイル配信                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         │                               │
         ▼                               ▼
┌──────────────────┐          ┌──────────────────────┐
│ Cloudflare Pages │          │ Cloudflare Workers   │
│  (静的ホスティング) │          │  (サーバーレスAPI)    │
├──────────────────┤          ├──────────────────────┤
│ • index.html     │          │ • /api/auth/*        │
│ • clf.html       │          │ • /api/membership/*  │
│ • saa.html       │          │ • /api/stripe/*      │
│ • aif.html       │          │                      │
│ • dva.html       │          │ Edge Functions:      │
│ • *.css          │          │ • ログイン処理        │
│ • *.js           │          │ • サインアップ        │
│ • questions-*.js │          │ • 会員管理           │
└────────┬─────────┘          └──────────┬───────────┘
         │                               │
         │                               │ REST API
         │                               ▼
         │                    ┌──────────────────────┐
         │                    │   Supabase Auth      │
         │                    │   (認証サービス)      │
         │                    ├──────────────────────┤
         │                    │ • JWT発行            │
         │                    │ • セッション管理      │
         │                    │ • パスワードハッシュ  │
         │                    │ • メール認証         │
         │                    └──────────┬───────────┘
         │                               │
         │                               ▼
         └──────────────────────────────────────────┐
                                                    │
                                                    ▼
                                    ┌───────────────────────────┐
                                    │   Supabase Database       │
                                    │   (PostgreSQL 500MB)      │
                                    ├───────────────────────────┤
                                    │ Tables:                   │
                                    │ • users                   │
                                    │ • refresh_tokens          │
                                    │ • password_resets         │
                                    │                           │
                                    │ Features:                 │
                                    │ • Row Level Security      │
                                    │ • 自動バックアップ (7日)   │
                                    │ • リアルタイム更新        │
                                    └───────────────────────────┘
                                                    │
                                                    │
                                    ┌───────────────▼───────────┐
                                    │   Stripe API              │
                                    │   (決済処理)              │
                                    ├───────────────────────────┤
                                    │ • Checkout Session        │
                                    │ • Webhook                 │
                                    │ • サブスクリプション       │
                                    └───────────────────────────┘
```

---

## 📦 コンポーネント詳細

### 1. フロントエンド（Cloudflare Pages）

**役割**: 静的ファイルのホスティング

**ファイル構成**:
```
aws/
├── index.html          # トップページ
├── login.html          # ログインページ
├── signup.html         # サインアップページ
├── clf.html            # CLF試験ページ
├── saa.html            # SAA試験ページ
├── aif.html            # AIF試験ページ
├── dva.html            # DVA試験ページ
├── pricing.html        # 料金ページ
├── questions-clf.js    # CLF問題データ
├── questions-saa.js    # SAA問題データ
├── questions-aif.js    # AIF問題データ
├── questions-dva.js    # DVA問題データ
└── supabase-client.js  # Supabaseクライアント
```

**特徴**:
- ✅ グローバルCDN配信（高速）
- ✅ 自動HTTPS
- ✅ 無制限の帯域幅
- ✅ Git連携（自動デプロイ）

---

### 2. バックエンド（Cloudflare Workers）

**役割**: サーバーレスAPI

**エンドポイント**:
```javascript
// 認証API
POST   /api/auth/login           // ログイン
POST   /api/auth/signup          // サインアップ
POST   /api/auth/logout          // ログアウト
POST   /api/auth/refresh         // トークン更新
GET    /api/auth/me              // ユーザー情報取得

// 会員管理API
GET    /api/membership/status    // 会員ステータス取得
POST   /api/membership/upgrade   // アップグレード

// Stripe API
POST   /api/stripe/create-checkout-session  // 決済セッション作成
POST   /api/stripe/webhook                  // Webhook受信
```

**特徴**:
- ✅ エッジロケーションで実行（低レイテンシ）
- ✅ 自動スケーリング
- ✅ 無料枠: 100,000リクエスト/日
- ✅ TypeScript/JavaScript対応

---

### 3. データベース（Supabase PostgreSQL）

**スキーマ**:

```sql
-- ユーザーテーブル
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Free',
    membership_expiry TIMESTAMP,
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
```

**Row Level Security (RLS)**:
```sql
-- ユーザーは自分のデータのみアクセス可能
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);
```

**特徴**:
- ✅ PostgreSQL 15（最新版）
- ✅ 自動バックアップ（7日間）
- ✅ リアルタイム更新
- ✅ Row Level Security
- ✅ 自動インデックス最適化

---

### 4. 認証（Supabase Auth）

**機能**:
- メール/パスワード認証
- JWT（JSON Web Token）発行
- セッション管理
- パスワードリセット
- メール確認

**フロー**:
```
1. ユーザーがログインフォーム送信
   ↓
2. Cloudflare Workers → Supabase Auth
   ↓
3. Supabase Auth: パスワード検証
   ↓
4. JWT発行（access_token + refresh_token）
   ↓
5. クライアントに返却
   ↓
6. 以降のリクエストにJWTを付与
```

**JWT構造**:
```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "authenticated",
  "iat": 1234567890,
  "exp": 1234571490
}
```

---

### 5. 決済（Stripe）

**フロー**:
```
1. ユーザーが料金プラン選択
   ↓
2. Cloudflare Workers: Stripe Checkout Session作成
   ↓
3. ユーザーをStripe決済ページにリダイレクト
   ↓
4. ユーザーが決済完了
   ↓
5. Stripe → Webhook → Cloudflare Workers
   ↓
6. Supabase Database: 会員情報更新
   ↓
7. ユーザーに完了メール送信
```

**Webhook処理**:
```javascript
// Cloudflare Workers
export default {
  async fetch(request, env) {
    if (request.url.endsWith('/api/stripe/webhook')) {
      const signature = request.headers.get('stripe-signature');
      const body = await request.text();
      
      // Stripe署名検証
      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
      
      if (event.type === 'checkout.session.completed') {
        // 会員情報更新
        await supabase
          .from('users')
          .update({
            membership_level: 'Standard',
            membership_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          })
          .eq('email', event.data.object.customer_email);
      }
      
      return new Response('OK', { status: 200 });
    }
  }
};
```

---

## 🔄 データフロー

### ログインフロー

```
[ブラウザ]
  │
  │ 1. POST /api/auth/login
  │    { email, password }
  ▼
[Cloudflare Workers]
  │
  │ 2. Supabase Auth API呼び出し
  ▼
[Supabase Auth]
  │
  │ 3. パスワード検証
  │ 4. JWT発行
  ▼
[Cloudflare Workers]
  │
  │ 5. ユーザー情報取得
  ▼
[Supabase Database]
  │
  │ 6. users テーブルから取得
  ▼
[Cloudflare Workers]
  │
  │ 7. レスポンス返却
  │    { user, token }
  ▼
[ブラウザ]
  │
  │ 8. localStorage保存
  │ 9. リダイレクト
```

### 問題表示フロー

```
[ブラウザ]
  │
  │ 1. clf.html読み込み
  ▼
[Cloudflare Pages]
  │
  │ 2. HTML + CSS + JS配信
  ▼
[ブラウザ]
  │
  │ 3. questions-clf.js読み込み
  ▼
[Cloudflare Pages]
  │
  │ 4. 問題データ配信（静的ファイル）
  ▼
[ブラウザ]
  │
  │ 5. 問題表示（クライアントサイド）
  │ 6. ローカルストレージで進捗管理
```

### 会員アップグレードフロー

```
[ブラウザ]
  │
  │ 1. 料金プラン選択
  ▼
[Cloudflare Workers]
  │
  │ 2. Stripe Checkout Session作成
  ▼
[Stripe API]
  │
  │ 3. 決済URL発行
  ▼
[ブラウザ]
  │
  │ 4. Stripe決済ページへリダイレクト
  │ 5. ユーザーが決済
  ▼
[Stripe]
  │
  │ 6. Webhook送信
  ▼
[Cloudflare Workers]
  │
  │ 7. 署名検証
  │ 8. 会員情報更新
  ▼
[Supabase Database]
  │
  │ 9. users.membership_level更新
  │ 10. users.membership_expiry更新
  ▼
[ブラウザ]
  │
  │ 11. 完了ページ表示
```

---

## 💾 データ保存場所

| データ種類 | 保存場所 | 容量 | 説明 |
|-----------|---------|------|------|
| **ユーザー情報** | Supabase DB | ~1KB/人 | email, username, password_hash |
| **会員情報** | Supabase DB | ~100B/人 | membership_level, expiry |
| **トークン** | Supabase DB | ~500B/人 | refresh_token |
| **問題データ** | Cloudflare Pages | ~500KB | questions-*.js（静的ファイル） |
| **進捗・見直し** | localStorage | ~10KB | ブラウザローカル |
| **セッション** | localStorage | ~2KB | JWT token |

**500MBで保存できる量**:
- ユーザー: 約50万人
- 問題データ: 静的ファイル（無制限）
- 進捗データ: ブラウザローカル（無制限）

---

## 🚀 パフォーマンス

### レスポンスタイム

| 操作 | 時間 | 説明 |
|------|------|------|
| ページ読み込み | 50-100ms | Cloudflare CDN |
| ログイン | 200-300ms | Supabase Auth |
| 問題表示 | 10-20ms | ローカル処理 |
| 会員情報取得 | 100-200ms | Supabase DB |

### スケーラビリティ

| 指標 | 無料枠 | 説明 |
|------|--------|------|
| 同時接続 | 200人 | Supabase Realtime |
| リクエスト | 100,000/日 | Cloudflare Workers |
| 転送量 | 2GB/月 | Supabase |
| ページビュー | 無制限 | Cloudflare Pages |

**実質的な制限**:
- 月間約2万PV
- 同時ユーザー200人
- データベース500MB

---

## 🔒 セキュリティ

### 1. 認証・認可

```javascript
// Row Level Security (RLS)
// ユーザーは自分のデータのみアクセス可能
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);
```

### 2. HTTPS/SSL

- Cloudflare: 自動SSL証明書
- Supabase: TLS 1.3

### 3. CORS設定

```javascript
// Cloudflare Workers
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://yourdomain.com',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
```

### 4. JWT検証

```javascript
// すべてのAPIリクエストでJWT検証
const token = request.headers.get('Authorization')?.replace('Bearer ', '');
const { data: user, error } = await supabase.auth.getUser(token);
if (error) return new Response('Unauthorized', { status: 401 });
```

### 5. Stripe Webhook署名検証

```javascript
const signature = request.headers.get('stripe-signature');
const event = stripe.webhooks.constructEvent(
  body,
  signature,
  env.STRIPE_WEBHOOK_SECRET
);
```

---

## 📊 コスト内訳

| サービス | 無料枠 | 超過時 |
|---------|--------|--------|
| Cloudflare Pages | 無制限 | 無料 |
| Cloudflare Workers | 100,000リクエスト/日 | $0.50/100万リクエスト |
| Supabase Database | 500MB | $25/月（Pro） |
| Supabase Auth | 50,000 MAU | $25/月（Pro） |
| Supabase Storage | 1GB | $25/月（Pro） |
| ドメイン | - | 1,000円/年 |
| メール転送 | 無制限 | 無料 |

**月額**: 83円（ドメイン代のみ）

---

## ✅ まとめ

### Supabaseアーキテクチャの利点

1. **超低コスト**: 月額83円
2. **サーバーレス**: 管理不要
3. **高速**: グローバルCDN
4. **スケーラブル**: 自動スケーリング
5. **セキュア**: RLS、JWT、HTTPS
6. **開発効率**: 自動生成API

### 適している規模

- ユーザー数: 〜5万人
- 月間PV: 〜2万
- データ量: 〜500MB

### 成長時の移行パス

1. **Supabase Pro**: $25/月（8GB、50GB転送）
2. **VPS移行**: 580円/月（完全な自由度）
3. **ハイブリッド**: フロントエンドはCloudflare、バックエンドはVPS