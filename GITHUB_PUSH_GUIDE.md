# GitHub Push ガイド

このドキュメントでは、sukima-learningプロジェクトをGitHubにpushする手順を説明します。

## 事前確認

### 機密情報の保護

以下のファイルは`.gitignore`で除外されており、GitHubにpushされません：

✅ **除外されるファイル（機密情報を含む）:**
- `.env` - 環境変数（データベース接続情報、APIキーなど）
- `aws/server/.env` - サーバー側の環境変数
- `node_modules/` - npmパッケージ
- `*.backup` - バックアップファイル
- `*.log` - ログファイル

✅ **GitHubにpushされるファイル:**
- `.env.example` - 環境変数のテンプレート（実際の値は含まない）
- ソースコード（HTML, CSS, JavaScript）
- ドキュメント（README.md, ガイドなど）
- 設定ファイル（package.json, .gitignoreなど）

## Push前の確認事項

### 1. .envファイルの確認

機密情報が含まれていないことを確認：

```bash
# .envファイルがgitignoreに含まれているか確認
git check-ignore .env
git check-ignore aws/server/.env
```

両方とも「.env」と表示されればOKです。

### 2. .env.exampleの確認

`.env.example`に実際の値が含まれていないことを確認：

```bash
# aws/server/.env.exampleの内容を確認
cat aws/server/.env.example
```

以下のような形式になっているはずです：
```
SUPABASE_URL=your_supabase_url_here
SUPABASE_PUBLISHABLE_KEY=your_publishable_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password_here
```

## GitHubへのPush手順

### 1. Gitリポジトリの初期化（初回のみ）

```bash
cd sukima-learning
git init
```

### 2. .gitignoreの確認

```bash
# .gitignoreが存在することを確認
ls -la .gitignore
```

### 3. ファイルのステージング

```bash
# すべてのファイルを追加（.gitignoreで除外されたファイルは自動的に除外される）
git add .

# ステージングされたファイルを確認
git status
```

### 4. コミット

```bash
git commit -m "Initial commit: AWS certification quiz application"
```

### 5. GitHubリポジトリの作成

1. GitHubにログイン
2. 右上の「+」→「New repository」をクリック
3. リポジトリ名を入力（例：`sukima-learning`）
4. 「Public」または「Private」を選択
5. 「Create repository」をクリック

### 6. リモートリポジトリの追加

```bash
# GitHubのリポジトリURLを設定（自分のユーザー名に置き換える）
git remote add origin https://github.com/YOUR_USERNAME/sukima-learning.git

# ブランチ名をmainに変更（必要に応じて）
git branch -M main
```

### 7. Push

```bash
# GitHubにpush
git push -u origin main
```

## Push後の確認

### 1. GitHubでファイルを確認

- `.env`ファイルが含まれていないことを確認
- `.env.example`が含まれていることを確認
- `node_modules/`が含まれていないことを確認

### 2. 機密情報の漏洩チェック

以下のコマンドでリポジトリ内に機密情報がないか確認：

```bash
# Supabaseのシークレットキーが含まれていないか確認
git grep -i "sb_secret_" 

# Stripeのシークレットキーが含まれていないか確認
git grep -i "sk_test_"

# メールパスワードが含まれていないか確認
git grep -i "tyaofdaqnusmtwqn"
```

何も表示されなければOKです。

## 環境変数の設定（デプロイ時）

GitHubにpushした後、デプロイ先（Vercel、Netlify、Herokuなど）で環境変数を設定する必要があります。

### 必要な環境変数

`.env.example`を参考に、以下の環境変数を設定してください：

**Supabase:**
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`

**JWT:**
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

**Email:**
- `EMAIL_SERVICE`
- `EMAIL_USER`
- `EMAIL_PASSWORD`
- `EMAIL_FROM`
- `EMAIL_REPLY_TO`

**Stripe:**
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`

**その他:**
- `NODE_ENV`
- `PORT`
- `FRONTEND_URL`
- `CORS_ORIGIN`

## トラブルシューティング

### .envファイルが誤ってpushされた場合

```bash
# Gitの履歴から.envファイルを削除
git rm --cached .env
git rm --cached aws/server/.env

# コミット
git commit -m "Remove .env files from repository"

# 強制push（注意：履歴を書き換えます）
git push -f origin main
```

その後、GitHubのリポジトリ設定で「Secrets」を確認し、機密情報が漏洩していないか確認してください。

### 大きなファイルのエラー

```bash
# 100MB以上のファイルがある場合
git lfs install
git lfs track "*.large_file_extension"
git add .gitattributes
git commit -m "Add Git LFS tracking"
```

## セキュリティのベストプラクティス

1. ✅ `.env`ファイルは絶対にpushしない
2. ✅ `.env.example`には実際の値を含めない
3. ✅ APIキー、パスワード、トークンはすべて環境変数で管理
4. ✅ 定期的に`git grep`で機密情報の漏洩をチェック
5. ✅ プライベートリポジトリの使用を検討
6. ✅ GitHub Secretsを使用してCI/CDパイプラインで環境変数を管理

## 参考リンク

- [GitHub Docs - リポジトリの作成](https://docs.github.com/ja/get-started/quickstart/create-a-repo)
- [GitHub Docs - .gitignore](https://docs.github.com/ja/get-started/getting-started-with-git/ignoring-files)
- [GitHub Docs - Secrets](https://docs.github.com/ja/actions/security-guides/encrypted-secrets)