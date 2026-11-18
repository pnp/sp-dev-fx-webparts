import { delay } from './delay';
import { ConcurrencyError } from './ConcurrencyError';
import { CircuitBreaker, CircuitOpenError } from './circuitBreaker';
import { TimeoutError, withTimeout } from './withTimeout';

const DEFAULT_MAX_ATTEMPTS: number = 4;
const BASE_BACKOFF_MS: number = 1000;
export const DEFAULT_SHAREPOINT_TIMEOUT_MS: number = 20_000;

export const sharePointCircuit: CircuitBreaker = new CircuitBreaker({
  failureThreshold: 5,
  openMs: 20_000,
  maxOpenMs: 2 * 60_000
});

function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

function hasStatus(err: unknown): err is { status: number } {
  return typeof err === 'object' && err !== null && 'status' in err && typeof (err as { status: unknown }).status === 'number';
}

function getResponse(err: unknown): { headers?: { get?: (name: string) => string | null } } | undefined {
  if (typeof err === 'object' && err !== null && 'response' in err) {
    return err.response as { headers?: { get?: (name: string) => string | null } };
  }
  return undefined;
}

function isRetryableStatus(status: number): boolean {
  return status === 429 || status === 503 || status === 504;
}

function isNetworkFailure(err: unknown): boolean {
  if (!(err instanceof Error)) {
    return false;
  }
  return (
    err instanceof TypeError &&
    /failed to fetch|networkerror|network request failed|load failed/i.test(err.message)
  );
}

export function isRetryableSharePointError(err: unknown): boolean {
  if (
    isAbortError(err) ||
    err instanceof ConcurrencyError ||
    err instanceof CircuitOpenError ||
    err instanceof TimeoutError
  ) {
    return false;
  }
  if (hasStatus(err)) {
    return isRetryableStatus(err.status) || err.status === 0;
  }
  return isNetworkFailure(err);
}

export function getRetryAfterMs(err: unknown): number | undefined {
  const response = getResponse(err);
  const seconds = response?.headers?.get?.('Retry-After');
  if (!seconds) {
    return undefined;
  }
  const parsed = parseInt(seconds, 10);
  if (isNaN(parsed)) {
    return undefined;
  }
  return parsed * 1000;
}

export interface ISharePointRetryOptions {
  maxAttempts?: number;
  signal?: AbortSignal;
  idempotent?: boolean;
  circuitKey?: string;
  timeoutMs?: number;
}

export async function sharePointRetry<T>(
  action: () => Promise<T>,
  options?: ISharePointRetryOptions
): Promise<T> {
  const maxAttempts: number = options?.maxAttempts ?? DEFAULT_MAX_ATTEMPTS;
  const idempotent: boolean = options?.idempotent !== false;
  const circuitKey: string = options?.circuitKey ?? 'sharepoint';
  const timeoutMs: number = options?.timeoutMs ?? DEFAULT_SHAREPOINT_TIMEOUT_MS;
  const timedAction = (): Promise<T> => withTimeout(action, timeoutMs, circuitKey);
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    if (options?.signal?.aborted) {
      throw new DOMException('SharePoint request aborted', 'AbortError');
    }
    try {
      return await sharePointCircuit.execute(circuitKey, timedAction, isRetryableSharePointError);
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      if (
        isAbortError(err) ||
        err instanceof CircuitOpenError ||
        !isRetryableSharePointError(err) ||
        attempt === maxAttempts
      ) {
        throw lastError;
      }
      if (!idempotent) {
        throw lastError;
      }

      const retryAfterMs: number = getRetryAfterMs(err) ?? 0;
      const waitMs: number =
        retryAfterMs > 0
          ? retryAfterMs
          : BASE_BACKOFF_MS * Math.pow(2, attempt - 1) + Math.random() * 250;
      await delay(waitMs, options?.signal);
    }
  }

  throw lastError ?? new Error('Unknown SharePoint retry error');
}
