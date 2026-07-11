const { Resend } = require('resend');

// パスワードリセットメールを送信（Resend API使用 - RenderはSMTPポートをブロックするため）
const sendPasswordResetEmail = async (email, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:8000'}/aws/reset-password.html?token=${resetToken}`;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  // 開発環境はコンソール出力のみ
  if (process.env.NODE_ENV === 'development') {
    console.log('\n📧 [DEV] Password reset email would be sent:');
    console.log('To:', email);
    console.log('Reset URL:', resetUrl);
    console.log('\n');
    return true;
  }

  console.log('📧 Using Resend API key:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 8) + '...' : 'NOT SET');
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { data, error } = await resend.emails.send({
      from: `スキマ・ラーニング <${fromEmail}>`,
      to: email,
      subject: 'パスワードリセットのご案内 - スキマ・ラーニング',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #232F3E;">パスワードリセットのご案内</h2>
          <p>スキマ・ラーニングのパスワードリセットをリクエストされました。</p>
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
      text: `スキマ・ラーニング - パスワードリセット\n\nパスワードリセットをリクエストされました。\n\n以下のURLにアクセスして、新しいパスワードを設定してください：\n${resetUrl}\n\nこのリンクは1時間有効です。\nもしパスワードリセットをリクエストしていない場合は、このメールを無視してください。`
    });

    if (error) {
      console.error('❌ Resend error sending password reset email:', error);
      throw new Error('メール送信に失敗しました: ' + error.message);
    }

    console.log('✅ Password reset email sent:', data?.id);
    return true;
  } catch (error) {
    console.error('❌ Error sending password reset email:', error);
    throw new Error('メール送信に失敗しました: ' + error.message);
  }
};

// パスワード変更完了メールを送信（Resend API使用）
const sendPasswordChangedEmail = async (email, username) => {
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  // 開発環境はコンソール出力のみ
  if (process.env.NODE_ENV === 'development') {
    console.log('\n📧 [DEV] Password changed email would be sent to:', email);
    return true;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: `スキマ・ラーニング <${fromEmail}>`,
      to: email,
      subject: 'パスワードが変更されました - スキマ・ラーニング',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #232F3E;">パスワード変更完了</h2>
          <p>こんにちは、${username}さん</p>
          <p>スキマ・ラーニングのパスワードが正常に変更されました。</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">
            もしこの変更に心当たりがない場合は、すぐにサポートにご連絡ください。
          </p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 12px;">
            このメールは自動送信されています。返信しないでください。
          </p>
        </div>
      `,
      text: `スキマ・ラーニング - パスワード変更完了\n\nこんにちは、${username}さん\n\nスキマ・ラーニングのパスワードが正常に変更されました。\n\nもしこの変更に心当たりがない場合は、すぐにサポートにご連絡ください。`
    });

    if (error) {
      console.error('❌ Resend error sending password changed email:', error);
      // パスワード変更通知メールの失敗は致命的ではないので、エラーをスローしない
      return false;
    }

    console.log('✅ Password changed email sent to:', email);
    return true;
  } catch (error) {
    console.error('❌ Error sending password changed email:', error);
    // パスワード変更通知メールの失敗は致命的ではないので、エラーをスローしない
    return false;
  }
};

// お問い合わせフォームのメールを送信（管理者宛 + 送信者への自動返信）
// Resend HTTP API を使用（RenderはSMTPポートをブロックするため）
const sendContactFormEmail = async ({ name, email, category, category_ja, subject, message }) => {
  const adminEmail = process.env.CONTACT_ADMIN_EMAIL || process.env.EMAIL_USER;
  // Resendはカスタムドメイン未設定の場合 onboarding@resend.dev を使用
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #667eea;">新しいお問い合わせが届きました</h2>
      <table style="width:100%; border-collapse: collapse; margin-top: 20px;">
        <tr style="background:#f7f8fa;"><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold; width:30%;">お名前</td><td style="padding:10px; border:1px solid #e5e7eb;">${name}</td></tr>
        <tr><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">メールアドレス</td><td style="padding:10px; border:1px solid #e5e7eb;">${email}</td></tr>
        <tr style="background:#f7f8fa;"><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">お問い合わせ種別</td><td style="padding:10px; border:1px solid #e5e7eb;">${category_ja || category}</td></tr>
        <tr><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">件名</td><td style="padding:10px; border:1px solid #e5e7eb;">${subject}</td></tr>
        <tr style="background:#f7f8fa;"><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold; vertical-align:top;">お問い合わせ内容</td><td style="padding:10px; border:1px solid #e5e7eb; white-space:pre-wrap;">${message}</td></tr>
      </table>
      <p style="margin-top:20px; color:#57606a; font-size:13px;">このメールに返信すると ${email} に送信されます。</p>
    </div>
  `;

  const autoReplyHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #667eea;">お問い合わせを受け付けました</h2>
      <p>${name} 様</p>
      <p>この度はお問い合わせいただきありがとうございます。<br>以下の内容で受け付けました。通常2〜3営業日以内にご返信いたします。</p>
      <table style="width:100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background:#f7f8fa;"><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold; width:30%;">件名</td><td style="padding:10px; border:1px solid #e5e7eb;">${subject}</td></tr>
        <tr><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">お問い合わせ種別</td><td style="padding:10px; border:1px solid #e5e7eb;">${category_ja || category}</td></tr>
        <tr style="background:#f7f8fa;"><td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold; vertical-align:top;">内容</td><td style="padding:10px; border:1px solid #e5e7eb; white-space:pre-wrap;">${message}</td></tr>
      </table>
      <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
      <p style="color: #57606a; font-size: 13px;">
        ※このメールは自動送信です。このメールへの返信は受け付けておりません。<br>
        ※土日祝日は対応できない場合がございます。
      </p>
    </div>
  `;

  // 開発環境はコンソール出力のみ
  if (process.env.NODE_ENV === 'development') {
    console.log('\n📧 [DEV] Contact admin email → ', adminEmail);
    console.log('📧 [DEV] Auto-reply → ', email);
    return true;
  }

  console.log('📧 Using Resend API key:', process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 8) + '...' : 'NOT SET');
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: `スキマ・ラーニング <${fromEmail}>`,
      reply_to: email,
      to: adminEmail,
      subject: `【お問い合わせ】${subject}`,
      html: adminHtml,
      text: `新しいお問い合わせ\n\nお名前: ${name}\nメール: ${email}\n種別: ${category_ja || category}\n件名: ${subject}\n\n内容:\n${message}`
    });
    console.log('✅ Contact admin email sent to:', adminEmail);

    await resend.emails.send({
      from: `スキマ・ラーニング <${fromEmail}>`,
      to: email,
      subject: `【自動返信】お問い合わせを受け付けました - スキマ・ラーニング`,
      html: autoReplyHtml,
      text: `${name} 様\n\nお問い合わせありがとうございます。以下の内容で受け付けました。\n\n件名: ${subject}\n種別: ${category_ja || category}\n内容:\n${message}\n\n通常2〜3営業日以内にご返信いたします。`
    });
    console.log('✅ Contact auto-reply sent to:', email);

    return true;
  } catch (error) {
    console.error('❌ Error sending contact email:', error);
    throw new Error('メール送信に失敗しました: ' + error.message);
  }
};

module.exports = {
  sendPasswordResetEmail,
  sendPasswordChangedEmail,
  sendContactFormEmail
};

// Made with Bob
