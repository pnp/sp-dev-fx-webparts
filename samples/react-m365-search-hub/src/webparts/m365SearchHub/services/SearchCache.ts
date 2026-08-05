/**
 * A small, short-lived cache of search pages.
 *
 * Search results go stale quickly and a person who types, deletes a letter and
 * types it again should not pay for a second request. Both facts are served by
 * a cache that is deliberately small and deliberately forgetful.
 *
 * Nothing is persisted. The cache lives as long as the web part does.
 */
export class SearchCache<T> {
  private readonly _entries = new Map<string, { value: T; storedAt: number }>();

  /**
   * @param maxEntries Oldest entry is evicted past this. Keeps memory bounded
   *                   when somebody pages a long way through results.
   * @param ttlMs How long an entry stays usable.
   * @param now Injected so the behaviour can be tested without waiting.
   */
  public constructor(
    private readonly maxEntries: number = 25,
    private readonly ttlMs: number = 60_000,
    private readonly now: () => number = () => Date.now()
  ) {}

  public get(key: string): T | undefined {
    const entry = this._entries.get(key);
    if (!entry) {
      return undefined;
    }

    if (this.now() - entry.storedAt >= this.ttlMs) {
      this._entries.delete(key);
      return undefined;
    }

    // Re-inserting moves the key to the end, so eviction drops the entry that
    // has gone longest without being read rather than the oldest one written.
    this._entries.delete(key);
    this._entries.set(key, entry);
    return entry.value;
  }

  public set(key: string, value: T): void {
    if (this._entries.has(key)) {
      this._entries.delete(key);
    }
    this._entries.set(key, { value, storedAt: this.now() });

    while (this._entries.size > this.maxEntries) {
      const oldest = this._entries.keys().next();
      if (oldest.done) {
        break;
      }
      this._entries.delete(oldest.value);
    }
  }

  public clear(): void {
    this._entries.clear();
  }

  public get size(): number {
    return this._entries.size;
  }
}
