# 最新デプロイメントオプション（2026年版）

## ⚠️ 重要な変更

**PlanetScale無料プラン廃止**（2024年4月）
- Hobby プランは廃止されました
- 最安プラン: Scaler ($29/月)

## 💰 現実的な最安プラン（2026年版）

### プラン1: VPS（最もコスパ良い）⭐ 推奨

**ConoHa VPS 512MBプラン**

**月額**: 580円（493円 + ドメイン83円）

**構成**:
- VPS: ConoHa 512MB（493円/月）
- MySQL: VPS内で稼働（無料）
- ドメイン: お名前.com（1,000円/年）
- メール: ImprovMX（無料）
- SSL: Let's Encrypt（無料）

**メリット**:
- ✅ 完全な自由度
- ✅ MySQL使用可能
- ✅ 30GB SSD
- ✅ 転送量無制限
- ✅ 既存コードそのまま

**デメリット**:
- ❌ サーバー管理が必要
- ❌ 初期設定に時間がかかる

---

### プラン2: Supabase + Cloudflare（最安だがPostgreSQL）

**月額**: 83円（ドメイン代のみ）

**構成**:
- Supabase: PostgreSQL 500MB（無料）
- Cloudflare Pages: 静的ホスティング（無料）
- Cloudflare Workers: API（無料）
- ドメイン: お名前.com（1,000円/年）
- メール: ImprovMX（無料）

**メリット**:
- ✅ 超低コスト
- ✅ サーバー管理不要
- ✅ 自動バックアップ
- ✅ 自動スケーリング

**デメリット**:
- ❌ MySQLからPostgreSQLへの移行が必要
- ❌ コード書き換えが必要
- ❌ 容量500MB（小規模向け）

---

### プラン3: Railway（MySQL使用可能）

**月額**: 約700円（$5 = 約700円）

**構成**:
- Railway: MySQL + Node.js（$5/月）
- ドメイン: お名前.com（1,000円/年 = 83円/月）
- メール: ImprovMX（無料）

**スペック**:
- MySQL: 8GB
- メモリ: 512MB
- 実行時間: 500時間/月

**メリット**:
- ✅ MySQL使用可能
- ✅ 簡単デプロイ
- ✅ GitHub連携
- ✅ 自動SSL

**デメリット**:
- ❌ クレジットカード必須
- ❌ VPSより高い

---

### プラン4: Render（MySQL使用可能）

**月額**: 約1,100円（$7 = 約1,000円 + ドメイン83円）

**構成**:
- Render Web Service: Node.js（$7/月）
- Render PostgreSQL: 無料（または MySQL外部）
- ドメイン: お名前.com（1,000円/年）

**メリット**:
- ✅ 簡単デプロイ
- ✅ 自動SSL
- ✅ GitHub連携

**デメリット**:
- ❌ 高価
- ❌ MySQL有料（外部DB必要）

---

## 📊 2026年版 完全比較表

| プラン | 月額 | DB | 容量 | 管理 | MySQL | 推奨度 |
|--------|------|-----|------|------|-------|--------|
| **ConoHa VPS** | **580円** | MySQL | 30GB | 必要 | ✅ | ⭐⭐⭐⭐⭐ |
| Supabase | 83円 | PostgreSQL | 500MB | 不要 | ❌ | ⭐⭐⭐⭐ |
| Railway | 700円 | MySQL | 8GB | 不要 | ✅ | ⭐⭐⭐ |
| Render | 1,100円 | PostgreSQL | 1GB | 不要 | ❌ | ⭐⭐ |
| さくらVPS | 590円 | MySQL | 20GB | 必要 | ✅ | ⭐⭐⭐⭐ |

---

## 🎯 ケース別推奨プラン

### ケース1: MySQLを使い続けたい + コスト重視

**推奨**: ConoHa VPS（580円/月）

**理由**:
- 既存のMySQLコードがそのまま動く
- 最もコスパが良い
- 完全な自由度

**デメリット**: サーバー管理が必要

---

### ケース2: とにかく最安 + PostgreSQL移行OK

**推奨**: Supabase + Cloudflare（83円/月）

**理由**:
- 圧倒的に安い
- サーバー管理不要
- 自動バックアップ

**デメリット**: MySQLからPostgreSQLへの移行が必要

---

### ケース3: MySQL + サーバー管理したくない

**推奨**: Railway（700円/月）

**理由**:
- MySQL使用可能
- 簡単デプロイ
- サーバー管理不要

