import { HttpRequestError, parseRetryAfter } from './HttpRequestError';
import { ThrottleGate } from './ConcurrencyLimiter';

export const sharedThrottleGate = new ThrottleGate();

const THROTTLING_STATUSES = new Set<number>([429, 503]);

export interface RetryOptions {
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs?: number;
  readonly signal?: { readonly isCancelled: boolean };
}

export const defaultRetryOptions: RetryOptions = {
  maxAttempts: 4,
  baseDelayMs: 750,
  maxDelayMs: 30_000
};

const retryableStatuses = new Set<number>([408, 429, 500, 502, 503, 504]);

const sleep = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });

interface ErrorLikeWithStatus {
  readonly status?: number;
  readonly statusCode?: number;
  readonly code?: number | string;
  readonly response?: { readonly status?: number; readonly headers?: Record<string, string> };
  readonly headers?: Record<string, string>;
}

export const getErrorStatus = (error: unknown): number | undefined => {
  if (error instanceof HttpRequestError) {
    return error.status;
  }

  if (!error || typeof error !== 'object') {
    return undefined;
  }

  const candidate = error as ErrorLikeWithStatus;
  const status = candidate.status ?? candidate.statusCode ?? candidate.response?.status;
  if (typeof status === 'number') {
    return status;
  }

  if (typeof candidate.code === 'number') {
    return candidate.code;
  }

  if (error instanceof Error) {
    const match = /\[(\d{3})\]/.exec(error.message);
    if (match) {
      return parseInt(match[1], 10);
    }
  }

  return undefined;
};

const getErrorHeaders = (error: unknown): Record<string, string> | undefined => {
  if (!error || typeof error !== 'object') {
    return undefined;
  }
  const candidate = error as ErrorLikeWithStatus;
  return candidate.headers ?? candidate.response?.headers;
};

export const isRetryableError = (error: unknown): boolean => {
  const status = getErrorStatus(error);
  if (status !== undefined) {
    return retryableStatuses.has(status);
  }

  return error instanceof TypeError;
};

export class OperationCancelledError extends Error {
  public constructor(message = 'Operation cancelled.') {
    super(message);
    this.name = 'OperationCancelledError';
    Object.setPrototypeOf(this, OperationCancelledError.prototype);
  }
}

export const executeWithRetry = async <T>(
  action: (attempt: number) => Promise<T>,
  options: RetryOptions = defaultRetryOptions
): Promise<T> => {
  const maxDelayMs = options.maxDelayMs ?? 30_000;
  let attempt = 0;
  let lastError: unknown;

  while (attempt < options.maxAttempts) {
    attempt += 1;

    if (options.signal?.isCancelled) {
      throw new OperationCancelledError();
    }

    if (sharedThrottleGate.isThrottled) {
      await sharedThrottleGate.wait();
    }

    try {
      return await action(attempt);
    } catch (error) {
      lastError = error;

      if (error instanceof OperationCancelledError) {
        throw error;
      }

      if (!isRetryableError(error) || attempt >= options.maxAttempts) {
        throw error;
      }

      const backoff = Math.min(options.baseDelayMs * Math.pow(2, attempt - 1), maxDelayMs);
      const retryAfter = parseRetryAfter(getErrorHeaders(error));
      const delay = retryAfter !== undefined
        ? Math.min(Math.max(retryAfter, backoff * Math.random()), maxDelayMs)
        : backoff * Math.random();

      const status = getErrorStatus(error);
      if (status !== undefined && THROTTLING_STATUSES.has(status)) {
        sharedThrottleGate.pauseFor(delay);
      }

      await sleep(delay);
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Retry failed.');
};
