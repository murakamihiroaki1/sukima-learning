# MySQL無料ホスティングガイド（月額83円）

## ❌ Supabaseの制限

**Supabase = PostgreSQLのみ**
- MySQLは使えません
- 既存のMySQLコードは書き換えが必要

## ✅ MySQL無料ホスティングの選択肢

### オプション1: PlanetScale（推奨）⭐

**料金**: 完全無料（Hobby プラン）

**スペック**:
- データベース: MySQL 8.0互換
- 容量: 5GB
- 行数: 10億行
- 接続数: 1,000同時接続
- クエリ: 100億行読み取り/月
- ブランチ: 1個（本番環境）

**特徴**:
- ✅ 完全無料（クレカ不要）
- ✅ MySQL互換（既存コードそのまま）
- ✅ 自動バックアップ
- ✅ 高速（Vitess技術）
- ✅ スケーラブル
- ✅ 日本リージョンあり

**制限**:
- ブランチ機能なし（本番のみ）
- サポートなし
- 商用利用は有料プラン推奨

**公式サイト**: https://planetscale.com/

---

### オプション2: Railway

**料金**: $5クレジット/月（無料）

**スペック**:
- データベース: MySQL 8.0
- 容量: 1GB
- メモリ: 512MB
- 実行時間: 500時間/月

**特徴**:
- ✅ MySQL対応
- ✅ 簡単デプロイ
- ✅ GitHub連携
- ✅ 自動SSL

**制限**:
- クレジットカード登録必須
- 月$5分まで無料

**公式サイト**: https://railway.app/

---

### オプション3: Aiven（小規模向け）

**料金**: 無料プラン

**スペック**:
- データベース: MySQL 8.0
- 容量: 5GB
- メモリ: 1GB
- 期間: 30日間（その後有料）

**特徴**:
- ✅ MySQL対応
- ✅ 高性能
- ✅ 複数リージョン

**制限**:
- 30日後は有料（$10/月〜）
- お試し用

**公式サイト**: https://aiven.io/

---

## 🎯 推奨構成：PlanetScale + Cloudflare Pages

### 総コスト: 月額83円（ドメイン代のみ）

| サービス | 料金 | 用途 |
|----------|------|------|
| PlanetScale | 無料 | MySQL データベース |
| Cloudflare Pages | 無料 | 静的ホスティング |
| Cloudflare Workers | 無料 | サーバーレスAPI |
| お名前.com | 83円/月 | ドメイン |
| ImprovMX | 無料 | メール転送 |

---

## 🚀 PlanetScale セットアップ手順

### ステップ1: PlanetScaleアカウント作成

