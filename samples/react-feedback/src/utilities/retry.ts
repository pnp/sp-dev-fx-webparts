export interface IRetryableError {
  statusCode?: number;
  headers?: Partial<Pick<Headers, 'get'>>;
}

const RETRYABLE_STATUS_CODES: number[] = [429, 503, 504];

const delay = (ms: number): Promise<void> => new Promise<void>(resolve => setTimeout(resolve, ms));

/**
 * Executes the supplied async function, retrying on throttling responses (429/503/504).
 * Honours a numeric `Retry-After` header (in seconds) when present, otherwise falls back
 * to exponential backoff (1s, 2s, 4s).
 */
export const withRetry = async <T>(fn: () => Promise<T>, maxRetries: number = 3): Promise<T> => {
  let attempt = 0;
  while (true) {
    try {
      return await fn();
    } catch (error) {
      const retryable = error as IRetryableError;
      const status = retryable.statusCode;
      if (status !== undefined && RETRYABLE_STATUS_CODES.indexOf(status) !== -1 && attempt < maxRetries) {
        let waitMs = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s
        const retryAfter = retryable.headers?.get?.('Retry-After');
        if (retryAfter) {
          const seconds = parseInt(retryAfter, 10);
          if (!isNaN(seconds)) {
            waitMs = seconds * 1000;
          }
        }
        attempt++;
        await delay(waitMs);
      } else {
        throw error;
      }
    }
  }
};
