# Stripe Webhook セットアップガイド

## 📋 概要

Stripe決済完了後に自動的にユーザーの会員レベルを更新するためのWebhook設定ガイドです。

## 🔧 セットアップ手順

### 1. Stripeアカウントの準備

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. テストモードに切り替え（左上のトグル）

### 2. 環境変数の設定

`.env`ファイルに以下を追加：

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

#### Stripe Secret Keyの取得

1. Stripe Dashboard → Developers → API keys
2. "Secret key"をコピー
3. `.env`の`STRIPE_SECRET_KEY`に設定

### 3. Webhookエンドポイントの登録

#### ローカル開発環境の場合

**Stripe CLIを使用（推奨）:**

```bash
# Stripe CLIのインストール
# Windows (Scoop)
scoop install stripe

# Mac (Homebrew)
brew install stripe/stripe-cli/stripe

# Stripeにログイン
stripe login

# Webhookをローカルにフォワード
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 表示されるWebhook Signing Secretをコピー
# whsec_xxxxxxxxxxxxx
```

`.env`に追加：
```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

#### 本番環境の場合

1. Stripe Dashboard → Developers → Webhooks
2. "Add endpoint"をクリック
3. エンドポイントURL: `https://your-domain.com/api/stripe/webhook`
4. "Select events to listen to"で以下を選択：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. "Add endpoint"をクリック
6. "Signing secret"をコピーして`.env`に設定

### 4. Stripe Checkoutの設定

#### Payment Linkの作成

1. Stripe Dashboard → Products
2. "Add product"をクリック
3. 商品情報を入力：
   - Name: "AWS Quiz Standard Plan"
   - Description: "月額980円のStandardプラン"
   - Pricing: 980円/月（recurring）
4. "Save product"
5. "Create payment link"をクリック
6. 生成されたリンクを`pricing.html`に設定

#### Metadataの設定（重要）

Payment Linkの設定で、Metadataを追加：
- Key: `plan`
- Value: `standard` または `advanced`

これにより、Webhookでどのプランが購入されたか識別できます。

### 5. テスト

#### ローカルテスト

```bash
# 1. サーバーを起動
cd aws-quiz-app/server
npm install
npm start

# 2. 別のターミナルでStripe CLIを起動
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 3. テスト決済を実行
stripe trigger checkout.session.completed
```

#### テストカード番号

Stripeのテストモードで使用できるカード番号：

| カード番号 | 結果 |
|-----------|------|
| 4242 4242 4242 4242 | 成功 |
| 4000 0000 0000 0002 | カード拒否 |
| 4000 0000 0000 9995 | 残高不足 |

- 有効期限: 未来の任意の日付
- CVC: 任意の3桁
- 郵便番号: 任意

## 🔍 Webhookイベントの確認

### Stripe Dashboard

1. Developers → Webhooks
2. エンドポイントをクリック
3. "Events"タブで受信したイベントを確認

### サーバーログ

```bash
# サーバーのログを確認
npm start

# Webhookが受信されると以下のようなログが表示される
✅ Webhook verified: checkout.session.completed
💳 Checkout completed: cs_test_xxxxx
✅ Updated user testuser to standard plan (expires: 2026-02-22)
```

## 🐛 トラブルシューティング

### Webhook署名検証エラー

```
⚠️ Webhook signature verification failed
```

**解決方法:**
1. `STRIPE_WEBHOOK_SECRET`が正しく設定されているか確認
2. Stripe CLIを再起動
3. 新しいWebhook Signing Secretを取得

### ユーザーが見つからない

```
❌ User not found: test@example.com
```

**解決方法:**
1. Stripe Checkoutで入力されたメールアドレスがデータベースに存在するか確認
2. ユーザーを事前に登録しておく
3. または、Webhookでユーザーを自動作成する処理を追加

### 会員レベルが更新されない

**確認事項:**
1. Webhookが正しく受信されているか（Stripe Dashboard）
2. データベース接続が正常か
3. `membership_level`と`membership_expiry`カラムが存在するか

```bash
# データベースを確認
psql -d aws_quiz_db -c "SELECT id, email, membership_level, membership_expiry FROM users;"
```

## 📊 Webhookイベントの処理フロー

```
1. ユーザーがStripe Checkoutで決済
   ↓
2. Stripeが checkout.session.completed イベントを送信
   ↓
3. サーバーが /api/stripe/webhook で受信
   ↓
4. Webhook署名を検証
   ↓
5. ユーザーのメールアドレスでデータベース検索
   ↓
6. membership_level を 'standard' に更新
   ↓
7. membership_expiry を 30日後に設定
   ↓
8. 完了（ユーザーは次回ログイン時に新しいレベルを確認）
```

## 🔐 セキュリティ

### Webhook署名検証

すべてのWebhookリクエストは署名検証を行います：

```javascript
const sig = req.headers['stripe-signature'];
const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
```

これにより、Stripe以外からのリクエストを拒否します。

### 環境変数の保護

- `.env`ファイルは`.gitignore`に追加
- 本番環境では環境変数を安全に管理
- Webhook Secretは絶対に公開しない

## 📝 本番環境へのデプロイ

### 1. 環境変数の設定

```bash
# Railway/Render/Herokuなどで設定
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NODE_ENV=production
```

### 2. Webhookエンドポイントの登録

Stripe Dashboard → Webhooks → Add endpoint
- URL: `https://your-domain.com/api/stripe/webhook`
- Events: 上記の6つのイベントを選択

### 3. テスト

1. 本番モードに切り替え
2. 実際のカードで少額決済をテスト
3. ユーザーの会員レベルが更新されることを確認

## 🎯 チェックリスト

- [ ] Stripeアカウント作成
- [ ] API Keyを取得
- [ ] `.env`に環境変数を設定
- [ ] `npm install stripe`を実行
- [ ] Stripe CLIをインストール（ローカル開発）
- [ ] Webhookエンドポイントを登録
- [ ] Webhook Secretを設定
- [ ] Payment Linkを作成
- [ ] Metadataを設定
- [ ] テスト決済を実行
- [ ] ログを確認
- [ ] データベースを確認

## 📞 サポート

問題が発生した場合：

1. サーバーログを確認
2. Stripe Dashboardでイベントを確認
3. データベースの状態を確認
4. [Stripe Documentation](https://stripe.com/docs/webhooks)を参照

---

**作成日**: 2026-01-23  
**対象**: aws-quiz-app Stripe Webhook  
**バージョン**: 1.0.0