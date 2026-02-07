# 会員レベルシステム実装ガイド

## 📋 概要

AWS認定試験対策アプリに3段階の会員レベルシステムを実装しました。

### 会員レベル

| レベル | 料金 | 有効期限 | 説明 |
|--------|------|----------|------|
| **Free** | 無料 | 無期限 | 基本機能のみ利用可能 |
| **Standard** | 980円/月 | 30日間 | 標準機能が利用可能 |
| **Advanced** | 1,980円/月 | 30日間 | すべての機能が利用可能 |

## 🗄️ データベース変更

### 追加されたカラム

```sql
-- usersテーブルに追加
membership_level VARCHAR(20) DEFAULT 'free'  -- 会員レベル
membership_expiry TIMESTAMP                   -- 有効期限
```

### マイグレーション実行

```bash
cd aws-quiz-app/server
node database/run-migration.js
```

## 🔧 実装ファイル

### バックエンド

1. **データベースマイグレーション**
   - `server/database/migrations/add_membership_fields.sql`
   - `server/database/run-migration.js`

2. **会員レベルモデル**
   - `server/models/membership.js`
   - 会員レベルの定数、ヘルパー関数

3. **会員レベルAPI**
   - `server/routes/membership.js`
   - エンドポイント:
     - `GET /api/membership/info` - 会員情報取得
     - `POST /api/membership/upgrade` - プランアップグレード
     - `POST /api/membership/renew` - プラン更新
     - `POST /api/membership/downgrade` - ダウングレード
     - `GET /api/membership/plans` - プラン一覧

4. **認証API更新**
   - `server/routes/auth.js`
   - 新規登録時: デフォルトでFreeレベル
   - ログイン時: 会員情報を返す
   - `/me`エンドポイント: 会員情報を含む

5. **サーバー設定**
   - `server/server.js`
   - membershipルートを追加

## 📡 API仕様

### 1. 会員情報取得

```http
GET /api/membership/info
Authorization: Bearer {token}
```

**レスポンス:**
```json
{
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  },
  "membership": {
    "level": "free",
    "displayName": "Free",
    "description": "基本機能のみ利用可能",
    "price": 0,
    "expiry": null,
    "expiryFormatted": null,
    "isValid": true,
    "daysRemaining": null,
    "isFree": true
  }
}
```

### 2. プランアップグレード

```http
POST /api/membership/upgrade
Authorization: Bearer {token}
Content-Type: application/json

{
  "plan": "standard"  // または "advanced"
}
```

**レスポンス:**
```json
{
  "message": "Standardプランへのアップグレードが完了しました",
  "membership": {
    "level": "standard",
    "displayName": "Standard",
    "expiry": "2026-02-22T17:00:00.000Z",
    "expiryFormatted": "2026/2/22",
    "isValid": true,
    "daysRemaining": 30,
    "isFree": false
  }
}
```

### 3. プラン更新（延長）

```http
POST /api/membership/renew
Authorization: Bearer {token}
```

### 4. ダウングレード

```http
POST /api/membership/downgrade
Authorization: Bearer {token}
```

### 5. プラン一覧取得

```http
GET /api/membership/plans
```

**レスポンス:**
```json
{
  "plans": [
    {
      "level": "free",
      "name": "Free",
      "price": 0,
      "description": "基本機能のみ利用可能",
      "features": [
        "基本問題へのアクセス",
        "学習履歴の保存",
        "広告表示あり"
      ]
    },
    {
      "level": "standard",
      "name": "Standard",
      "price": 980,
      "description": "標準機能が利用可能",
      "features": [
        "すべての問題へのアクセス",
        "詳細な学習分析",
        "広告非表示",
        "模擬試験機能"
      ]
    },
    {
      "level": "advanced",
      "name": "Advanced",
      "price": 1980,
      "description": "すべての機能が利用可能",
      "features": [
        "Standardの全機能",
        "個別学習プラン",
        "優先サポート",
        "新機能の先行アクセス",
        "オフライン学習機能"
      ]
    }
  ]
}
```

## 🎨 フロントエンド実装（TODO）

### 必要な画面

1. **会員情報表示**
   - ログイン後のヘッダーに表示
   - 現在のレベル
   - 有効期限（Standard/Advancedの場合）
   - 残り日数

2. **プラン選択画面**
   - 3つのプランを比較表示
   - 各プランの機能一覧
   - アップグレードボタン

3. **決済画面**
   - クレジットカード情報入力
   - 決済処理（Stripe等）

### サンプルコード

```javascript
// 会員情報を取得
async function getMembershipInfo() {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:3000/api/membership/info', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    return data.membership;
}

// プランをアップグレード
async function upgradePlan(plan) {
    const token = localStorage.getItem('accessToken');
    const response = await fetch('http://localhost:3000/api/membership/upgrade', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ plan })
    });
    return await response.json();
}

// 会員情報を表示
async function displayMembershipInfo() {
    const membership = await getMembershipInfo();
    
    document.getElementById('membership-level').textContent = membership.displayName;
    
    if (!membership.isFree) {
        document.getElementById('expiry-date').textContent = membership.expiryFormatted;
        document.getElementById('days-remaining').textContent = `残り${membership.daysRemaining}日`;
    }
}
```

## 🔐 セキュリティ

- すべてのエンドポイントは認証が必要（JWTトークン）
- 会員レベルはサーバー側で管理
- 有効期限の検証はサーバー側で実施
- SQLインジェクション対策済み

## 📊 会員レベルの判定

```javascript
// models/membership.js
function isMembershipValid(membershipExpiry) {
    if (!membershipExpiry) {
        return true; // Free会員は常に有効
    }
    
    const now = new Date();
    const expiry = new Date(membershipExpiry);
    return expiry > now;
}
```

## 🚀 デプロイ手順

1. **データベースマイグレーション**
   ```bash
   cd aws-quiz-app/server
   node database/run-migration.js
   ```

2. **環境変数設定**
   ```bash
   # .env
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   JWT_SECRET=your-secret-key
   ```

3. **サーバー起動**
   ```bash
   npm start
   ```

## 📝 今後の拡張

- [ ] 決済システム統合（Stripe）
- [ ] 自動更新機能
- [ ] プラン変更履歴
- [ ] 請求書発行
- [ ] クーポン機能
- [ ] 無料トライアル期間
- [ ] 年間プラン（割引）

## 🐛 トラブルシューティング

### マイグレーションエラー

```bash
# エラー: relation "users" does not exist
# 解決: usersテーブルを先に作成
node database/init.js
```

### 会員情報が表示されない

```bash
# 確認: データベースにカラムが追加されているか
psql -d dbname -c "SELECT column_name FROM information_schema.columns WHERE table_name='users' AND column_name IN ('membership_level', 'membership_expiry');"
```

## 📞 サポート

問題が発生した場合は、以下を確認してください：

1. データベースマイグレーションが完了しているか
2. サーバーが正しく起動しているか
3. JWTトークンが有効か
4. 環境変数が正しく設定されているか

---

**作成日**: 2026-01-23  
**バージョン**: 1.0.0