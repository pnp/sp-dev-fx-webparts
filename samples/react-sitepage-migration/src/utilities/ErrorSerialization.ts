import { HttpRequestError } from './HttpRequestError';
import { getErrorStatus } from './RetryHelper';

export interface SerializedError {
  readonly name: string;
  readonly message: string;
  readonly status?: number;
  readonly requestUrl?: string;
  readonly stack?: string;
}

const personalDataKeys = new Set<string>([
  'authoremail',
  'email',
  'mail',
  'upn',
  'userprincipalname',
  'loginname',
  'accounttoken',
  'access_token',
  'authorization'
]);

const maxDepth = 6;
const maxArrayLength = 50;
const maxStringLength = 1024;

export const toMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string' && error.trim()) {
    return error;
  }
  return fallback;
};

export const serializeError = (error: unknown): SerializedError => {
  if (error instanceof HttpRequestError) {
    return {
      name: error.name,
      message: error.message,
      status: error.status,
      requestUrl: error.requestUrl,
      stack: error.stack
    };
  }

  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      status: getErrorStatus(error),
      stack: error.stack
    };
  }

  return { name: 'UnknownError', message: toMessage(error, 'Unknown error.') };
};

export const redactForLogging = (value: unknown, depth = 0, seen = new WeakSet<object>()): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (value instanceof Error) {
    return serializeError(value);
  }

  if (typeof value === 'string') {
    return value.length > maxStringLength ? `${value.slice(0, maxStringLength)}… [truncated]` : value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (typeof value !== 'object') {
    return String(value);
  }

  if (depth >= maxDepth) {
    return '[max depth]';
  }

  if (seen.has(value as object)) {
    return '[circular]';
  }
  seen.add(value as object);

  if (Array.isArray(value)) {
    const truncated = value.length > maxArrayLength;
    const items = (truncated ? value.slice(0, maxArrayLength) : value)
      .map((item) => redactForLogging(item, depth + 1, seen));
    return truncated ? [...items, `[+${(value.length - maxArrayLength).toString()} more]`] : items;
  }

  const result: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    if (personalDataKeys.has(key.toLowerCase())) {
      result[key] = '[redacted]';
      continue;
    }
    if (typeof entry === 'function') {
      continue;
    }
    result[key] = redactForLogging(entry, depth + 1, seen);
  }

  return result;
};

export const stringifyDetails = (details: unknown): string => {
  if (details === undefined) {
    return '';
  }

  try {
    return JSON.stringify(redactForLogging(details), null, 2) ?? '';
  } catch {
    return String(details);
  }
};
