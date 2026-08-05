import { normaliseGraphError, isTransient } from './normaliseGraphError';

describe('normaliseGraphError', () => {
  it('reads 403 as the tenant not having approved the permission', () => {
    expect(normaliseGraphError({ statusCode: 403, code: 'accessDenied' })).toEqual({
      failure: 'permissionDenied'
    });
  });

  it('reads 401 as a sign-in problem, not an administrative one', () => {
    expect(normaliseGraphError({ statusCode: 401 })).toEqual({ failure: 'notAuthenticated' });
  });

  it('never reports a sign-in problem as a missing permission', () => {
    // The two send the person somewhere completely different: one to sign in
    // again, the other to an administrator.
    expect(normaliseGraphError({ statusCode: 401 }).failure).not.toEqual('permissionDenied');
  });

  it('reads 429 as throttling and keeps the wait Microsoft Graph asked for', () => {
    expect(normaliseGraphError({ statusCode: 429, headers: { 'Retry-After': '30' } })).toEqual({
      failure: 'throttled',
      retryAfterSeconds: 30
    });
  });

  it('still reports throttling when no Retry-After is given', () => {
    expect(normaliseGraphError({ statusCode: 429 })).toEqual({ failure: 'throttled' });
  });

  it('reads a Headers-like object as well as a plain record', () => {
    const headers = { get: (name: string) => (name === 'Retry-After' ? '12' : null) };
    expect(normaliseGraphError({ statusCode: 429, headers })).toEqual({
      failure: 'throttled',
      retryAfterSeconds: 12
    });
  });

  it.each([500, 502, 503, 504])('reads %i as a transient service error', (statusCode) => {
    expect(normaliseGraphError({ statusCode })).toEqual({ failure: 'serviceError' });
  });

  it('falls back to unknown for a network failure with no status', () => {
    expect(normaliseGraphError(new Error('Failed to fetch'))).toEqual({ failure: 'unknown' });
  });

  it('survives being handed nothing at all', () => {
    expect(normaliseGraphError(undefined)).toEqual({ failure: 'unknown' });
    expect(normaliseGraphError(null)).toEqual({ failure: 'unknown' });
    expect(normaliseGraphError('boom')).toEqual({ failure: 'unknown' });
  });

  it('accepts status as well as statusCode, since both shapes arrive', () => {
    expect(normaliseGraphError({ status: 403 })).toEqual({ failure: 'permissionDenied' });
  });

  it('trusts an authorization code even when the status is missing', () => {
    expect(normaliseGraphError({ code: 'authorizationRequestDenied' })).toEqual({
      failure: 'permissionDenied'
    });
  });
});

describe('isTransient', () => {
  it('is true only for the outcomes worth retrying on their own', () => {
    expect(isTransient('throttled')).toBe(true);
    expect(isTransient('serviceError')).toBe(true);
  });

  it('is false for a missing permission, which no amount of retrying fixes', () => {
    expect(isTransient('permissionDenied')).toBe(false);
    expect(isTransient('notAuthenticated')).toBe(false);
    expect(isTransient('unknown')).toBe(false);
  });
});
