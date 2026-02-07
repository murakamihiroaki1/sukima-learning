# MySQL → PostgreSQL (Supabase) 移行ガイド

現在のコードはMySQL用に書かれています。Supabase（PostgreSQL）に移行する際の主な違いと必要な修正をまとめます。

---

## 📋 主な違い

| 項目 | MySQL | PostgreSQL | 影響度 |
|------|-------|-----------|--------|
| **プレースホルダー** | `?` | `$1, $2, $3` | 🔴 高 |
| **AUTO_INCREMENT** | `AUTO_INCREMENT` | `SERIAL` or `UUID` | 🔴 高 |
| **INSERT結果** | `insertId` | `RETURNING *` | 🔴 高 |
| **大文字小文字** | 区別しない | 区別する | 🟡 中 |
| **文字列連結** | `CONCAT()` | `\|\|` | 🟢 低 |
| **日付関数** | `NOW()` | `NOW()` | ✅ 同じ |
| **LIMIT構文** | `LIMIT n` | `LIMIT n` | ✅ 同じ |

---

## 🔧 必要な修正

### 1. プレースホルダーの変更

#### 現在のコード（MySQL）
```javascript
// db.js - MySQLの?をそのまま使用
const result = await pool.execute(
  'SELECT * FROM users WHERE email = ?',
  [email]
);
```

#### 修正後（PostgreSQL）
```javascript
// Supabaseクライアントを使用
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', email)
  .single();
```

または、生のSQLを使う場合：
```javascript
// PostgreSQLの$1, $2を使用
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
```

---

### 2. データベース接続の変更

#### 現在のコード（MySQL）
```javascript
// aws/server/database/db.js
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
```

#### 修正後（Supabase）

**オプション1: Supabase JavaScript Client（推奨）**
```javascript
// database/supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = supabase;
```

**オプション2: PostgreSQL直接接続**
```javascript
// database/db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// PostgreSQL用のquery関数
const query = async (text, params) => {
  const start = Date.now();
  const result = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: result.rowCount });
  return result;
};

module.exports = { pool, query };
```

---

### 3. ユーザーモデルの修正

#### 現在のコード（MySQL）
```javascript
// aws/server/database/users.js
async createUser(userData) {
  const { username, email, password } = userData;
  
  const result = await query(
    `INSERT INTO users (username, email, password)
     VALUES (?, ?, ?)`,
    [username, email, password]
  );
  
  // MySQLのinsertIdを使用
  const user = await query(
    'SELECT * FROM users WHERE id = ?',
    [result.insertId]
  );
  
  return user.rows[0];
}
```

#### 修正後（Supabase Client）
```javascript
// database/users.js
const supabase = require('./supabase');

async createUser(userData) {
  const { username, email, password } = userData;
  
  // Supabaseクライアントを使用
  const { data, error } = await supabase
    .from('users')
    .insert({
      username,
      email,
      password
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

async findByEmail(email) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 = not found
  return data;
}

async findById(id) {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, email, membership_level, membership_expiry, created_at, updated_at')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

async updateUser(id, updates) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}
```

#### 修正後（PostgreSQL直接）
```javascript
// database/users.js
const { query } = require('./db');

async createUser(userData) {
  const { username, email, password } = userData;
  
  // PostgreSQLのRETURNINGを使用
  const result = await query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, username, email, membership_level, membership_expiry, created_at, updated_at`,
    [username, email, password]
  );
  
  return result.rows[0];
}

async findByEmail(email) {
  const result = await query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  
  return result.rows[0];
}

async findById(id) {
  const result = await query(
    'SELECT id, username, email, membership_level, membership_expiry, created_at, updated_at FROM users WHERE id = $1',
    [id]
  );
  
  return result.rows[0];
}

async updateUser(id, updates) {
  const { username, email, password } = updates;
  const fields = [];
  const values = [];
  let paramIndex = 1;

  if (username) {
    fields.push(`username = $${paramIndex++}`);
    values.push(username);
  }
  if (email) {
    fields.push(`email = $${paramIndex++}`);
    values.push(email);
  }
  if (password) {
    fields.push(`password = $${paramIndex++}`);
    values.push(password);
  }

  if (fields.length === 0) {
    throw new Error('No fields to update');
  }

  values.push(id);
  
  const result = await query(
    `UPDATE users
     SET ${fields.join(', ')}
     WHERE id = $${paramIndex}
     RETURNING id, username, email, created_at, updated_at`,
    values
  );
  
  return result.rows[0];
}
```

---

### 4. スキーマの変更

#### 現在のスキーマ（MySQL）
```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Free',
    membership_expiry DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 修正後（PostgreSQL）
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Free',
    membership_expiry TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- updated_atの自動更新用トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

