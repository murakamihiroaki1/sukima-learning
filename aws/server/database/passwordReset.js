const supabase = require('./supabase');
const crypto = require('crypto');

// パスワードリセットトークンを生成
const generateResetToken = () => {
  return crypto.randomBytes(32).toString('hex');
};

// パスワードリセットトークンを作成
const createResetToken = async (userId) => {
  const token = generateResetToken();
  const expiresAt = new Date(Date.now() + 3600000); // 1時間後

  const { data, error } = await supabase
    .from('password_reset_tokens')
    .insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString()
    })
    .select('id, token, expires_at')
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// トークンを検証
const verifyResetToken = async (token) => {
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .select(`
      *,
      users!inner (
        id,
        email,
        username
      )
    `)
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
    .eq('used', false)
    .single();
  
  if (error && error.code !== 'PGRST116') { // PGRST116 = not found
    throw error;
  }
  
  if (!data) {
    return null;
  }
  
  // データ構造を整形
  return {
    ...data,
    user_id: data.users.id,
    email: data.users.email,
    username: data.users.username
  };
};

// トークンを使用済みにする
const markTokenAsUsed = async (token) => {
  const { error } = await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('token', token);
  
  if (error) {
    throw error;
  }
};

// 期限切れトークンを削除
const cleanupExpiredTokens = async () => {
  const { data, error } = await supabase
    .from('password_reset_tokens')
    .delete()
    .or(`expires_at.lt.${new Date().toISOString()},used.eq.true`)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data ? data.length : 0;
};

// ユーザーの未使用トークンを無効化
const invalidateUserTokens = async (userId) => {
  const { error } = await supabase
    .from('password_reset_tokens')
    .update({ used: true })
    .eq('user_id', userId)
    .eq('used', false);
  
  if (error) {
    throw error;
  }
};

module.exports = {
  generateResetToken,
  createResetToken,
  verifyResetToken,
  markTokenAsUsed,
  cleanupExpiredTokens,
  invalidateUserTokens
};

// Made with Bob
