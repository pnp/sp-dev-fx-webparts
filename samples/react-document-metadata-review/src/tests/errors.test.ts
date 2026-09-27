import { classifyServiceError } from '../webparts/documentMetadataReview/utils/errors';

describe('service error classification', () => {
  test('identifies access denied as non-retryable', () => {
    expect(classifyServiceError({ status: 403 }).kind).toBe('access-denied');
    expect(classifyServiceError({ status: 403 }).retryable).toBe(false);
  });

  test('identifies throttling and preserves Retry-After', () => {
    expect(classifyServiceError({ status: 429, headers: { 'Retry-After': '12' } })).toMatchObject({ kind: 'throttled', retryAfterSeconds: 12, retryable: true });
  });

  test('classifies network, not-found, and unknown errors', () => {
    expect(classifyServiceError(new Error('Failed to fetch')).kind).toBe('network');
    expect(classifyServiceError({ statusCode: 404 }).kind).toBe('not-found');
    expect(classifyServiceError({ status: 500, message: 'Server problem' }).kind).toBe('unknown');
  });
});
