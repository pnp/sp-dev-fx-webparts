import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import * as nodemailer from 'nodemailer';
import * as QRCode    from 'qrcode';

interface ISendInviteRequest {
  signerEmail:  string;
  signerName:   string;
  contractName: string;
  signingUrl:   string;
  expiresAt:    string;
  emailHtml?:   string;
}

export async function sendInvite(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('[SendInvite] Request received');

  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type':                 'application/json',
  };

  if (request.method === 'OPTIONS') return { status: 200, headers };

  try {
    const body = await request.json() as ISendInviteRequest;
    const { signerEmail, signerName, contractName, signingUrl, expiresAt, emailHtml } = body;

    if (!signerEmail || !signerName || !contractName || !signingUrl) {
      return {
        status: 400, headers,
        jsonBody: { error: 'Missing required fields: signerEmail, signerName, contractName, signingUrl' },
      };
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;
    if (!gmailUser || !gmailPass) {
      return {
        status: 500, headers,
        jsonBody: { error: 'Gmail not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.' },
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: gmailUser, pass: gmailPass.replace(/\s/g, '') },
    });

    let qrBuffer: Buffer | null = null;
    try {
      qrBuffer = await QRCode.toBuffer(signingUrl, {
        width: 260, margin: 2,
        color: { dark: '#1e293b', light: '#ffffff' },
        type: 'png',
      });
      context.log('[SendInvite] QR PNG ready:', qrBuffer.length, 'bytes');
    } catch (e) {
      context.warn('[SendInvite] QR generation failed (non-fatal):', e);
    }

    const html = emailHtml || buildInviteHTML({ signerName, contractName, signingUrl, expiresAt, hasQR: !!qrBuffer });

    const attachments: nodemailer.SendMailOptions['attachments'] = [];
    if (qrBuffer) {
      attachments.push({
        filename:    'qrcode.png',
        content:     qrBuffer,
        contentType: 'image/png',
        cid:         'qrcode@legallens',   
      });
    }

    const info = await transporter.sendMail({
      from:        `"LegalLens E-Signature" <${gmailUser}>`,
      to:          `"${signerName}" <${signerEmail}>`,
      subject:     `Signature Required: "${contractName}"`,
      html,
      attachments,
    });
    context.log('[SendInvite] Sent. MessageId:', info.messageId);

    return { status: 200, headers, jsonBody: { success: true, message: `Invitation sent to ${signerEmail}` } };

  } catch (error: any) {
    context.error('[SendInvite] Error:', error);
    const msg: string = error.message || '';
    if (msg.includes('Invalid login') || msg.includes('Username and Password')) {
      return {
        status: 500, headers,
        jsonBody: {
          error: 'Gmail login failed.',
          fix: '1) Enable 2-Step Verification on your Google account. 2) Create an App Password at myaccount.google.com/apppasswords. 3) Set GMAIL_APP_PASSWORD (no spaces).',
          detail: msg,
        },
      };
    }
    return { status: 500, headers, jsonBody: { error: msg } };
  }
}