1. [PlanetScale](https://planetscale.com/)にアクセス
2. GitHubアカウントでサインアップ（無料）
3. 「Create a database」をクリック
4. データベース情報を入力:
   - Name: `aws-quiz-db`
   - Region: `AWS ap-northeast-1 (Tokyo)` ← 日本向け
   - Plan: `Hobby` （無料）
5. 「Create database」をクリック

### ステップ2: 接続情報取得

1. データベースダッシュボードで「Connect」をクリック
2. 「Create password」をクリック
3. 接続情報をコピー:
   ```
   Host: aws-ap-northeast-1.connect.psdb.cloud
   Username: xxxxxxxxxx
   Password: pscale_pw_xxxxxxxxxx
   Database: aws-quiz-db
   ```

### ステップ3: テーブル作成

PlanetScaleコンソールで以下のSQLを実行:

```sql
-- ユーザーテーブル
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Free',
    membership_expiry DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- リフレッシュトークンテーブル
CREATE TABLE refresh_tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- パスワードリセットテーブル
CREATE TABLE password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

### ステップ4: Cloudflare Workers設定

既存のNode.jsサーバーをCloudflare Workersに移行:

#### 4-1. Wranglerインストール

```bash
npm install -g wrangler
wrangler login
```

#### 4-2. プロジェクト作成

```bash
mkdir aws-quiz-api
cd aws-quiz-api
wrangler init
```

#### 4-3. wrangler.toml設定

```toml
name = "aws-quiz-api"
main = "src/index.js"
compatibility_date = "2024-01-01"

[vars]
DB_HOST = "aws-ap-northeast-1.connect.psdb.cloud"
DB_NAME = "aws-quiz-db"

[[d1_databases]]
binding = "DB"
database_name = "aws-quiz-db"
database_id = "your-database-id"
```

#### 4-4. データベース接続コード

```javascript
// src/db.js
import mysql from 'mysql2/promise';

export async function getConnection(env) {
  return await mysql.createConnection({
    host: env.DB_HOST,
    user: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
    ssl: {
      rejectUnauthorized: true
    }
  });
}

export async function query(env, sql, params) {
  const connection = await getConnection(env);
  try {
    const [results] = await connection.execute(sql, params);
    return results;
  } finally {
    await connection.end();
  }
}
```

#### 4-5. APIエンドポイント

```javascript
// src/index.js
import { query } from './db';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // CORS設定
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    try {
      // ログインAPI
      if (url.pathname === '/api/auth/login' && request.method === 'POST') {
        const { email, password } = await request.json();
        
        const users = await query(
          env,
          'SELECT * FROM users WHERE email = ?',
          [email]
        );
        
        if (users.length === 0) {
          return new Response(JSON.stringify({ error: 'User not found' }), {
            status: 404,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }
        
        // パスワード検証（bcryptを使用）
        const user = users[0];
        // ... パスワード検証ロジック
        
        return new Response(JSON.stringify({ user }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }
      
      // その他のAPIエンドポイント...
      
      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
```

#### 4-6. デプロイ

```bash
# シークレット設定
wrangler secret put DB_USERNAME
wrangler secret put DB_PASSWORD
wrangler secret put JWT_SECRET
wrangler secret put STRIPE_SECRET_KEY

# デプロイ
wrangler deploy
```

### ステップ5: Cloudflare Pages設定

1. GitHubにコードをプッシュ
2. Cloudflare Pagesで「Create a project」
3. GitHubリポジトリを接続
4. ビルド設定:
   - Build command: （空欄）
   - Build output directory: `/`
5. 環境変数:
   ```
   API_URL=https://aws-quiz-api.your-subdomain.workers.dev
   ```

---

## 💡 PlanetScaleの利点

### 1. MySQL完全互換
- 既存のコードがそのまま動く
- マイグレーション不要
- mysql2ライブラリ使用可能

### 2. 高性能
- Vitess技術（YouTubeで使用）
- 自動シャーディング
- 水平スケーリング

### 3. 開発者フレンドリー
- ブランチ機能（有料プラン）
- スキーマ変更の安全性
- ロールバック可能

### 4. 運用不要
- 自動バックアップ
- 自動スケーリング
- メンテナンスフリー

---

## 📊 データベース比較

| サービス | DB種類 | 無料容量 | 既存コード | 推奨度 |
|----------|--------|----------|------------|--------|
| **PlanetScale** | MySQL | 5GB | ✅ そのまま | ⭐⭐⭐⭐⭐ |
| Supabase | PostgreSQL | 500MB | ❌ 要変更 | ⭐⭐⭐⭐ |
| Railway | MySQL | 1GB | ✅ そのまま | ⭐⭐⭐ |
| VPS | MySQL | 30GB | ✅ そのまま | ⭐⭐⭐ |

---

## 🔄 既存コードの移行

### 必要な変更: ほぼゼロ！

#### 変更前（VPS）
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'quizuser',
  password: 'password',
  database: 'aws_quiz'
});
```

#### 変更後（PlanetScale）
```javascript
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'aws-ap-northeast-1.connect.psdb.cloud',
  user: 'xxxxxxxxxx',
  password: 'pscale_pw_xxxxxxxxxx',
  database: 'aws-quiz-db',
  ssl: { rejectUnauthorized: true }  // ← これだけ追加
});
```

**変更点**: SSL設定を追加するだけ！

---

## ⚠️ 注意点

### PlanetScale無料プランの制限

1. **ブランチ機能なし**
   - 開発環境と本番環境を分けられない
   - 直接本番DBを編集

2. **サポートなし**
   - コミュニティサポートのみ
   - 有料プランは$29/月〜

3. **商用利用**
   - 規約上は可能
   - 大規模なら有料プラン推奨

### 有料プランへの移行タイミング
- ユーザー数が10万人を超えたら
- ブランチ機能が必要になったら
- サポートが必要になったら

**Scaler プラン**: $29/月
- 容量: 10GB
- ブランチ: 5個
- サポート付き

---

## 🎯 最終推奨プラン

### 構成: PlanetScale + Cloudflare

| サービス | 料金 | 用途 |
|----------|------|------|
| PlanetScale | 無料 | MySQL（5GB） |
| Cloudflare Pages | 無料 | 静的ホスティング |
| Cloudflare Workers | 無料 | API（100,000リクエスト/日） |
| お名前.com | 1,000円/年 | ドメイン |
| ImprovMX | 無料 | メール |

**月額**: 83円（ドメイン代のみ）
**年額**: 996円

### メリット
- ✅ MySQL既存コードそのまま
- ✅ サーバー管理不要
- ✅ 自動バックアップ
- ✅ 高速・高可用性
- ✅ 無料で5GB

### デメリット
- ❌ ブランチ機能なし
- ❌ サポートなし
- ❌ 大規模には不向き

---

## 🚀 まとめ

### MySQLを使いたいなら

**1位: PlanetScale（無料）**
- 既存コードほぼそのまま
- 5GB無料
- 高性能

**2位: VPS（580円/月）**
- 完全な自由度
- 30GB
- サーバー管理必要

**3位: Railway（$5クレジット/月）**
- 簡単デプロイ
- 1GB
- クレカ必須

### PostgreSQLでもOKなら

**Supabase（無料）**
- 500MB
- 認証・ストレージ込み
- コード書き換え必要

---

## ✅ 次のステップ

1. **PlanetScaleアカウント作成**（5分）
2. **データベース作成**（2分）
3. **テーブル作成**（5分）
4. **Cloudflare Workers設定**（30分）
5. **Cloudflare Pagesデプロイ**（10分）
6. **ドメイン設定**（1日）

**推奨**: MySQLを使い続けたいなら、PlanetScale + Cloudflareが最適です！