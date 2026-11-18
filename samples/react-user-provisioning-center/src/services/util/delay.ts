import { RequestAbortedError } from '../graph/GraphError';

export function delay(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new RequestAbortedError());
      return;
    }
    let timer: number = 0;
    const onAbort = (): void => {
      window.clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      reject(new RequestAbortedError());
    };
    timer = window.setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', onAbort);
  });
}
