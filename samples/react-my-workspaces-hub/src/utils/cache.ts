/**
 * MGT-style client-side cache for People Picker results.
 *
 * @remarks
 * Mirrors the design described in the Microsoft Graph Toolkit caching docs
 * (https://learn.microsoft.com/en-us/graph/toolkit/customize-components/cache):
 *  - a keyed store backed by `localStorage`
 *  - a per-entry expiration (`invalidationPeriodInMs`) compared against `Date.now()`
 *  - a global `enabled` switch
 *  - a single shared store name with logical sub-stores keyed by namespace
 *
 * The implementation is dependency-free and gracefully degrades to a no-op when
 * the host environment does not expose `localStorage` (private browsing, SSR).
 */

/** Configuration accepted when constructing a {@link PeoplePickerCache} instance. */
export interface IPeoplePickerCacheOptions {
  /**
   * When `false`, all reads return `undefined` and writes are skipped.
   *
   * @defaultValue true
   */
  enabled?: boolean;
  /**
   * TTL applied to every cache entry, in milliseconds.
   *
   * @defaultValue 5 * 60 * 1000 (5 minutes)
   */
  invalidationPeriodInMs?: number;
  /**
   * Prefix prepended to every key written to `localStorage`. Allows multiple
   * pickers to share a page without colliding.
   *
   * @defaultValue "spfx-components:peoplepicker"
   */
  storagePrefix?: string;
}

interface ICacheEnvelope<TValue> {
  /** Epoch ms at which the entry was written. */
  ts: number;
  /** Cached payload. */
  value: TValue;
}

/** Default TTL: 5 minutes — same default as MGT's `PeopleProvider`. */
export const DEFAULT_CACHE_INVALIDATION_PERIOD_MS = 5 * 60 * 1000;

/** Default `localStorage` key prefix. */
export const DEFAULT_CACHE_STORAGE_PREFIX = 'spfx-components:peoplepicker';

/**
 * Lightweight typed cache with TTL-based invalidation.
 *
 * Keys passed to {@link PeoplePickerCache.get} / {@link PeoplePickerCache.set}
 * should already encode every variable that influences the cached value
 * (search text, scope, max results, group id, etc.). The cache itself does
 * not normalise keys.
 */
export class PeoplePickerCache {
  private readonly _enabled: boolean;
  private readonly _ttl: number;
  private readonly _prefix: string;

  public constructor(options?: IPeoplePickerCacheOptions) {
    this._enabled = options?.enabled ?? true;
    this._ttl = options?.invalidationPeriodInMs ?? DEFAULT_CACHE_INVALIDATION_PERIOD_MS;
    this._prefix = options?.storagePrefix ?? DEFAULT_CACHE_STORAGE_PREFIX;
  }

  /** True when the cache is active and a usable storage backend was detected. */
  public get isEnabled(): boolean {
    return this._enabled && PeoplePickerCache._getStorage() !== undefined;
  }

  /**
   * Retrieves a previously cached value. Returns `undefined` when the entry is
   * missing, expired, or the cache is disabled. Expired entries are evicted
   * eagerly to prevent stale reads on subsequent calls.
   */
  public get<TValue>(key: string): TValue | undefined {
    if (!this.isEnabled) {
      return undefined;
    }

    const storage = PeoplePickerCache._getStorage();
    if (!storage) {
      return undefined;
    }

    const fullKey = this._buildKey(key);

    try {
      const raw = storage.getItem(fullKey);
      if (!raw) {
        return undefined;
      }

      const envelope = JSON.parse(raw) as ICacheEnvelope<TValue>;

      if (typeof envelope.ts !== 'number' || Date.now() - envelope.ts > this._ttl) {
        storage.removeItem(fullKey);
        return undefined;
      }

      return envelope.value;
    } catch {
      // Corrupted entry — drop it.
      try {
        storage.removeItem(fullKey);
      } catch {
        // ignore
      }
      return undefined;
    }
  }

  /** Persists `value` under `key`. No-op when the cache is disabled. */
  public set<TValue>(key: string, value: TValue): void {
    if (!this.isEnabled) {
      return;
    }

    const storage = PeoplePickerCache._getStorage();
    if (!storage) {
      return;
    }

    const envelope: ICacheEnvelope<TValue> = { ts: Date.now(), value };

    try {
      storage.setItem(this._buildKey(key), JSON.stringify(envelope));
    } catch {
      // Quota / serialization errors are non-fatal.
    }
  }

  /** Removes a single entry. */
  public remove(key: string): void {
    const storage = PeoplePickerCache._getStorage();
    if (!storage) {
      return;
    }

    try {
      storage.removeItem(this._buildKey(key));
    } catch {
      // ignore
    }
  }

  /** Removes every entry whose key matches the configured prefix. */
  public clear(): void {
    const storage = PeoplePickerCache._getStorage();
    if (!storage) {
      return;
    }

    const keysToRemove: string[] = [];

    for (let index = 0; index < storage.length; index += 1) {
      const candidate = storage.key(index);
      if (candidate && candidate.startsWith(`${this._prefix}:`)) {
        keysToRemove.push(candidate);
      }
    }

    keysToRemove.forEach((key) => {
      try {
        storage.removeItem(key);
      } catch {
        // ignore
      }
    });
  }

  private _buildKey(key: string): string {
    return `${this._prefix}:${key}`;
  }

  private static _isStorageProbed = false;
  private static _storage: Storage | undefined;

  private static _getStorage(): Storage | undefined {
    if (PeoplePickerCache._isStorageProbed) {
      return PeoplePickerCache._storage;
    }

    PeoplePickerCache._isStorageProbed = true;
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return undefined;
      }

      // Probe for usability (private mode throws on `setItem`).
      const probeKey = '__spfx_components_probe__';
      window.localStorage.setItem(probeKey, '1');
      window.localStorage.removeItem(probeKey);
      PeoplePickerCache._storage = window.localStorage;
      return window.localStorage;
    } catch {
      return undefined;
    }
  }
}
