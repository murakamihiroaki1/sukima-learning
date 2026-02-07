require('dotenv').config();
const { pool } = require('./db');

// データベーステーブルを作成
const createTables = async () => {
  const connection = await pool.getConnection();
  
  try {
    console.log('🔧 Creating database tables...');

    // usersテーブル
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        membership_level VARCHAR(20) DEFAULT 'free' CHECK (membership_level IN ('free', 'standard', 'advanced')),
        membership_expiry TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Users table created');

    // password_reset_tokensテーブル
    await connection.query(`
      CREATE TABLE IF NOT EXISTS password_reset_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        used BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✅ Password reset tokens table created');

    // sessionsテーブル（express-mysql-session用）
    await connection.query(`
      CREATE TABLE IF NOT EXISTS sessions (
        session_id VARCHAR(128) NOT NULL PRIMARY KEY,
        expires INT UNSIGNED NOT NULL,
        data MEDIUMTEXT
      );
    `);
    console.log('✅ Sessions table created');

    // refresh_tokensテーブル
    await connection.query(`
      CREATE TABLE IF NOT EXISTS refresh_tokens (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        token VARCHAR(255) UNIQUE NOT NULL,
        device_info TEXT,
        ip_address VARCHAR(45),
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);
    console.log('✅ Refresh tokens table created');

    // インデックスを作成（MySQLではIF NOT EXISTSがサポートされていないため、エラーを無視）
    const indexes = [
      'CREATE INDEX idx_users_username ON users(username)',
      'CREATE INDEX idx_users_email ON users(email)',
      'CREATE INDEX idx_users_membership_level ON users(membership_level)',
      'CREATE INDEX idx_users_membership_expiry ON users(membership_expiry)',
      'CREATE INDEX idx_password_reset_tokens_token ON password_reset_tokens(token)'
    ];
    
    for (const indexSql of indexes) {
      try {
        await connection.query(indexSql);
      } catch (error) {
        // インデックスが既に存在する場合はエラーを無視
        if (error.code !== 'ER_DUP_KEYNAME') {
          throw error;
        }
      }
    }
    const additionalIndexes = [
      'CREATE INDEX idx_password_reset_tokens_user_id ON password_reset_tokens(user_id)',
      'CREATE INDEX idx_sessions_expires ON sessions(expires)',
      'CREATE INDEX idx_refresh_tokens_token ON refresh_tokens(token)',
      'CREATE INDEX idx_refresh_tokens_user_id ON refresh_tokens(user_id)'
    ];
    
    for (const indexSql of additionalIndexes) {
      try {
        await connection.query(indexSql);
      } catch (error) {
        // インデックスが既に存在する場合はエラーを無視
        if (error.code !== 'ER_DUP_KEYNAME') {
          throw error;
        }
      }
    }
    console.log('✅ Indexes created');

    console.log('🎉 Database initialization completed!');

  } catch (error) {
    console.error('❌ Error creating tables:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// データベースをドロップ（開発用）
const dropTables = async () => {
  const connection = await pool.getConnection();
  
  try {
    console.log('🗑️  Dropping tables...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');
    await connection.query('DROP TABLE IF EXISTS refresh_tokens;');
    await connection.query('DROP TABLE IF EXISTS password_reset_tokens;');
    await connection.query('DROP TABLE IF EXISTS sessions;');
    await connection.query('DROP TABLE IF EXISTS users;');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('✅ Tables dropped');
  } catch (error) {
    console.error('❌ Error dropping tables:', error);
    throw error;
  } finally {
    connection.release();
  }
};

// メイン実行
const main = async () => {
  try {
    const args = process.argv.slice(2);
    
    if (args.includes('--drop')) {
      await dropTables();
    }
    
    await createTables();
    
    console.log('\n📊 Database is ready!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Initialization failed:', error);
    process.exit(1);
  }
};

// スクリプトとして実行された場合
if (require.main === module) {
  main();
}

module.exports = { createTables, dropTables };

// Made with Bob
