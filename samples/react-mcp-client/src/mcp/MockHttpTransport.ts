import { IHttpRequest, IHttpResponse, IHttpTransport } from './IHttpTransport';
import {
  ERROR_HEADER_MISMATCH,
  ERROR_METHOD_NOT_FOUND,
  HEADER_METHOD,
  HEADER_NAME,
  HEADER_PARAM_PREFIX,
  HEADER_PROTOCOL_VERSION,
  META_PROTOCOL_VERSION,
  PROTOCOL_VERSION,
  ITool
} from './protocol';
import { decodeHeaderValue } from './headerEncoding';

/**
 * An MCP server that runs in the browser tab.
 *
 * It exists so the sample can be cloned and run with no server to deploy and no
 * CORS to configure, and it is a strict server rather than a permissive stub:
 * it validates the 2026-07-28 header requirements and returns the real
 * HeaderMismatch error when the client gets them wrong. That makes it useful
 * for learning the revision, not just for filling the screen.
 *
 * The tool list deliberately contains one tool with an invalid `x-mcp-header`
 * annotation, so the client side rejection rule is visible in the UI.
 */

const TOOLS: ITool[] = [
  {
    name: 'echo',
    title: 'Echo',
    description: 'Returns whatever text you send. The simplest possible tool call.',
    inputSchema: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'Text to echo back' }
      },
      required: ['text']
    }
  },
  {
    name: 'execute_sql',
    title: 'Execute SQL',
    description:
      'Demonstrates x-mcp-header. The region parameter is mirrored into an Mcp-Param-Region header so a gateway can route on it without reading the body.',
    inputSchema: {
      type: 'object',
      properties: {
        region: {
          type: 'string',
          description: 'Region to execute in',
          enum: ['us-west1', 'europe-west6'],
          'x-mcp-header': 'Region'
        },
        query: { type: 'string', description: 'The SQL to run' }
      },
      required: ['region', 'query']
    }
  },
  {
    name: 'slow_report',
    title: 'Slow report',
    description:
      'Answers with an SSE stream: two progress notifications, then the result. Use it to see the streaming path in the trace.',
    inputSchema: {
      type: 'object',
      properties: {
        rows: { type: 'integer', description: 'How many rows to pretend to read' }
      }
    }
  },
  {
    // Invalid on purpose. The x-mcp-header annotation is on an array property,
    // which is not statically reachable, so a conforming client must exclude
    // this tool from the list it shows.
    name: 'broken_tool',
    title: 'Broken tool',
    description: 'Carries an invalid x-mcp-header annotation and must be rejected by the client.',
    inputSchema: {
      type: 'object',
      properties: {
        tags: { type: 'array', description: 'Not a primitive', 'x-mcp-header': 'Tags' }
      }
    }
  }
];

const json = (status: number, payload: unknown): IHttpResponse => ({
  status,
  statusText: status === 200 ? 'OK' : 'Bad Request',
  contentType: 'application/json',
  body: JSON.stringify(payload, null, 2)
});

const sse = (frames: unknown[]): IHttpResponse => ({
  status: 200,
  statusText: 'OK',
  contentType: 'text/event-stream',
  body: frames.map(f => `event: message\ndata: ${JSON.stringify(f)}\n`).join('\n')
});

const rpcError = (id: number | undefined, code: number, message: string): unknown => ({
  jsonrpc: '2.0',
  id,
  error: { code, message }
});

/** Header lookup is case insensitive per RFC 9110. */
const header = (headers: { [name: string]: string }, wanted: string): string | undefined => {
  const lower = wanted.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === lower) {
      return headers[key];
    }
  }
  return undefined;
};

const findTool = (name: string): ITool | undefined => {
  const matches = TOOLS.filter(t => t.name === name);
  return matches.length > 0 ? matches[0] : undefined;
};

export class MockHttpTransport implements IHttpTransport {
  public readonly label: string = 'Built-in mock server (no network)';

