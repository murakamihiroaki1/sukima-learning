-- お問い合わせテーブルの作成
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    category_ja VARCHAR(100),
    subject VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックスの作成
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- RLSポリシーの設定（管理者のみアクセス可能）
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- サービスロールキーでのみアクセス可能（バックエンドから）
CREATE POLICY "Service role can manage contact submissions"
ON contact_submissions
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- コメント
COMMENT ON TABLE contact_submissions IS 'お問い合わせフォームの送信内容を保存';
COMMENT ON COLUMN contact_submissions.status IS 'new: 未対応, in_progress: 対応中, resolved: 対応完了';

-- Made with Bob
