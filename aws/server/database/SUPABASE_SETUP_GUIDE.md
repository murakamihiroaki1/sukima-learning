# Supabase データベースセットアップガイド

Supabase SQL Editorで以下のSQLを**順番に**実行してください。

**重要**: Supabase SQL Editorの左下にある「RLS disabled」トグルをOFFにしてから実行してください。

---

## ステップ1: テーブル作成

### 1-1. usersテーブル

```sql
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    membership_level VARCHAR(20) DEFAULT 'Free',
    membership_expiry TIMESTAMP,
    stripe_customer_id VARCHAR(255),
    stripe_subscription_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### 1-2. refresh_tokensテーブル

```sql
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    device_info TEXT,
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 1-3. password_reset_tokensテーブル

```sql
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### 1-4. payment_historyテーブル（オプション）

```sql
CREATE TABLE IF NOT EXISTS payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_session_id VARCHAR(255),
    amount INTEGER,
    currency VARCHAR(3),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## ステップ2: インデックス作成

```sql
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_membership_level ON users(membership_level);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_token ON refresh_tokens(token);
CREATE INDEX IF NOT EXISTS idx_refresh_tokens_expires_at ON refresh_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_user_id ON password_reset_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_token ON password_reset_tokens(token);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_expires_at ON password_reset_tokens(expires_at);
CREATE INDEX IF NOT EXISTS idx_payment_history_user_id ON payment_history(user_id);
```

---

## ステップ3: トリガー関数作成

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
```

---

## ステップ4: トリガー設定

```sql
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

---

## ステップ5: Row Level Security (RLS) 有効化

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;
```

---

## ステップ6: RLSポリシー作成

### 6-1. usersテーブルのポリシー

```sql
CREATE POLICY "Users can view own data" ON users
    FOR SELECT 
    USING (auth.uid() = id);
```

```sql
CREATE POLICY "Users can update own data" ON users
    FOR UPDATE 
    USING (auth.uid() = id);
```

```sql
CREATE POLICY "Service role has full access to users" ON users
    FOR ALL 
    USING (auth.role() = 'service_role');
```

### 6-2. refresh_tokensテーブルのポリシー

```sql
CREATE POLICY "Users can view own tokens" ON refresh_tokens
    FOR SELECT 
    USING (auth.uid() = user_id);
```

```sql
CREATE POLICY "Service role has full access to refresh_tokens" ON refresh_tokens
    FOR ALL 
    USING (auth.role() = 'service_role');
```

### 6-3. password_reset_tokensテーブルのポリシー

```sql
CREATE POLICY "Service role has full access to password_reset_tokens" ON password_reset_tokens
    FOR ALL 
    USING (auth.role() = 'service_role');
```

### 6-4. payment_historyテーブルのポリシー

```sql
CREATE POLICY "Users can view own payment history" ON payment_history
    FOR SELECT 
    USING (auth.uid() = user_id);
```

```sql
CREATE POLICY "Service role has full access to payment_history" ON payment_history
    FOR ALL 
    USING (auth.role() = 'service_role');
```

---

## ✅ 完了確認

すべてのSQLを実行後、以下のクエリで確認：

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;
```

以下の4つのテーブルが表示されればOK：
- `payment_history`
- `password_reset_tokens`
- `refresh_tokens`
- `users`

---

## 🚀 次のステップ

1. サーバーを再起動：
   ```bash
   npm run dev
   ```

2. エラーなく起動することを確認

3. APIテスト：
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"username":"testuser","email":"test@example.com","password":"password123"}'
   ```

---

## 📝 注意事項

- **RLS (Row Level Security)** が有効になっているため、サーバーサイドでは`SUPABASE_SECRET_KEY`を使用する必要があります
- `SUPABASE_PUBLISHABLE_KEY`では、RLSポリシーにより制限されたデータのみアクセス可能です
- 本番環境では、適切なRLSポリシーを設定してください