  public async post(request: IHttpRequest): Promise<IHttpResponse> {
    let body: {
      id?: number;
      method?: string;
      params?: { [key: string]: unknown; _meta?: { [key: string]: unknown } };
    };

    try {
      body = JSON.parse(request.body);
    } catch {
      return json(400, rpcError(undefined, -32700, 'Parse error'));
    }

    const id = body.id;
    const method = body.method || '';
    const params = body.params || {};

    // --- 2026-07-28 header validation ---------------------------------------

    const versionHeader = header(request.headers, HEADER_PROTOCOL_VERSION);
    if (!versionHeader) {
      return json(400, rpcError(id, ERROR_HEADER_MISMATCH, `Missing ${HEADER_PROTOCOL_VERSION} header`));
    }
    const metaVersion = params._meta ? params._meta[META_PROTOCOL_VERSION] : undefined;
    if (versionHeader !== metaVersion) {
      return json(
        400,
        rpcError(
          id,
          ERROR_HEADER_MISMATCH,
          `Header mismatch: ${HEADER_PROTOCOL_VERSION} '${versionHeader}' does not match _meta value '${String(metaVersion)}'`
        )
      );
    }
    if (versionHeader !== PROTOCOL_VERSION) {
      return json(400, {
        jsonrpc: '2.0',
        id,
        error: {
          code: -32021,
          message: `Unsupported protocol version '${versionHeader}'`,
          data: { supported: [PROTOCOL_VERSION] }
        }
      });
    }

    const methodHeader = header(request.headers, HEADER_METHOD);
    if (methodHeader !== method) {
      return json(
        400,
        rpcError(
          id,
          ERROR_HEADER_MISMATCH,
          `Header mismatch: ${HEADER_METHOD} '${String(methodHeader)}' does not match body method '${method}'`
        )
      );
    }

    // --- Routing -------------------------------------------------------------

    if (method === 'server/discover') {
      return json(200, {
        jsonrpc: '2.0',
        id,
        result: {
          serverInfo: { name: 'mock-mcp-server', version: '1.0.0' },
          capabilities: { tools: {} },
          protocolVersions: [PROTOCOL_VERSION]
        }
      });
    }

    if (method === 'tools/list') {
      return json(200, {
        jsonrpc: '2.0',
        id,
        result: { tools: TOOLS, ttlMs: 60000, cacheScope: 'session' }
      });
    }

    if (method === 'tools/call') {
      const name = String(params.name || '');
      const nameHeader = header(request.headers, HEADER_NAME);
      if (nameHeader === undefined) {
        return json(400, rpcError(id, ERROR_HEADER_MISMATCH, `Missing ${HEADER_NAME} header`));
      }
      if (decodeHeaderValue(nameHeader) !== name) {
        return json(
          400,
          rpcError(
            id,
            ERROR_HEADER_MISMATCH,
            `Header mismatch: ${HEADER_NAME} '${nameHeader}' does not match body value '${name}'`
          )
        );
      }

      const tool = findTool(name);
      if (!tool) {
        return json(404, rpcError(id, ERROR_METHOD_NOT_FOUND, `Unknown tool '${name}'`));
      }

      const args = (params.arguments || {}) as { [key: string]: unknown };

      if (name === 'execute_sql') {
        const regionHeader = header(request.headers, `${HEADER_PARAM_PREFIX}Region`);
        const region = args.region === undefined ? undefined : String(args.region);
        if (region !== undefined && decodeHeaderValue(regionHeader || '') !== region) {
          return json(
            400,
            rpcError(
              id,
              ERROR_HEADER_MISMATCH,
              `Header mismatch: ${HEADER_PARAM_PREFIX}Region '${String(regionHeader)}' does not match argument '${region}'`
            )
          );
        }
        return json(200, {
          jsonrpc: '2.0',
          id,
          result: {
            content: [
              {
                type: 'text',
                text: `Executed in ${String(region)}:\n${String(args.query || '')}\n\n3 rows returned (mock).`
              }
            ]
          }
        });
      }

      if (name === 'slow_report') {
        const rows = Number(args.rows || 100);
        return sse([
          { jsonrpc: '2.0', method: 'notifications/progress', params: { progress: 0.5, message: 'Reading rows' } },
          { jsonrpc: '2.0', method: 'notifications/progress', params: { progress: 1, message: 'Formatting' } },
          {
            jsonrpc: '2.0',
            id,
            result: { content: [{ type: 'text', text: `Report over ${rows} rows complete (mock).` }] }
          }
        ]);
      }

      return json(200, {
        jsonrpc: '2.0',
        id,
        result: { content: [{ type: 'text', text: String(args.text === undefined ? '' : args.text) }] }
      });
    }

    return json(404, rpcError(id, ERROR_METHOD_NOT_FOUND, `Method not found: ${method}`));
  }
}
