import { IServiceError } from '../models/DocumentMetadataModels';

function getStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const candidate = error as Record<string, unknown>;
  const response = candidate.response as Record<string, unknown> | undefined;
  const status = candidate.status || candidate.statusCode || response && response.status;
  return typeof status === 'number' ? status : typeof status === 'string' ? Number(status) : undefined;
}

function getRetryAfter(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const candidate = error as Record<string, unknown>;
  const response = candidate.response as Record<string, unknown> | undefined;
  const headers = (candidate.headers || response && response.headers) as Record<string, unknown> | undefined;
  const header = headers && (headers['Retry-After'] || headers['retry-after']);
  const value = candidate.retryAfter || header;
  const seconds = Number(value);
  return Number.isFinite(seconds) && seconds >= 0 ? seconds : undefined;
}

export function classifyServiceError(error: unknown): IServiceError {
  const status = getStatus(error);
  const retryAfterSeconds = getRetryAfter(error);
  const rawMessage = error instanceof Error ? error.message : typeof error === 'string' ? error : 'The document library could not be read.';
  if (status === 401 || status === 403) {
    return { kind: 'access-denied', title: 'Access denied', message: 'You do not have permission to read this library or its documents.', retryable: false };
  }
  if (status === 404) {
    return { kind: 'not-found', title: 'Library or folder not found', message: 'Check the configured server-relative library and folder paths.', retryable: false };
  }
  if (status === 429 || status === 503) {
    return { kind: 'throttled', title: 'SharePoint is busy', message: retryAfterSeconds === undefined ? 'SharePoint asked the request to slow down. Try again shortly.' : `SharePoint asked the request to slow down. Try again in ${retryAfterSeconds} seconds.`, retryable: true, retryAfterSeconds };
  }
  if (status === undefined || /network|fetch|timeout|failed to/i.test(rawMessage)) {
    return { kind: 'network', title: 'Connection problem', message: 'The library could not be reached. Check your connection and try again.', retryable: true };
  }
  return { kind: 'unknown', title: 'Could not load documents', message: rawMessage, retryable: true };
}
