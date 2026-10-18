import { IHttpRequest, IHttpResponse, IHttpTransport } from './IHttpTransport';
import {
  HEADER_METHOD,
  HEADER_NAME,
  HEADER_PARAM_PREFIX,
  HEADER_PROTOCOL_VERSION,
  ICallToolResult,
  IJsonRpcRequest,
  IJsonRpcResponse,
  IListToolsResult,
  ITool,
  METHODS_REQUIRING_NAME,
  PROTOCOL_VERSION,
  buildMeta
} from './protocol';
import { encodeHeaderValue, stringifyParamValue } from './headerEncoding';
import { filterValidTools, validateTool, valueAtPath } from './xMcpHeader';
import { parseSse } from './sse';

export interface ITraceEntry {
  seq: number;
  method: string;
  request: IHttpRequest;
  response?: IHttpResponse;
  /** Request-scoped notifications, when the server answered with an SSE stream. */
  notifications: unknown[];
  error?: string;
  durationMs: number;
}

export interface IListToolsOutcome {
  tools: ITool[];
  rejected: { name: string; reason: string }[];
  ttlMs?: number;
  cacheScope?: string;
}

export class McpProtocolError extends Error {
  public readonly code: number | undefined;

  public constructor(message: string, code?: number) {
    super(message);
    this.name = 'McpProtocolError';
    this.code = code;
    // Extending a built-in breaks the prototype chain when the code is emitted
    // for older targets, which makes `instanceof` fail. Restore it explicitly.
    Object.setPrototypeOf(this, McpProtocolError.prototype);
  }
}

export class McpClient {
  private readonly _transport: IHttpTransport;
  private readonly _endpoint: string;
  private _nextId: number = 1;
  private _trace: ITraceEntry[] = [];

  public constructor(transport: IHttpTransport, endpoint: string) {
    this._transport = transport;
    this._endpoint = endpoint;
  }

  public get transportLabel(): string {
    return this._transport.label;
  }

  public get trace(): ITraceEntry[] {
    return this._trace;
  }

  public clearTrace(): void {
    this._trace = [];
  }

  /**
   * Builds the HTTP request for a JSON-RPC call, mirroring the body fields the
   * 2026-07-28 transport requires in headers. A server rejects the request with
   * a HeaderMismatch error if these disagree with the body, so they are derived
   * from the body rather than passed in separately.
   */
  private _buildRequest(
    method: string,
    params: { [key: string]: unknown },
    tool?: ITool
  ): { http: IHttpRequest; rpc: IJsonRpcRequest } {
    const rpc: IJsonRpcRequest = {
      jsonrpc: '2.0',
      id: this._nextId++,
      method,
      params: { ...params, _meta: buildMeta() }
    };

    const headers: { [name: string]: string } = {
      'Content-Type': 'application/json',
      // Both must be listed: the server chooses per request which one to use.
      Accept: 'application/json, text/event-stream'
    };
    headers[HEADER_PROTOCOL_VERSION] = PROTOCOL_VERSION;
    headers[HEADER_METHOD] = method;

    if (METHODS_REQUIRING_NAME.indexOf(method) >= 0) {
      const source = params.name !== undefined ? params.name : params.uri;
      if (source !== undefined) {
        headers[HEADER_NAME] = encodeHeaderValue(String(source));
      }
    }

    // x-mcp-header parameter mirroring. Mandatory for clients.
    if (tool && method === 'tools/call') {
      const args = (params.arguments || {}) as { [key: string]: unknown };
      for (const annotation of validateTool(tool).annotations) {
        const raw = valueAtPath(args, annotation.path);
        const asString = stringifyParamValue(raw);
        if (asString !== undefined) {
          headers[`${HEADER_PARAM_PREFIX}${annotation.headerName}`] = encodeHeaderValue(asString);
        }
      }
    }

    return {
      http: { url: this._endpoint, headers, body: JSON.stringify(rpc, null, 2) },
      rpc
    };
  }

  private async _send(
    method: string,
    params: { [key: string]: unknown },
    tool?: ITool
  ): Promise<unknown> {
    const { http } = this._buildRequest(method, params, tool);
    const started = Date.now();

    const entry: ITraceEntry = {
      seq: this._trace.length + 1,
      method,
      request: http,
      notifications: [],
      durationMs: 0
    };
    this._trace = this._trace.concat([entry]);

    let response: IHttpResponse;
    try {
      response = await this._transport.post(http);
    } catch (e) {
      entry.durationMs = Date.now() - started;
      entry.error = e instanceof Error ? e.message : String(e);
      // A browser CORS failure surfaces here as an opaque TypeError, so say so.
      throw new McpProtocolError(
        `Transport failure: ${entry.error}. If this is a remote server, check that it allows this origin and the MCP-Protocol-Version, Mcp-Method and Mcp-Name headers via CORS.`
      );
    }

    entry.durationMs = Date.now() - started;
    entry.response = response;

    let rpcResponse: IJsonRpcResponse | undefined;

    if (response.contentType.indexOf('text/event-stream') >= 0) {
      const parsed = parseSse(response.body);
      entry.notifications = parsed.notifications;
      rpcResponse = parsed.response;
    } else {
      try {
        rpcResponse = JSON.parse(response.body) as IJsonRpcResponse;
      } catch {
        entry.error = 'Response body was not JSON';
        throw new McpProtocolError(`Response was not JSON (HTTP ${response.status})`);
      }
    }

    if (!rpcResponse) {
      entry.error = 'Stream ended without a JSON-RPC response';
      throw new McpProtocolError('The stream ended without a JSON-RPC response');
    }

    if (rpcResponse.error) {
      entry.error = `${rpcResponse.error.code}: ${rpcResponse.error.message}`;
      throw new McpProtocolError(rpcResponse.error.message, rpcResponse.error.code);
    }

    return rpcResponse.result;
  }

  public async discover(): Promise<unknown> {
    return this._send('server/discover', {});
  }

  public async listTools(): Promise<IListToolsOutcome> {
    const result = (await this._send('tools/list', {})) as IListToolsResult;
    const all = result && result.tools ? result.tools : [];
    const filtered = filterValidTools(all);
    return {
      tools: filtered.tools,
      rejected: filtered.rejected,
      ttlMs: result ? result.ttlMs : undefined,
      cacheScope: result ? result.cacheScope : undefined
    };
  }

  public async callTool(tool: ITool, args: { [key: string]: unknown }): Promise<ICallToolResult> {
    const result = await this._send('tools/call', { name: tool.name, arguments: args }, tool);
    return (result || {}) as ICallToolResult;
  }
}
