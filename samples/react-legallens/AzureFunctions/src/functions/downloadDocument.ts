import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { TokenService } from '../services/TokenService';
import { GraphService } from '../services/GraphService';

function getMimeType(fileName: string): string {
  const ext = (fileName.split('.').pop() ?? '').toLowerCase();
  const types: Record<string, string> = {
    pdf:  'application/pdf',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    doc:  'application/msword',
    txt:  'text/plain; charset=utf-8',
  };
  return types[ext] ?? 'application/octet-stream';
}

export async function downloadDocument(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('[DownloadDocument] Request received');

  const cors = {
    'Access-Control-Allow-Origin':  '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') return { status: 200, headers: cors };

  const jsonErr = (status: number, msg: string): HttpResponseInit => ({
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: msg }),
  });

  try {
    const tokenId = request.params.tokenId;
    if (!tokenId) return jsonErr(400, 'Token ID required');

    const tokenService = new TokenService();
    const validation   = await tokenService.validateToken(tokenId);
    if (!validation.valid || !validation.token) {
      context.log('[DownloadDocument] Invalid/expired token:', validation.error);
      return jsonErr(400, validation.error ?? 'Invalid token');
    }

    const token = validation.token;
    context.log(`[DownloadDocument] Token OK — file: "${token.fileName}"`);

    const graphService = new GraphService();

    let fileMetadata: any;
    try {
      fileMetadata = await graphService.getFileByPath(
        process.env.CONTRACTS_LIBRARY_ID!,
        token.fileName
      );
      context.log(`[DownloadDocument] File found — id: ${fileMetadata.id}  size: ${fileMetadata.size}`);
    } catch (findErr: any) {
      context.error(`[DownloadDocument] File not found: "${token.fileName}"`, findErr.message);
      return jsonErr(
        404,
        `File "${token.fileName}" not found in the Contracts library. ` +
        `Check that the file exists in the library root.`
      );
    }

    let buf: Buffer;
    try {
      buf = await graphService.downloadFile(
        process.env.CONTRACTS_LIBRARY_ID!,
        fileMetadata.id
      );
      context.log(`[DownloadDocument] Downloaded ${buf.length} bytes`);
    } catch (dlErr: any) {
      context.error(`[DownloadDocument] Download failed: "${token.fileName}"`, dlErr.message);
      return jsonErr(502, `Could not download file from SharePoint: ${dlErr.message}`);
    }

    const mimeType   = getMimeType(token.fileName);
    const isViewable = mimeType === 'application/pdf' || mimeType.startsWith('text/');
    const disposition = isViewable
      ? `inline; filename="${token.fileName}"`        
      : `attachment; filename="${token.fileName}"`;   

    context.log(`[DownloadDocument] Serving ${mimeType}  disposition: ${disposition}`);

    return {
      status: 200,
      headers: {
        ...cors,
        'Content-Type':        mimeType,
        'Content-Disposition': disposition,
        'Content-Length':      buf.length.toString(),
        'Cache-Control':       'no-store',
      },
      body: buf,
    };

  } catch (error: any) {
    context.error('[DownloadDocument] Unexpected error:', error);
    return jsonErr(500, error.message ?? 'Internal server error');
  }
}

app.http('downloadDocument', {
  methods:   ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route:     'document/{tokenId}',
  handler:   downloadDocument,
});