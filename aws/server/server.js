const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const membershipRoutes = require('./routes/membership');
const stripeWebhookRoutes = require('./routes/stripe-webhook');
const contactRoutes = require('./routes/contact');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 3443;
const USE_HTTPS = process.env.USE_HTTPS === 'true';

// プロキシ信頼設定（Render、Heroku、Vercelなどのプロキシ環境で必要）
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// セキュリティミドルウェア
app.use(helmet());

// CORS設定
const allowedOrigins = [
  'http://localhost:8000',
  'http://localhost:5500',
  'http://127.0.0.1:8000',
  'http://127.0.0.1:5500',
  'https://sukima-learning.onrender.com',
  'https://sukima-learning.pages.dev',
  'https://www.sukima-learning.com',
  'https://sukima-learning.com'
];

// 環境変数からの追加オリジン
if (process.env.CORS_ORIGIN) {
  const envOrigins = process.env.CORS_ORIGIN.split(',').map(o => o.trim());
  allowedOrigins.push(...envOrigins);
}

app.use(cors({
  origin: function (origin, callback) {
    // オリジンがない場合（モバイルアプリやPostmanなど）を許可
    if (!origin) return callback(null, true);
    
    // 許可リストにあるか、ワイルドカードの場合
    if (allowedOrigins.includes('*') || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Stripe Webhook（express.json()の前に配置 - rawBodyが必要）
app.use('/api/stripe', stripeWebhookRoutes);

// レート制限
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15分
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // 最大100リクエスト
  message: 'リクエストが多すぎます。しばらくしてから再試行してください。'
});

app.use('/api/', limiter);

// ボディパーサー
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTPSリダイレクト（本番環境用）
if (USE_HTTPS && process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.secure) {
      next();
    } else {
      res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
  });
}

// ルートエンドポイント
app.get('/', (req, res) => {
  res.json({
    name: 'Sukima Learning API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      membership: '/api/membership',
      contact: '/api/contact',
      stripe: '/api/stripe'
    }
  });
});

// ヘルスチェック
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    protocol: req.protocol,
    secure: req.secure
  });
});

// ルート
app.use('/api/auth', authRoutes);
app.use('/api/membership', membershipRoutes);
app.use('/api/contact', contactRoutes);

// エラーハンドラー
app.use(errorHandler);

// 404ハンドラー
app.use((req, res) => {
  res.status(404).json({ error: 'エンドポイントが見つかりません' });
});

// サーバー起動
const startServer = () => {
  if (USE_HTTPS) {
    // HTTPS証明書のパス
    const certPath = path.join(__dirname, 'ssl', 'cert.pem');
    const keyPath = path.join(__dirname, 'ssl', 'key.pem');

    // 証明書ファイルの存在確認
    if (!fs.existsSync(certPath) || !fs.existsSync(keyPath)) {
      console.error('❌ SSL certificate files not found!');
      console.log('💡 Run: npm run generate-cert');
      process.exit(1);
    }

    // HTTPS設定
    const httpsOptions = {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath)
    };

    // HTTPSサーバー起動
    https.createServer(httpsOptions, app).listen(HTTPS_PORT, () => {
      console.log(`🔒 HTTPS Server is running on port ${HTTPS_PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 HTTPS URL: https://localhost:${HTTPS_PORT}`);
      console.log(`🔒 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:8000'}`);
    });

    // HTTPサーバー（リダイレクト用）
    if (process.env.NODE_ENV === 'production') {
      http.createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end();
      }).listen(PORT, () => {
        console.log(`↪️  HTTP redirect server running on port ${PORT}`);
      });
    }
  } else {
    // HTTPサーバー起動
    app.listen(PORT, () => {
      console.log(`🚀 HTTP Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 HTTP URL: http://localhost:${PORT}`);
      console.log(`🔒 CORS Origin: ${process.env.CORS_ORIGIN || 'http://localhost:8000'}`);
      console.log(`💡 To enable HTTPS, set USE_HTTPS=true in .env`);
    });
  }
};

startServer();

module.exports = app;

// Made with Bob
