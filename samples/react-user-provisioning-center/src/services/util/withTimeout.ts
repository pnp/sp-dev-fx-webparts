export class TimeoutError extends Error {
  public readonly timeoutMs: number;
  public readonly label: string;

  public constructor(timeoutMs: number, label: string) {
    super(
      label
        ? `${label} did not respond within ${Math.round(timeoutMs / 1000)}s`
        : `Request did not respond within ${Math.round(timeoutMs / 1000)}s`
    );
    Object.setPrototypeOf(this, TimeoutError.prototype);
    this.name = 'TimeoutError';
    this.timeoutMs = timeoutMs;
    this.label = label;
  }
}

export function withTimeout<T>(action: () => Promise<T>, timeoutMs: number, label: string = ''): Promise<T> {
  if (timeoutMs <= 0) {
    return action();
  }
  return new Promise<T>((resolve, reject) => {
    let settled: boolean = false;
    const timer: number = window.setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new TimeoutError(timeoutMs, label));
      }
    }, timeoutMs);

    action().then(
      (value) => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          resolve(value);
        }
      },
      (err) => {
        if (!settled) {
          settled = true;
          window.clearTimeout(timer);
          reject(err);
        }
      }
    );
  });
}
