# AWS Quiz App - Backend Server


Node.js + Express + PostgreSQL による認証機能付きバックエンドサーバー

**✨ Features:**
- 🔒 HTTPS/TLS support
- 🗄️ PostgreSQL database
- 🔐 JWT authentication with refresh tokens
- 🔑 Password reset functionality
- 📧 Email notifications
- 🔄 Session management
- ️ Security best practices

## 🚀 セットアップ

### 前提条件

- Node.js (v14以上)
- PostgreSQL (v12以上)

### 1. PostgreSQLのインストールと設定

#### Windows
```bash
# PostgreSQLをダウンロードしてインストール
# https://www.postgresql.org/download/windows/

# インストール後、pgAdminまたはpsqlでデータベースを作成
psql -U postgres
CREATE DATABASE aws_quiz_db;
\q
```

#### macOS (Homebrew)
```bash
brew install postgresql
brew services start postgresql
createdb aws_quiz_db
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo -u postgres createdb aws_quiz_db
```

### 2. 依存関係のインストール

```bash
cd server
npm install
```

### 3. 環境変数の設定

`.env.example` をコピーして `.env` ファイルを作成:

```bash
cp .env.example .env
```

`.env` ファイルを編集:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:8000

# PostgreSQL設定
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aws_quiz_db
DB_USER=postgres
DB_PASSWORD=your_password_here

# メール設定（パスワードリセット用）
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@awsquiz.com
FRONTEND_URL=http://localhost:8000
```

**重要:**
- `JWT_SECRET` を強力なランダム文字列に変更
- `DB_PASSWORD` にPostgreSQLのパスワードを設定
- メール機能を使用する場合は、`EMAIL_USER` と `EMAIL_PASSWORD` を設定
  - Gmailの場合は[アプリパスワード](https://support.google.com/accounts/answer/185833)を使用

### 4. データベースの初期化

```bash
npm run db:init
```

このコマンドで以下が実行されます:
- `users` テーブルの作成
- インデックスの作成
- トリガーの設定

### 5. サーバーの起動

開発モード（自動再起動）:
```bash
npm run dev
```

本番モード:
```bash
npm start
```

サーバーは `http://localhost:3000` で起動します。

## 📡 API エンドポイント

### 認証関連

#### 新規登録
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

**レスポンス:**
```json
{
  "message": "登録が完了しました",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### ログイン
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "testuser",
  "password": "password123"
}
```

**レスポンス:**
```json
{
  "message": "ログインしました",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "a1b2c3d4e5f6..."
}
```

#### リフレッシュトークンで新しいアクセストークンを取得
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4e5f6..."
}
```

**レスポンス:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### 現在のユーザー情報取得
```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### トークン検証
```http
POST /api/auth/verify
Authorization: Bearer <token>
```

#### ログアウト
```http
POST /api/auth/logout
Authorization: Bearer <token>
Content-Type: application/json

{
  "refreshToken": "a1b2c3d4e5f6..."
}
```

#### 全デバイスからログアウト
```http
POST /api/auth/logout-all
Authorization: Bearer <token>
```

#### アクティブなセッション一覧を取得
```http
GET /api/auth/sessions
Authorization: Bearer <token>
```

**レスポンス:**
```json
{
  "sessions": [
    {
      "id": 1,
      "device_info": "Mozilla/5.0...",
      "ip_address": "192.168.1.1",
      "created_at": "2024-01-01T00:00:00.000Z",
      "expires_at": "2024-01-08T00:00:00.000Z"
    }
  ]
}
```

#### 特定のセッションを削除
```http
DELETE /api/auth/sessions/:sessionId
Authorization: Bearer <token>
```

#### パスワードリセットリクエスト
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "test@example.com"
}
```

**レスポンス:**
```json
{
  "message": "パスワードリセットメールを送信しました"
}
```

#### パスワードリセットトークンを検証
```http
GET /api/auth/reset-password/:token
```

**レスポンス:**
```json
{
  "valid": true,
  "email": "test@example.com"
}
```

#### パスワードをリセット
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset-token-here",
  "password": "newpassword123"
}
```

**レスポンス:**
```json
{
  "message": "パスワードが正常にリセットされました"
}
```

#### ユーザー統計
```http
GET /api/auth/stats
```

### ヘルスチェック
```http
GET /health
```

## 🗄️ データベーススキーマ

### users テーブル

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | SERIAL | PRIMARY KEY | ユーザーID |
| username | VARCHAR(50) | UNIQUE, NOT NULL | ユーザー名 |
| email | VARCHAR(255) | UNIQUE, NOT NULL | メールアドレス |
| password | VARCHAR(255) | NOT NULL | ハッシュ化されたパスワード |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 作成日時 |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 更新日時 |

**インデックス:**
- `idx_users_username` on `username`
- `idx_users_email` on `email`

**トリガー:**
- `update_users_updated_at`: 更新時に `updated_at` を自動更新

### password_reset_tokens テーブル

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | SERIAL | PRIMARY KEY | トークンID |
| user_id | INTEGER | FOREIGN KEY (users.id) | ユーザーID |
| token | VARCHAR(255) | UNIQUE, NOT NULL | リセットトークン |
| expires_at | TIMESTAMP | NOT NULL | 有効期限 |
| used | BOOLEAN | DEFAULT FALSE | 使用済みフラグ |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 作成日時 |

