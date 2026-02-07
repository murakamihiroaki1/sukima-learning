const { createClient } = require('@supabase/supabase-js');

// Supabaseクライアントを作成
// サーバーサイドではSECRET_KEY (旧service_role key)を使用
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// 接続テスト
(async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1);
    if (error && error.code !== 'PGRST116') { // PGRST116 = table not found (初回は正常)
      console.error('❌ Supabase connection error:', error);
    } else {
      console.log('✅ Supabase connected');
    }
  } catch (err) {
    console.error('❌ Supabase connection error:', err);
  }
})();

module.exports = supabase;

// Made with Bob