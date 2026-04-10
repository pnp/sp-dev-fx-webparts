import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { TokenService } from '../services/TokenService';
import { GraphService } from '../services/GraphService';

export async function validateToken(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log('[ValidateToken] Request received');

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return { status: 200, headers };
  }

  try {
    const tokenId = request.params.tokenId;
    
    if (!tokenId) {
      return {
        status: 400,
        headers,
        jsonBody: { error: 'Token ID required' },
      };
    }

    const tokenService = new TokenService();
    const validation = await tokenService.validateToken(tokenId);

    if (!validation.valid || !validation.token) {
      return {
        status: 400,
        headers,
        jsonBody: { error: validation.error || 'Invalid token' },
      };
    }

    const token = validation.token;

    const graphService = new GraphService();
    const fileMetadata = await graphService.getFileByPath(
      process.env.CONTRACTS_LIBRARY_ID!,
      token.fileName
    );

    return {
      status: 200,
      headers,
      jsonBody: {
        token: {
          tokenId: token.tokenId,
          contractName: token.contractName,
          signerName: token.signerName,
          signerEmail: token.signerEmail,
          expires: token.expires,
        },
        document: {
          name: fileMetadata.name,
          size: fileMetadata.size,
          webUrl: fileMetadata.webUrl,
        },
      },
    };
  } catch (error: any) {
    context.error('[ValidateToken] Error:', error);
    return {
      status: 500,
      headers,
      jsonBody: { error: error.message },
    };
  }
}

app.http('validateToken', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'validate/{tokenId}',
  handler: validateToken,
});