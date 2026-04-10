import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { GraphService }      from '../services/GraphService';
import { TokenService }      from '../services/TokenService';
import { PDFService }        from '../services/PDFService';
import { GmailService }      from '../services/GmailService';
import { SecurityService }   from '../services/SecurityService';
import { DocumentConverter } from '../services/DocumentConverter';
import {
  generateVendorConfirmationEmail,
  generateCreatorNotificationEmail,
} from '../utils/EmailTemplates';

interface ISubmitSignatureRequest {
  tokenId:            string;
  signature:          string;
  email:              string;
  deviceFingerprint?: string;
  screenInfo?: { width: number; height: number; colorDepth: number };
}

async function sendNotifications(
  token:           any,
  ipAddress:       string,
  location:        string,
  signedPdfBuffer: Buffer,
  signedFileName:  string,
  context:         InvocationContext
) {
  try {
    if (process.env.ENABLE_NOTIFICATIONS !== 'true') {
      context.log('[Notifications] Disabled via ENABLE_NOTIFICATIONS');
      return;
    }

    const gmailService = new GmailService();
    if (!(await gmailService.verifyConnection())) {
      context.warn('[Notifications] Gmail connection failed — skipping emails');
      return;
    }

    const pdfAttachment = {
      filename:    signedFileName,
      content:     signedPdfBuffer,
      contentType: 'application/pdf',
    };

    const vendorHtml = generateVendorConfirmationEmail({
      signerName:   token.signerName,
      signerEmail:  token.signerEmail,
      contractName: token.contractName,
      signedAt:     new Date().toISOString(),
    });
    await gmailService.sendEmail(
      token.signerEmail,
      `Signature Complete: "${token.contractName}" — LegalLens`,
      vendorHtml,
      [pdfAttachment]
    );
    context.log('[Notifications] Vendor email sent with signed PDF attached');

    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    if (notificationEmail) {
      const creatorHtml = generateCreatorNotificationEmail({
        creatorName:  notificationEmail.split('@')[0],
        signerName:   token.signerName,
        signerEmail:  token.signerEmail,
        contractName: token.contractName,
        signedAt:     new Date().toISOString(),
        ipAddress,
        location,
      });
      await gmailService.sendEmail(
        notificationEmail,
        `Signed: "${token.contractName}" by ${token.signerName} — LegalLens`,
        creatorHtml,
        [pdfAttachment]
      );
      context.log('[Notifications] Creator email sent with signed PDF attached');
    }
  } catch (err: any) {
    context.error('[Notifications] Error (non-fatal, signature already saved):', err.message);
  }
}

async function logSecurityData(
  token: any, ipAddress: string, userAgent: string,
  deviceFingerprint: string, screenInfo: any,
  graphService: GraphService, context: InvocationContext
) {
  try {
    if (process.env.ENABLE_SECURITY_LOGGING !== 'true') return;
    const svc    = new SecurityService();
    const data   = await svc.collectSecurityData(ipAddress, userAgent, deviceFingerprint, screenInfo);
    const spData = svc.formatForSharePoint(data, token.signerEmail, token.tokenId);
    const listId = process.env.SECURITY_AUDIT_LIST_ID;
    if (listId) {
      await graphService.createListItem(process.env.SHAREPOINT_SITE_ID!, listId, spData);
      context.log('[Security] Logged to SharePoint');
    }
  } catch (err: any) {
    context.error('[Security] Error (non-fatal):', err.message);
  }
}

async function getLocationString(ip: string): Promise<string> {
  try {
    const svc = new SecurityService();
    const geo = await svc.getGeolocation(ip);
    return [geo.city, geo.region, geo.country].filter(Boolean).join(', ');
  } catch { return 'Unknown Location'; }
}

