import { OperationCancelledError } from './RetryHelper';

export class MigrationCancellationToken {
  private _isCancelled = false;
  private readonly _listeners = new Set<() => void>();

  public get isCancelled(): boolean {
    return this._isCancelled;
  }

  public cancel(): void {
    if (this._isCancelled) {
      return;
    }

    this._isCancelled = true;
    this._listeners.forEach((listener) => {
      try {
        listener();
        // eslint-disable-next-line no-empty
      } catch {
      }
    });
    this._listeners.clear();
  }

  public onCancelled(listener: () => void): () => void {
    if (this._isCancelled) {
      listener();
      return () => undefined;
    }

    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  public throwIfCancelled(): void {
    if (this._isCancelled) {
      throw new OperationCancelledError('Migration cancelled by user.');
    }
  }
}
