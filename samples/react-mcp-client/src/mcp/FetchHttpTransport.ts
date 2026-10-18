import { IHttpRequest, IHttpResponse, IHttpTransport } from './IHttpTransport';

/**
 * Talks to a real remote MCP server over Streamable HTTP.
 *
 * The bearer token, when configured, comes from the SPFx AAD token provider.
 * No secret is held here: the browser only ever sees a short lived access
 * token issued for the signed-in user. A server that needs a client secret
 * must sit behind a broker, which is a server side concern and deliberately
 * out of scope for this sample.
 *
 * The server must allow the SharePoint origin via CORS, and must expose
 * MCP-Protocol-Version, Mcp-Method and Mcp-Name in Access-Control-Allow-Headers.
 */
export type TokenProvider = () => Promise<string | undefined>;

export class FetchHttpTransport implements IHttpTransport {
  public readonly label: string = 'Remote server (streamable HTTP)';

  private readonly _getToken: TokenProvider | undefined;

  public constructor(getToken?: TokenProvider) {
    this._getToken = getToken;
  }

  public async post(request: IHttpRequest): Promise<IHttpResponse> {
    const headers: { [name: string]: string } = { ...request.headers };

    if (this._getToken) {
      const token = await this._getToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    const response = await fetch(request.url, {
      method: 'POST',
      headers,
      body: request.body
    });

    const body = await response.text();

    return {
      status: response.status,
      statusText: response.statusText,
      contentType: response.headers.get('content-type') || '',
      body
    };
  }
}
