import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export interface IEmailAttachment {
  filename: string;
  content:  Buffer;
  contentType: string;
  cid?: string;
}

export class GmailService {
  private transporter: Mail;

  constructor() {
    const gmailUser     = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPassword) {
      throw new Error(
        'Gmail credentials not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.'
      );
    }

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPassword.replace(/\s/g, ''),
      },
    });

    console.log('[Gmail] Service initialized:', gmailUser);
  }

  /**
   * Send an email with optional file attachments.
   *
   * @param toEmail     Recipient address
   * @param subject     Email subject line
   * @param htmlBody    HTML email body
   * @param attachments Optional attachments — use cid field for inline images
   */
  async sendEmail(
    toEmail: string,
    subject: string,
    htmlBody: string,
    attachments?: IEmailAttachment[]
  ): Promise<void> {
    try {
      console.log('[Gmail] Sending to:', toEmail, '| Subject:', subject);

      const mailOptions: Mail.Options = {
        from: {
          name:    'LegalLens E-Signature',
          address: process.env.GMAIL_USER!,
        },
        to:      toEmail,
        subject: subject,
        html:    htmlBody,
      };

      if (attachments && attachments.length > 0) {
        mailOptions.attachments = attachments.map(a => ({
          filename:    a.filename,
          content:     a.content,
          contentType: a.contentType,
          ...(a.cid ? { cid: a.cid } : {}),
        }));
        console.log('[Gmail] Attachments:', attachments.map(a => a.filename).join(', '));
      }

      const info = await this.transporter.sendMail(mailOptions);
      console.log('[Gmail] Sent. MessageId:', info.messageId);

    } catch (error: any) {
      console.error('[Gmail] Send error:', error);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async verifyConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      console.log('[Gmail] Connection verified');
      return true;
    } catch (error: any) {
      console.error('[Gmail] Connection failed:', error.message);
      return false;
    }
  }
}