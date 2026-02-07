# Render.com デプロイガイド

このガイドでは、sukima-learningアプリのバックエンド（Node.js/Express）をRender.comにデプロイする手順を説明します。

## 前提条件

- ✅ GitHubリポジトリが作成済み: https://github.com/murakamihiroaki1/sukima-learning
- ✅ Supabaseアカウントとデータベースが設定済み
- ✅ Stripeアカウントが設定済み
- ✅ Gmailアプリパスワードが取得済み

## ステップ1: Render.comアカウント作成

1. **Render.comにアクセス**: https://render.com
2. **「Get Started」をクリック**
3. **GitHubアカウントでサインアップ**
4. **GitHubとの連携を承認**

## ステップ2: 新しいWeb Serviceを作成

1. **Renderダッシュボードで「New +」をクリック**
2. **「Web Service」を選択**
3. **「Connect a repository」セクションで以下を実行:**
   - 「Configure account」をクリック
   - GitHubで `murakamihiroaki1/sukima-learning` リポジトリへのアクセスを許可
   - リポジトリ一覧から `sukima-learning` を選択
   - 「Connect」をクリック

## ステップ3: サービス設定

### 基本設定

```
Name: sukima-learning-api
Region: Oregon (US West)
Branch: main
Root Directory: aws/server
Runtime: Node
```

### ビルド設定

```
Build Command: npm install
Start Command: npm start
```

### プラン選択

```
Instance Type: Free
```

**注意:** 無料プランは以下の制限があります：
- 15分間アクティビティがないとスリープ
- 月750時間まで無料
- 512MB RAM
- 0.1 CPU

## ステップ4: 環境変数の設定

「Environment」セクションで以下の環境変数を追加してください：

### Supabase設定

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SECRET_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**取得方法:**
1. Supabaseダッシュボード → Settings → API
2. Project URL をコピー → `SUPABASE_URL`
3. Project API keys → `anon` `public` をコピー → `SUPABASE_PUBLISHABLE_KEY`
4. Project API keys → `service_role` `secret` をコピー → `SUPABASE_SECRET_KEY`

### JWT設定

```
JWT_SECRET=your_very_long_random_secret_key_here
JWT_EXPIRES_IN=7d
```

**JWT_SECRETの生成方法:**
```bash
node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"
```

### Email設定

```
EMAIL_SERVICE=gmail
EMAIL_USER=murakamihiroaki1@gmail.com
EMAIL_PASSWORD=your_gmail_app_password
EMAIL_FROM=info@sukima-learning.com
EMAIL_REPLY_TO=info@sukima-learning.com
```

**Gmailアプリパスワードの取得:**
1. https://myaccount.google.com/apppasswords
2. アプリを選択: メール
3. デバイスを選択: その他（カスタム名）
4. 名前: Sukima Learning
5. 生成されたパスワードをコピー

### Stripe設定

```
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**取得方法:**
1. Stripeダッシュボード → Developers → API keys
2. Secret key をコピー → `STRIPE_SECRET_KEY`
3. Publishable key をコピー → `STRIPE_PUBLISHABLE_KEY`
4. Webhooks → Add endpoint → Signing secret をコピー → `STRIPE_WEBHOOK_SECRET`

### その他の設定

```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://sukima-learning.com
FRONTEND_URL=https://sukima-learning.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your_random_session_secret
```

**SESSION_SECRETの生成方法:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## ステップ5: デプロイ

1. **「Create Web Service」をクリック**
2. **デプロイが開始されます**（5-10分かかります）
3. **ログを確認:**
   - ビルドログでエラーがないか確認
   - `npm install` が成功しているか確認
   - `npm start` でサーバーが起動しているか確認

## ステップ6: デプロイ完了の確認

デプロイが完了すると、以下のようなURLが提供されます：

```
https://sukima-learning-api.onrender.com
```

### 動作確認

ブラウザで以下のURLにアクセス:
```
https://sukima-learning-api.onrender.com/api/health
```

または
```
https://sukima-learning-api.onrender.com/
```

サーバーが正常に動作していれば、レスポンスが返ってきます。

## ステップ7: カスタムドメインの設定（オプション）

### Renderでカスタムドメインを追加

1. **Renderダッシュボードで「Settings」タブを開く**
2. **「Custom Domain」セクションで「Add Custom Domain」をクリック**
3. **ドメインを入力:** `api.sukima-learning.com`
4. **「Add」をクリック**
5. **表示されるCNAMEレコードをメモ**

### Cloudflare DNSで設定

1. **Cloudflareダッシュボード → DNS → Records**
2. **「Add record」をクリック**
3. **以下を入力:**
   ```
   Type: CNAME
   Name: api
   Target: sukima-learning-api.onrender.com
   Proxy status: Proxied (オレンジ色の雲)
   TTL: Auto
   ```
4. **「Save」をクリック**

### SSL証明書の確認

- Renderが自動的にSSL証明書を発行します（Let's Encrypt）
- 数分後に `https://api.sukima-learning.com` でアクセス可能になります

## ステップ8: Stripe Webhookの設定

バックエンドのURLが確定したら、Stripe Webhookを設定します。

1. **Stripeダッシュボード → Developers → Webhooks**
2. **「Add endpoint」をクリック**
3. **Endpoint URL:**
   ```
   https://sukima-learning-api.onrender.com/api/stripe/webhook
   ```
   または
   ```
   https://api.sukima-learning.com/api/stripe/webhook
   ```
4. **Listen to events:**
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **「Add endpoint」をクリック**
6. **Signing secret をコピーして、Renderの環境変数 `STRIPE_WEBHOOK_SECRET` を更新**

## トラブルシューティング

### デプロイが失敗する

**ログを確認:**
```
Render Dashboard → Logs タブ
```

**よくあるエラー:**

1. **`npm install` が失敗**
   - `package.json` が正しい場所にあるか確認
   - Root Directory が `aws/server` に設定されているか確認

2. **環境変数が設定されていない**
   - すべての必須環境変数が設定されているか確認
   - 特に `SUPABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY` を確認

3. **ポートエラー**
   - `PORT` 環境変数が設定されているか確認
   - Renderは自動的に `PORT` を設定しますが、明示的に `10000` を設定することを推奨

### サーバーがスリープする

無料プランでは15分間アクティビティがないとスリープします。

**対策:**
1. **有料プランにアップグレード**（$7/月〜）
2. **外部サービスで定期的にpingを送る:**
   - UptimeRobot: https://uptimerobot.com
   - Cron-job.org: https://cron-job.org

### CORS エラー

フロントエンドからAPIにアクセスできない場合:

1. **`CORS_ORIGIN` 環境変数を確認**
   ```
   CORS_ORIGIN=https://sukima-learning.com
   ```

2. **複数のオリジンを許可する場合:**
   ```
   CORS_ORIGIN=https://sukima-learning.com,https://www.sukima-learning.com
   ```

## 次のステップ

1. ✅ バックエンドがRenderにデプロイされました
2. ⏳ フロントエンドのAPIエンドポイントを更新
3. ⏳ フロントエンドをCloudflare Pagesにデプロイ
4. ⏳ カスタムドメインを設定

次は「フロントエンドのAPIエンドポイント更新ガイド」を参照してください。

## 参考リンク

- Render.com: https://render.com
- Renderドキュメント: https://render.com/docs
- Node.jsデプロイガイド: https://render.com/docs/deploy-node-express-app
- 環境変数: https://render.com/docs/environment-variables