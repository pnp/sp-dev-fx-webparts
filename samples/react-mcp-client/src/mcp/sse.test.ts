import { parseSse } from './sse';

describe('parseSse', () => {
  it('separates notifications from the final response', () => {
    const body = [
      'event: message',
      'data: {"jsonrpc":"2.0","method":"notifications/progress","params":{"progress":0.5}}',
      '',
      'event: message',
      'data: {"jsonrpc":"2.0","id":1,"result":{"content":[]}}',
      ''
    ].join('\n');

    const result = parseSse(body);

    expect(result.notifications.length).toBe(1);
    expect(result.response).toBeDefined();
    expect(result.response!.id).toBe(1);
  });

  it('ignores comment lines used as keep-alives', () => {
    const body = [':', '', 'data: {"jsonrpc":"2.0","id":7,"result":{}}', ''].join('\n');
    const result = parseSse(body);
    expect(result.notifications.length).toBe(0);
    expect(result.response!.id).toBe(7);
  });

  it('handles CRLF line endings', () => {
    const body = 'data: {"jsonrpc":"2.0","id":2,"result":{}}\r\n\r\n';
    expect(parseSse(body).response!.id).toBe(2);
  });

  it('treats an error payload as the response', () => {
    const body = 'data: {"jsonrpc":"2.0","id":3,"error":{"code":-32020,"message":"nope"}}\n\n';
    const result = parseSse(body);
    expect(result.response!.error!.code).toBe(-32020);
  });

  it('skips a malformed frame without losing the good ones', () => {
    const body = ['data: not json', '', 'data: {"jsonrpc":"2.0","id":4,"result":{}}', ''].join('\n');
    expect(parseSse(body).response!.id).toBe(4);
  });

  it('returns no response when the stream never carried one', () => {
    const body = 'data: {"jsonrpc":"2.0","method":"notifications/progress","params":{}}\n\n';
    const result = parseSse(body);
    expect(result.response).toBeUndefined();
    expect(result.notifications.length).toBe(1);
  });
});
