import { TimeoutError } from './withTimeout';
import { ConcurrencyError } from './ConcurrencyError';
import { CircuitOpenError } from './circuitBreaker';

const MAX_QUERY_RETRIES: number = 1;

function statusOf(error: unknown): number {
  if (typeof error === 'object' && error !== null) {
    const candidate = error as { status?: unknown; statusCode?: unknown };
    if (typeof candidate.status === 'number') {
      return candidate.status;
    }
    if (typeof candidate.statusCode === 'number') {
      return candidate.statusCode;
    }
  }
  return 0;
}

export function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  if (error instanceof TimeoutError || error instanceof CircuitOpenError || error instanceof ConcurrencyError) {
    return false;
  }
  const status: number = statusOf(error);
  if (status >= 400 && status < 500 && status !== 408 && status !== 429) {
    return false;
  }
  return failureCount < MAX_QUERY_RETRIES;
}
