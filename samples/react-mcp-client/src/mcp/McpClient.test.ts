import { McpClient, McpProtocolError } from './McpClient';
import { MockHttpTransport } from './MockHttpTransport';
import { IHttpRequest, IHttpResponse, IHttpTransport } from './IHttpTransport';
import {
  HEADER_METHOD,
  HEADER_NAME,
  HEADER_PROTOCOL_VERSION,
  META_PROTOCOL_VERSION,
  PROTOCOL_VERSION,
  ITool
} from './protocol';

const ENDPOINT = 'https://mock.local/mcp';

const newClient = (): McpClient => new McpClient(new MockHttpTransport(), ENDPOINT);

/** Captures what the client sent, then delegates to the real mock server. */
class RecordingTransport implements IHttpTransport {
  public readonly label: string = 'recording';
  public readonly sent: IHttpRequest[] = [];
  private readonly _inner = new MockHttpTransport();

  public async post(request: IHttpRequest): Promise<IHttpResponse> {
    this.sent.push(request);
    return this._inner.post(request);
  }
}

describe('request construction', () => {
  it('sends the required 2026-07-28 headers and matching _meta', async () => {
    const recorder = new RecordingTransport();
    const client = new McpClient(recorder, ENDPOINT);

    await client.listTools();

    const sent = recorder.sent[0];
    expect(sent.headers[HEADER_PROTOCOL_VERSION]).toBe(PROTOCOL_VERSION);
    expect(sent.headers[HEADER_METHOD]).toBe('tools/list');
    expect(sent.headers.Accept).toContain('application/json');
    expect(sent.headers.Accept).toContain('text/event-stream');

    const body = JSON.parse(sent.body);
    expect(body.params._meta[META_PROTOCOL_VERSION]).toBe(PROTOCOL_VERSION);
  });

  it('does not send an Mcp-Name header for tools/list', async () => {
    const recorder = new RecordingTransport();
    await new McpClient(recorder, ENDPOINT).listTools();
    expect(recorder.sent[0].headers[HEADER_NAME]).toBeUndefined();
  });

  it('sends Mcp-Name for tools/call, matching the body', async () => {
    const recorder = new RecordingTransport();
    const client = new McpClient(recorder, ENDPOINT);
    const tools = (await client.listTools()).tools;
    const echo = tools.filter(t => t.name === 'echo')[0];

    await client.callTool(echo, { text: 'hi' });

    const call = recorder.sent[1];
    expect(call.headers[HEADER_NAME]).toBe('echo');
    expect(JSON.parse(call.body).params.name).toBe('echo');
  });

  it('mirrors an x-mcp-header parameter into Mcp-Param-Region', async () => {
    const recorder = new RecordingTransport();
    const client = new McpClient(recorder, ENDPOINT);
    const sql = (await client.listTools()).tools.filter(t => t.name === 'execute_sql')[0];

    await client.callTool(sql, { region: 'us-west1', query: 'SELECT 1' });

    expect(recorder.sent[1].headers['Mcp-Param-Region']).toBe('us-west1');
  });

  it('omits the mirrored header when the argument is absent', async () => {
    const recorder = new RecordingTransport();
    const client = new McpClient(recorder, ENDPOINT);
    const sql = (await client.listTools()).tools.filter(t => t.name === 'execute_sql')[0];

    await client.callTool(sql, { query: 'SELECT 1' });

    expect(recorder.sent[1].headers['Mcp-Param-Region']).toBeUndefined();
  });

  it('gives every request a new id', async () => {
    const recorder = new RecordingTransport();
    const client = new McpClient(recorder, ENDPOINT);
    await client.listTools();
    await client.listTools();
    expect(JSON.parse(recorder.sent[0].body).id).not.toBe(JSON.parse(recorder.sent[1].body).id);
  });
});

describe('tools/list', () => {
  it('returns the valid tools and reports the rejected one', async () => {
    const outcome = await newClient().listTools();
    expect(outcome.tools.map(t => t.name)).toEqual(['echo', 'execute_sql', 'slow_report']);
    expect(outcome.rejected.map(r => r.name)).toEqual(['broken_tool']);
  });

  it('surfaces the cache hints added in this revision', async () => {
    const outcome = await newClient().listTools();
    expect(outcome.ttlMs).toBe(60000);
    expect(outcome.cacheScope).toBe('session');
  });
});

describe('tools/call', () => {
  it('returns text content', async () => {
    const client = newClient();
    const echo = (await client.listTools()).tools.filter(t => t.name === 'echo')[0];
    const result = await client.callTool(echo, { text: 'round trip' });
    expect(result.content![0].text).toBe('round trip');
  });

  it('reads a result delivered as an SSE stream and records the notifications', async () => {
    const client = newClient();
    const slow = (await client.listTools()).tools.filter(t => t.name === 'slow_report')[0];

    const result = await client.callTool(slow, { rows: 25 });

    expect(result.content![0].text).toContain('25 rows');
    const entry = client.trace[client.trace.length - 1];
    expect(entry.response!.contentType).toContain('text/event-stream');
    expect(entry.notifications.length).toBe(2);
  });

  it('throws a protocol error for an unknown tool', async () => {
    const client = newClient();
    const fake: ITool = { name: 'does_not_exist' };
    await expect(client.callTool(fake, {})).rejects.toBeInstanceOf(McpProtocolError);
  });
});

describe('server validation', () => {
  it('rejects a request whose headers disagree with the body', async () => {
    // A deliberately non conforming transport, to prove the mock server is
    // actually validating rather than waving requests through.
    const tampering: IHttpTransport = {
      label: 'tampering',
      post: async (request: IHttpRequest) => {
        const broken = { ...request, headers: { ...request.headers } };
        broken.headers[HEADER_METHOD] = 'tools/somethingelse';
        return new MockHttpTransport().post(broken);
      }
    };

    await expect(new McpClient(tampering, ENDPOINT).listTools()).rejects.toThrow(/Header mismatch/);
  });
});

describe('trace', () => {
  it('records one entry per call and can be cleared', async () => {
    const client = newClient();
    await client.listTools();
    expect(client.trace.length).toBe(1);
    expect(client.trace[0].method).toBe('tools/list');
    client.clearTrace();
    expect(client.trace.length).toBe(0);
  });
});

describe('server/discover', () => {
  it('returns server info without any handshake first', async () => {
    const info = (await newClient().discover()) as { serverInfo: { name: string } };
    expect(info.serverInfo.name).toBe('mock-mcp-server');
  });
});
