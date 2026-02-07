# GitHubへのPush手順

リポジトリURL: https://github.com/murakamihiroaki1/sukima-learning

## 方法1: GitHub Desktop を使用（推奨）

### 1. GitHub Desktop のインストール
https://desktop.github.com/ からダウンロードしてインストール

### 2. リポジトリを開く
1. GitHub Desktop を起動
2. `File` → `Add Local Repository`
3. `c:/Users/HIROAKIMURAKAMI/Box/IBM/IBM_Bob/sukima-learning` を選択
4. 「This directory does not appear to be a Git repository」と表示されたら、`create a repository` をクリック

### 3. 初期コミット
1. 左下の `Summary` に「Initial commit」と入力
2. `Commit to main` ボタンをクリック

### 4. GitHubに公開
1. 上部の `Publish repository` をクリック
2. Repository name: `sukima-learning`
3. Organization: `murakamihiroaki1`
4. `Publish repository` をクリック

## 方法2: Git コマンドライン（Gitインストール後）

### 1. Git のインストール
https://git-scm.com/downloads からダウンロードしてインストール

### 2. コマンドプロンプトで実行

```bash
# sukima-learningディレクトリに移動
cd c:\Users\HIROAKIMURAKAMI\Box\IBM\IBM_Bob\sukima-learning

# Gitリポジトリを初期化
git init

# すべてのファイルをステージング
git add .

# 初期コミット
git commit -m "Initial commit: AWS certification quiz application"

# リモートリポジトリを追加
git remote add origin https://github.com/murakamihiroaki1/sukima-learning.git

# ブランチ名をmainに変更
git branch -M main

# GitHubにpush
git push -u origin main
```

### 認証が必要な場合
GitHubのユーザー名とパスワード（またはPersonal Access Token）を入力してください。

Personal Access Tokenの作成方法:
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. `Generate new token` → `Generate new token (classic)`
3. Note: `sukima-learning`
4. Expiration: `No expiration`（または適切な期限）
5. Select scopes: `repo` にチェック
6. `Generate token` をクリック
7. 表示されたトークンをコピー（パスワードの代わりに使用）

## 方法3: 手動アップロード（最も簡単）

### 1. GitHubでリポジトリを確認
https://github.com/murakamihiroaki1/sukima-learning にアクセス

### 2. ファイルをアップロード
1. `Add file` → `Upload files` をクリック
2. `sukima-learning` フォルダ内のすべてのファイルとフォルダをドラッグ&ドロップ
3. **重要**: `.env` ファイルは絶対にアップロードしないでください
4. Commit message: `Initial commit: AWS certification quiz application`
5. `Commit changes` をクリック

### 注意事項
- `.env` ファイルは含めない
- `node_modules` フォルダは含めない（.gitignoreで除外済み）
- バックアップファイル（*.backup）は含めない

## Push後の確認

### 1. GitHubでファイルを確認
https://github.com/murakamihiroaki1/sukima-learning

以下のファイルが含まれていることを確認:
- ✅ `.gitignore`
- ✅ `.env.example`（実際の値なし）
- ✅ `README.md`
- ✅ `index.html`
- ✅ `contact.html`
- ✅ `aws/` フォルダ
- ✅ `aws/server/` フォルダ

以下のファイルが含まれていないことを確認:
- ❌ `.env`（機密情報）
- ❌ `node_modules/`
- ❌ `*.backup`
- ❌ `*.log`

### 2. 機密情報の漏洩チェック

GitHubのリポジトリページで検索:
1. `sb_secret_` で検索 → 結果なしであることを確認
2. `sk_test_` で検索 → 結果なしであることを確認
3. `tyaofdaqnusmtwqn` で検索 → 結果なしであることを確認

## トラブルシューティング

### 「repository not found」エラー
リポジトリが存在しない場合は、GitHubで先に作成してください:
1. https://github.com/new にアクセス
2. Repository name: `sukima-learning`
3. Public または Private を選択
4. `Create repository` をクリック

### 認証エラー
Personal Access Tokenを使用してください（上記参照）

### ファイルサイズエラー
100MB以上のファイルがある場合は、`.gitignore`に追加してください

## 次のステップ

Push完了後:
1. ✅ GitHubでファイルを確認
2. ✅ 機密情報の漏洩チェック
3. ✅ README.mdを更新（必要に応じて）
4. ✅ デプロイ先（Vercel、Netlifyなど）で環境変数を設定

## 参考リンク

- GitHub Desktop: https://desktop.github.com/
- Git: https://git-scm.com/downloads
- Personal Access Token: https://github.com/settings/tokens
- リポジトリ: https://github.com/murakamihiroaki1/sukima-learning