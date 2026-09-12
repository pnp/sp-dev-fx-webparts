interface ICacheEnvelope<T> {
  /** Stored value. */
  v: T;
  /** Absolute expiry timestamp (ms since epoch). */
  exp: number;
}

const PREFIX = 'msi:';
const DAY_MS = 24 * 60 * 60 * 1000;

/** Read a non-expired cached value from localStorage, or undefined. */
export function getCached<T>(key: string): T | undefined {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) {
      return undefined;
    }
    const envelope = JSON.parse(raw) as ICacheEnvelope<T>;
    if (envelope.exp && envelope.exp < Date.now()) {
      window.localStorage.removeItem(PREFIX + key);
      return undefined;
    }
    return envelope.v;
  } catch {
    return undefined;
  }
}

/** Persist a value in localStorage with a TTL (default 1 day). */
export function setCached<T>(key: string, value: T, ttlMs: number = DAY_MS): void {
  try {
    const envelope: ICacheEnvelope<T> = { v: value, exp: Date.now() + ttlMs };
    window.localStorage.setItem(PREFIX + key, JSON.stringify(envelope));
  } catch {
    // Storage unavailable or quota exceeded — caching is best-effort.
  }
}

/** Remove a cached entry. */
export function clearCached(key: string): void {
  try {
    window.localStorage.removeItem(PREFIX + key);
  } catch {
    // Non-fatal.
  }
}
