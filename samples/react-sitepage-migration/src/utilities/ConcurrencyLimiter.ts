export class ConcurrencyLimiter {
  private readonly _limit: number;
  private _active = 0;
  private readonly _queue: Array<() => void> = [];

  public constructor(limit: number) {
    this._limit = Math.max(1, Math.floor(limit));
  }

  public async run<T>(task: () => Promise<T>): Promise<T> {
    await this.acquire();
    try {
      return await task();
    } finally {
      this.release();
    }
  }

  public async map<TItem, TResult>(
    items: ReadonlyArray<TItem>,
    project: (item: TItem, index: number) => Promise<TResult>
  ): Promise<TResult[]> {
    const results = await Promise.allSettled(
      items.map(async (item, index) => this.run(async () => project(item, index)))
    );

    const failure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected');
    if (failure) {
      throw failure.reason;
    }

    return results.map((result) => (result as PromiseFulfilledResult<TResult>).value);
  }

  private async acquire(): Promise<void> {
    if (this._active < this._limit) {
      this._active += 1;
      return;
    }

    return new Promise<void>((resolve) => {
      this._queue.push(() => {
        this._active += 1;
        resolve();
      });
    });
  }

  private release(): void {
    this._active -= 1;
    const next = this._queue.shift();
    if (next) {
      next();
    }
  }
}

export class ThrottleGate {
  private _resumeAt = 0;

  public get isThrottled(): boolean {
    return Date.now() < this._resumeAt;
  }

  public pauseFor(durationMs: number): void {
    const resumeAt = Date.now() + Math.max(0, durationMs);
    if (resumeAt > this._resumeAt) {
      this._resumeAt = resumeAt;
    }
  }

  public async wait(): Promise<void> {
    const remaining = this._resumeAt - Date.now();
    if (remaining <= 0) {
      return;
    }

    await new Promise<void>((resolve) => {
      window.setTimeout(resolve, remaining);
    });
  }
}
