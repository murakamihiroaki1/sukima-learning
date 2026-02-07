const mysql = require('mysql2/promise');

// MySQL接続プール
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'aws_quiz_db',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: parseInt(process.env.DB_POOL_MAX) || 20,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// 接続テスト
pool.getConnection()
  .then(connection => {
    console.log('✅ MySQL connected');
    connection.release();
  })
  .catch(err => {
    console.error('❌ MySQL connection error:', err);
  });

// クエリヘルパー関数（PostgreSQLの$1, $2をMySQLの?に変換）
const query = async (text, params) => {
  const start = Date.now();
  try {
    // PostgreSQLのプレースホルダー($1, $2, ...)をMySQLの?に変換
    let mysqlQuery = text;
    if (params && params.length > 0) {
      let paramIndex = 0;
      mysqlQuery = text.replace(/\$\d+/g, () => {
        paramIndex++;
        return '?';
      });
    }
    
    const [rows] = await pool.execute(mysqlQuery, params || []);
    const duration = Date.now() - start;
    
    // PostgreSQL互換のレスポンス形式に変換
    const rowCount = Array.isArray(rows) ? rows.length : (rows.affectedRows || 0);
    console.log('Executed query', { text: mysqlQuery, duration, rows: rowCount });
    
    // INSERT/UPDATE/DELETEの場合、insertIdとaffectedRowsを含める
    const result = {
      rows: Array.isArray(rows) ? rows : [],
      rowCount: rowCount
    };
    
    // MySQLのメタデータを追加（INSERT時のinsertIdなど）
    if (rows.insertId !== undefined) {
      result.insertId = rows.insertId;
    }
    if (rows.affectedRows !== undefined) {
      result.affectedRows = rows.affectedRows;
    }
    
    return result;
  } catch (error) {
    console.error('Query error', { text, error: error.message });
    throw error;
  }
};

// トランザクションヘルパー
const getClient = async () => {
  const connection = await pool.getConnection();
  
  const query = async (text, params) => {
    let mysqlQuery = text;
    if (params && params.length > 0) {
      let paramIndex = 0;
      mysqlQuery = text.replace(/\$\d+/g, () => {
        paramIndex++;
        return '?';
      });
    }
    
    const [rows] = await connection.execute(mysqlQuery, params || []);
    const rowCount = Array.isArray(rows) ? rows.length : (rows.affectedRows || 0);
    
    // INSERT/UPDATE/DELETEの場合、insertIdとaffectedRowsを含める
    const result = {
      rows: Array.isArray(rows) ? rows : [],
      rowCount: rowCount
    };
    
    // MySQLのメタデータを追加（INSERT時のinsertIdなど）
    if (rows.insertId !== undefined) {
      result.insertId = rows.insertId;
    }
    if (rows.affectedRows !== undefined) {
      result.affectedRows = rows.affectedRows;
    }
    
    return result;
  };
  
  const release = () => {
    connection.release();
  };

  return { query, release };
};

module.exports = {
  pool,
  query,
  getClient
};

// Made with Bob
