const nodemailer = require('nodemailer');

// メール送信設定
const createTransporter = () => {
  // 開発環境ではコンソールに出力
  if (process.env.NODE_ENV === 'development') {
    return {
      sendMail: async (mailOptions) => {
        console.log('\n📧 Email would be sent:');
        console.log('To:', mailOptions.to);
        console.log('Subject:', mailOptions.subject);
        console.log('Content:', mailOptions.text || mailOptions.html);
        console.log('\n');
        return { messageId: 'dev-' + Date.now() };
      }
    };
  }

  // 本番環境ではGmailまたは他のSMTPサービスを使用
  return nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// パスワードリセットメールを送信
const sendPasswordResetEmail = async (email, resetToken) => {
  const transporter = createTransporter();
  
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/reset-password.html?token=${resetToken}`;
  
  const mailOptions = {
    from: `"スキマ・ラーニング" <${process.env.EMAIL_FROM || 'noreply@awsquiz.com'}>`,
    replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_FROM,
    to: email,
    subject: 'パスワードリセットのご案内 - スキマ・ラーニング',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #232F3E;">パスワードリセットのご案内</h2>
        <p>AWS Quiz Appのパスワードリセットをリクエストされました。</p>
        <p>以下のリンクをクリックして、新しいパスワードを設定してください：</p>
        <p style="margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #FF9900; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; display: inline-block;">
            パスワードをリセット
          </a>
        </p>
        <p style="color: #666; font-size: 14px;">
          このリンクは1時間有効です。<br>
          もしパスワードリセットをリクエストしていない場合は、このメールを無視してください。
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">
          このメールは自動送信されています。返信しないでください。
        </p>
      </div>
    `,
    text: `
AWS Quiz App - パスワードリセット

パスワードリセットをリクエストされました。

以下のURLにアクセスして、新しいパスワードを設定してください：
${resetUrl}

このリンクは1時間有効です。
もしパスワードリセットをリクエストしていない場合は、このメールを無視してください。
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password reset email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    console.error('Error details:', error.message);
    console.error('Error code:', error.code);
    throw new Error('メール送信に失敗しました: ' + error.message);
  }
};

// パスワード変更完了メールを送信
const sendPasswordChangedEmail = async (email, username) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || 'noreply@awsquiz.com',
    to: email,
    subject: 'パスワードが変更されました - AWS Quiz App',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #232F3E;">パスワード変更完了</h2>
        <p>こんにちは、${username}さん</p>
        <p>AWS Quiz Appのパスワードが正常に変更されました。</p>
        <p style="color: #666; font-size: 14px; margin-top: 30px;">
          もしこの変更に心当たりがない場合は、すぐにサポートにご連絡ください。
        </p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
        <p style="color: #999; font-size: 12px;">
          このメールは自動送信されています。返信しないでください。
        </p>
      </div>
    `,
    text: `
AWS Quiz App - パスワード変更完了

こんにちは、${username}さん

AWS Quiz Appのパスワードが正常に変更されました。

もしこの変更に心当たりがない場合は、すぐにサポートにご連絡ください。
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Password changed email sent:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    // パスワード変更通知メールの失敗は致命的ではないので、エラーをスローしない
    return false;
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordChangedEmail
};

// Made with Bob
