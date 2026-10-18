/**
 * Model Context Protocol, revision 2026-07-28.
 *
 * This revision is a large break from earlier ones. There is no `initialize`
 * handshake and no `Mcp-Session-Id`: every request is self contained and
 * carries the protocol version, client identity and client capabilities in
 * `params._meta`, mirrored into HTTP headers so intermediaries can route
 * without parsing the body.
 *
 * Spec: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
 */

export const PROTOCOL_VERSION: string = '2026-07-28';

export const META_PROTOCOL_VERSION: string = 'io.modelcontextprotocol/protocolVersion';
export const META_CLIENT_INFO: string = 'io.modelcontextprotocol/clientInfo';
export const META_CLIENT_CAPABILITIES: string = 'io.modelcontextprotocol/clientCapabilities';

export const HEADER_PROTOCOL_VERSION: string = 'MCP-Protocol-Version';
export const HEADER_METHOD: string = 'Mcp-Method';
export const HEADER_NAME: string = 'Mcp-Name';
export const HEADER_PARAM_PREFIX: string = 'Mcp-Param-';

/** JSON-RPC error code the spec reserves for header and body disagreement. */
export const ERROR_HEADER_MISMATCH: number = -32020;
export const ERROR_METHOD_NOT_FOUND: number = -32601;

export const CLIENT_INFO = {
  name: 'spfx-mcp-client',
  version: '1.0.0'
};

export interface IJsonRpcRequest {
  jsonrpc: '2.0';
  id: number;
  method: string;
  params: {
    [key: string]: unknown;
    _meta: { [key: string]: unknown };
  };
}

export interface IJsonRpcError {
  code: number;
  message: string;
  data?: unknown;
}

export interface IJsonRpcResponse {
  jsonrpc: '2.0';
  // JSON-RPC 2.0 requires a null id on an error response that could not be
  // correlated to a request, so null is part of the wire format here.
  // eslint-disable-next-line @rushstack/no-new-null
  id: number | null;
  result?: unknown;
  error?: IJsonRpcError;
}

/**
 * A JSON Schema property. Only the subset the sample reads is typed;
 * `x-mcp-header` is the 2026-07-28 extension that asks the client to mirror
 * this parameter into an `Mcp-Param-{name}` header.
 */
export interface IToolInputProperty {
  type?: string;
  description?: string;
  enum?: string[];
  'x-mcp-header'?: string;
  properties?: { [name: string]: IToolInputProperty };
}

export interface IToolInputSchema {
  type?: string;
  properties?: { [name: string]: IToolInputProperty };
  required?: string[];
}

export interface ITool {
  name: string;
  title?: string;
  description?: string;
  inputSchema?: IToolInputSchema;
}

export interface IListToolsResult {
  tools: ITool[];
  /** 2026-07-28 makes list results cacheable. Surfaced so the UI can show it. */
  ttlMs?: number;
  cacheScope?: string;
}

export interface IContentBlock {
  type: string;
  text?: string;
  [key: string]: unknown;
}

export interface ICallToolResult {
  content?: IContentBlock[];
  structuredContent?: unknown;
  isError?: boolean;
}

/** Methods that must carry an Mcp-Name header, sourced from params.name or params.uri. */
export const METHODS_REQUIRING_NAME: string[] = ['tools/call', 'resources/read', 'prompts/get'];

export const buildMeta = (): { [key: string]: unknown } => {
  const meta: { [key: string]: unknown } = {};
  meta[META_PROTOCOL_VERSION] = PROTOCOL_VERSION;
  meta[META_CLIENT_INFO] = { name: CLIENT_INFO.name, version: CLIENT_INFO.version };
  meta[META_CLIENT_CAPABILITIES] = {};
  return meta;
};
