const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const userModel = require('../database/users');
const passwordResetModel = require('../database/passwordReset');
const refreshTokenModel = require('../database/refreshTokens');
const { authenticateToken } = require('../middleware/auth');
const { sendPasswordResetEmail, sendPasswordChangedEmail } = require('../services/emailService');
const { formatMembershipInfo } = require('../models/membership');

// バリデーションルール
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('ユーザー名は3文字以上である必要があります')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('ユーザー名は英数字とアンダースコアのみ使用できます'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('有効なメールアドレスを入力してください')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります')
];

const loginValidation = [
  body('username').trim().notEmpty().withMessage('ユーザー名は必須です'),
  body('password').notEmpty().withMessage('パスワードは必須です')
];

// JWT トークンを生成
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      username: user.username,
      email: user.email 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
};

// 新規登録
router.post('/register', registerValidation, async (req, res, next) => {
  try {
    // バリデーションエラーチェック
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'バリデーションエラー',
        details: errors.array() 
      });
    }

    const { username, email, password } = req.body;

    // ユーザー名の重複チェック
    const existingUserByUsername = await userModel.findByUsername(username);
    if (existingUserByUsername) {
      return res.status(409).json({ 
        error: 'このユーザー名は既に使用されています' 
      });
    }

    // メールアドレスの重複チェック
    const existingUserByEmail = await userModel.findByEmail(email);
    if (existingUserByEmail) {
      return res.status(409).json({ 
        error: 'このメールアドレスは既に登録されています' 
      });
    }

    // パスワードをハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ユーザーを作成
    const user = await userModel.createUser({
      username,
      email,
      password: hashedPassword
    });

    // JWT トークンを生成
    const token = generateToken(user);

    // 会員情報を整形
    const membershipInfo = formatMembershipInfo(user);

    // レスポンス（パスワードを除く）
    res.status(201).json({
      message: '登録が完了しました',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        membership_level: user.membership_level || 'Free',
        createdAt: user.created_at
      },
      membership: membershipInfo,
      token
    });

  } catch (error) {
    next(error);
  }
});

// ログイン
router.post('/login', loginValidation, async (req, res, next) => {
  try {
    // バリデーションエラーチェック
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'バリデーションエラー',
        details: errors.array()
      });
    }

    const { username, password } = req.body;

    // ユーザーを検索
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(401).json({
        error: 'ユーザー名またはパスワードが正しくありません'
      });
    }

    // パスワードを検証
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'ユーザー名またはパスワードが正しくありません'
      });
    }

    // 有効期限をチェックして、期限切れの場合はFreeに戻す
    let membershipLevel = user.membership_level || 'free';
    let membershipExpiry = user.membership_expiry;
    
    console.log(`🔍 Login: user=${user.username}, membership_level=${membershipLevel}, expiry=${membershipExpiry}`);
    
    // membership_levelを小文字に正規化
    const normalizedLevel = membershipLevel.toLowerCase();
    
    if (normalizedLevel !== 'free' && membershipExpiry) {
      const now = new Date();
      const expiryDate = new Date(membershipExpiry);
      
      console.log(`🔍 Checking expiry at login: expiry=${expiryDate.toISOString()}, now=${now.toISOString()}, expired=${expiryDate < now}`);
      
      if (expiryDate < now) {
        // 期限切れの場合、データベースを更新
        const supabase = require('../database/supabase');
        await supabase
          .from('users')
          .update({
            membership_level: 'free',
            membership_expiry: null
          })
          .eq('id', user.id);
        
        membershipLevel = 'free';
        membershipExpiry = null;
        
        console.log(`⚠️ User ${user.username} membership expired at login, reverted to Free`);
      } else {
        console.log(`✅ User ${user.username} membership is still valid at login (${membershipLevel})`);
      }
    }

    // JWT アクセストークンを生成
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // 24時間
    );

    // リフレッシュトークンを生成
    const deviceInfo = req.headers['user-agent'] || 'Unknown Device';
    const ipAddress = req.ip || req.connection.remoteAddress;
    const refreshTokenData = await refreshTokenModel.createRefreshToken(
      user.id,
      deviceInfo,
      ipAddress
    );

    // 会員情報を整形（更新後の情報を使用）
    const updatedUser = {
      ...user,
      membership_level: membershipLevel,
      membership_expiry: membershipExpiry
    };
    const membershipInfo = formatMembershipInfo(updatedUser);

    // レスポンス
    res.json({
      message: 'ログインしました',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        membership_level: membershipLevel,
        membership_expiry: membershipExpiry
      },
      membership: membershipInfo,
      accessToken,
      refreshToken: refreshTokenData.token
    });

  } catch (error) {
    next(error);
  }
});

