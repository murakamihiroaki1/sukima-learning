# AWS Quiz App - セットアップガイド

## 🚀 クイックスタート（5分で起動）

### 前提条件
- Node.js がインストールされていること
- PostgreSQL がインストールされていること

### ステップ1: PostgreSQLデータベースを作成

```bash
# PostgreSQLに接続
psql -U postgres

# データベースを作成
CREATE DATABASE aws_quiz_db;

# 終了
\q
```

### ステップ2: サーバーの依存関係をインストール

```bash
cd server
npm install
```

### ステップ3: 環境変数を設定

`.env.example` をコピーして `.env` を作成：

```bash
# Windowsの場合
copy .env.example .env

# Mac/Linuxの場合
cp .env.example .env
```

`.env` ファイルを編集（最低限必要な設定）：

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=http://localhost:8000

# PostgreSQL設定（あなたの環境に合わせて変更）
DB_HOST=localhost
DB_PORT=5432
DB_NAME=aws_quiz_db
DB_USER=postgres
DB_PASSWORD=あなたのPostgreSQLパスワード
```

### ステップ4: データベースを初期化

```bash
npm run db:init
```

### ステップ5: サーバーを起動

```bash
npm run dev
```

サーバーが `http://localhost:3000` で起動します！

### ステップ6: フロントエンドを起動

別のターミナルで：

```bash
# aws-quiz-appディレクトリに戻る
cd ..

# Pythonの簡易サーバーを起動
python -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセス！

## ✅ 動作確認

1. ブラウザで `http://localhost:8000` を開く
2. 「新規登録」をクリック
3. ユーザー名、メール、パスワードを入力して登録
4. 自動的にログインされます
5. クイズを楽しんでください！

## 🔧 トラブルシューティング

### PostgreSQL接続エラー

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**解決方法:**
1. PostgreSQLが起動しているか確認
   ```bash
   # Windowsの場合
   services.msc で PostgreSQL サービスを確認
   
   # Mac/Linuxの場合
   sudo systemctl status postgresql
   ```

2. `.env` のDB_PASSWORDが正しいか確認

### データベースが見つからない

```
Error: database "aws_quiz_db" does not exist
```

**解決方法:**
```bash
psql -U postgres -c "CREATE DATABASE aws_quiz_db;"
```

### ポート3000が使用中

```
Error: listen EADDRINUSE: address already in use :::3000
```

**解決方法:**
`.env` の PORT を別の番号（例: 3001）に変更

## 📝 デフォルト設定

- **バックエンドURL**: http://localhost:3000
- **フロントエンドURL**: http://localhost:8000
- **データベース**: aws_quiz_db
- **JWTトークン有効期限**: 7日間

## 🎓 使い方

1. **新規登録**: ユーザー名、メール、パスワードを入力
2. **ログイン**: 登録したユーザー名とパスワードでログイン
3. **クイズ**: SAA（20問）またはCLF（20問）を選択
4. **学習**: 問題を解いて、詳細な解説を確認

## 🔐 セキュリティ

- パスワードは bcrypt でハッシュ化されて保存
- JWT トークンによる認証
- CORS 保護
- セッション管理

## 📚 詳細情報

詳しい情報は `server/README.md` を参照してください。