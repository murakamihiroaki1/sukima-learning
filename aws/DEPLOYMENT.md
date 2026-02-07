# AWS Quiz App - デプロイメントガイド

このアプリケーションを本番環境に公開するための各種デプロイメント方法を説明します。

## 📊 デプロイメント方法の比較

| 方法 | コスト | 難易度 | スケーラビリティ | 推奨度 |
|------|--------|--------|------------------|--------|
| AWS (推奨) | 💰💰 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Vercel + Railway | 💰 | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Heroku | 💰💰 | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| DigitalOcean | 💰💰 | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| オンプレミス | 💰💰💰 | ⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

---

## 🚀 方法1: AWS（最推奨）

AWS認定試験のアプリなので、AWSでデプロイするのが最適です。

### アーキテクチャ

```
Internet
    ↓
CloudFront (CDN)
    ↓
S3 (静的ファイル) → ALB → ECS/Fargate (Node.js)
                              ↓
                         RDS PostgreSQL
                              ↓
                         SES (メール送信)
```

### 必要なAWSサービス

1. **Amazon S3** - フロントエンド（静的ファイル）
2. **Amazon CloudFront** - CDN
3. **Amazon ECS/Fargate** - バックエンド（コンテナ）
4. **Application Load Balancer** - ロードバランサー
5. **Amazon RDS (PostgreSQL)** - データベース
6. **Amazon SES** - メール送信
7. **AWS Certificate Manager** - SSL/TLS証明書
8. **Route 53** - DNS管理

### 月額コスト見積もり（小規模）

- S3 + CloudFront: $5-10
- ECS Fargate (1タスク): $15-20
- RDS t3.micro: $15-20
- SES: $0.10/1000通
- **合計: 約$35-50/月**

### デプロイ手順

#### 1. フロントエンドのデプロイ（S3 + CloudFront）

```bash
# S3バケット作成
aws s3 mb s3://aws-quiz-app-frontend

# ファイルをアップロード
cd aws-saa-quiz-app
aws s3 sync . s3://aws-quiz-app-frontend \
  --exclude "server/*" \
  --exclude "*.md" \
  --exclude ".git/*"

# バケットを静的ウェブサイトとして設定
aws s3 website s3://aws-quiz-app-frontend \
  --index-document index.html \
  --error-document index.html

# CloudFront ディストリビューション作成（AWS Console推奨）
```

#### 2. バックエンドのデプロイ（ECS Fargate）

**Dockerfile作成:**

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

**デプロイコマンド:**

```bash
cd server

# ECRリポジトリ作成
aws ecr create-repository --repository-name aws-quiz-backend

# Dockerイメージをビルド
docker build -t aws-quiz-backend .

# ECRにプッシュ
aws ecr get-login-password --region ap-northeast-1 | \
  docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com

docker tag aws-quiz-backend:latest <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/aws-quiz-backend:latest
docker push <account-id>.dkr.ecr.ap-northeast-1.amazonaws.com/aws-quiz-backend:latest

# ECSクラスター、タスク定義、サービスを作成（AWS Console推奨）
```

#### 3. データベースのセットアップ（RDS）

```bash
# RDS PostgreSQLインスタンス作成（AWS Console推奨）
# - エンジン: PostgreSQL 15
# - インスタンスクラス: db.t3.micro
# - ストレージ: 20GB
# - マルチAZ: 本番環境では有効化推奨

# データベース初期化
psql -h <rds-endpoint> -U postgres -d aws_quiz_db -f database/init.sql
```

#### 4. 環境変数の設定（ECS）

ECSタスク定義で以下の環境変数を設定:

```json
{
  "environment": [
    {"name": "NODE_ENV", "value": "production"},
    {"name": "PORT", "value": "3000"},
    {"name": "DB_HOST", "value": "<rds-endpoint>"},
    {"name": "DB_NAME", "value": "aws_quiz_db"},
    {"name": "DB_USER", "value": "postgres"},
    {"name": "CORS_ORIGIN", "value": "https://your-domain.com"},
    {"name": "EMAIL_SERVICE", "value": "ses"},
    {"name": "FRONTEND_URL", "value": "https://your-domain.com"}
  ],
  "secrets": [
    {"name": "JWT_SECRET", "valueFrom": "arn:aws:secretsmanager:..."},
    {"name": "DB_PASSWORD", "valueFrom": "arn:aws:secretsmanager:..."}
  ]
}
```

#### 5. メール送信の設定（SES）

```bash
# SESでメールアドレスを検証
aws ses verify-email-identity --email-address noreply@your-domain.com

# 本番環境では送信制限解除リクエストが必要
```

---

## 🌐 方法2: Vercel + Railway（簡単・低コスト）

### 特徴
- **コスト**: 無料枠あり、月$5-20程度
- **難易度**: 非常に簡単
- **デプロイ時間**: 5-10分

