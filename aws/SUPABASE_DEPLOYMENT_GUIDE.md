# Supabase超低コストデプロイガイド（月額83円）

## 🎯 概要

**Cloudflare Pages + Supabase** の組み合わせで、**月額83円**（ドメイン代のみ）でフル機能のWebアプリをデプロイできます。

### ✅ 使える機能

| 機能 | Supabase無料枠 | 説明 |
|------|----------------|------|
| **PostgreSQLデータベース** | ✅ 500MB | ユーザー、問題、履歴などを保存 |
| **認証（Auth）** | ✅ 50,000 MAU | ログイン、サインアップ、JWT |
| **ストレージ** | ✅ 1GB | 画像などのファイル保存 |
| **Edge Functions** | ✅ 500,000回/月 | サーバーレス関数（API） |
| **リアルタイム** | ✅ 200同時接続 | WebSocket通信 |
| **自動バックアップ** | ✅ 7日間 | データベースの自動バックアップ |

### 📊 無料枠の制限

- データベース: 500MB（約10万ユーザー分）
- 転送量: 2GB/月（約2万PV相当）
- Edge Functions: 500,000回/月
- 同時接続: 200人

**結論**: 小〜中規模サービスなら十分！

---

## 🚀 セットアップ手順

### ステップ1: Supabaseプロジェクト作成

