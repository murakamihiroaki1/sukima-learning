# 独自ドメイン + PostgreSQL対応ホスティング完全ガイド

## 🌐 独自ドメイン取得サービス

### おすすめドメインレジストラ

#### 1. **お名前.com（日本最大手）**
- **料金**: .com 年間1円〜（初年度）/ 1,408円〜（2年目以降）
- **特徴**: 日本語サポート、管理画面が日本語
- **URL**: https://www.onamae.com/

#### 2. **ムームードメイン（初心者向け）**
- **料金**: .com 年間750円〜
- **特徴**: シンプルな管理画面、GMOグループ
- **URL**: https://muumuu-domain.com/

#### 3. **Cloudflare Registrar（最安値）**
- **料金**: .com 年間$9.77（約1,400円）
- **特徴**: 原価販売、無料CDN、無料SSL
- **URL**: https://www.cloudflare.com/products/registrar/

#### 4. **Google Domains → Squarespace Domains**
- **料金**: .com 年間$12（約1,700円）
- **特徴**: シンプル、プライバシー保護無料
- **URL**: https://domains.squarespace.com/

## 🏆 完全統合ソリューション（推奨）

### プラン1: Railway + Cloudflare（最もおすすめ）

#### 構成
- **ホスティング**: Railway（Node.js + PostgreSQL）
- **ドメイン**: Cloudflare Registrar
- **CDN/DNS**: Cloudflare（無料）
- **SSL**: 自動（無料）

#### 月額コスト
- Railway: $5-10
- ドメイン: 約120円/月（年間1,400円）
- **合計: 約$6-11/月（900-1,600円）**

#### セットアップ手順

**ステップ1: Cloudflareでドメイン取得**
```bash
1. https://www.cloudflare.com/ でアカウント作成
2. 「Domain Registration」→ドメイン検索
3. 希望のドメインを購入（例: your-quiz-app.com）
4. 自動的にCloudflare DNSに設定される
```

**ステップ2: Railwayでアプリデプロイ**
```bash
1. https://railway.app でアカウント作成
2. 「New Project」→「Deploy from GitHub repo」
3. aws-quiz-appリポジトリを選択
4. 「Add PostgreSQL」をクリック
5. 環境変数を設定
6. デプロイ完了
```

**ステップ3: カスタムドメイン設定**
```bash
# Railwayの管理画面で
1. Settings → Domains
2. 「Custom Domain」をクリック
3. your-quiz-app.com を入力
4. 表示されるCNAMEレコードをコピー

# Cloudflareの管理画面で
1. DNS → Records
2. 「Add record」
   - Type: CNAME
   - Name: @ (または www)
   - Target: [Railwayから取得したURL]
   - Proxy status: Proxied（オレンジ色）
3. 保存

# 5-10分で反映完了
```

### プラン2: Render + お名前.com（日本語サポート重視）

#### 構成
- **ホスティング**: Render（Node.js + PostgreSQL）
- **ドメイン**: お名前.com
- **SSL**: 自動（無料）

#### 月額コスト
- Render: $7-14
- ドメイン: 約120円/月
- **合計: 約$8-15/月（1,200-2,200円）**

#### セットアップ手順

**ステップ1: お名前.comでドメイン取得**
```bash
1. https://www.onamae.com/ でアカウント作成
2. 希望のドメインを検索・購入
3. Whois情報公開代行を有効化（推奨）
```

**ステップ2: Renderでアプリデプロイ**
```bash
1. https://render.com でアカウント作成
2. 「New +」→「PostgreSQL」でDB作成
3. 「New +」→「Web Service」でアプリ作成
4. GitHubリポジトリを接続
5. 環境変数を設定
6. デプロイ完了
```

**ステップ3: カスタムドメイン設定**
```bash
# Renderの管理画面で
1. Settings → Custom Domains
2. 「Add Custom Domain」
3. your-quiz-app.com を入力
4. 表示されるCNAMEレコードをコピー

# お名前.comの管理画面で
1. ドメイン設定 → DNS設定
2. DNSレコード設定
3. CNAMEレコードを追加
   - ホスト名: www
   - VALUE: [Renderから取得したURL]
   - TTL: 3600
4. Aレコードを追加（ルートドメイン用）
   - ホスト名: @
   - VALUE: [RenderのIPアドレス]
5. 保存

# 数時間で反映完了
```

### プラン3: AWS（フルコントロール・学習にも最適）

#### 構成
- **ホスティング**: Elastic Beanstalk（Node.js）
- **データベース**: RDS PostgreSQL
- **ドメイン**: Route 53
- **CDN**: CloudFront
- **SSL**: ACM（AWS Certificate Manager）

#### 月額コスト
- Elastic Beanstalk: $10-20
- RDS PostgreSQL: $15-30
- Route 53: $0.50
- CloudFront: $1-5
- ドメイン: $12/年（約$1/月）
- **合計: 約$27-56/月（4,000-8,000円）**

#### セットアップ手順

**ステップ1: Route 53でドメイン取得**
```bash
1. AWSコンソール → Route 53
2. 「ドメインの登録」
3. 希望のドメインを検索・購入
4. 自動的にホストゾーンが作成される
```