---

### 5. 認証ルートの修正

#### 現在のコード（MySQL）
```javascript
// aws/server/routes/auth.js
const db = require('../database/db');
await db.query(
  'UPDATE users SET membership_level = ?, membership_expiry = NULL WHERE id = ?',
  ['free', user.id]
);
```

#### 修正後（Supabase）
```javascript
// routes/auth.js
const supabase = require('../database/supabase');

await supabase
  .from('users')
  .update({
    membership_level: 'free',
    membership_expiry: null
  })
  .eq('id', user.id);
```

---

### 6. package.jsonの変更

#### 現在（MySQL）
```json
{
  "dependencies": {
    "mysql2": "^3.6.0"
  }
}
```

#### 修正後（Supabase）
```json
{
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0"
  }
}
```

または（PostgreSQL直接）
```json
{
  "dependencies": {
    "pg": "^8.11.0"
  }
}
```

---

## 🚀 移行手順

### ステップ1: 依存関係の変更

```bash
# MySQLパッケージを削除
npm uninstall mysql2

# Supabaseクライアントをインストール
npm install @supabase/supabase-js

# または、PostgreSQL直接接続の場合
npm install pg
```

### ステップ2: 環境変数の変更

#### .env（MySQL）
```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=aws_quiz_db
DB_USER=root
DB_PASSWORD=your_password
```

#### .env（Supabase）
```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### ステップ3: データベース接続ファイルの置き換え

```bash
# 古いファイルをバックアップ
mv aws/server/database/db.js aws/server/database/db.js.mysql.backup

# 新しいファイルを作成
# database/supabase.js を作成（上記のコード参照）
```

### ステップ4: 各モデルファイルの修正

- `database/users.js`
- `database/refreshTokens.js`
- `database/passwordReset.js`

すべてのクエリを Supabase Client または PostgreSQL構文に変更

### ステップ5: ルートファイルの修正

- `routes/auth.js`
- `routes/membership.js`
- `routes/stripe-webhook.js`

直接SQLを使用している箇所を修正

### ステップ6: テスト

```bash
# ローカルでテスト
npm run dev

# 各エンドポイントをテスト
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'
```

---

## ✅ チェックリスト

- [ ] `package.json` の依存関係を変更
- [ ] `.env` ファイルを更新
- [ ] `database/supabase.js` を作成
- [ ] `database/users.js` を修正
- [ ] `database/refreshTokens.js` を修正
- [ ] `database/passwordReset.js` を修正
- [ ] `routes/auth.js` を修正
- [ ] `routes/membership.js` を修正
- [ ] `routes/stripe-webhook.js` を修正
- [ ] Supabaseでスキーマを作成
- [ ] ローカルテスト実行
- [ ] 本番デプロイ

---

## 🎯 推奨アプローチ

### オプション1: Supabase JavaScript Client（推奨）

**メリット**:
- ✅ 型安全
- ✅ 自動的なエラーハンドリング
- ✅ Row Level Security (RLS) サポート
- ✅ リアルタイム機能
- ✅ シンプルなAPI

**デメリット**:
- ❌ 複雑なクエリには不向き
- ❌ 既存コードの大幅な書き換えが必要

### オプション2: PostgreSQL直接接続

**メリット**:
- ✅ 既存のコード構造を維持しやすい
- ✅ 複雑なクエリに対応
- ✅ プレースホルダーを変更するだけ（`?` → `$1`）

**デメリット**:
- ❌ RLS機能を使えない
- ❌ Supabaseの便利機能を使えない

---

## 💡 結論

**Cloudflare Workersでデプロイする場合**: Supabase JavaScript Clientを使用（推奨）

**Node.js/Expressサーバーでデプロイする場合**: PostgreSQL直接接続も可能

現在のコード構造を考えると、**Supabase JavaScript Client**への移行が最も効率的です。

---

## 📚 参考リンク

- [Supabase JavaScript Client Documentation](https://supabase.com/docs/reference/javascript/introduction)
- [PostgreSQL vs MySQL Syntax](https://wiki.postgresql.org/wiki/Things_to_find_out_about_when_moving_from_MySQL_to_PostgreSQL)
- [Node.js pg Driver](https://node-postgres.com/)