// 現在のユーザー情報を取得（認証必須）
router.get('/me', authenticateToken, async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    
    if (!user) {
      return res.status(404).json({ error: 'ユーザーが見つかりません' });
    }

    // 有効期限をチェックして、期限切れの場合はFreeに戻す
    let membershipLevel = user.membership_level || 'free';
    let membershipExpiry = user.membership_expiry;
    
    console.log(`🔍 /api/me called for ${user.username}: level=${membershipLevel}, expiry=${membershipExpiry}`);
    
    // membership_levelを小文字に正規化
    const normalizedLevel = membershipLevel.toLowerCase();
    
    if (normalizedLevel !== 'free' && membershipExpiry) {
      const now = new Date();
      const expiryDate = new Date(membershipExpiry);
      
      console.log(`🔍 Checking expiry: expiry=${expiryDate.toISOString()}, now=${now.toISOString()}, expired=${expiryDate < now}`);
      
      if (expiryDate < now) {
        // 期限切れの場合、データベースを更新
        const supabase = require('../database/supabase');
        await supabase
          .from('users')
          .update({
            membership_level: 'free',
            membership_expiry: null
          })
          .eq('id', user.id);
        
        membershipLevel = 'free';
        membershipExpiry = null;
        
        console.log(`⚠️ User ${user.username} membership expired, reverted to Free`);
      } else {
        console.log(`✅ User ${user.username} membership is still valid (${membershipLevel})`);
      }
    }
    
    console.log(`🔍 Returning: level=${membershipLevel}, expiry=${membershipExpiry}`);

    // 会員情報を整形（更新後の情報を使用）
    const updatedUser = {
      ...user,
      membership_level: membershipLevel,
      membership_expiry: membershipExpiry
    };
    const membershipInfo = formatMembershipInfo(updatedUser);

    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        membership_level: membershipLevel,
        membership_expiry: membershipExpiry,
        createdAt: user.created_at
      },
      membership: membershipInfo
    });
  } catch (error) {
    next(error);
  }
});

// トークンを検証
router.post('/verify', authenticateToken, (req, res) => {
  res.json({ 
    valid: true,
    user: req.user 
  });
});

// ログアウト（リフレッシュトークンを削除）
router.post('/logout', authenticateToken, async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (refreshToken) {
      await refreshTokenModel.deleteRefreshToken(refreshToken);
    }
    
    res.json({ message: 'ログアウトしました' });
  } catch (error) {
    next(error);
  }
});

// 全デバイスからログアウト
router.post('/logout-all', authenticateToken, async (req, res, next) => {
  try {
    const deletedCount = await refreshTokenModel.deleteAllUserTokens(req.user.id);
    res.json({
      message: '全デバイスからログアウトしました',
      deletedSessions: deletedCount
    });
  } catch (error) {
    next(error);
  }
});

