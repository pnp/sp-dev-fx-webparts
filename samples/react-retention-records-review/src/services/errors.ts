import { ErrorKind } from '../models/RetentionRecordsModels';

export interface ClassifiedError { kind: ErrorKind; message: string; retryAfterSeconds?: number; }

export function classifyError(error: unknown): ClassifiedError {
  const response = error as { status?: number; message?: string; data?: { status?: number }; headers?: { get?: (name: string) => string | null } };
  const status = response && (response.status || response.data?.status);
  const message = response?.message || 'SharePoint could not complete the read request.';
  if (status === 401 || status === 403) return { kind: 'permission-denied', message: 'You do not have permission to read this source.' };
  if (status === 429 || status === 503) {
    const retry = response.headers?.get?.('Retry-After');
    return { kind: 'throttled', message: 'SharePoint throttled this read request. Retry later.', retryAfterSeconds: retry ? Number(retry) : undefined };
  }
  if (/configuration|outside the current|invalid tenant|server-relative/i.test(message)) return { kind: 'config', message };
  if (!status || /network|fetch|timeout|failed to/i.test(message)) return { kind: 'network', message: 'The SharePoint read request could not reach the service.' };
  return { kind: 'unknown', message };
}