**デメリット**: VPSより高い

---

## 💡 最終推奨

### 初心者・小規模サービス

**Supabase + Cloudflare（83円/月）**
- PostgreSQLへの移行は意外と簡単
- サーバー管理不要
- 圧倒的に安い

### 中規模サービス・MySQL必須

**ConoHa VPS（580円/月）**
- 既存コードそのまま
- コスパ最高
- 拡張性あり

### サーバー管理したくない + MySQL必須

**Railway（700円/月）**
- MySQL使用可能
- 簡単デプロイ
- 自動スケーリング

---

## 🔄 MySQLからPostgreSQLへの移行

### 主な違い

| 項目 | MySQL | PostgreSQL |
|------|-------|------------|
| 自動増分 | `AUTO_INCREMENT` | `SERIAL` または `IDENTITY` |
| 文字列連結 | `CONCAT()` | `\|\|` |
| 日付関数 | `NOW()` | `NOW()` または `CURRENT_TIMESTAMP` |
| LIMIT | `LIMIT 10` | `LIMIT 10` |
| 大文字小文字 | 区別しない | 区別する |

### 移行手順

#### 1. テーブル定義の変更

**MySQL**:
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**PostgreSQL**:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. クエリの変更

**MySQL**:
```javascript
const [rows] = await connection.execute(
    'SELECT * FROM users WHERE id = ?',
    [userId]
);
```

**PostgreSQL（Supabase）**:
```javascript
const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
```

### 移行ツール

- **pgloader**: MySQL → PostgreSQL自動移行
- **AWS DMS**: データベース移行サービス
- **手動**: SQLダンプ → 変換 → インポート

---

## 🚀 実際のデプロイ手順

### オプション1: ConoHa VPS（推奨）

詳細は `aws/DEPLOYMENT_COST_GUIDE.md` を参照

**概要**:
1. ConoHa VPSで512MBプラン契約（5分）
2. Ubuntu 22.04インストール（自動）
3. MySQL、Node.js、Nginxインストール（10分）
4. アプリケーションデプロイ（20分）
5. SSL証明書取得（5分）
6. DNS設定（1日）

**合計時間**: 約1時間 + DNS反映待ち

---

### オプション2: Supabase + Cloudflare

詳細は `aws/SUPABASE_DEPLOYMENT_GUIDE.md` を参照

**概要**:
1. Supabaseプロジェクト作成（5分）
2. テーブル作成（10分）
3. コード修正（PostgreSQL対応）（1-2時間）
4. Cloudflare Pagesデプロイ（10分）
5. DNS設定（1日）

**合計時間**: 約2-3時間 + DNS反映待ち

---

### オプション3: Railway

**概要**:
1. Railwayアカウント作成（2分）
2. GitHubリポジトリ接続（3分）
3. MySQL追加（2分）
4. 環境変数設定（5分）
5. デプロイ（自動、5分）
6. カスタムドメイン設定（5分）

**合計時間**: 約20分

---

## 💰 年間コスト比較

| プラン | 月額 | 年額 | 初期費用 | 合計（初年度） |
|--------|------|------|----------|----------------|
| ConoHa VPS | 580円 | 6,960円 | 1,000円 | 7,960円 |
| Supabase | 83円 | 996円 | 1,000円 | 1,996円 |
| Railway | 700円 | 8,400円 | 1,000円 | 9,400円 |
| さくらVPS | 590円 | 7,080円 | 1,000円 | 8,080円 |

**最安**: Supabase（年間1,996円）
**MySQL最安**: ConoHa VPS（年間7,960円）

---

## ✅ 結論

### 2026年の現実的な選択肢

1. **最安重視**: Supabase（83円/月）
   - PostgreSQL移行が必要
   - サーバー管理不要

2. **MySQL + コスパ**: ConoHa VPS（580円/月）
   - 既存コードそのまま
   - サーバー管理必要

3. **MySQL + 管理不要**: Railway（700円/月）
   - 既存コードほぼそのまま
   - 簡単デプロイ

### 私の推奨

**初めてのサービス**: Supabase（83円/月）
- 圧倒的に安い
- PostgreSQL移行は1-2時間で完了
- サーバー管理不要

**本格的なサービス**: ConoHa VPS（580円/月）
- コスパ最高
- 完全な自由度
- 拡張性あり

**時間がない**: Railway（700円/月）
- 最速デプロイ（20分）
- MySQL使用可能
- サーバー管理不要