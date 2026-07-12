-- Supabase Database Schema for AWS Quiz App
-- Run this in Supabase Dashboard → SQL Editor

-- ユーザーテーブル
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

-- リフレッシュトークンテーブル
CREATE TABLE IF NOT EXISTS refresh_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    device_info TEXT,
    ip_address VARCHAR(45),
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- パスワードリセットテーブル
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 決済履歴テーブル（オプション）
CREATE TABLE IF NOT EXISTS payment_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    stripe_session_id VARCHAR(255),
    amount INTEGER,
    currency VARCHAR(3),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- インデックス作成
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

-- updated_atの自動更新用トリガー関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- usersテーブルのupdated_at自動更新トリガー
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) 有効化
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE refresh_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- RLSポリシー（サービスロールは全アクセス可能）
-- ユーザーは自分のデータのみアクセス可能
CREATE POLICY "Users can view own data" ON users
    FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON users
    FOR UPDATE 
    USING (auth.uid() = id);

CREATE POLICY "Service role has full access to users" ON users
    FOR ALL 
    USING (auth.role() = 'service_role');

-- リフレッシュトークンのポリシー
CREATE POLICY "Users can view own tokens" ON refresh_tokens
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Service role has full access to refresh_tokens" ON refresh_tokens
    FOR ALL 
    USING (auth.role() = 'service_role');

-- パスワードリセットトークンのポリシー
CREATE POLICY "Service role has full access to password_reset_tokens" ON password_reset_tokens
    FOR ALL 
    USING (auth.role() = 'service_role');

-- 決済履歴のポリシー
CREATE POLICY "Users can view own payment history" ON payment_history
    FOR SELECT 
    USING (auth.uid() = user_id);

CREATE POLICY "Service role has full access to payment_history" ON payment_history
    FOR ALL 
    USING (auth.role() = 'service_role');

-- ============================================================
-- 学習履歴テーブル
-- ============================================================

-- 学習セッション（クイズ1回分の記録）
CREATE TABLE IF NOT EXISTS study_sessions (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_type    VARCHAR(20) NOT NULL,   -- 'clf' | 'aif' | 'saa' | 'dva'
    mode         VARCHAR(20) NOT NULL,   -- 'sequential' | 'random' | 'category' | 'mock-exam'
    category     VARCHAR(100),           -- カテゴリ別モード時のカテゴリ名
    total_q      INTEGER NOT NULL,       -- 出題数
    correct_q    INTEGER NOT NULL,       -- 正解数
    elapsed_sec  INTEGER,                -- 所要秒数（模擬試験用）
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 問題単位の回答記録（Standard/Advanced会員向け詳細記録）
CREATE TABLE IF NOT EXISTS study_answers (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id   UUID REFERENCES study_sessions(id) ON DELETE CASCADE,
    user_id      UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_type    VARCHAR(20) NOT NULL,
    question_id  INTEGER NOT NULL,       -- questions-xxx.js の id フィールド
    selected     SMALLINT NOT NULL,      -- ユーザーが選択した選択肢インデックス (0-3)
    correct      SMALLINT NOT NULL,      -- 正解インデックス
    is_correct   BOOLEAN NOT NULL,
    created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- インデックス
CREATE INDEX IF NOT EXISTS idx_study_sessions_user_id    ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_exam_type  ON study_sessions(exam_type);
CREATE INDEX IF NOT EXISTS idx_study_sessions_created_at ON study_sessions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_study_answers_session_id  ON study_answers(session_id);
CREATE INDEX IF NOT EXISTS idx_study_answers_user_id     ON study_answers(user_id);
CREATE INDEX IF NOT EXISTS idx_study_answers_exam_type   ON study_answers(exam_type);
CREATE INDEX IF NOT EXISTS idx_study_answers_question_id ON study_answers(question_id);

-- RLS有効化
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_answers   ENABLE ROW LEVEL SECURITY;

-- RLSポリシー: 自分のデータのみ参照可
CREATE POLICY "Users can view own study_sessions" ON study_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to study_sessions" ON study_sessions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Users can view own study_answers" ON study_answers
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to study_answers" ON study_answers
    FOR ALL USING (auth.role() = 'service_role');

-- 完了メッセージ
DO $$
BEGIN
    RAISE NOTICE 'Database schema created successfully!';
    RAISE NOTICE 'Tables: users, refresh_tokens, password_reset_tokens, payment_history, study_sessions, study_answers';
    RAISE NOTICE 'RLS policies enabled for all tables';
END $$;

-- Made with Bob
