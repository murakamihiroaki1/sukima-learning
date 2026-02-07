const jwt = require('jsonwebtoken');

// JWT トークンを検証するミドルウェア
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: '認証トークンが必要です' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: '無効なトークンです' });
    }

    req.user = user;
    next();
  });
};

// オプショナルな認証（トークンがあれば検証、なくてもOK）
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.user = user;
      }
    });
  }

  next();
};

module.exports = {
  authenticateToken,
  optionalAuth
};

// Made with Bob
