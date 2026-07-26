import { HttpRequestError } from './HttpRequestError';
import { executeWithRetry, getErrorStatus, isRetryableError, OperationCancelledError } from './RetryHelper';

const fastOptions = { maxAttempts: 3, baseDelayMs: 1, maxDelayMs: 5 };

describe('getErrorStatus', () => {
  it('reads the status from this solution\'s HttpRequestError', () => {
    expect(getErrorStatus(new HttpRequestError(429, 'Too Many Requests', '', '/x'))).toBe(429);
  });

  it('reads the status from a PnPjs-style error message', () => {
    const pnpError = new Error('Error making HttpClient request in queryable [429] Too Many Requests');
    expect(getErrorStatus(pnpError)).toBe(429);
  });

  it('reads the status from a Graph-style error object', () => {
    expect(getErrorStatus({ statusCode: 503, message: 'Service Unavailable' })).toBe(503);
    expect(getErrorStatus({ response: { status: 504 } })).toBe(504);
  });

  it('returns undefined for an error with no status', () => {
    expect(getErrorStatus(new Error('boom'))).toBeUndefined();
    expect(getErrorStatus('boom')).toBeUndefined();
  });
});

describe('isRetryableError', () => {
  it('retries throttling and transient server failures', () => {
    [408, 429, 500, 502, 503, 504].forEach((status) => {
      expect(isRetryableError({ status })).toBe(true);
    });
  });

  it('does not retry client errors', () => {
    [400, 401, 403, 404, 409, 412].forEach((status) => {
      expect(isRetryableError({ status })).toBe(false);
    });
  });

  it('retries transport failures', () => {
    expect(isRetryableError(new TypeError('Failed to fetch'))).toBe(true);
  });

  it('does not retry an ordinary error', () => {
    expect(isRetryableError(new Error('bad data'))).toBe(false);
  });
});

describe('executeWithRetry', () => {
  it('returns the first successful result without retrying', async () => {
    const action = jest.fn().mockResolvedValue('ok');
    await expect(executeWithRetry(action, fastOptions)).resolves.toBe('ok');
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('retries a throttled PnPjs error and eventually succeeds', async () => {
    const action = jest.fn()
      .mockRejectedValueOnce(new Error('Error making HttpClient request in queryable [429] Too Many Requests'))
      .mockResolvedValue('ok');

    await expect(executeWithRetry(action, fastOptions)).resolves.toBe('ok');
    expect(action).toHaveBeenCalledTimes(2);
  });

  it('stops immediately on a non-retryable status', async () => {
    const action = jest.fn().mockRejectedValue(new HttpRequestError(404, 'Not Found', '', '/x'));
    await expect(executeWithRetry(action, fastOptions)).rejects.toThrow('404');
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('gives up after maxAttempts and rethrows the last error', async () => {
    const action = jest.fn().mockRejectedValue(new HttpRequestError(503, 'Unavailable', '', '/x'));
    await expect(executeWithRetry(action, fastOptions)).rejects.toThrow('503');
    expect(action).toHaveBeenCalledTimes(fastOptions.maxAttempts);
  });

  it('aborts between attempts when the signal is cancelled', async () => {
    const signal = { isCancelled: false };
    const action = jest.fn().mockImplementation(async () => {
      signal.isCancelled = true;
      throw new HttpRequestError(503, 'Unavailable', '', '/x');
    });

    await expect(executeWithRetry(action, { ...fastOptions, signal }))
      .rejects.toBeInstanceOf(OperationCancelledError);
    expect(action).toHaveBeenCalledTimes(1);
  });
});

describe('HttpRequestError', () => {
  it('redacts credential-bearing headers', () => {
    const error = new HttpRequestError(401, 'Unauthorized', 'nope', '/x', {
      authorization: 'Bearer secret-token',
      'x-requestdigest': 'digest-value',
      'content-type': 'application/json'
    });

    expect(error.headers.authorization).toBe('[redacted]');
    expect(error.headers['x-requestdigest']).toBe('[redacted]');
    expect(error.headers['content-type']).toBe('application/json');
    expect(JSON.stringify(error.headers)).not.toContain('secret-token');
  });

  it('parses Retry-After in seconds regardless of header casing', () => {
    expect(new HttpRequestError(429, '', '', '/x', { 'Retry-After': '12' }).retryAfterMs).toBe(12000);
    expect(new HttpRequestError(429, '', '', '/x', { 'retry-after': '3' }).retryAfterMs).toBe(3000);
    expect(new HttpRequestError(429, '', '', '/x', {}).retryAfterMs).toBeUndefined();
  });

  it('survives instanceof after the down-level emit', () => {
    expect(new HttpRequestError(500, '', '', '/x')).toBeInstanceOf(HttpRequestError);
    expect(new HttpRequestError(500, '', '', '/x')).toBeInstanceOf(Error);
  });

  it('truncates a very large response body', () => {
    const error = new HttpRequestError(500, 'Error', 'x'.repeat(10_000), '/x');
    expect(error.responseBody.length).toBeLessThan(2200);
    expect(error.responseBody).toContain('[truncated]');
  });
});
