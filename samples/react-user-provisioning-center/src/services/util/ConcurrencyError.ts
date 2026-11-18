export class ConcurrencyError extends Error {
  public constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ConcurrencyError.prototype);
    this.name = 'ConcurrencyError';
  }
}
