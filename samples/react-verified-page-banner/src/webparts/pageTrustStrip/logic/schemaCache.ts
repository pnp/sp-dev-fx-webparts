import { PageTrustError, httpStatus } from "../errors";
import { readSharePointError } from "./visitorFlag";
import { productName } from "./productName";

/** Readers trust a fully ready schema for this long, then the next load checks SharePoint again. */
export const schemaCacheTtlMs: number = 15 * 60 * 1000;

export interface ISchemaCacheStorage {
  getItem(key: string): string | undefined;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** Only a fully ready schema is stored. listReady and columnsReady are the literal true. */
export interface ISchemaCacheEntry {
  reviewListId: string;
  listReady: true;
  columnsReady: true;
  cachedAt: number;
  pageKeyReady: boolean;
  reviewListDefaultViewUrl?: string;
}

const schemaMissingPhrases: readonly string[] = [
  "field or property",
  "invalid field",
  "not a valid field",
  "unknown field",
  "list does not exist",
  "list doesn't exist",
  "list cannot be found",
  "cannot find the list",
  "column"
];

/**
 * sessionStorage key. schemaVersion is the fingerprint from schema.ts, so an older
 * "all good" entry is never read after the required columns change.
 */
export function schemaCacheKey(webAbsoluteUrl: string, pageListId: string, version: string): string {
  return `verifiedPageBanner:schema:v1:${version}:${webAbsoluteUrl.toLowerCase()}:${pageListId.toLowerCase()}`;
}

export function readSchemaCache(
  storage: ISchemaCacheStorage,
  key: string,
  now: number,
  ttlMs: number
): ISchemaCacheEntry | undefined {
  let raw: string | undefined;
  try {
    raw = storage.getItem(key);
  } catch {
    return undefined;
  }
  if (!raw) {
    return undefined;
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    clearSchemaCache(storage, key);
    return undefined;
  }
  const entry = parseSchemaCacheEntry(parsed);
  if (!entry) {
    clearSchemaCache(storage, key);
    return undefined;
  }
  if (entry.cachedAt > now || now - entry.cachedAt >= ttlMs) {
    clearSchemaCache(storage, key);
    return undefined;
  }
  return entry;
}

export function writeSchemaCache(storage: ISchemaCacheStorage, key: string, entry: ISchemaCacheEntry): void {
  if (entry.listReady !== true || entry.columnsReady !== true || !entry.reviewListId) {
    return;
  }
  try {
    storage.setItem(key, JSON.stringify(entry));
  } catch {
    return;
  }
}

export function clearSchemaCache(storage: ISchemaCacheStorage, key: string): void {
  try {
    storage.removeItem(key);
  } catch {
    return;
  }
}

/**
 * SharePoint failed because a column or list this web part stored is gone.
 * A deleted page item ("Item does not exist") and permission errors are not schema failures.
 */
export function isSchemaMissingFailure(error: unknown): boolean {
  // SPFx compiles to ES5, so `instanceof PageTrustError` is not reliable for Error subclasses.
  if (isPageTrustError(error) || isSchemaLostError(error)) {
    return false;
  }
  const detail = readSharePointError(error);
  if (detail.status === 401 || detail.status === 403 || httpStatus(error) === 401 || httpStatus(error) === 403) {
    return false;
  }
  const message = (detail.message || "").toLowerCase();
  if (!message) {
    return false;
  }
  for (let index = 0; index < schemaMissingPhrases.length; index++) {
    if (message.indexOf(schemaMissingPhrases[index]) >= 0) {
      return true;
    }
  }
  return false;
}

export function schemaLostError(): PageTrustError {
  const error = new PageTrustError(
    `A site owner needs to set up ${productName} again. A list or column is missing.`
  );
  (error as { schemaLost?: boolean }).schemaLost = true;
  return error;
}

export function isSchemaLostError(error: unknown): error is PageTrustError {
  return isPageTrustError(error) && (error as { schemaLost?: boolean }).schemaLost === true;
}

function isPageTrustError(error: unknown): error is PageTrustError {
  return typeof error === "object" && !!error && (error as { name?: string }).name === "PageTrustError";
}

/** Browser sessionStorage, or a no-op store when storage is missing or blocked. */
export function browserSessionStorage(): ISchemaCacheStorage {
  return {
    getItem: (key: string): string | undefined => {
      try {
        if (typeof window === "undefined" || !window.sessionStorage) {
          return undefined;
        }
        const value = window.sessionStorage.getItem(key);
        return value ? value : undefined;
      } catch {
        return undefined;
      }
    },
    setItem: (key: string, value: string): void => {
      try {
        if (typeof window === "undefined" || !window.sessionStorage) {
          return;
        }
        window.sessionStorage.setItem(key, value);
      } catch {
        return;
      }
    },
    removeItem: (key: string): void => {
      try {
        if (typeof window === "undefined" || !window.sessionStorage) {
          return;
        }
        window.sessionStorage.removeItem(key);
      } catch {
        return;
      }
    }
  };
}

function parseSchemaCacheEntry(value: unknown): ISchemaCacheEntry | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  const record = value as { [key: string]: unknown };
  if (typeof record.reviewListId !== "string" || record.reviewListId.length === 0) {
    return undefined;
  }
  if (record.listReady !== true || record.columnsReady !== true) {
    return undefined;
  }
  if (typeof record.cachedAt !== "number" || !Number.isFinite(record.cachedAt)) {
    return undefined;
  }
  if (typeof record.pageKeyReady !== "boolean") {
    return undefined;
  }
  const entry: ISchemaCacheEntry = {
    reviewListId: record.reviewListId,
    listReady: true,
    columnsReady: true,
    cachedAt: record.cachedAt,
    pageKeyReady: record.pageKeyReady
  };
  if (typeof record.reviewListDefaultViewUrl === "string") {
    entry.reviewListDefaultViewUrl = record.reviewListDefaultViewUrl;
  }
  return entry;
}
