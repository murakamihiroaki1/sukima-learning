// エラーハンドラーミドルウェア
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // バリデーションエラー
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'バリデーションエラー',
      details: err.errors
    });
  }

  // JWT エラー
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      error: '無効なトークンです'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      error: 'トークンの有効期限が切れています'
    });
  }

  // デフォルトエラー
  res.status(err.status || 500).json({
    error: err.message || 'サーバーエラーが発生しました',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = { errorHandler };

// Made with Bob