function buildInviteHTML(p: {
  signerName:   string;
  contractName: string;
  signingUrl:   string;
  expiresAt:    string;
  hasQR:        boolean;
}): string {

  const expiry = (() => {
    try {
      return new Date(p.expiresAt).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      });
    } catch { return p.expiresAt; }
  })();

  const MSO_HEAD = `<!--[if mso]><noscript><xml><o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->`;

  return `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
  ${MSO_HEAD}
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f5f9">
<tr><td align="center" style="padding:32px 16px;">

  <!--[if mso]><table width="600" cellpadding="0" cellspacing="0"><tr><td><![endif]-->
  <table width="600" cellpadding="0" cellspacing="0" border="0"
         style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid #e2e8f0;">

    <!-- HEADER -->
    <tr>
      <td align="center" bgcolor="#6366f1"
          style="background-color:#6366f1;padding:28px 36px;">
        <p style="font-size:11px;color:#c7d2fe;font-weight:700;
                  letter-spacing:1.2px;text-transform:uppercase;
                  margin:0 0 8px 0;font-family:Arial,sans-serif;">
          LegalLens E-Signature
        </p>
        <h1 style="color:#ffffff;margin:0;font-size:24px;
                   font-weight:700;font-family:Arial,sans-serif;">
          Signature Required
        </h1>
      </td>
    </tr>

    <!-- GREETING -->
    <tr>
      <td style="padding:32px 36px 0 36px;">
        <p style="color:#1e293b;font-size:15px;margin:0 0 12px 0;font-family:Arial,sans-serif;">
          Dear <strong>${p.signerName}</strong>,
        </p>
        <p style="color:#475569;font-size:14px;line-height:1.65;
                  margin:0 0 24px 0;font-family:Arial,sans-serif;">
          You have been requested to review and electronically sign the following document:
        </p>
      </td>
    </tr>

    <!-- DOCUMENT CARD -->
    <tr>
      <td style="padding:0 36px 24px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f8fafc;border:1px solid #e2e8f0;
                      border-left:4px solid #6366f1;">
          <tr>
            <td style="padding:16px 20px;">
              <p style="font-size:11px;color:#64748b;text-transform:uppercase;
                        letter-spacing:0.6px;margin:0 0 4px 0;font-family:Arial,sans-serif;">
                Document
              </p>
              <p style="font-size:17px;font-weight:700;color:#1e293b;
                        margin:0;font-family:Arial,sans-serif;">
                ${p.contractName}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- SIGN BUTTON -->
    <tr>
      <td align="center" style="padding:0 36px 28px 36px;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td bgcolor="#6366f1" style="background-color:#6366f1;padding:15px 44px;">
              <a href="${p.signingUrl}"
                 style="color:#ffffff;text-decoration:none;font-weight:700;
                        font-size:16px;font-family:Arial,sans-serif;">
                Review &amp; Sign Document &rarr;
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    ${p.hasQR ? `
    <!-- QR CODE — centered, prominent, uses CID attachment (not data: URL) -->
    <!-- src="cid:qrcode@legallens" resolves to the PNG buffer attached by nodemailer -->
    <!-- This is the ONLY approach that displays in Gmail AND Outlook AND Apple Mail -->
    <tr>
      <td align="center" bgcolor="#f8fafc"
          style="background-color:#f8fafc;padding:28px 36px;
                 border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0;">
        <p style="font-size:14px;font-weight:700;color:#1e293b;
                  margin:0 0 4px 0;font-family:Arial,sans-serif;">
          Prefer to sign on your phone?
        </p>
        <p style="font-size:13px;color:#64748b;margin:0 0 18px 0;font-family:Arial,sans-serif;">
          Open your camera and scan the QR code below
        </p>
        <img src="cid:qrcode@legallens"
             alt="QR code to open signing page on mobile"
             width="260" height="260"
             style="display:block;margin:0 auto;border:1px solid #e2e8f0;"/>
        <p style="font-size:11px;color:#94a3b8;margin:14px 0 0 0;font-family:Arial,sans-serif;">
          If you cannot scan, click the button above instead
        </p>
      </td>
    </tr>
    ` : ''}

    <!-- EXPIRY -->
    <tr>
      <td align="center" style="padding:22px 36px 0 36px;">
        <p style="color:#64748b;font-size:12px;margin:0;line-height:1.6;
                  font-family:Arial,sans-serif;">
          This link expires on <strong>${expiry}</strong>.<br/>
          No account needed &mdash; the signing page is publicly accessible.
        </p>
      </td>
    </tr>

    <!-- SECURITY NOTE -->
    <tr>
      <td style="padding:20px 36px 32px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f0fdf4;border:1px solid #bbf7d0;">
          <tr>
            <td style="padding:12px 16px;">
              <p style="color:#166534;font-size:12px;margin:0;
                        line-height:1.6;font-family:Arial,sans-serif;">
                <strong>Secure &amp; single-use link</strong> &mdash; This invitation was
                sent specifically to <strong>${p.signerName}</strong>.
                The link expires automatically after signing.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#f8fafc" align="center"
          style="background-color:#f8fafc;padding:16px 36px;border-top:1px solid #e2e8f0;">
        <p style="color:#94a3b8;font-size:11px;margin:0;
                  line-height:1.6;font-family:Arial,sans-serif;">
          Sent via LegalLens &middot; Powered by Budvik<br/>
          If you did not expect this email, you can safely ignore it.
        </p>
      </td>
    </tr>

  </table>
  <!--[if mso]></td></tr></table><![endif]-->

</td></tr>
</table>
</body>
</html>`;
}

app.http('sendInvite', {
  methods:   ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route:     'sendInvite',
  handler:   sendInvite,
});