**ステップ2: RDS PostgreSQL作成**
```bash
1. AWSコンソール → RDS
2. 「データベースの作成」
3. PostgreSQL選択
4. テンプレート: 本番稼働用
5. インスタンスクラス: db.t3.micro（無料枠）
6. ストレージ: 20GB
7. VPC設定
8. 作成完了
```

**ステップ3: Elastic Beanstalk設定**
```bash
# EB CLIインストール
pip install awsebcli

# 初期化
cd aws-quiz-app/server
eb init -p node.js-18 aws-quiz-app

# 環境作成
eb create production

# 環境変数設定
eb setenv DATABASE_URL=postgresql://... JWT_SECRET=...

# デプロイ
eb deploy
```

**ステップ4: ACMでSSL証明書取得**
```bash
1. AWSコンソール → Certificate Manager
2. 「証明書のリクエスト」
3. パブリック証明書
4. ドメイン名: your-quiz-app.com, *.your-quiz-app.com
5. DNS検証
6. Route 53で自動検証
```

**ステップ5: CloudFront設定**
```bash
1. AWSコンソール → CloudFront
2. 「ディストリビューションの作成」
3. オリジン: Elastic Beanstalkのドメイン
4. SSL証明書: ACMで作成した証明書
5. 代替ドメイン名: your-quiz-app.com
```

**ステップ6: Route 53でDNS設定**
```bash
1. Route 53 → ホストゾーン
2. Aレコード作成
   - 名前: your-quiz-app.com
   - タイプ: A - IPv4アドレス
   - エイリアス: はい
   - エイリアスターゲット: CloudFrontディストリビューション
```

## 📊 プラン比較表

| プラン | 月額 | 難易度 | 日本語 | 速度 | スケール | おすすめ |
|--------|------|--------|--------|------|----------|----------|
| **Railway + Cloudflare** | $6-11 | ⭐ | △ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Render + お名前.com** | $8-15 | ⭐⭐ | ◎ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **AWS フルスタック** | $27-56 | ⭐⭐⭐⭐ | ◎ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🎯 推奨プラン

### 初めてのWebアプリ公開
**Railway + Cloudflare**
- 最も簡単
- 最も安い
- 10分でセットアップ完了

### 日本語サポート重視
**Render + お名前.com**
- 日本語の情報が豊富
- サポートが日本語
- 安定性が高い

### 本格的な運用・学習目的
**AWS フルスタック**
- AWS認定試験の学習にもなる
- 最も柔軟
- エンタープライズレベル

## 🚀 最速セットアップ（Railway + Cloudflare）

### 所要時間: 約15分

```bash
# 1. Cloudflareでドメイン取得（5分）
https://www.cloudflare.com/products/registrar/

# 2. Railwayでデプロイ（5分）
https://railway.app/
→ Deploy from GitHub
→ Add PostgreSQL

# 3. カスタムドメイン設定（5分）
Railway: Settings → Custom Domain
Cloudflare: DNS → Add CNAME record

# 完了！
https://your-quiz-app.com でアクセス可能
```

## 📋 環境変数設定（全プラン共通）

```bash
# データベース
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars

# サーバー
PORT=3000
NODE_ENV=production

# CORS（独自ドメインに変更）
CORS_ORIGIN=https://your-quiz-app.com

# メール（オプション）
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# セッション
SESSION_SECRET=another-secret-key-min-32-chars
```

## 🔒 セキュリティ設定

### SSL/TLS証明書
- Railway/Render: 自動設定（Let's Encrypt）
- Cloudflare: 自動設定
- AWS: ACM（AWS Certificate Manager）

### DNS設定
```bash
# Cloudflareの場合（推奨設定）
- SSL/TLS: Full (strict)
- Always Use HTTPS: ON
- Automatic HTTPS Rewrites: ON
- Minimum TLS Version: 1.2
```

## 💰 コスト最適化

### 最小構成（月額約$6）
- Railway: $5（Hobby Plan）
- Cloudflare: $0.82（ドメイン年間$9.77）

### 推奨構成（月額約$10）
- Railway: $8（Pro Plan）
- Cloudflare: $0.82
- バックアップ: $1

### 本格運用（月額約$30-50）
- AWS Elastic Beanstalk: $15
- RDS PostgreSQL: $15
- CloudFront: $2
- Route 53: $1
- その他: $5

## 🎓 まとめ

**最もおすすめ**: **Railway + Cloudflare**
- 理由: 簡単・安い・速い
- 総コスト: 月額約$6-11（900-1,600円）
- セットアップ時間: 15分
- 独自ドメイン: ✅
- PostgreSQL: ✅
- 自動SSL: ✅
- CDN: ✅（Cloudflare）

今すぐ始められます！

---

## 📞 サポートリンク

### ホスティングサービス
- Railway: https://docs.railway.app
- Render: https://render.com/docs
- AWS: https://docs.aws.amazon.com

### ドメインレジストラ
- Cloudflare: https://developers.cloudflare.com
- お名前.com: https://www.onamae.com/guide/
- ムームードメイン: https://muumuu-domain.com/guide/

### 技術ドキュメント
- Node.js: https://nodejs.org/docs
- PostgreSQL: https://www.postgresql.org/docs/
- Express.js: https://expressjs.com/

---

**作成日**: 2026-01-23  
**対象アプリ**: aws-quiz-app  
**バージョン**: 1.0