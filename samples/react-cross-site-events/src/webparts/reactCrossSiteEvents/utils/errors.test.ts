import { getGraphErrorInfo } from './errors';

describe('getGraphErrorInfo', () => {
  it('classifies access denied as non-retryable', () => {
    expect(getGraphErrorInfo({ statusCode: 403, message: 'Forbidden' })).toEqual({ kind: 'accessDenied', message: 'You do not have permission to read this calendar.', canRetry: false });
  });

  it('classifies throttling and auth failures as retryable', () => {
    expect(getGraphErrorInfo({ status: 429, message: 'slow down' }).canRetry).toBe(true);
    expect(getGraphErrorInfo({ status: 401, message: 'expired' }).kind).toBe('unauthorized');
  });
});