**インデックス:**
- `idx_password_reset_tokens_token` on `token`
- `idx_password_reset_tokens_user_id` on `user_id`

### refresh_tokens テーブル

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| id | SERIAL | PRIMARY KEY | トークンID |
| user_id | INTEGER | FOREIGN KEY (users.id) | ユーザーID |
| token | VARCHAR(255) | UNIQUE, NOT NULL | リフレッシュトークン |
| device_info | TEXT | | デバイス情報 |
| ip_address | VARCHAR(45) | | IPアドレス |
| expires_at | TIMESTAMP | NOT NULL | 有効期限 |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | 作成日時 |

**インデックス:**
- `idx_refresh_tokens_token` on `token`
- `idx_refresh_tokens_user_id` on `user_id`

### session テーブル

| カラム名 | 型 | 制約 | 説明 |
|---------|-----|------|------|
| sid | VARCHAR | PRIMARY KEY | セッションID |
| sess | JSON | NOT NULL | セッションデータ |
| expire | TIMESTAMP | NOT NULL | 有効期限 |

**インデックス:**
- `idx_session_expire` on `expire`

## 🔐 セキュリティ機能

- **パスワードハッシュ化**: bcryptjs (salt rounds: 10)
- **JWT 認証**: アクセストークン（15分）+ リフレッシュトークン（7日）
- **セッション管理**: PostgreSQLベースのセッションストア
- **パスワードリセット**: トークンベースの安全なリセット機能
- **CORS 保護**: 指定されたオリジンのみ許可
- **レート制限**: DDoS 攻撃対策
- **Helmet**: セキュリティヘッダーの設定
- **入力バリデーション**: express-validator による検証
- **SQLインジェクション対策**: パラメータ化クエリ
- **接続プール**: 効率的なデータベース接続管理
- **HTTPS/TLS**: 暗号化通信のサポート

## 📁 プロジェクト構造

```
server/
├── database/
│   ├── db.js                # PostgreSQL接続プール
│   ├── init.js              # データベース初期化スクリプト
│   ├── users.js             # ユーザーモデル
│   ├── passwordReset.js     # パスワードリセットモデル
│   └── refreshTokens.js     # リフレッシュトークンモデル
├── middleware/
│   ├── auth.js              # JWT 認証ミドルウェア
│   └── errorHandler.js      # エラーハンドラー
├── routes/
│   └── auth.js              # 認証ルート
├── services/
│   └── emailService.js      # メール送信サービス
├── scripts/
│   └── generate-cert.js     # SSL証明書生成スクリプト
├── ssl/                     # SSL証明書（gitignore）
├── .env.example             # 環境変数のサンプル
├── .gitignore               # Git除外ファイル
├── package.json             # 依存関係
├── server.js                # メインサーバーファイル
└── README.md                # このファイル
```

## 🧪 テスト

### データベース接続テスト

```bash
node -e "require('dotenv').config(); require('./database/db').query('SELECT NOW()').then(r => console.log('✅ Connected:', r.rows[0]))"
```

### cURL でのテスト

**新規登録:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
```

**ログイン:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'
```

**ユーザー情報取得:**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🛠️ データベース管理

### テーブルを再作成

```bash
npm run db:init -- --drop
```

### PostgreSQL CLIでの操作

```bash
# データベースに接続
psql -U postgres -d aws_quiz_db

# ユーザー一覧を表示
SELECT id, username, email, created_at FROM users;

# ユーザー数を確認
SELECT COUNT(*) FROM users;

# 特定のユーザーを削除
DELETE FROM users WHERE username = 'testuser';
```

## 📚 使用技術

- **Express**: Web フレームワーク
- **PostgreSQL**: リレーショナルデータベース
- **pg**: PostgreSQL クライアント
- **bcryptjs**: パスワードハッシュ化
- **jsonwebtoken**: JWT 認証
- **express-session**: セッション管理
- **connect-pg-simple**: PostgreSQLセッションストア
- **nodemailer**: メール送信
- **express-validator**: 入力バリデーション
- **helmet**: セキュリティヘッダー
- **cors**: CORS 設定
- **express-rate-limit**: レート制限
- **dotenv**: 環境変数管理
- **crypto**: トークン生成（Node.js組み込み）

## 🚨 トラブルシューティング

### PostgreSQL接続エラー

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**解決方法:**
1. PostgreSQLが起動しているか確認
2. `.env` の接続情報が正しいか確認
3. ファイアウォール設定を確認

### データベースが見つからない

```
Error: database "aws_quiz_db" does not exist
```

**解決方法:**
```bash
createdb aws_quiz_db
# または
psql -U postgres -c "CREATE DATABASE aws_quiz_db;"
```

### 認証エラー

```
Error: password authentication failed
```

**解決方法:**
`.env` の `DB_PASSWORD` を正しいパスワードに設定

## 🔗 関連リンク

- [Express Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [node-postgres](https://node-postgres.com/)
- [JWT.io](https://jwt.io/)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js)

## 📝 ライセンス

MIT