### 手順

#### フロントエンド（Vercel）

```bash
# Vercel CLIインストール
npm i -g vercel

# デプロイ
cd aws-saa-quiz-app
vercel

# 本番デプロイ
vercel --prod
```

#### バックエンド（Railway）

1. https://railway.app にアクセス
2. GitHubリポジトリを接続
3. `server` ディレクトリを選択
4. PostgreSQLアドオンを追加
5. 環境変数を設定
6. デプロイ

**月額コスト**: $5-10（無料枠あり）

---

## 🐳 方法3: DigitalOcean App Platform

### 特徴
- **コスト**: 月$12-25
- **難易度**: 中程度
- **マネージドサービス**: フルマネージド

### 手順

1. **App作成**
   - GitHubリポジトリを接続
   - フロントエンド: Static Site
   - バックエンド: Web Service (Node.js)

2. **データベース追加**
   - Managed PostgreSQL ($15/月)

3. **環境変数設定**
   - App Platform UIで設定

4. **デプロイ**
   - 自動デプロイ設定

---

## 🏢 方法4: オンプレミス（自社サーバー）

### 必要なもの
- Linux サーバー（Ubuntu 22.04推奨）
- 固定IPアドレス
- ドメイン名
- SSL証明書（Let's Encrypt）

### セットアップ手順

#### 1. サーバー準備

```bash
# Node.js インストール
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# PostgreSQL インストール
sudo apt-get install postgresql postgresql-contrib

# Nginx インストール
sudo apt-get install nginx

# Certbot インストール（SSL証明書）
sudo apt-get install certbot python3-certbot-nginx
```

#### 2. アプリケーションのセットアップ

```bash
# アプリケーションをクローン
cd /var/www
sudo git clone <your-repo> aws-quiz-app
cd aws-quiz-app/server

# 依存関係インストール
sudo npm install --production

# PM2でプロセス管理
sudo npm install -g pm2
pm2 start server.js --name aws-quiz-backend
pm2 startup
pm2 save
```

#### 3. Nginx設定

```nginx
# /etc/nginx/sites-available/aws-quiz-app

# フロントエンド
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/aws-quiz-app;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}

# バックエンドAPI
server {
    listen 80;
    server_name api.your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Nginx設定を有効化
sudo ln -s /etc/nginx/sites-available/aws-quiz-app /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# SSL証明書取得
sudo certbot --nginx -d your-domain.com -d api.your-domain.com
```

#### 4. データベースセットアップ

```bash
sudo -u postgres psql
CREATE DATABASE aws_quiz_db;
CREATE USER aws_quiz_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE aws_quiz_db TO aws_quiz_user;
\q

# データベース初期化
cd /var/www/aws-quiz-app/server
npm run db:init
```

**月額コスト**: サーバー代のみ（$20-100）

---

## 📋 デプロイ前のチェックリスト

### セキュリティ

- [ ] JWT_SECRETを強力なランダム文字列に変更
- [ ] データベースパスワードを強力なものに変更
- [ ] CORS_ORIGINを本番ドメインに設定
- [ ] HTTPS/TLSを有効化
- [ ] 環境変数を安全に管理（AWS Secrets Manager等）
- [ ] レート制限を適切に設定
- [ ] SQLインジェクション対策を確認

### パフォーマンス

- [ ] データベースインデックスを最適化
- [ ] 静的ファイルをCDNで配信
- [ ] Gzip圧縮を有効化
- [ ] 画像を最適化
- [ ] キャッシュ戦略を実装

### 監視・ログ

- [ ] アプリケーションログを設定
- [ ] エラー監視（Sentry等）
- [ ] パフォーマンス監視（New Relic等）
- [ ] アラート設定

### バックアップ

- [ ] データベースの自動バックアップ
- [ ] バックアップの復元テスト
- [ ] ディザスタリカバリ計画

---

## 🎯 推奨デプロイメント戦略

### 小規模・個人プロジェクト
→ **Vercel + Railway** (月$5-10)

### 中規模・商用サービス
→ **AWS** (月$50-200)

### 大規模・エンタープライズ
→ **AWS + マルチリージョン** (月$500+)

### 学習目的
→ **DigitalOcean** または **オンプレミス**

---

## 📚 参考リンク

- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app/)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)
- [Let's Encrypt](https://letsencrypt.org/)

---

## 💡 Tips

1. **開発環境と本番環境を分離**: 環境変数で切り替え
2. **CI/CDパイプラインを構築**: GitHub Actions推奨
3. **モニタリングを早期に導入**: 問題の早期発見
4. **スケーリング戦略を計画**: 将来の成長に備える
5. **セキュリティを最優先**: 定期的な脆弱性スキャン

---

Made with ❤️ by Bob