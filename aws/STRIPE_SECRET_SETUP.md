# Stripe Webhook Secret 取得ガイド

## 📋 概要

Stripe Webhook Secretは、Stripeからのwebhookリクエストが本物であることを検証するために使用される秘密鍵です。

## 🔑 取得方法

### 方法1: 本番環境用（Stripeダッシュボード）

本番環境で使用する場合は、Stripeダッシュボードから取得します。

#### ステップ1: Stripeアカウントにログイン

1. [Stripe Dashboard](https://dashboard.stripe.com/) にアクセス
2. Stripeアカウントでログイン

#### ステップ2: Webhookエンドポイントを作成

1. 左側メニューから **「開発者」** → **「Webhook」** をクリック
2. **「エンドポイントを追加」** ボタンをクリック
3. 以下の情報を入力：

   **エンドポイントURL**:
   ```
   https://your-domain.com/api/stripe/webhook
   ```
   
   **リッスンするイベント**:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

4. **「エンドポイントを追加」** をクリック

#### ステップ3: Webhook Secretを取得

1. 作成したエンドポイントをクリック
2. **「署名シークレット」** セクションを探す
3. **「表示」** をクリックしてシークレットを表示
4. `whsec_` で始まる文字列をコピー

   例: `whsec_1234567890abcdefghijklmnopqrstuvwxyz`

#### ステップ4: .envファイルに設定

```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz
```

---

### 方法2: 開発環境用（Stripe CLI）

ローカル開発環境では、Stripe CLIを使用してwebhookをテストできます。

#### ステップ1: Stripe CLIのインストール

**Windows（Scoop使用）**:
```bash
scoop bucket add stripe https://github.com/stripe/scoop-stripe-cli.git
scoop install stripe
```

**Windows（手動インストール）**:
1. [Stripe CLI Releases](https://github.com/stripe/stripe-cli/releases) にアクセス
2. `stripe_X.X.X_windows_x86_64.zip` をダウンロード
3. 解凍して `stripe.exe` をPATHに追加

**macOS（Homebrew使用）**:
```bash
brew install stripe/stripe-cli/stripe
```

**Linux**:
```bash
# Debian/Ubuntu
wget https://github.com/stripe/stripe-cli/releases/latest/download/stripe_linux_x86_64.tar.gz
tar -xvf stripe_linux_x86_64.tar.gz
sudo mv stripe /usr/local/bin/
```

#### ステップ2: Stripeにログイン

```bash
stripe login
```

ブラウザが開き、認証を求められます。許可してください。

#### ステップ3: Webhookリスナーを起動

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

出力例:
```
> Ready! Your webhook signing secret is whsec_1234567890abcdefghijklmnopqrstuvwxyz (^C to quit)
```

#### ステップ4: Webhook Secretをコピー

表示された `whsec_` で始まる文字列をコピーして、`.env`ファイルに設定：

```env
STRIPE_WEBHOOK_SECRET=whsec_1234567890abcdefghijklmnopqrstuvwxyz
```

#### ステップ5: サーバーを起動

別のターミナルでサーバーを起動：

```bash
cd aws-quiz-app/server
npm start
```

これで、Stripe CLIがローカルサーバーにwebhookイベントを転送します。

---

## 🧪 テスト方法

### 方法1: Stripe CLIでテストイベントを送信

```bash
# checkout.session.completedイベントをテスト
stripe trigger checkout.session.completed
```

サーバーのログで以下のようなメッセージが表示されれば成功：
```
✅ Webhook verified: checkout.session.completed
```

### 方法2: Stripeダッシュボードでテスト

1. Stripe Dashboard → **「開発者」** → **「Webhook」**
2. 作成したエンドポイントをクリック
3. **「テストイベントを送信」** をクリック
4. イベントタイプを選択（例: `checkout.session.completed`）
5. **「イベントを送信」** をクリック

### 方法3: 実際の決済フローでテスト

1. テスト用のクレジットカード番号を使用：
   ```
   カード番号: 4242 4242 4242 4242
   有効期限: 任意の未来の日付（例: 12/34）
   CVC: 任意の3桁（例: 123）
   郵便番号: 任意（例: 12345）
   ```

2. pricing.htmlから決済を実行
3. サーバーログでwebhookイベントを確認

---

## 🔒 セキュリティのベストプラクティス

### 1. Webhook Secretを安全に保管

❌ **やってはいけないこと**:
```javascript
// コードに直接書かない
const webhookSecret = 'whsec_1234567890abcdefghijklmnopqrstuvwxyz';
```

✅ **正しい方法**:
```javascript
// 環境変数から読み込む
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
```

### 2. .envファイルをGitにコミットしない

`.gitignore`に追加：
```
.env
.env.local
.env.*.local
```

### 3. 本番環境と開発環境で異なるSecretを使用

```env
# 開発環境 (.env.development)
STRIPE_WEBHOOK_SECRET=whsec_dev_1234567890abcdefghijklmnopqrstuvwxyz

# 本番環境 (.env.production)
STRIPE_WEBHOOK_SECRET=whsec_prod_9876543210zyxwvutsrqponmlkjihgfedcba
```

### 4. Webhook署名を必ず検証

```javascript
// server/routes/stripe-webhook.js
const sig = req.headers['stripe-signature'];

try {
  const event = stripe.webhooks.constructEvent(
    req.body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  );
  // イベント処理...
} catch (err) {
  console.error('⚠️ Webhook signature verification failed:', err.message);
  return res.status(400).send(`Webhook Error: ${err.message}`);
}
```

---

## 🐛 トラブルシューティング

### 問題1: Webhook署名検証エラー

**エラー**:
```
⚠️ Webhook signature verification failed: No signatures found matching the expected signature for payload
```

**原因と解決方法**:

1. **Webhook Secretが間違っている**
   ```bash
   # .envファイルを確認
   cat .env | grep STRIPE_WEBHOOK_SECRET
   ```

2. **リクエストボディが変更されている**
   ```javascript
   // server.jsで、webhookルートの前にexpress.json()を使用していないか確認
   // ❌ 間違い
   app.use(express.json());
   app.use('/api/stripe/webhook', stripeWebhookRouter);
   
   // ✅ 正しい
   app.use('/api/stripe/webhook', stripeWebhookRouter);
   app.use(express.json());
   ```

3. **Stripe CLIが起動していない（開発環境）**
   ```bash
   # Stripe CLIを起動
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

### 問題2: Webhookイベントが届かない

**確認事項**:

1. **サーバーが起動しているか**
   ```bash
   curl http://localhost:3000/api/health
   ```

2. **エンドポイントURLが正しいか**
   - Stripeダッシュボードで確認
   - 本番環境: `https://your-domain.com/api/stripe/webhook`
   - 開発環境: Stripe CLIで転送

3. **ファイアウォールでブロックされていないか**
   - 本番環境: ポート443（HTTPS）が開いているか確認
   - 開発環境: Stripe CLIが正常に動作しているか確認

### 問題3: Stripe CLIがインストールできない

**Windows（Scoop未使用）**:
1. [GitHub Releases](https://github.com/stripe/stripe-cli/releases) から手動ダウンロード
2. 解凍して任意のフォルダに配置
3. 環境変数PATHに追加

**macOS（Homebrew未使用）**:
```bash
# 手動インストール
curl -L https://github.com/stripe/stripe-cli/releases/latest/download/stripe_darwin_x86_64.tar.gz -o stripe.tar.gz
tar -xvf stripe.tar.gz
sudo mv stripe /usr/local/bin/
```

---

## 📊 Webhook Secret確認チェックリスト

開発環境:
- [ ] Stripe CLIがインストールされている
- [ ] `stripe login`でログイン済み
- [ ] `stripe listen`でリスナーが起動している
- [ ] 表示されたWebhook Secretを`.env`に設定
- [ ] サーバーが起動している
- [ ] テストイベントが正常に処理される

本番環境:
- [ ] Stripeダッシュボードでエンドポイントを作成
- [ ] 正しいイベントタイプを選択
- [ ] Webhook Secretを取得
- [ ] 本番環境の`.env`に設定
- [ ] HTTPSで公開されている
- [ ] テストイベントが正常に処理される

---

## 🔗 参考リンク

- [Stripe Webhook Documentation](https://stripe.com/docs/webhooks)
- [Stripe CLI Documentation](https://stripe.com/docs/stripe-cli)
- [Webhook署名検証](https://stripe.com/docs/webhooks/signatures)
- [Stripe Dashboard](https://dashboard.stripe.com/)

---

## 💡 よくある質問

### Q1: 開発環境と本番環境で同じWebhook Secretを使えますか？

**A**: いいえ、使えません。開発環境ではStripe CLIが生成する一時的なSecretを使用し、本番環境ではStripeダッシュボードで作成したエンドポイントのSecretを使用します。

### Q2: Webhook Secretを紛失しました。どうすればいいですか？

**A**: Stripeダッシュボードで新しいエンドポイントを作成するか、既存のエンドポイントを削除して再作成してください。古いSecretは無効になります。

### Q3: Webhook Secretは定期的に変更すべきですか？

**A**: セキュリティ上の理由で定期的な変更は推奨されますが、必須ではありません。漏洩の疑いがある場合は直ちに変更してください。

### Q4: 複数の環境（開発、ステージング、本番）で異なるSecretを使用できますか？

**A**: はい、各環境ごとに異なるStripeアカウント（またはテストモード/本番モード）を使用し、それぞれ独自のWebhook Secretを設定することを推奨します。

---

**作成日**: 2026-01-23  
**対象**: Stripe Webhook Secret取得方法  
**バージョン**: 1.0.0