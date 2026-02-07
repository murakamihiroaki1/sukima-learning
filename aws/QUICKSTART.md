# AWS Quiz App クイックスタートガイド（MySQL版）

## 🚀 5分で起動する方法

### 前提条件
- Node.js v14以上がインストール済み
- MySQL 8.0以上がインストール済み

---

## ステップ1: MySQLデータベースの準備

### 1-1. MySQLに接続
```bash
# Windowsの場合（コマンドプロンプト）
mysql -u root -p

# macOS/Linuxの場合
mysql -u root -p
```

### 1-2. データベースを作成
```sql
CREATE DATABASE aws_quiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

---

## ステップ2: サーバーのセットアップ

### 2-1. serverディレクトリに移動
```bash
cd aws/server
```

### 2-2. 依存パッケージをインストール
```bash
npm install
```

### 2-3. 環境変数ファイルを作成
```bash
# Windowsの場合
copy .env.example .env

# macOS/Linuxの場合
cp .env.example .env
```

### 2-4. .envファイルを編集
`.env`ファイルを開いて、以下を設定：

```env
# データベース接続情報（MySQL）
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aws_quiz_db
DB_USER=root
DB_PASSWORD=your_mysql_password

# JWT認証
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# サーバー設定
PORT=3000
NODE_ENV=development

# Stripe設定（オプション - 決済機能を使う場合のみ）
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2-5. データベースを初期化
```bash
node database/init.js
```

成功すると以下のメッセージが表示されます：
```
✅ MySQL connected
✅ Database initialized successfully
```

---

## ステップ3: サーバーを起動

```bash
npm start
```

サーバーが起動すると：
```
🚀 Server is running on http://localhost:3000
✅ MySQL connected
```

---

## ステップ4: フロントエンドを開く

### 方法A: Live Server（VSCode拡張機能）- 推奨
1. VSCodeで`aws/index.html`を開く
2. 右クリック → "Open with Live Server"
3. ブラウザが自動的に開く

### 方法B: Pythonの簡易サーバー
```bash
# awsディレクトリで実行
cd aws
python -m http.server 8080
```

ブラウザで `http://localhost:8080` にアクセス

### 方法C: Node.jsの簡易サーバー
```bash
# http-serverをインストール（初回のみ）
npm install -g http-server

# awsディレクトリで実行
cd aws
http-server -p 8080
```

---

## ステップ5: 動作確認

### 5-1. トップページにアクセス
```
http://localhost:8080/index.html
```

### 5-2. 新規登録
1. 「新規登録」ボタンをクリック
2. ユーザー名、メールアドレス、パスワードを入力
3. 登録完了

### 5-3. ログイン
1. 登録したメールアドレスとパスワードでログイン
2. トップページに戻る

### 5-4. クイズを試す
- **CLF（Cloud Practitioner）**: `http://localhost:8080/clf.html`
- **SAA（Solutions Architect Associate）**: `http://localhost:8080/saa.html`
- **AIF（AI Practitioner）**: `http://localhost:8080/aif.html`
- **DVA（Developer Associate）**: `http://localhost:8080/dva.html`

---

## 🎯 主な機能

### Free会員（デフォルト）
- ✅ 基本問題へのアクセス
- ✅ 学習履歴の保存
- ✅ カテゴリ別学習

### Standard会員（¥980/月）
- ✅ Free会員の全機能
- ✅ **見直し機能（ブックマーク）**
- ✅ 詳細な解説の閲覧
- ✅ 模擬試験モード

### Advanced会員（¥1,980/月）
- ✅ Standard会員の全機能
- ✅ Professional認定問題
- ✅ 優先サポート

---

## 🔧 トラブルシューティング

### 問題1: ポートが既に使用されている
```bash
# Windowsの場合
netstat -ano | findstr :3000
taskkill /PID <PID番号> /F

# macOS/Linuxの場合
lsof -ti:3000 | xargs kill -9
```

### 問題2: MySQLに接続できない
1. MySQLが起動しているか確認：
   ```bash
   # Windowsの場合
   sc query MySQL80
   
   # macOS/Linuxの場合
   sudo systemctl status mysql
   ```

2. パスワードを確認：
   ```bash
   mysql -u root -p
   ```

3. `.env`ファイルの`DB_PASSWORD`を確認

### 問題3: データベース初期化エラー
```bash
# データベースを削除して再作成
mysql -u root -p
DROP DATABASE IF EXISTS aws_quiz_db;
CREATE DATABASE aws_quiz_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;

# 再度初期化
node database/init.js
```

### 問題4: ログインできない
1. ブラウザのローカルストレージをクリア：
   ```javascript
   // ブラウザのコンソールで実行
   localStorage.clear();
   ```

2. 再度ログイン

---

## 📝 よくある質問

### Q1: PostgreSQLからMySQLに変更した理由は？
A: より軽量で、セットアップが簡単なため。

### Q2: 既存のPostgreSQLデータを移行できますか？
A: はい。データエクスポート/インポートツールを使用して移行可能です。

### Q3: Stripe決済は必須ですか？
A: いいえ。決済機能を使わない場合は、`.env`のSTRIPE設定は不要です。

### Q4: 本番環境にデプロイするには？
A: `HOSTING_GUIDE.md`を参照してください。

---

## 📚 関連ドキュメント

- **[MYSQL_SETUP.md](./server/MYSQL_SETUP.md)** - MySQL詳細設定
- **[MEMBERSHIP_SYSTEM.md](./MEMBERSHIP_SYSTEM.md)** - 会員システムの詳細
- **[ACCESS_CONTROL_GUIDE.md](./ACCESS_CONTROL_GUIDE.md)** - アクセス制限の実装
- **[STRIPE_WEBHOOK_SETUP.md](./STRIPE_WEBHOOK_SETUP.md)** - Stripe決済の設定

---

## 🎉 起動成功！

すべてのステップが完了したら、以下を確認してください：

- [ ] サーバーが起動している（`http://localhost:3000`）
- [ ] フロントエンドが表示される（`http://localhost:8080`）
- [ ] 新規登録ができる
- [ ] ログインができる
- [ ] クイズページが表示される
- [ ] 見直し機能が使える（Standard会員のみ）

---

**作成日**: 2026-02-04  
**対象**: AWS Quiz App (MySQL版)  
**バージョン**: 2.0.0