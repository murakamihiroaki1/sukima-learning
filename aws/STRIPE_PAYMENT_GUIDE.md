# Stripe決済後にindex.htmlに自動リダイレクトする設定ガイド

## 📋 概要

Stripe決済完了後、自動的に`index.html`にリダイレクトされるように実装されています。

---

## ✅ 実装済みの機能

### 1. サーバー側（`aws/server/routes/membership.js`）
- **エンドポイント**: `POST /api/membership/create-checkout-session`
- **機能**: Stripeチェックアウトセッションを作成
- **リダイレクト設定**:
  - 決済成功時: `http://localhost:8080/index.html?payment=success`
  - キャンセル時: `http://localhost:8080/pricing.html?payment=cancelled`

### 2. フロントエンド側（`aws/pricing.html`）
- **ボタン**: 「今すぐ申し込む」
- **機能**: サーバーAPIを呼び出してStripe決済ページに遷移
- **ログイン確認**: 未ログインの場合はログインページにリダイレクト

---

## 🚀 使用方法

### ステップ1: サーバーを起動

```bash
cd aws/server
npm start
```

起動確認：
```
🚀 HTTP Server is running on port 3000
✅ MySQL connected
```

### ステップ2: フロントエンドを起動

```bash
cd aws
python -m http.server 8080
```

または、VSCodeのLive Serverを使用

### ステップ3: ログイン

1. `http://localhost:8080/login.html`にアクセス
2. ユーザー名とパスワードでログイン

### ステップ4: 料金ページにアクセス

`http://localhost:8080/pricing.html`にアクセス

### ステップ5: 決済を実行

1. **「今すぐ申し込む」ボタンをクリック**
2. Stripe決済ページに自動遷移
3. テストカード情報を入力：
   - **カード番号**: `4242 4242 4242 4242`
   - **有効期限**: 任意の未来の日付（例: 12/34）
   - **CVC**: 任意の3桁（例: 123）
   - **郵便番号**: 任意（例: 12345）
4. 「支払う」ボタンをクリック
5. **自動的に`http://localhost:8080/index.html?payment=success`にリダイレクト** ✅

---

## 🔍 動作フロー

```
1. pricing.html
   ↓ 「今すぐ申し込む」クリック
   
2. サーバーAPI呼び出し
   POST /api/membership/create-checkout-session
   ↓
   
3. Stripeチェックアウトセッション作成
   success_url: http://localhost:8080/index.html?payment=success
   cancel_url: http://localhost:8080/pricing.html?payment=cancelled
   ↓
   
4. Stripe決済ページに遷移
   ↓ ユーザーが決済情報を入力
   
5. 決済完了
   ↓
   
6. index.html?payment=success に自動リダイレクト ✅
```

---

## 🛠️ トラブルシューティング

### 問題1: リダイレクトされない

**原因**: Stripeのチェックアウトセッションが正しく作成されていない

**解決方法**:
1. サーバーログを確認
2. ブラウザのコンソールでエラーを確認
3. `.env`ファイルの`STRIPE_SECRET_KEY`が正しいか確認

### 問題2: 「無効なプランです」エラー

**原因**: プラン名が正しくない

**解決方法**:
- `handleStripePayment(event, 'standard')`のように小文字で指定

### 問題3: 「ログインが必要です」と表示される

**原因**: ログインしていない

**解決方法**:
1. `http://localhost:8080/login.html`でログイン
2. 再度料金ページにアクセス

### 問題4: Stripe価格IDエラー

**エラー**: `No such price: 'price_standard_monthly'`

**解決方法**:
1. Stripeダッシュボードで価格を作成
2. `.env`ファイルに実際の価格IDを設定：
   ```env
   STRIPE_STANDARD_PRICE_ID=price_xxxxxxxxxxxxx
   STRIPE_ADVANCED_PRICE_ID=price_xxxxxxxxxxxxx
   ```

---

## 📊 決済後の確認

### 1. ページ遷移の確認
- URLが`http://localhost:8080/index.html?payment=success`になっている
- トップページが表示されている

### 2. 会員レベルの確認
- ページをリロード
- ヘッダーに「Standard会員」と表示される
- 見直し機能が利用可能になる

### 3. データベースの確認
```sql
SELECT username, membership_level, membership_expiry 
FROM users 
WHERE email = 'your-email@example.com';
```

結果例：
```
username | membership_level | membership_expiry
---------|------------------|------------------
testuser | standard         | 2026-03-05 19:00:00
```

---

## 🎯 本番環境での設定

### 1. 環境変数を更新

`.env`ファイル：
```env
# 本番環境のURL
FRONTEND_URL=https://your-domain.com

# 本番用のStripeキー
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_STANDARD_PRICE_ID=price_xxxxxxxxxxxxx
STRIPE_ADVANCED_PRICE_ID=price_xxxxxxxxxxxxx
```

### 2. pricing.htmlのAPI URLを更新

```javascript
const API_URL = 'https://your-api-domain.com/api/membership';
```

### 3. Stripe Webhookを設定

1. Stripeダッシュボード → Webhooks
2. エンドポイントを追加：`https://your-api-domain.com/api/stripe/webhook`
3. イベントを選択：
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`

---

## 📝 まとめ

✅ 決済完了後、自動的に`index.html`にリダイレクト  
✅ ログイン確認機能あり  
✅ エラーハンドリング実装済み  
✅ ローディング状態の表示  
✅ Webhook連携で会員レベル自動更新  

すべて実装済みです！サーバーを起動して試してください。