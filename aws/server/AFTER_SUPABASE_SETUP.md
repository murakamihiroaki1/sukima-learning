# Supabase設定後の次のステップ

Supabaseのデータベース設定が完了したら、以下の手順でアプリケーションをテスト・デプロイします。

---

## ✅ ステップ1: ローカルでAPIテスト

### 1-1. サーバー起動

```bash
cd aws/server
npm run dev
```

起動メッセージを確認：
```
🚀 HTTP Server is running on port 3000
📝 Environment: development
🔗 HTTP URL: http://localhost:3000
```

### 1-2. APIテスト実行

別のコマンドプロンプトで：

```bash
cd aws\server
test_api.bat
```

または手動でテスト：

```bash
# ヘルスチェック
curl http://localhost:3000/health

# ユーザー登録
curl -X POST http://localhost:3000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"email\":\"test@example.com\",\"password\":\"password123\"}"

# ログイン
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"testuser\",\"password\":\"password123\"}"
```

### 1-3. 期待される結果

✅ **ヘルスチェック**:
```json
{"status":"OK","timestamp":"2026-02-04T14:00:00.000Z","protocol":"http","secure":false}
```

✅ **ユーザー登録成功**:
```json
{"message":"User registered successfully","userId":"uuid-here"}
```

✅ **ログイン成功**:
```json
{
  "accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## ✅ ステップ2: フロントエンドとの連携テスト

### 2-1. フロントエンドサーバー起動

別のコマンドプロンプトで：

```bash
cd aws
python -m http.server 8000
```

または：

```bash
cd aws
npx http-server -p 8000
```

### 2-2. ブラウザでアクセス

1. **トップページ**: http://localhost:8000/index.html
2. **ログインページ**: http://localhost:8000/login.html
3. **会員登録ページ**: http://localhost:8000/signup.html
4. **クイズページ**: http://localhost:8000/saa.html

### 2-3. 動作確認

- [ ] 会員登録ができる
- [ ] ログインができる
- [ ] ログイン後、トークンが保存される
- [ ] クイズページで問題が表示される
- [ ] 有料会員機能が正しく動作する

---

## ✅ ステップ3: Stripe連携設定（有料会員機能）

### 3-1. Stripeアカウント作成

1. https://stripe.com にアクセス
2. アカウント作成（無料）
3. ダッシュボードにログイン

### 3-2. APIキー取得

1. Stripe Dashboard → **Developers** → **API keys**
2. 以下をコピー：
   - **Publishable key** (pk_test_...)
   - **Secret key** (sk_test_...)

### 3-3. .envファイルに追加

`aws/server/.env`に追加：

```env
# Stripe設定
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3-4. Stripe商品作成

1. Stripe Dashboard → **Products** → **Add product**
2. 商品情報を入力：
   - Name: AWS Quiz Premium Membership
   - Price: ¥980/月 または ¥9,800/年
3. Price IDをコピー（price_xxx）

### 3-5. フロントエンドに設定

`aws/pricing.html`を編集：

```javascript
const STRIPE_PUBLISHABLE_KEY = 'pk_test_your_key_here';
const PRICE_ID_MONTHLY = 'price_monthly_id_here';
const PRICE_ID_YEARLY = 'price_yearly_id_here';
```

詳細は `STRIPE_PAYMENT_GUIDE.md` を参照

---

## ✅ ステップ4: 本番環境へのデプロイ

### オプション1: Cloudflare Pages + Workers（推奨）

**メリット**:
- 完全無料（月100万リクエストまで）
- 高速CDN
- 自動HTTPS
- カスタムドメイン対応

**手順**:
1. `SUPABASE_DEPLOYMENT_SUBDIRECTORY.md` を参照
2. Cloudflare Pagesでフロントエンドをデプロイ
3. Cloudflare WorkersでAPIをデプロイ
4. カスタムドメイン設定（sukima-learning.com/aws/）

### オプション2: Vercel（簡単）

**メリット**:
- 設定が簡単
- GitHubと連携
- 自動デプロイ

**手順**:
1. https://vercel.com でアカウント作成
2. GitHubリポジトリと連携
3. 環境変数を設定
4. デプロイ

### オプション3: Railway（Node.js対応）

**メリット**:
- Node.jsサーバーをそのままデプロイ
- PostgreSQL統合
- 月$5から