1. [Supabase](https://supabase.com/)にアクセス
2. GitHubアカウントでサインアップ（無料）
3. 「New Project」をクリック
4. プロジェクト情報を入力:
   - Name: `aws-quiz-app`
   - Database Password: 強力なパスワード（保存必須）
   - Region: `Northeast Asia (Tokyo)` ← 日本向けなら必須
   - Pricing Plan: `Free` を選択
5. 「Create new project」をクリック（約2分で完成）

### ステップ2: データベーステーブル作成

Supabaseダッシュボードで「SQL Editor」を開き、以下を実行:

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

-- インデックス作成（パフォーマンス向上）
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX idx_password_resets_token ON password_resets(token);

-- Row Level Security (RLS) 有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_resets ENABLE ROW LEVEL SECURITY;

-- ポリシー設定（ユーザーは自分のデータのみアクセス可能）
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE USING (auth.uid() = id);
```

### ステップ3: Supabase認証設定

1. Supabaseダッシュボードで「Authentication」→「Settings」
2. 「Site URL」を設定: `https://yourdomain.com`
3. 「Redirect URLs」に追加:
   - `https://yourdomain.com/login.html`
   - `https://yourdomain.com/signup.html`
4. Email Templatesをカスタマイズ（オプション）

### ステップ4: APIキー取得

Supabaseダッシュボードで「Settings」→「API」:
- **Project URL**: `https://xxxxx.supabase.co`
- **anon public key**: `eyJhbGc...`（公開可能）
- **service_role key**: `eyJhbGc...`（秘密、サーバーサイドのみ）

これらをメモ！

### ステップ5: Cloudflare Pagesプロジェクト作成

1. [Cloudflare](https://dash.cloudflare.com/)にログイン
2. 「Pages」→「Create a project」
3. GitHubリポジトリを接続
4. ビルド設定:
   - Framework preset: `None`
   - Build command: （空欄）
   - Build output directory: `/`
5. 環境変数を設定:
   ```
   SUPABASE_URL=https://xxxxx.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc...
   ```

### ステップ6: コード修正（Supabase対応）

#### 6-1. Supabaseクライアント初期化

新規ファイル `aws/supabase-client.js`:

```javascript
// Supabaseクライアント初期化
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGc...';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 認証ヘルパー関数
async function signUp(email, password, username) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username
            }
        }
    });
    
    if (error) throw error;
    
    // usersテーブルにも追加
    const { error: dbError } = await supabase
        .from('users')
        .insert([{
            id: data.user.id,
            email: email,
            username: username,
            membership_level: 'Free'
        }]);
    
    if (dbError) throw dbError;
    return data;
}

async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    });
    
    if (error) throw error;
    return data;
}

async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

async function getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

async function getUserProfile(userId) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
    
    if (error) throw error;
    return data;
}
```

#### 6-2. HTMLファイルにSupabase SDK追加

すべてのHTMLファイルの`<head>`に追加:

```html
<!-- Supabase SDK -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-client.js"></script>
```

#### 6-3. ログイン処理の書き換え

`login.html`のログイン処理:

```javascript
async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    try {
        // Supabaseで認証
        const { user } = await signIn(email, password);
        
        // ユーザープロフィール取得
        const profile = await getUserProfile(user.id);
        
        // ローカルストレージに保存
        localStorage.setItem('user', JSON.stringify(profile));
        
        // リダイレクト
        window.location.href = 'index.html';
    } catch (error) {
        alert('ログインに失敗しました: ' + error.message);
    }
}
```

#### 6-4. サインアップ処理の書き換え

`signup.html`のサインアップ処理:

```javascript
async function handleSignup(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        // Supabaseでユーザー作成
        await signUp(email, password, username);
        
        alert('登録完了！確認メールを送信しました。');
        window.location.href = 'login.html';
    } catch (error) {
        alert('登録に失敗しました: ' + error.message);
    }
}
```

### ステップ7: Stripe Webhookの処理

Supabase Edge Functionsを使用:

```typescript
// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from 'https://esm.sh/stripe@11.1.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  const body = await req.text()
  
  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature!,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')!
    )
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      // Supabaseでユーザー情報を更新
      const { error } = await supabaseAdmin
        .from('users')
        .update({
          membership_level: session.metadata.plan,
          membership_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })
        .eq('email', session.customer_email)
      
      if (error) throw error
    }
    
    return new Response(JSON.stringify({ received: true }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (err) {
    return new Response(String(err), { status: 400 })
  }
})
```

デプロイ:
```bash
supabase functions deploy stripe-webhook
```

### ステップ8: ドメイン設定

#### Cloudflare Pages側
1. Cloudflare Pagesダッシュボード
2. 「Custom domains」→「Set up a custom domain」
3. ドメイン名を入力: `yourdomain.com`
4. DNS設定が自動で追加される

#### お名前.com側
1. ネームサーバーをCloudflareに変更:
   - `ns1.cloudflare.com`
   - `ns2.cloudflare.com`
2. 反映まで最大48時間待つ

---

## 💡 Supabaseの利点

### 1. 完全マネージド
- サーバー管理不要
- 自動スケーリング
- 自動バックアップ

### 2. 高速
- PostgreSQL（世界最速級のDB）
- CDN経由の配信
- エッジロケーション

### 3. セキュリティ
- Row Level Security（行レベルセキュリティ）
- 自動SSL
- DDoS保護

### 4. 開発者フレンドリー
- リアルタイムAPI
- 自動生成されたREST API
- GraphQL対応
- TypeScript型定義

---

## 📊 コスト比較

| 項目 | VPSプラン | Supabaseプラン |
|------|-----------|----------------|
| サーバー | 493円/月 | 無料 |
| データベース | 込み | 無料（500MB） |
| SSL証明書 | 無料 | 無料 |
| ドメイン | 83円/月 | 83円/月 |
| メール | 無料 | 無料 |
| **合計** | **580円/月** | **83円/月** |
| **年間** | **6,960円** | **996円** |

**年間5,964円の節約！**

---

## ⚠️ 注意点と制限

### 無料枠の制限
1. **データベース容量**: 500MB
   - ユーザー10万人程度まで
   - 超えたら有料プラン（$25/月）

2. **転送量**: 2GB/月
   - 月間約2万PV
   - 超えたら有料プラン

3. **Edge Functions**: 500,000回/月
   - 通常は十分
   - 超えたら有料プラン

### 有料プランへの移行タイミング
- ユーザー数が5万人を超えたら
- 月間PVが1万を超えたら
- より高速なパフォーマンスが必要になったら

**Pro プラン**: $25/月（約3,500円）
- データベース: 8GB
- 転送量: 50GB/月
- 優先サポート

---

## 🔄 VPSプランとの比較

| 項目 | VPSプラン | Supabaseプラン |
|------|-----------|----------------|
| **コスト** | 580円/月 | 83円/月 |
| **サーバー管理** | 必要 | 不要 |
| **スケーラビリティ** | 手動 | 自動 |
| **バックアップ** | 手動設定 | 自動 |
| **セキュリティ更新** | 手動 | 自動 |
| **データベース容量** | 30GB | 500MB（無料枠） |
| **カスタマイズ性** | 高い | 中程度 |
| **学習コスト** | 高い | 低い |

### どちらを選ぶべき？

**Supabaseプランがおすすめ**:
- 初めてのWebサービス
- サーバー管理したくない
- コストを最小限に抑えたい
- 小〜中規模サービス（月間1万PV以下）

**VPSプランがおすすめ**:
- サーバー管理の経験がある
- 完全なカスタマイズが必要
- 大規模サービス（月間10万PV以上）
- 特殊な要件がある

---

## 🚀 デプロイ後の拡張

### 無料枠を超えたら

#### オプション1: Supabase有料プラン
- Pro: $25/月（8GB DB、50GB転送）
- Team: $599/月（企業向け）

#### オプション2: VPSに移行
- ConoHa VPS 1GBプラン: 880円/月
- データベースとアプリを自前で管理

#### オプション3: ハイブリッド
- フロントエンド: Cloudflare Pages（無料）
- バックエンド: VPS（580円/月）
- データベース: Supabase Pro（$25/月）

---

## ✅ まとめ

### Supabaseプランの魅力
1. **超低コスト**: 月額83円（ドメイン代のみ）
2. **フル機能**: DB、認証、ストレージ、API
3. **管理不要**: 自動バックアップ、自動更新
4. **高速**: PostgreSQL + CDN
5. **スケーラブル**: 自動スケーリング

### 始め方
1. Supabaseでプロジェクト作成（5分）
2. Cloudflare Pagesでデプロイ（10分）
3. ドメイン設定（1日）
4. **完成！**

**推奨**: まずはSupabaseプランで始めて、成長に応じてVPSに移行するのが最適です！