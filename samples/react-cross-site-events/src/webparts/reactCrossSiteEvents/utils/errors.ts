export type GraphErrorKind = 'accessDenied' | 'unauthorized' | 'throttled' | 'network' | 'unknown';

export interface IGraphErrorInfo {
  kind: GraphErrorKind;
  message: string;
  canRetry: boolean;
}

export function getGraphErrorInfo(error: unknown): IGraphErrorInfo {
  const candidate = error as { status?: number; statusCode?: number; message?: string; code?: string } | undefined;
  const status = candidate && (candidate.status || candidate.statusCode);
  const message = candidate && candidate.message || 'The calendar could not be loaded.';
  if (status === 401 || candidate && candidate.code === 'InvalidAuthenticationToken') {
    return { kind: 'unauthorized', message: 'Your Microsoft 365 session is not authorized for Graph.', canRetry: true };
  }
  if (status === 403 || candidate && /accessdenied|insufficient privileges/i.test(`${candidate.code} ${message}`)) {
    return { kind: 'accessDenied', message: 'You do not have permission to read this calendar.', canRetry: false };
  }
  if (status === 429 || status === 503) {
    return { kind: 'throttled', message: 'Microsoft Graph is temporarily throttling this request.', canRetry: true };
  }
  if (!status && error instanceof TypeError) {
    return { kind: 'network', message: 'The request could not reach Microsoft Graph.', canRetry: true };
  }
  return { kind: 'unknown', message, canRetry: true };
}
