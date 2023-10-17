import { LogHelper } from "../helpers/LogHelper";

class CachingService {
  private static _storage: Storage;

  public static Init(): void {
    this._storage = window.localStorage;
    LogHelper.info("CachingService", "Init", "Caching service initialised");
  }

  // Save data to local storage by key.
  public static set(key: string, data: any): void {
    this._storage.setItem(key, JSON.stringify(data));
  }

  // Retrieve data from the cache by key.
  // eslint-disable-next-line @rushstack/no-new-null
  public static get<T>(key: string): T | null {
    const data = this._storage.getItem(key);
    if (data !== null) {
      return JSON.parse(data) as T;
    } else {
      return null;
    }
  }

  // Check if a key exists in the cache.
  public static has(key: string): boolean {
    return this._storage.getItem(key) !== null;
  }

  // Clear the cache.
  public static clear(): void {
    this._storage.clear();
  }
}

export default CachingService;
