-- 会員レベルシステムのためのマイグレーション（MySQL版）
-- 実行日: 2026-01-30

-- 1. membership_level列を追加（デフォルト: 'free'）
-- MySQLでは列が存在するかチェックしてから追加
SET @exist := (SELECT COUNT(*) FROM information_schema.COLUMNS
               WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = 'users'
               AND COLUMN_NAME = 'membership_level');

SET @sqlstmt := IF(@exist = 0,
  'ALTER TABLE users ADD COLUMN membership_level VARCHAR(20) DEFAULT ''free'' CHECK (membership_level IN (''free'', ''standard'', ''advanced''))',
  'SELECT ''Column membership_level already exists'' AS message');

PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 2. membership_expiry列を追加（有効期限）
SET @exist := (SELECT COUNT(*) FROM information_schema.COLUMNS
               WHERE TABLE_SCHEMA = DATABASE()
               AND TABLE_NAME = 'users'
               AND COLUMN_NAME = 'membership_expiry');

SET @sqlstmt := IF(@exist = 0,
  'ALTER TABLE users ADD COLUMN membership_expiry TIMESTAMP NULL',
  'SELECT ''Column membership_expiry already exists'' AS message');

PREPARE stmt FROM @sqlstmt;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 3. 既存ユーザーのデフォルト値を設定
UPDATE users
SET membership_level = 'free'
WHERE membership_level IS NULL;

-- 4. インデックスを追加（検索パフォーマンス向上）
CREATE INDEX IF NOT EXISTS idx_users_membership_level ON users(membership_level);
CREATE INDEX IF NOT EXISTS idx_users_membership_expiry ON users(membership_expiry);

-- 5. コメントを追加（MySQL版）
ALTER TABLE users MODIFY COLUMN membership_level VARCHAR(20) DEFAULT 'free'
  COMMENT '会員レベル: free, standard, advanced';
ALTER TABLE users MODIFY COLUMN membership_expiry TIMESTAMP NULL
  COMMENT '会員有効期限（NULL = 無期限/Free会員）';

-- 確認用クエリ
SELECT
    COLUMN_NAME as column_name,
    DATA_TYPE as data_type,
    COLUMN_DEFAULT as column_default,
    IS_NULLABLE as is_nullable,
    COLUMN_COMMENT as column_comment
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
AND TABLE_NAME = 'users'
AND COLUMN_NAME IN ('membership_level', 'membership_expiry');

-- Made with Bob
