export class JobConflictError extends Error {
  public readonly itemId: number;

  public constructor(itemId: number, message?: string) {
    super(message ?? `Job ${itemId} was modified in another session`);
    Object.setPrototypeOf(this, JobConflictError.prototype);
    this.name = 'JobConflictError';
    this.itemId = itemId;
  }
}

export function isEtagConflict(err: unknown): boolean {
  if (err instanceof JobConflictError) {
    return true;
  }
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    (err as { status: unknown }).status === 412
  );
}
