import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILSENDER_API_KEY!,
});

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const sentFrom = new Sender(
    "emailVerification@ifca.co.id",
    "Email Verification - IFCA"
  );

  const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/confirm-email?token=${token}&email=${email}`;
  const recipients = [new Recipient(email, name)];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Email Verification")
    .setText(`Please verify your email by clicking the link below:`).setHtml(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .content h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content p {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:visited {
          color: #fff;
        }
        .footer {
          background-color: #f4f4f4;
          color: #777;
          padding: 20px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h1>Email Verification</h1>
          <h4>Hello ${name},</h4>
          <p>Verify this email address for your account by clicking the link below.</p>
          <p>If you did not request to verify an account, you can safely ignore this email.</p>
          <a href="${confirmationUrl}" class="button">Verify Email Address</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} IFCA Property365. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `);

  await mailerSend.email.send(emailParams);
};

export const sendResetPasswordEmail = async (
  name: string,
  email: string,
  token: string
) => {
  const sentFrom = new Sender(
    "resetPasswordVerification@ifca.co.id",
    "Reset Password - IFCA"
  );
  const confirmationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/new-password?token=${token}&email=${email}`;
  const recipients = [new Recipient(email, name)];
  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Reset Your Password")
    .setText(`Please reset your password by clicking the link below:`).setHtml(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .content h1 {
          font-size: 24px;
          margin-bottom: 20px;
        }
        .content p {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007bff;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
        .button:visited {
          color: #fff;
        }
        .footer {
          background-color: #f4f4f4;
          color: #777;
          padding: 20px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="content">
          <h1>Reset Password</h1>
          <h4>Hello ${name},</h4>
          <p>Reset your password by clicking the link below.</p>
          <p>If you did not request to reset your password, you can safely ignore this email.</p>
          <a href="${confirmationUrl}" class="button">Reset Password</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} IFCA Property365. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `);

  await mailerSend.email.send(emailParams);
};
