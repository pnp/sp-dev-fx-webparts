import { productName } from "./logic/productName";

export const PAGE_TRUST_LOAD_TIMEOUT_MS: number = 15000;

export const PAGE_TRUST_LOAD_TIMEOUT_MESSAGE: string = `${productName} took too long to load this page.`;

/**
 * Resolves or rejects with the source promise, unless it is still pending
 * after `timeoutMs`. A late result is ignored so a timed-out load cannot
 * overwrite the error the user is already looking at.
 */
export function withTimeout<T>(promise: Promise<T>, timeoutMs: number, timeoutMessage: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    let settled: boolean = false;
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      if (settled) {
        return;
      }
      settled = true;
      reject(new Error(timeoutMessage));
    }, timeoutMs);

    promise.then((value: T) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve(value);
    }, (error: unknown) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      reject(error);
    });
  });
}
