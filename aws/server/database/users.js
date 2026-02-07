const supabase = require('./supabase');

// ユーザーモデル
class UserModel {
  // ユーザーを作成
  async createUser(userData) {
    const { username, email, password } = userData;
    
    const { data, error } = await supabase
      .from('users')
      .insert({
        username,
        email,
        password,
        membership_level: 'Free'
      })
      .select('id, username, email, membership_level, membership_expiry, created_at, updated_at')
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  // ユーザー名でユーザーを検索
  async findByUsername(username) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw error;
    }
    
    return data;
  }

  // メールアドレスでユーザーを検索
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      throw error;
    }
    
    return data;
  }

  // IDでユーザーを検索
  async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, membership_level, membership_expiry, created_at, updated_at')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  // すべてのユーザーを取得（パスワードを除く）
  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, created_at')
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  // ユーザーを更新
  async updateUser(id, updates) {
    const { username, email, password } = updates;
    const updateData = {};

    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    if (Object.keys(updateData).length === 0) {
      throw new Error('No fields to update');
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select('id, username, email, created_at, updated_at')
      .single();
    
    if (error) {
      throw error;
    }
    
    return data;
  }

  // ユーザーを削除
  async deleteUser(id) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  }

  // パスワードを更新
  async updatePassword(id, hashedPassword) {
    const { error } = await supabase
      .from('users')
      .update({ password: hashedPassword })
      .eq('id', id);
    
    if (error) {
      throw error;
    }
    
    return true;
  }

  // ユーザー数を取得
  async getUserCount() {
    const { count, error } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      throw error;
    }
    
    return count || 0;
  }

  // ユーザー名またはメールが存在するかチェック
  async exists(username, email) {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .or(`username.eq.${username},email.eq.${email}`)
      .limit(1);
    
    if (error) {
      throw error;
    }
    
    return data && data.length > 0;
  }
}

// シングルトンインスタンス
const userModel = new UserModel();

module.exports = userModel;

// Made with Bob
