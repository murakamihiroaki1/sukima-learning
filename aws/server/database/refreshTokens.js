const supabase = require('./supabase');
const crypto = require('crypto');

// リフレッシュトークンを生成
const generateRefreshToken = () => {
  return crypto.randomBytes(64).toString('hex');
};

// リフレッシュトークンを作成
const createRefreshToken = async (userId, deviceInfo, ipAddress) => {
  const token = generateRefreshToken();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7日後

  const { data, error } = await supabase
    .from('refresh_tokens')
    .insert({
      user_id: userId,
      token,
      device_info: deviceInfo,
      ip_address: ipAddress,
      expires_at: expiresAt.toISOString()
    })
    .select('id, token, expires_at')
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

// リフレッシュトークンを検証
const verifyRefreshToken = async (token) => {
  const { data, error } = await supabase
    .from('refresh_tokens')
    .select(`
      *,
      users!inner (
        id,
        username,
        email
      )
    `)
    .eq('token', token)
    .gt('expires_at', new Date().toISOString())
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
    username: data.users.username,
    email: data.users.email
  };
};

// リフレッシュトークンを削除
const deleteRefreshToken = async (token) => {
  const { error } = await supabase
    .from('refresh_tokens')
    .delete()
    .eq('token', token);
  
  if (error) {
    throw error;
  }
};

// ユーザーの全リフレッシュトークンを削除（ログアウト全デバイス）
const deleteAllUserTokens = async (userId) => {
  const { data, error } = await supabase
    .from('refresh_tokens')
    .delete()
    .eq('user_id', userId)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data ? data.length : 0;
};

// 期限切れトークンを削除
const cleanupExpiredTokens = async () => {
  const { data, error } = await supabase
    .from('refresh_tokens')
    .delete()
    .lt('expires_at', new Date().toISOString())
    .select();
  
  if (error) {
    throw error;
  }
  
  return data ? data.length : 0;
};

// ユーザーのアクティブなセッション一覧を取得
const getUserSessions = async (userId) => {
  const { data, error } = await supabase
    .from('refresh_tokens')
    .select('id, device_info, ip_address, created_at, expires_at')
    .eq('user_id', userId)
    .gt('expires_at', new Date().toISOString())
    .order('created_at', { ascending: false });
  
  if (error) {
    throw error;
  }
  
  return data || [];
};

// 特定のセッションを削除
const deleteSession = async (userId, sessionId) => {
  const { data, error } = await supabase
    .from('refresh_tokens')
    .delete()
    .eq('id', sessionId)
    .eq('user_id', userId)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data && data.length > 0;
};

module.exports = {
  generateRefreshToken,
  createRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
  deleteAllUserTokens,
  cleanupExpiredTokens,
  getUserSessions,
  deleteSession
};

// Made with Bob
