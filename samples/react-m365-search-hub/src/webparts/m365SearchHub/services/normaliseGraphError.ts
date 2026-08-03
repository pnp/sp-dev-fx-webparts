import { ISearchError, SearchFailure } from '../models/SearchStatus';

/**
 * The parts of a Microsoft Graph client error this code depends on.
 *
 * Deliberately structural rather than the SDK's own type: the shape varies
 * between a `GraphError` thrown by the client, a rejected fetch, and a plain
 * network failure, and all three arrive here.
 */
interface IGraphErrorLike {
  statusCode?: number;
  status?: number;
  code?: string;
  message?: string;
  // The DOM Headers API returns null for a header it does not have, so the
  // return is left untyped here and coerced below rather than spreading null
  // through the sample's own types.
  headers?: { get?: (name: string) => unknown } | Record<string, string>;
}

/** Graph error codes that mean the caller is not allowed, whatever the status. */
const DENIED_CODES = new Set([
  'accessdenied',
  'authorizationrequestdenied',
  'unauthorized_client',
  'forbidden'
]);

function statusOf(error: IGraphErrorLike): number | undefined {
  if (typeof error.statusCode === 'number') {
    return error.statusCode;
  }
  return typeof error.status === 'number' ? error.status : undefined;
}

function headerValue(error: IGraphErrorLike, name: string): string | undefined {
  const headers = error.headers;
  if (!headers) {
    return undefined;
  }
  if (typeof (headers as { get?: unknown }).get === 'function') {
    const value = (headers as { get: (n: string) => unknown }).get(name);
    return typeof value === 'string' ? value : undefined;
  }
  const record = headers as Record<string, string>;
  return record[name] || record[name.toLowerCase()];
}

/**
 * Turns whatever Microsoft Graph threw into one of a handful of outcomes.
 *
 * A 403 means authorisation was denied. It does not say why: a permission
 * still pending approval is the likeliest cause on a fresh install, but
 * conditional access policy and tenant restrictions produce the same status.
 * So the outcome is named for what is known, and the wording shown to a person
 * says access was denied rather than diagnosing the cause.
 *
 * Per-item access is a separate matter. Microsoft Graph security trims the
 * results, which simply returns fewer of them, so a 403 here is never about
 * one document somebody cannot open.
 */
export function normaliseGraphError(error: unknown): ISearchError {
  if (!error || typeof error !== 'object') {
    return { failure: 'unknown' };
  }

  const graphError = error as IGraphErrorLike;
  const status = statusOf(graphError);
  const code = (graphError.code || '').toLowerCase();

  if (status === 403 || DENIED_CODES.has(code)) {
    return { failure: 'permissionDenied' };
  }

  if (status === 401) {
    return { failure: 'notAuthenticated' };
  }

  if (status === 429) {
    const retryAfter = Number(headerValue(graphError, 'Retry-After'));
    return Number.isFinite(retryAfter) && retryAfter > 0
      ? { failure: 'throttled', retryAfterSeconds: retryAfter }
      : { failure: 'throttled' };
  }

  if (typeof status === 'number' && status >= 500 && status < 600) {
    return { failure: 'serviceError' };
  }

  return { failure: 'unknown' };
}

/** True when the outcome is worth trying again without the person doing anything. */
export function isTransient(failure: SearchFailure): boolean {
  return failure === 'throttled' || failure === 'serviceError';
}
