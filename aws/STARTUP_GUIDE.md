# AWS Quiz App 起動ガイド

## 📋 目次

1. [システム要件](#システム要件)
2. [初回セットアップ](#初回セットアップ)
3. [起動方法](#起動方法)
4. [動作確認](#動作確認)
5. [トラブルシューティング](#トラブルシューティング)

---

## 🖥️ システム要件

### 必須ソフトウェア

- **Node.js**: v14.0.0 以上（推奨: v18.x 以上）
- **PostgreSQL**: v12.0 以上（推奨: v14.x 以上）
- **npm**: v6.0.0 以上（Node.jsに付属）

### 推奨環境

- **OS**: Windows 10/11, macOS 10.15+, Ubuntu 20.04+
- **メモリ**: 4GB以上
- **ディスク空き容量**: 500MB以上

---

## 🚀 初回セットアップ

### 1. Node.jsのインストール確認

```bash
node --version
npm --version
```

インストールされていない場合は [Node.js公式サイト](https://nodejs.org/) からダウンロード

### 2. PostgreSQLのインストールと設定

#### Windowsの場合

1. [PostgreSQL公式サイト](https://www.postgresql.org/download/windows/) からインストーラーをダウンロード
2. インストール時にパスワードを設定（例: `postgres`）
3. ポート番号はデフォルト（5432）を使用

#### macOSの場合

```bash
# Homebrewを使用
brew install postgresql@14
brew services start postgresql@14
```

#### Linuxの場合

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# サービス開始
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 3. データベースの作成

PostgreSQLに接続してデータベースを作成：

```bash
# PostgreSQLに接続（Windowsの場合はSQL Shellを使用）
psql -U postgres

# データベース作成
CREATE DATABASE aws_quiz_db;

# ユーザー作成（オプション）
CREATE USER quiz_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE aws_quiz_db TO quiz_user;

# 接続確認
\c aws_quiz_db
\q
```

### 4. プロジェクトのセットアップ

```bash
# プロジェクトディレクトリに移動
cd aws-quiz-app/server

# 依存パッケージのインストール
npm install
```

### 5. 環境変数の設定

`.env`ファイルを作成：

```bash
# Windowsの場合
copy .env.example .env

# macOS/Linuxの場合
cp .env.example .env
```

`.env`ファイルを編集：

```env
# データベース接続情報
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aws_quiz_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# JWT認証
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# サーバー設定
PORT=3000
NODE_ENV=development

# Stripe設定（決済機能を使用する場合）
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 6. データベースマイグレーション

```bash
# マイグレーションの実行
node database/run-migration.js
```

成功すると以下のメッセージが表示されます：
```
✅ Migration completed successfully
```

---

## ▶️ 起動方法

### 方法1: 通常起動（開発モード）

```bash
# serverディレクトリで実行
cd aws-quiz-app/server
npm start
```

サーバーが起動すると：
```
🚀 Server is running on http://localhost:3000
✅ Database connected successfully
```

### 方法2: 開発モード（自動再起動）

```bash
# nodemonを使用（ファイル変更時に自動再起動）
npm run dev
```

### 方法3: バックグラウンド起動（Windows）

```batch
# start-server.batを作成
@echo off
cd server
start /B npm start > server.log 2>&1
echo Server started in background. Check server.log for output.
```

実行：
```batch
start-server.bat
```

### 方法4: バックグラウンド起動（macOS/Linux）

```bash
# start-server.shを作成
#!/bin/bash
cd server
nohup npm start > server.log 2>&1 &
echo "Server started in background. PID: $!"
echo $! > server.pid
```

実行：
```bash
chmod +x start-server.sh
./start-server.sh
```

停止：
```bash
kill $(cat server/server.pid)
```

---

## ✅ 動作確認

### 1. サーバーの起動確認

ブラウザで以下のURLにアクセス：

```
http://localhost:3000
```

または、curlコマンドで確認：

```bash
curl http://localhost:3000
```

### 2. APIエンドポイントの確認

```bash
# ヘルスチェック
curl http://localhost:3000/api/health

# レスポンス例
{"status":"ok","timestamp":"2026-01-23T18:00:00.000Z"}
```

### 3. フロントエンドの起動

#### 方法A: Live Server（VSCode拡張機能）

1. VSCodeで`index.html`を開く
2. 右クリック → "Open with Live Server"
3. ブラウザが自動的に開く

#### 方法B: Pythonの簡易サーバー

```bash
# aws-quiz-appディレクトリで実行
cd aws-quiz-app

# Python 3の場合
python -m http.server 8080

# Python 2の場合
python -m SimpleHTTPServer 8080
```

ブラウザで `http://localhost:8080` にアクセス

#### 方法C: Node.jsの簡易サーバー

```bash
# http-serverをグローバルインストール
npm install -g http-server

# aws-quiz-appディレクトリで実行
cd aws-quiz-app
http-server -p 8080
```

### 4. 機能テスト

1. **新規登録**
   - `http://localhost:8080/signup.html` にアクセス
   - メールアドレスとパスワードを入力
   - 登録ボタンをクリック

2. **ログイン**
   - `http://localhost:8080/login.html` にアクセス
   - 登録したメールアドレスとパスワードでログイン

3. **クイズページ**
   - CLF: `http://localhost:8080/clf.html`
   - AIF: `http://localhost:8080/aif.html`
   - SAA: `http://localhost:8080/saa.html`

---

## 🔧 トラブルシューティング

### 問題1: ポートが既に使用されている

**エラー**: `Error: listen EADDRINUSE: address already in use :::3000`

**解決方法**:

```bash
# Windowsの場合
netstat -ano | findstr :3000
taskkill /PID <PID番号> /F

# macOS/Linuxの場合
lsof -ti:3000 | xargs kill -9
```

または、`.env`ファイルでポート番号を変更：
```env
PORT=3001
```

### 問題2: データベース接続エラー

**エラー**: `Error: connect ECONNREFUSED 127.0.0.1:5432`

**解決方法**:

1. PostgreSQLが起動しているか確認：
   ```bash
   # Windowsの場合
   sc query postgresql-x64-14
   
   # macOS/Linuxの場合
   sudo systemctl status postgresql
   ```

2. 接続情報を確認：
   ```bash
   psql -U postgres -h localhost -p 5432
   ```

3. `.env`ファイルの設定を確認

### 問題3: npm installでエラー

**エラー**: `npm ERR! code ENOENT`

**解決方法**:

```bash
# npmキャッシュをクリア
npm cache clean --force

# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### 問題4: マイグレーションエラー

**エラー**: `relation "users" already exists`

**解決方法**:

データベースをリセット：

```sql
-- PostgreSQLに接続
psql -U postgres -d aws_quiz_db

-- テーブルを削除
DROP TABLE IF EXISTS users CASCADE;

-- マイグレーションを再実行
\q
node database/run-migration.js
```

### 問題5: CORS エラー

**エラー**: `Access to fetch at 'http://localhost:3000/api/...' from origin 'http://localhost:8080' has been blocked by CORS policy`

**解決方法**:

`server/server.js`でCORS設定を確認：

```javascript
app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080'],
  credentials: true
}));
```

### 問題6: JWT認証エラー

**エラー**: `Invalid token` または `Token expired`

**解決方法**:

1. ブラウザのローカルストレージをクリア：
   ```javascript
   // ブラウザのコンソールで実行
   localStorage.clear();
   ```

2. 再度ログイン

### 問題7: Stripe Webhookエラー

**エラー**: `Webhook signature verification failed`

**解決方法**:

1. Stripe CLIをインストール：
   ```bash
   # Windowsの場合
   scoop install stripe
   
   # macOSの場合
   brew install stripe/stripe-cli/stripe
   ```

2. Webhookをローカルでテスト：
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

3. 表示されたWebhook Secretを`.env`に設定

---

## 📊 起動確認チェックリスト

- [ ] Node.jsがインストールされている（`node --version`）
- [ ] PostgreSQLがインストールされている（`psql --version`）
- [ ] データベース`aws_quiz_db`が作成されている
- [ ] `.env`ファイルが正しく設定されている
- [ ] `npm install`が成功している
- [ ] マイグレーションが完了している
- [ ] サーバーが起動している（`http://localhost:3000`）
- [ ] フロントエンドが表示される（`http://localhost:8080`）
- [ ] 新規登録ができる
- [ ] ログインができる
- [ ] クイズページが表示される

---

## 🎯 次のステップ

起動が成功したら、以下のドキュメントを参照してください：

- **[MEMBERSHIP_SYSTEM.md](./MEMBERSHIP_SYSTEM.md)** - 会員システムの詳細
- **[ACCESS_CONTROL_GUIDE.md](./ACCESS_CONTROL_GUIDE.md)** - アクセス制限の実装
- **[STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md)** - Stripe決済の設定
- **[HOSTING_GUIDE.md](./HOSTING_GUIDE.md)** - 本番環境へのデプロイ

---

## 📞 サポート

問題が解決しない場合は、以下の情報を含めて報告してください：

1. エラーメッセージの全文
2. 実行したコマンド
3. 環境情報（OS、Node.jsバージョン、PostgreSQLバージョン）
4. `server.log`の内容（存在する場合）

---

**作成日**: 2026-01-23  
**対象**: aws-quiz-app  
**バージョン**: 1.0.0