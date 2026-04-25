export interface ISignatureCompletionEmail {
  signerName:   string;
  signerEmail:  string;
  contractName: string;
  signedAt:     string;
  downloadUrl?: string;
}

export interface ICreatorNotificationEmail {
  creatorName:  string;
  signerName:   string;
  signerEmail:  string;
  contractName: string;
  signedAt:     string;
  ipAddress:    string;
  location:     string;
}

function dataRow(label: string, value: string): string {
  return `
  <tr>
    <td style="padding:5px 16px 5px 0;font-size:13px;color:#64748b;white-space:nowrap;vertical-align:top;font-family:Arial,sans-serif;">${label}</td>
    <td style="padding:5px 0;font-size:13px;color:#1e293b;font-weight:600;vertical-align:top;font-family:Arial,sans-serif;">${value}</td>
  </tr>`;
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long',
      day: 'numeric', hour: '2-digit', minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch { return iso; }
}

const MSO_HEAD = `<!--[if mso]><noscript><xml><o:OfficeDocumentSettings>
<o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->`;

export function generateVendorConfirmationEmail(params: ISignatureCompletionEmail): string {
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

    <!-- GREEN HEADER -->
    <tr>
      <td align="center" bgcolor="#059669"
          style="background-color:#059669;padding:36px 40px;">

        <!-- TICK CIRCLE — fixed width/height td, no flex needed -->
        <table cellpadding="0" cellspacing="0" border="0" align="center"
               style="margin:0 auto 20px auto;">
          <tr>
            <td width="80" height="80" align="center" bgcolor="#10b981"
                style="width:80px;height:80px;background-color:#10b981;
                       border:3px solid #6ee7b7;font-size:42px;
                       color:#ffffff;font-family:Arial,sans-serif;
                       line-height:80px;text-align:center;">
              &#10003;
            </td>
          </tr>
        </table>

        <h1 style="color:#ffffff;margin:0 0 8px 0;font-size:26px;
                   font-weight:700;font-family:Arial,sans-serif;">
          Signature Complete
        </h1>
        <p style="color:#d1fae5;margin:0;font-size:15px;font-family:Arial,sans-serif;">
          Your signature has been successfully recorded
        </p>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:36px 40px;">
        <p style="color:#1e293b;font-size:16px;margin:0 0 16px 0;font-family:Arial,sans-serif;">
          Dear <strong>${params.signerName}</strong>,
        </p>
        <p style="color:#475569;font-size:14px;line-height:1.65;margin:0 0 24px 0;
                  font-family:Arial,sans-serif;">
          Thank you for completing your electronic signature on the following document:
        </p>

        <!-- DOCUMENT INFO BOX -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f8fafc;border:1px solid #e2e8f0;
                      border-left:4px solid #059669;margin:0 0 28px 0;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="font-size:11px;color:#64748b;text-transform:uppercase;
                        letter-spacing:0.6px;margin:0 0 6px 0;font-family:Arial,sans-serif;">
                Document
              </p>
              <p style="font-size:18px;font-weight:700;color:#1e293b;
                        margin:0 0 16px 0;font-family:Arial,sans-serif;">
                ${params.contractName}
              </p>
              <table cellpadding="0" cellspacing="0" border="0">
                ${dataRow('Signed By:', params.signerName)}
                ${dataRow('Email:', params.signerEmail)}
                ${dataRow('Timestamp:', fmtDate(params.signedAt))}
              </table>
            </td>
          </tr>
        </table>

        ${params.downloadUrl ? `
        <!-- DOWNLOAD BUTTON -->
        <table cellpadding="0" cellspacing="0" border="0" align="center"
               style="margin:0 0 28px 0;">
          <tr>
            <td bgcolor="#059669" style="background-color:#059669;padding:14px 32px;">
              <a href="${params.downloadUrl}"
                 style="color:#ffffff;text-decoration:none;font-size:15px;
                        font-weight:700;font-family:Arial,sans-serif;">
                Download Signed Document
              </a>
            </td>
          </tr>
        </table>
        ` : ''}

        <!-- WHAT HAPPENS NEXT -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#e7f3ff;border-left:4px solid #0ea5e9;
                      margin:0 0 20px 0;">
          <tr>
            <td style="padding:14px 18px;">
              <p style="font-weight:700;color:#0369a1;margin:0 0 6px 0;
                        font-size:13px;font-family:Arial,sans-serif;">
                What happens next?
              </p>
              <p style="color:#0c4a6e;font-size:13px;margin:0;line-height:1.6;
                        font-family:Arial,sans-serif;">
                Your signed document has been securely stored and all parties have been
                notified. You will receive a copy of the signed document via email attachment.
              </p>
            </td>
          </tr>
        </table>

        <!-- LEGAL NOTICE -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#fef3c7;border-left:4px solid #f59e0b;">
          <tr>
            <td style="padding:14px 18px;">
              <p style="font-weight:700;color:#92400e;margin:0 0 6px 0;
                        font-size:13px;font-family:Arial,sans-serif;">
                Legal Notice
              </p>
              <p style="color:#78350f;font-size:12px;margin:0;line-height:1.6;
                        font-family:Arial,sans-serif;">
                This electronic signature is legally binding and equivalent to a handwritten
                signature. A complete audit trail including timestamp, IP address, and device
                information has been recorded.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#f8fafc" align="center"
          style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:12px;margin:0 0 4px 0;font-family:Arial,sans-serif;">
          Powered by <strong>LegalLens</strong> &middot; Budvik
        </p>
        <p style="color:#94a3b8;font-size:11px;margin:0;font-family:Arial,sans-serif;">
          This is an automated notification. Please do not reply to this email.
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

export function generateCreatorNotificationEmail(params: ICreatorNotificationEmail): string {
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

    <!-- INDIGO HEADER -->
    <tr>
      <td align="center" bgcolor="#6366f1"
          style="background-color:#6366f1;padding:36px 40px;">
        <p style="font-size:32px;margin:0 0 14px 0;color:#ffffff;
                  font-family:Arial,sans-serif;line-height:1;">
          &#9998;
        </p>
        <h1 style="color:#ffffff;margin:0 0 8px 0;font-size:24px;
                   font-weight:700;font-family:Arial,sans-serif;">
          Document Signed
        </h1>
        <p style="color:#e0e7ff;margin:0;font-size:14px;font-family:Arial,sans-serif;">
          A vendor has completed their signature
        </p>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:36px 40px;">
        <p style="color:#1e293b;font-size:16px;margin:0 0 16px 0;font-family:Arial,sans-serif;">
          Hi <strong>${params.creatorName}</strong>,
        </p>
        <p style="color:#475569;font-size:14px;line-height:1.65;margin:0 0 24px 0;
                  font-family:Arial,sans-serif;">
          <strong>${params.signerName}</strong> has signed the following document:
        </p>

        <!-- DOCUMENT INFO -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f8fafc;border:1px solid #e2e8f0;
                      border-left:4px solid #6366f1;margin:0 0 28px 0;">
          <tr>
            <td style="padding:20px 24px;">
              <p style="font-size:18px;font-weight:700;color:#1e293b;
                        margin:0 0 16px 0;font-family:Arial,sans-serif;">
                ${params.contractName}
              </p>
              <p style="font-size:11px;color:#64748b;text-transform:uppercase;
                        letter-spacing:0.5px;margin:0 0 10px 0;font-family:Arial,sans-serif;">
                Signature Details
              </p>
              <table cellpadding="0" cellspacing="0" border="0">
                ${dataRow('Signer:', params.signerName)}
                ${dataRow('Email:', params.signerEmail)}
                ${dataRow('Signed At:', fmtDate(params.signedAt))}
                ${dataRow('IP Address:', `<span style="font-family:'Courier New',monospace;font-size:12px;">${params.ipAddress}</span>`)}
                ${dataRow('Location:', params.location)}
              </table>
            </td>
          </tr>
        </table>

        <!-- CTA BUTTON -->
        <table cellpadding="0" cellspacing="0" border="0" align="center"
               style="margin:0 0 28px 0;">
          <tr>
            <td bgcolor="#6366f1" style="background-color:#6366f1;padding:14px 32px;">
              <a href="https://tenant.sharepoint.com/sites/Legalhub"
                 style="color:#ffffff;text-decoration:none;font-size:15px;
                        font-weight:700;font-family:Arial,sans-serif;">
                View in LegalLens &rarr;
              </a>
            </td>
          </tr>
        </table>

        <!-- SECURITY INFO -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#f0fdf4;border-left:4px solid #10b981;">
          <tr>
            <td style="padding:14px 18px;">
              <p style="font-weight:700;color:#065f46;margin:0 0 6px 0;
                        font-size:13px;font-family:Arial,sans-serif;">
                Security Verified
              </p>
              <p style="color:#047857;font-size:13px;margin:0;line-height:1.6;
                        font-family:Arial,sans-serif;">
                This signature includes a complete audit trail with IP address verification,
                device fingerprinting, and timestamp proof.
                All data is securely stored in SharePoint.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#f8fafc" align="center"
          style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:12px;margin:0 0 4px 0;font-family:Arial,sans-serif;">
          LegalLens E-Signature System &middot; Budvik
        </p>
        <p style="color:#94a3b8;font-size:11px;margin:0;font-family:Arial,sans-serif;">
          Automated notification from your contract management system
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

export function generateOTPEmail(otpCode: string, signerName: string): string {
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

    <!-- INDIGO HEADER -->
    <tr>
      <td align="center" bgcolor="#6366f1"
          style="background-color:#6366f1;padding:36px 40px;">
        <p style="font-size:32px;margin:0 0 14px 0;color:#ffffff;
                  font-family:Arial,sans-serif;line-height:1;">
          &#128274;
        </p>
        <h1 style="color:#ffffff;margin:0 0 8px 0;font-size:24px;
                   font-weight:700;font-family:Arial,sans-serif;">
          Verification Code
        </h1>
        <p style="color:#e0e7ff;margin:0;font-size:14px;font-family:Arial,sans-serif;">
          Secure your signature with OTP
        </p>
      </td>
    </tr>

    <!-- BODY -->
    <tr>
      <td style="padding:36px 40px;">
        <p style="color:#1e293b;font-size:16px;margin:0 0 16px 0;font-family:Arial,sans-serif;">
          Hello <strong>${signerName}</strong>,
        </p>
        <p style="color:#475569;font-size:14px;line-height:1.65;margin:0 0 24px 0;
                  font-family:Arial,sans-serif;">
          To proceed with signing the document, please use the following verification code:
        </p>

        <!-- OTP CODE BOX — solid colour, no gradient -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="margin:0 0 28px 0;">
          <tr>
            <td align="center" bgcolor="#6366f1"
                style="background-color:#6366f1;padding:28px 20px;">
              <p style="font-size:11px;color:#c7d2fe;text-transform:uppercase;
                        letter-spacing:1px;margin:0 0 12px 0;font-family:Arial,sans-serif;">
                Your Verification Code
              </p>
              <p style="font-size:40px;font-weight:700;color:#ffffff;
                        letter-spacing:10px;margin:0;
                        font-family:'Courier New',Courier,monospace;">
                ${otpCode}
              </p>
            </td>
          </tr>
        </table>

        <!-- IMPORTANT NOTE -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0"
               style="background-color:#fef3c7;border-left:4px solid #f59e0b;
                      margin:0 0 20px 0;">
          <tr>
            <td style="padding:14px 18px;">
              <p style="font-weight:700;color:#92400e;margin:0 0 8px 0;
                        font-size:13px;font-family:Arial,sans-serif;">
                Important
              </p>
              <p style="color:#78350f;font-size:13px;margin:0 0 4px 0;
                        font-family:Arial,sans-serif;">
                &bull; This code expires in <strong>5 minutes</strong>
              </p>
              <p style="color:#78350f;font-size:13px;margin:0 0 4px 0;
                        font-family:Arial,sans-serif;">
                &bull; Do not share this code with anyone
              </p>
              <p style="color:#78350f;font-size:13px;margin:0;font-family:Arial,sans-serif;">
                &bull; LegalLens will never ask for your code
              </p>
            </td>
          </tr>
        </table>

        <p style="color:#64748b;font-size:13px;margin:0;line-height:1.6;
                  font-family:Arial,sans-serif;">
          If you did not request this code, please ignore this email.
        </p>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td bgcolor="#f8fafc" align="center"
          style="background-color:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:12px;margin:0 0 4px 0;font-family:Arial,sans-serif;">
          LegalLens E-Signature &middot; Budvik
        </p>
        <p style="color:#94a3b8;font-size:11px;margin:0;font-family:Arial,sans-serif;">
          This is an automated security email
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