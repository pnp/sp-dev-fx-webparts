import { HttpRequestError } from './HttpRequestError';
import { redactForLogging, serializeError, stringifyDetails, toMessage } from './ErrorSerialization';

describe('serializeError', () => {
  it('preserves the message and stack that JSON.stringify would drop', () => {
    const serialized = serializeError(new Error('boom'));
    expect(serialized.message).toBe('boom');
    expect(serialized.name).toBe('Error');
    expect(JSON.stringify(serialized)).toContain('boom');
  });

  it('keeps the status and request url from an HttpRequestError', () => {
    const serialized = serializeError(new HttpRequestError(429, 'Too Many Requests', 'slow down', '/api/x'));
    expect(serialized.status).toBe(429);
    expect(serialized.requestUrl).toBe('/api/x');
  });

  it('handles non-error values', () => {
    expect(serializeError('just a string').message).toBe('just a string');
    expect(serializeError(undefined).message).toBe('Unknown error.');
  });
});

describe('redactForLogging', () => {
  it('removes personal data', () => {
    const redacted = redactForLogging({
      pageName: 'Home.aspx',
      authorEmail: 'someone@contoso.com',
      nested: { userPrincipalName: 'someone@contoso.com' }
    }) as Record<string, unknown>;

    expect(redacted.pageName).toBe('Home.aspx');
    expect(redacted.authorEmail).toBe('[redacted]');
    expect(JSON.stringify(redacted)).not.toContain('someone@contoso.com');
  });

  it('breaks cycles instead of throwing', () => {
    const cyclic: Record<string, unknown> = { name: 'page' };
    cyclic.self = cyclic;

    expect(() => stringifyDetails(cyclic)).not.toThrow();
    expect(stringifyDetails(cyclic)).toContain('[circular]');
  });

  it('bounds deep structures and long arrays', () => {
    let deep: Record<string, unknown> = { value: 'leaf' };
    for (let i = 0; i < 20; i += 1) {
      deep = { child: deep };
    }
    expect(stringifyDetails(deep)).toContain('[max depth]');

    const long = Array.from({ length: 200 }, (_, index) => index);
    expect(stringifyDetails({ long })).toContain('more]');
  });

  it('expands errors nested inside a details payload', () => {
    const output = stringifyDetails({ context: 'migration', error: new Error('inner failure') });
    expect(output).toContain('inner failure');
  });

  it('drops functions', () => {
    const redacted = redactForLogging({ fn: () => undefined, keep: 1 }) as Record<string, unknown>;
    expect(redacted.fn).toBeUndefined();
    expect(redacted.keep).toBe(1);
  });
});

describe('toMessage', () => {
  it('prefers a real error message and falls back otherwise', () => {
    expect(toMessage(new Error('real'), 'fallback')).toBe('real');
    expect(toMessage(undefined, 'fallback')).toBe('fallback');
    expect(toMessage('   ', 'fallback')).toBe('fallback');
  });
});
