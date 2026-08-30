export type DashboardErrorKind = 'permission' | 'throttled' | 'network' | 'invalid-config' | 'malformed-response';

export class DashboardError extends Error {
  public readonly kind: DashboardErrorKind;
  public readonly status?: number;
  public readonly retryAfterSeconds?: number;

  public constructor(kind: DashboardErrorKind, message: string, status?: number, retryAfterSeconds?: number) {
    super(message);
    this.name = 'DashboardError';
    this.kind = kind;
    this.status = status;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export function classifyHttpError(status: number, retryAfter?: string | null): DashboardError {
  if (status === 401 || status === 403) {
    return new DashboardError('permission', 'Permission was denied for this source.', status);
  }
  if (status === 429) {
    const seconds = retryAfter ? Number.parseInt(retryAfter, 10) : undefined;
    return new DashboardError('throttled', 'The source is throttling requests. Retry later.', status, Number.isFinite(seconds) ? seconds : undefined);
  }
  return new DashboardError('network', `The source returned HTTP ${status}.`, status);
}
