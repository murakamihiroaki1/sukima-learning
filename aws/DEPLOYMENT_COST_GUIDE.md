# 最安デプロイメントガイド（独自ドメイン・メール込み）

## 💰 総コスト概算

### 初期費用
- ドメイン取得: 約1,000円/年（.comの場合）
- SSL証明書: 無料（Let's Encrypt）
- **合計: 約1,000円**

### 月額費用（最小構成）
- VPS: 約500円/月
- ドメイン維持: 約83円/月（年間1,000円÷12）
- メールサービス: 無料～300円/月
- **合計: 約580円～880円/月**

---

## 🎯 推奨プラン：ConoHa VPS + お名前.com

### 1. ドメイン取得（お名前.com）

**料金**: 約1,000円/年（.com）

**手順**:
1. [お名前.com](https://www.onamae.com/)にアクセス
2. 希望のドメイン名を検索（例: aws-quiz-master.com）
3. .com, .net, .jp などから選択
4. 購入手続き

**おすすめドメイン**:
- `.com`: 1,000円/年（最も一般的）
- `.net`: 1,200円/年
- `.jp`: 3,000円/年（日本向けサービスなら信頼性UP）
- `.xyz`: 300円/年（最安だが信頼性は低め）

---

### 2. VPS選択（ConoHa VPS）

**推奨プラン**: 512MBプラン
- **料金**: 493円/月（長期割引適用時）
- **スペック**:
  - CPU: 1コア
  - メモリ: 512MB
  - SSD: 30GB
  - 転送量: 無制限

**代替案**:
1. **さくらのVPS** (512MB): 590円/月
2. **Vultr** ($3.5/月 = 約500円): 海外サーバー
3. **Contabo** (€3.99/月 = 約600円): 大容量

**手順**:
1. [ConoHa VPS](https://www.conoha.jp/vps/)にアクセス
2. アカウント作成
3. 512MBプランを選択
4. OSはUbuntu 22.04 LTSを選択
5. 支払い方法設定（クレジットカード推奨）

---

### 3. メールアドレス設定

#### オプション1: 無料メール転送（推奨）

**ImprovMX** - 完全無料
- 独自ドメインのメールを既存のGmailなどに転送
- 設定が簡単
- 送信は既存メールから

**手順**:
1. [ImprovMX](https://improvmx.com/)にアクセス
2. ドメインを登録
3. お名前.comのDNS設定にMXレコードを追加
4. info@yourdomain.com → your-gmail@gmail.com に転送

#### オプション2: 有料メールサービス

**Zoho Mail** - 300円/月
- 独自ドメインで送受信可能
- 5GBストレージ
- Webメール、IMAP/SMTP対応

**Google Workspace** - 680円/月
- Gmailの独自ドメイン版
- 30GBストレージ
- 高機能だが高価

---

## 📋 セットアップ手順

### ステップ1: VPSの初期設定

```bash
# SSHでVPSに接続
ssh root@your-vps-ip

# システムアップデート
apt update && apt upgrade -y

# 必要なパッケージをインストール
apt install -y nginx nodejs npm mysql-server certbot python3-certbot-nginx git

# Node.jsを最新LTS版に更新
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# ファイアウォール設定
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

### ステップ2: MySQLセットアップ

```bash
# MySQLセキュリティ設定
mysql_secure_installation

# データベース作成
mysql -u root -p
```

```sql
CREATE DATABASE aws_quiz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'quizuser'@'localhost' IDENTIFIED BY 'your-strong-password';
GRANT ALL PRIVILEGES ON aws_quiz.* TO 'quizuser'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### ステップ3: アプリケーションデプロイ

```bash
# アプリケーション用ディレクトリ作成
mkdir -p /var/www/aws-quiz
cd /var/www/aws-quiz

# Gitからクローン（またはファイルアップロード）
# git clone your-repository-url .

# 依存関係インストール
cd server
npm install --production

# 環境変数設定
cp .env.example .env
nano .env
```

**.env設定例**:
```env
NODE_ENV=production
PORT=3000
DB_HOST=localhost
DB_USER=quizuser
DB_PASSWORD=your-strong-password
DB_NAME=aws_quiz
JWT_SECRET=your-very-long-random-secret-key
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### ステップ4: PM2でアプリ起動

```bash
# PM2インストール
npm install -g pm2

# アプリ起動
pm2 start server.js --name aws-quiz

# 自動起動設定
pm2 startup
pm2 save
```

### ステップ5: Nginx設定

```bash
nano /etc/nginx/sites-available/aws-quiz
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # 静的ファイル
    location / {
        root /var/www/aws-quiz;
        try_files $uri $uri/ =404;
        index index.html;
    }

    # APIエンドポイント
    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# 設定を有効化
ln -s /etc/nginx/sites-available/aws-quiz /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### ステップ6: DNS設定（お名前.com）

1. お名前.comの管理画面にログイン
2. DNS設定を選択
3. Aレコードを追加:
   - ホスト名: `@` (ルートドメイン)
   - TYPE: `A`
   - VALUE: `VPSのIPアドレス`
   - TTL: `3600`
4. Aレコードを追加（www用）:
   - ホスト名: `www`
   - TYPE: `A`
   - VALUE: `VPSのIPアドレス`
   - TTL: `3600`

### ステップ7: SSL証明書取得（Let's Encrypt）

```bash
# SSL証明書取得（自動でNginx設定も更新）
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 自動更新設定（既に設定済みだが確認）
certbot renew --dry-run
```

### ステップ8: メール設定（ImprovMX）

1. [ImprovMX](https://improvmx.com/)でドメイン登録
2. お名前.comのDNS設定にMXレコード追加:
   - ホスト名: `@`
   - TYPE: `MX`
   - VALUE: `mx1.improvmx.com`
   - 優先度: `10`
   - TTL: `3600`
3. MXレコード追加（バックアップ）:
   - ホスト名: `@`
   - TYPE: `MX`
   - VALUE: `mx2.improvmx.com`
   - 優先度: `20`
   - TTL: `3600`
4. ImprovMXで転送先メールアドレス設定

---

## 🔧 運用・メンテナンス

### 定期的なバックアップ

```bash
# データベースバックアップスクリプト
nano /root/backup-db.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/root/backups"
mkdir -p $BACKUP_DIR

# MySQLバックアップ
mysqldump -u quizuser -p'your-password' aws_quiz > $BACKUP_DIR/aws_quiz_$DATE.sql

# 7日以上古いバックアップを削除
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

```bash
chmod +x /root/backup-db.sh

# 毎日午前3時に実行
crontab -e
# 追加: 0 3 * * * /root/backup-db.sh
```

### ログ監視

```bash
# アプリケーションログ
pm2 logs aws-quiz

# Nginxログ
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# システムリソース監視
htop
```

### アップデート

```bash
# アプリケーション更新
cd /var/www/aws-quiz
git pull  # またはファイルアップロード
cd server
npm install --production
pm2 restart aws-quiz

# システムアップデート（月1回推奨）
apt update && apt upgrade -y
```

---

## 💡 コスト削減のヒント

### 1. 長期契約割引
- ConoHa VPS: 12ヶ月契約で10%OFF
- さくらのVPS: 年払いで2ヶ月分無料

### 2. 無料枠の活用
- SSL証明書: Let's Encrypt（無料）
- メール転送: ImprovMX（無料）
- CDN: Cloudflare（無料プラン）

### 3. リソース最適化
- 画像圧縮（TinyPNG）
- Gzip圧縮有効化
- ブラウザキャッシュ設定

---

## 🚀 さらに安くする代替案

### 超低コストプラン（月額300円以下）

**Cloudflare Pages + Supabase**
- **Cloudflare Pages**: 無料（静的ホスティング）
- **Supabase**: 無料枠（PostgreSQL、認証）
- **ドメイン**: 1,000円/年
- **メール**: ImprovMX（無料）

**月額コスト**: 約83円（ドメイン代のみ）

**制限**:
- Supabase無料枠: 500MB DB、2GB転送/月
- 小規模サービス向け

---

## 📊 プラン比較表

| プラン | 月額 | 初期費用 | 推奨規模 | メリット | デメリット |
|--------|------|----------|----------|----------|----------|
| ConoHa VPS | 580円 | 1,000円 | 中規模 | 自由度高い | サーバー管理必要 |
| Cloudflare+Supabase | 83円 | 1,000円 | 小規模 | 超低コスト | 機能制限あり |
| AWS Lightsail | 500円 | 1,000円 | 中規模 | AWS統合 | 海外サーバー |
| Heroku | 1,000円 | 1,000円 | 中規模 | 簡単 | 高価 |

---

## ✅ チェックリスト

### デプロイ前
- [ ] ドメイン取得完了
- [ ] VPS契約完了
- [ ] Stripe本番環境設定完了
- [ ] 環境変数(.env)設定完了
- [ ] データベース作成完了

### デプロイ時
- [ ] アプリケーションアップロード完了
- [ ] 依存関係インストール完了
- [ ] データベースマイグレーション実行完了
- [ ] PM2起動設定完了
- [ ] Nginx設定完了

### デプロイ後
- [ ] DNS設定完了（反映に最大48時間）
- [ ] SSL証明書取得完了
- [ ] メール転送設定完了
- [ ] 動作確認完了
- [ ] バックアップ設定完了

---

## 🆘 トラブルシューティング

### サイトにアクセスできない
1. DNS設定を確認（nslookup yourdomain.com）
2. Nginxステータス確認（systemctl status nginx）
3. ファイアウォール確認（ufw status）

### データベース接続エラー
1. MySQL起動確認（systemctl status mysql）
2. .envファイルの認証情報確認
3. ユーザー権限確認

### メールが届かない
1. MXレコード設定確認
2. ImprovMXのダッシュボードで転送ログ確認
3. 迷惑メールフォルダ確認

---

## 📞 サポート

### 公式ドキュメント
- ConoHa VPS: https://support.conoha.jp/
- お名前.com: https://help.onamae.com/
- Let's Encrypt: https://letsencrypt.org/docs/
- ImprovMX: https://improvmx.com/guides/

### コミュニティ
- Qiita: 日本語の技術記事
- Stack Overflow: 英語の技術Q&A
- GitHub Issues: 各ツールの問題報告

---

**推奨**: まずはConoHa VPS（580円/月）+ お名前.com（1,000円/年）+ ImprovMX（無料）の組み合わせで始めることをお勧めします。