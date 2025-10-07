import formData from 'form-data';
import Mailgun from 'mailgun.js';

// Lazy initialization to ensure env vars are loaded
let mgClient: any = null;

const getMailgunClient = () => {
  if (!mgClient) {
    const mailgun = new Mailgun(formData);

    const apiKey = process.env.MAILGUN_API_KEY;
    if (!apiKey) {
      throw new Error('MAILGUN_API_KEY is not configured in environment variables');
    }

    mgClient = mailgun.client({
      username: 'api',
      key: apiKey,
      url: process.env.MAILGUN_API_BASE || 'https://api.eu.mailgun.net',
    });
  }
  return mgClient;
};

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    const mg = getMailgunClient();
    const domain = process.env.MAILGUN_DOMAIN;

    if (!domain) {
      throw new Error('MAILGUN_DOMAIN is not configured in environment variables');
    }

    await mg.messages.create(domain, {
      from: process.env.MAILGUN_FROM || 'NexaStore <no-reply@mail.nexastore.dev>',
      to: [options.to],
      subject: options.subject,
      text: options.text,
      html: options.html,
      'h:Reply-To': process.env.MAILGUN_REPLY_TO || '',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

export const sendVerificationEmail = async (
  email: string,
  code: string,
  purpose: 'LOGIN' | 'SIGNUP' | 'RESET_PASSWORD'
): Promise<void> => {
  const purposeText = {
    LOGIN: 'login',
    SIGNUP: 'sign up',
    RESET_PASSWORD: 'reset your password',
  };

  const subject = `Your NexaStore Verification Code`;
  const text = `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.\n\nIf you didn't request this code, please ignore this email.`;
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verification Code</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background-color: #111827;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">NexaStore</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px;">Verification Code</h2>
                    <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.5;">
                      You're receiving this email to ${purposeText[purpose]} to your NexaStore account.
                    </p>
                    <p style="margin: 0 0 30px 0; color: #4b5563; font-size: 16px; line-height: 1.5;">
                      Your verification code is:
                    </p>

                    <!-- Verification Code Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                      <tr>
                        <td align="center" style="padding: 20px; background-color: #f3f4f6; border-radius: 8px;">
                          <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #111827; font-family: 'Courier New', monospace;">
                            ${code}
                          </span>
                        </td>
                      </tr>
                    </table>

                    <p style="margin: 0 0 20px 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      This code will expire in <strong>10 minutes</strong>.
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      If you didn't request this code, please ignore this email or contact our support team if you have concerns.
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                    <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 12px; line-height: 1.5; text-align: center;">
                      This is an automated message, please do not reply to this email.
                    </p>
                    <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5; text-align: center;">
                      &copy; ${new Date().getFullYear()} NexaStore. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await sendEmail({ to: email, subject, text, html });
};