**手順**:
1. https://railway.app でアカウント作成
2. プロジェクト作成
3. GitHubリポジトリと連携
4. 環境変数を設定

---

## ✅ ステップ5: 本番環境の設定

### 5-1. 環境変数の設定

本番環境の`.env`ファイル：

```env
NODE_ENV=production
PORT=3000

# Supabase（本番）
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_SECRET_KEY=your_secret_key

# JWT
JWT_SECRET=your_very_long_random_secret_key_here
JWT_REFRESH_SECRET=your_very_long_random_refresh_secret_key_here

# Stripe（本番）
STRIPE_SECRET_KEY=sk_live_your_live_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# CORS
CORS_ORIGIN=https://sukima-learning.com

# HTTPS（必要に応じて）
USE_HTTPS=true
HTTPS_PORT=443
```

### 5-2. セキュリティチェックリスト

- [ ] JWT_SECRETを強力なランダム文字列に変更
- [ ] Stripe本番キーに切り替え
- [ ] CORS_ORINGを本番ドメインに設定
- [ ] HTTPSを有効化
- [ ] レート制限を適切に設定
- [ ] エラーログを監視

### 5-3. Stripeウェブフック設定

1. Stripe Dashboard → **Developers** → **Webhooks**
2. **Add endpoint**をクリック
3. エンドポイントURL: `https://your-domain.com/api/stripe/webhook`
4. イベント選択:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Webhook signing secretをコピー
6. `.env`の`STRIPE_WEBHOOK_SECRET`に設定

詳細は `STRIPE_WEBHOOK_SETUP.md` を参照

---

## ✅ ステップ6: 監視とメンテナンス

### 6-1. Supabaseダッシュボード

- データベースの使用状況を確認
- クエリパフォーマンスを監視
- バックアップを設定

### 6-2. Stripeダッシュボード

- 支払い状況を確認
- サブスクリプション管理
- 返金処理

### 6-3. エラー監視

推奨ツール：
- **Sentry**: エラートラッキング
- **LogRocket**: セッションリプレイ
- **Google Analytics**: アクセス解析

---

## 🎯 完了チェックリスト

### ローカル開発
- [ ] Supabaseデータベース作成完了
- [ ] サーバーが正常に起動
- [ ] APIテストが全て成功
- [ ] フロントエンドとの連携確認

### Stripe連携
- [ ] Stripeアカウント作成
- [ ] APIキー設定
- [ ] 商品・価格設定
- [ ] 決済フロー動作確認

### 本番デプロイ
- [ ] デプロイ先を選択
- [ ] 環境変数を設定
- [ ] カスタムドメイン設定
- [ ] HTTPS有効化
- [ ] Stripeウェブフック設定

### セキュリティ
- [ ] JWT_SECRETを変更
- [ ] CORS設定を確認
- [ ] レート制限を設定
- [ ] エラーハンドリング確認

---

## 📚 参考ドキュメント

- `SUPABASE_SETUP_GUIDE.md` - データベースセットアップ
- `SUPABASE_DEPLOYMENT_SUBDIRECTORY.md` - Cloudflareデプロイ
- `STRIPE_PAYMENT_GUIDE.md` - Stripe決済連携
- `STRIPE_WEBHOOK_SETUP.md` - Webhookセットアップ
- `MYSQL_TO_POSTGRESQL_MIGRATION.md` - 移行ガイド

---

## 🆘 トラブルシューティング

### データベース接続エラー

```
Error: Could not find the table 'public.users'
```

**解決方法**: `SUPABASE_SETUP_GUIDE.md`の手順でテーブルを作成

### CORS エラー

```
Access to fetch at 'http://localhost:3000' from origin 'http://localhost:8000' has been blocked by CORS policy
```

**解決方法**: `.env`の`CORS_ORIGIN`を確認

### Stripe決済エラー

```
No such price: 'price_xxx'
```

**解決方法**: Stripe DashboardでPrice IDを確認し、フロントエンドのコードを更新

---

## 🚀 次のステップ

1. **ローカルテスト完了** → Stripe連携設定へ
2. **Stripe連携完了** → 本番デプロイへ
3. **本番デプロイ完了** → 監視・メンテナンスへ

質問がある場合は、各ガイドドキュメントを参照してください。