export async function submitSignature(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('[SubmitSignature] Request received');

  const headers = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type':                 'application/json',
  };

  if (request.method === 'OPTIONS') return { status: 200, headers };

  try {
    const body = await request.json() as ISubmitSignatureRequest;
    const { tokenId, signature, email, deviceFingerprint, screenInfo } = body;

    if (!tokenId || !signature || !email) {
      return { status: 400, headers, jsonBody: { success: false, error: 'Missing required fields: tokenId, signature, email' } };
    }

    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0]
                   || request.headers.get('x-real-ip') || 'Unknown';
    context.log('[SubmitSignature] Token:', tokenId, '| Email:', email, '| IP:', ipAddress);

    const graphService = new GraphService();
    const tokenService = new TokenService();
    const pdfService   = new PDFService();
    const docConverter = new DocumentConverter();

    const validation = await tokenService.validateToken(tokenId);
    if (!validation.valid || !validation.token) {
      return { status: 404, headers, jsonBody: { success: false, error: validation.error || 'Invalid or expired token' } };
    }
    const token = validation.token;

    if (token.used) {
      return { status: 400, headers, jsonBody: { success: false, error: 'This signature link has already been used' } };
    }
    if (token.signerEmail.toLowerCase() !== email.toLowerCase()) {
      return { status: 403, headers, jsonBody: { success: false, error: 'Email does not match the intended signer' } };
    }

    context.log('[SubmitSignature] Downloading source file:', token.fileName);
    let sourceBuffer: Buffer;

    if (token.driveItemId) {
      context.log('[SubmitSignature] Using driveItemId:', token.driveItemId);
      sourceBuffer = await graphService.downloadFile(
        process.env.CONTRACTS_LIBRARY_ID!,
        token.driveItemId
      );
      context.log('[SubmitSignature] Downloaded:', sourceBuffer.length, 'bytes');
    } else {
      context.warn('[SubmitSignature] No driveItemId in token — resolving file by name');
      try {
        const fileInfo = await graphService.getFileByPath(
          process.env.CONTRACTS_LIBRARY_ID!,
          token.fileName
        );
        context.log('[SubmitSignature] Resolved file ID:', fileInfo.id, 'size:', fileInfo.size);
        sourceBuffer = await graphService.downloadFile(
          process.env.CONTRACTS_LIBRARY_ID!,
          fileInfo.id
        );
        context.log('[SubmitSignature] Downloaded:', sourceBuffer.length, 'bytes');
      } catch (lookupErr: any) {
        context.error('[SubmitSignature] Could not find file by name:', token.fileName, lookupErr.message);
        return {
          status: 404, headers,
          jsonBody: {
            success: false,
            error: `Source file "${token.fileName}" not found in Contracts library. ` +
                   `Please ensure the file exists and the DriveItemID column is populated in the Signature Tokens list.`,
          },
        };
      }
    }

    context.log('[SubmitSignature] Step 1: Building merged PDF (cover page + document body)...');
    let mergedPdfBuffer: Buffer;
    try {
      mergedPdfBuffer = await docConverter.toPDFWithSignaturePage(
        sourceBuffer,
        token.fileName,
        token.contractName,
        [{ name: token.signerName, email: token.signerEmail }]
      );

      const { PDFDocument } = require('pdf-lib');
      const check = await PDFDocument.load(mergedPdfBuffer);
      context.log(`[SubmitSignature] Merged PDF: ${mergedPdfBuffer.length} bytes, ${check.getPageCount()} pages`);
    } catch (convErr: any) {
      context.error('[SubmitSignature] DocumentConverter failed:', convErr.message);
      context.warn('[SubmitSignature] Falling back to raw source buffer (no cover page)');
      mergedPdfBuffer = sourceBuffer;
    }

    context.log('[SubmitSignature] Step 2: Stamping signature onto cover page...');
    const signedPdfBuffer = await pdfService.addSignatureToPDF(
      mergedPdfBuffer,
      signature,
      token.signerName,
      token.signerEmail,
      0,  
      1  
    );
    context.log('[SubmitSignature] Signed PDF ready:', signedPdfBuffer.length, 'bytes');

    const signedFileName = `${token.fileName.replace(/\.[^.]+$/, '')}_signed_${Date.now()}.pdf`;
    const libraryId      = process.env.SIGNED_DOCS_LIBRARY_ID!;

    context.log('[SubmitSignature] Uploading:', signedFileName);
    const uploadResponse = await graphService.uploadFile(libraryId, signedFileName, signedPdfBuffer);
    const signedFileUrl  = uploadResponse.webUrl;
    context.log('[SubmitSignature] Uploaded:', signedFileUrl);

    try {
      context.log('[SubmitSignature] Updating SharePoint column values...');
      await graphService.updateFileMetadata(libraryId, uploadResponse.id, {
        Title:        token.contractName,
        ContractName: token.contractName,
        SignerName:   token.signerName,
        SignerEmail:  token.signerEmail,
        SignedDate:   new Date().toISOString(),
        IPAddress:    ipAddress,
        Status:       'Completed',
        Parties:      token.signerName,
        ContractType: 'Standard',
      });
      context.log('[SubmitSignature] Column values updated successfully');
    } catch (metaErr: any) {
      context.error(
        '[SubmitSignature] Column update failed — verify internal field names in SharePoint:',
        metaErr.message
      );
    }

    await tokenService.markTokenUsed(
      token.id,
      signature.substring(0, 100) + '...',
      email,
      ipAddress
    );
    context.log('[SubmitSignature] Token marked as used');

    if (deviceFingerprint || screenInfo) {
      await logSecurityData(
        token, ipAddress,
        request.headers.get('user-agent') || 'Unknown',
        deviceFingerprint || 'not-provided',
        screenInfo, graphService, context
      );
    }

    const location = await getLocationString(ipAddress);
    await sendNotifications(token, ipAddress, location, signedPdfBuffer, signedFileName, context);

    context.log('[SubmitSignature] Complete');

    return {
      status: 200, headers,
      jsonBody: {
        success:        true,
        message:        'Signature submitted successfully',
        signedUrl:      signedFileUrl,
        signedDocument: signedFileName,
      },
    };

  } catch (err: any) {
    context.error('[SubmitSignature] Unhandled error:', err);
    return { status: 500, headers, jsonBody: { success: false, error: 'Failed to process signature', detail: err.message } };
  }
}

app.http('submitSignature', {
  methods:   ['POST', 'OPTIONS'],
  authLevel: 'anonymous',
  route:     'submitSignature',
  handler:   submitSignature,
});