// リフレッシュトークンで新しいアクセストークンを取得
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'リフレッシュトークンが必要です' });
    }

    // リフレッシュトークンを検証
    const tokenData = await refreshTokenModel.verifyRefreshToken(refreshToken);
    
    if (!tokenData) {
      return res.status(401).json({ error: '無効なリフレッシュトークンです' });
    }

    // 新しいアクセストークンを生成
    const accessToken = jwt.sign(
      {
        id: tokenData.user_id,
        username: tokenData.username,
        email: tokenData.email
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ accessToken });
  } catch (error) {
    next(error);
  }
});

// アクティブなセッション一覧を取得
router.get('/sessions', authenticateToken, async (req, res, next) => {
  try {
    const sessions = await refreshTokenModel.getUserSessions(req.user.id);
    res.json({ sessions });
  } catch (error) {
    next(error);
  }
});

// 特定のセッションを削除
router.delete('/sessions/:sessionId', authenticateToken, async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const deleted = await refreshTokenModel.deleteSession(req.user.id, sessionId);
    
    if (!deleted) {
      return res.status(404).json({ error: 'セッションが見つかりません' });
    }
    
    res.json({ message: 'セッションを削除しました' });
  } catch (error) {
    next(error);
  }
});

// パスワードリセットリクエスト
router.post('/forgot-password', [
  body('email').isEmail().withMessage('有効なメールアドレスを入力してください')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'バリデーションエラー',
        details: errors.array()
      });
    }

    const { email } = req.body;

    // ユーザーを検索
    const user = await userModel.findByEmail(email);
    
    // セキュリティのため、ユーザーが存在しない場合でも成功レスポンスを返す
    if (!user) {
      return res.json({
        message: 'パスワードリセットメールを送信しました（該当するメールアドレスが登録されている場合）'
      });
    }

    // 既存の未使用トークンを無効化
    await passwordResetModel.invalidateUserTokens(user.id);

    // リセットトークンを生成
    const resetToken = await passwordResetModel.createResetToken(user.id);

    // メールを送信
    await sendPasswordResetEmail(user.email, resetToken.token);

    res.json({
      message: 'パスワードリセットメールを送信しました'
    });

  } catch (error) {
    console.error('Password reset request error:', error);
    // エラーの詳細を隠す
    res.status(500).json({
      error: 'パスワードリセットリクエストの処理中にエラーが発生しました'
    });
  }
});

// パスワードリセットトークンを検証
router.get('/reset-password/:token', async (req, res, next) => {
  try {
    const { token } = req.params;

    const tokenData = await passwordResetModel.verifyResetToken(token);

    if (!tokenData) {
      return res.status(400).json({
        error: '無効または期限切れのトークンです'
      });
    }

    res.json({
      valid: true,
      email: tokenData.email
    });

  } catch (error) {
    next(error);
  }
});

// パスワードをリセット
router.post('/reset-password', [
  body('token').notEmpty().withMessage('トークンが必要です'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('パスワードは8文字以上である必要があります')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'バリデーションエラー',
        details: errors.array()
      });
    }

    const { token, password } = req.body;

    // トークンを検証
    const tokenData = await passwordResetModel.verifyResetToken(token);

    if (!tokenData) {
      return res.status(400).json({
        error: '無効または期限切れのトークンです'
      });
    }

    // パスワードをハッシュ化
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // パスワードを更新
    await userModel.updatePassword(tokenData.user_id, hashedPassword);

    // トークンを使用済みにする
    await passwordResetModel.markTokenAsUsed(token);

    // 全てのリフレッシュトークンを無効化（セキュリティのため）
    await refreshTokenModel.deleteAllUserTokens(tokenData.user_id);

    // パスワード変更通知メールを送信
    await sendPasswordChangedEmail(tokenData.email, tokenData.username);

    res.json({
      message: 'パスワードが正常にリセットされました'
    });

  } catch (error) {
    next(error);
  }
});

// ユーザー統計（開発用）
router.get('/stats', async (req, res, next) => {
  try {
    const count = await userModel.getUserCount();
    res.json({ 
      totalUsers: count,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// Made with Bob
