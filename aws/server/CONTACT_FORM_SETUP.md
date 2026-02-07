# お問い合わせフォーム メール送信設定ガイド

## 📧 概要

お問い合わせフォームから送信された内容を `info@sukima-learning.com` にメール送信する機能の設定方法です。

---

## 🚀 クイックスタート

### 1. 必要なパッケージ

nodemailerは既にpackage.jsonに含まれています。

```bash
cd aws/server
npm install
```

### 2. 環境変数の設定

`.env`ファイルに以下を追加：

```env
# Email Configuration (for contact form)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 📝 Gmail設定（推奨）

### ステップ1: Googleアカウントで2段階認証を有効化

1. https://myaccount.google.com/security にアクセス
2. 「2段階認証プロセス」を有効化

### ステップ2: アプリパスワードを生成

1. https://myaccount.google.com/apppasswords にアクセス
2. 「アプリを選択」→「その他（カスタム名）」
3. 名前を入力（例: AWS Quiz Contact Form）
4. 「生成」をクリック
5. 表示された16桁のパスワードをコピー

### ステップ3: .envファイルに設定

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=xxxx xxxx xxxx xxxx  # 生成したアプリパスワード
```

---

## 🔧 その他のメールサービス

### Outlook/Hotmail

```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo Mail

```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### SendGrid（推奨：本番環境）

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-sendgrid-api-key
```

SendGridの設定：
1. https://sendgrid.com でアカウント作成（無料枠: 100通/日）
2. Settings → API Keys → Create API Key
3. Full Accessを選択してAPIキーを生成

---

## ✅ 動作確認

### 1. サーバー起動

```bash
cd aws/server
npm run dev
```

### 2. フロントエンド起動

別のターミナルで：

```bash
cd aws
python -m http.server 8000
```

### 3. テスト送信

1. ブラウザで http://localhost:8000/contact.html を開く
2. フォームに入力
3. 「送信する」をクリック
4. `info@sukima-learning.com` にメールが届くことを確認

### 4. 期待される動作

✅ **送信者に自動返信メールが届く**
```
件名: お問い合わせを受け付けました - AWS認定試験対策
本文: お問い合わせ内容の確認と返信予定
```

✅ **info@sukima-learning.comに問い合わせ内容が届く**
```
件名: 【お問い合わせ】[ユーザーが入力した件名]
本文: 
  お名前: [入力された名前]
  メールアドレス: [入力されたメール]
  お問い合わせ種別: [選択された種別]
  件名: [入力された件名]
  お問い合わせ内容: [入力された内容]
```

---

## 🔍 トラブルシューティング

### エラー: Invalid login

**原因**: メールアドレスまたはパスワードが間違っている

**解決方法**:
1. `.env`のSMTP_USERとSMTP_PASSを確認
2. Gmailの場合、通常のパスワードではなくアプリパスワードを使用
3. 2段階認証が有効になっているか確認

### エラー: Connection timeout

**原因**: SMTPサーバーに接続できない

**解決方法**:
1. ファイアウォールでポート587が開いているか確認
2. SMTP_HOSTとSMTP_PORTが正しいか確認
3. インターネット接続を確認

### エラー: 550 5.7.1 Relay access denied

**原因**: SMTPサーバーがリレーを許可していない

**解決方法**:
1. SMTP認証情報が正しいか確認
2. メールサービスの設定でSMTPアクセスが有効になっているか確認

### メールが届かない

**確認事項**:
1. スパムフォルダを確認
2. サーバーログでエラーを確認
3. メールアドレスが正しいか確認
4. SendGridなどの専用サービスを使用（Gmailは1日の送信制限あり）

---

## 🌐 本番環境での推奨設定

### SendGrid使用（推奨）

**メリット**:
- 高い到達率
- 送信ログ・分析機能
- 無料枠: 100通/日
- スパム判定されにくい

**設定**:

```env
# 本番環境
NODE_ENV=production
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=SG.xxxxxxxxxxxxxxxxxxxxx
```

### Gmailの制限

- **1日の送信制限**: 500通
- **1時間の送信制限**: 100通
- 大量送信には不向き

---

## 📊 メール送信フロー

```
ユーザー
  ↓ フォーム送信
contact.html
  ↓ POST /api/contact/send
server.js → routes/contact.js
  ↓ nodemailer
SMTPサーバー (Gmail/SendGrid等)
  ↓
info@sukima-learning.com (問い合わせ受信)
  ↓
ユーザーのメールアドレス (自動返信)
```

---

## 🔐 セキュリティ

### 環境変数の保護

- `.env`ファイルは`.gitignore`に追加
- 本番環境では環境変数を使用（Vercel/Railway等）
- SMTPパスワードは絶対にコミットしない

### レート制限

現在の設定:
- 15分間に100リクエストまで
- 必要に応じて調整可能

---

## 📚 関連ファイル

- `aws/server/routes/contact.js` - メール送信API
- `aws/contact.html` - お問い合わせフォーム
- `aws/server/.env` - 環境変数設定
- `aws/server/server.js` - ルート設定

---

## 🎯 次のステップ

1. ✅ Gmail/SendGridアカウント設定
2. ✅ .envファイルにSMTP設定追加
3. ✅ ローカルでテスト送信
4. ✅ 本番環境にデプロイ
5. ✅ 実際の問い合わせで動作確認

---

**作成日**: 2026年2月4日  
**対象**: AWS Quiz App お問い合わせフォーム