interface ICacheItem<T> {
  value: T;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

export interface ICacheService {
  getUserData(key: string): unknown;
  setUserData(key: string, data: unknown): void;
  getUserPhoto(userId: string): string | undefined;
  setUserPhoto(userId: string, photoUrl: string): void;
  getUserPresence(userId: string): unknown;
  setUserPresence(userId: string, presence: unknown): void;
  clearExpired(): void;
  clear(): void;
  getStats(): { size: number; hitRate: number };
  dispose(): void;
}

export class LRUCache<T> {
  private cache: Map<string, ICacheItem<T>> = new Map();
  private readonly maxSize: number;
  private readonly ttl: number; // Time to live in milliseconds

  constructor(maxSize: number = 100, ttlMinutes: number = 30) {
    this.maxSize = maxSize;
    this.ttl = ttlMinutes * 60 * 1000;
  }

  public get(key: string): T | undefined {
    const item = this.cache.get(key);
    
    if (!item) {
      return undefined;
    }

    // Check if item has expired
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return undefined;
    }

    // Update access statistics
    item.lastAccessed = Date.now();
    item.accessCount++;

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, item);

    return item.value;
  }

  public set(key: string, value: T): void {
    const now = Date.now();

    // If key already exists, update it
    if (this.cache.has(key)) {
      const item = this.cache.get(key)!;
      item.value = value;
      item.timestamp = now;
      item.lastAccessed = now;
      item.accessCount++;
      
      // Move to end
      this.cache.delete(key);
      this.cache.set(key, item);
      return;
    }

    // If cache is full, remove least recently used item
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }

    // Add new item
    this.cache.set(key, {
      value,
      timestamp: now,
      accessCount: 1,
      lastAccessed: now
    });
  }

  public delete(key: string): boolean {
    return this.cache.delete(key);
  }

  public clear(): void {
    this.cache.clear();
  }

  public size(): number {
    return this.cache.size;
  }

  public has(key: string): boolean {
    return this.cache.has(key) && !this.isExpired(key);
  }

  private isExpired(key: string): boolean {
    const item = this.cache.get(key);
    if (!item) return true;
    
    const expired = Date.now() - item.timestamp > this.ttl;
    if (expired) {
      this.cache.delete(key);
    }
    return expired;
  }

  private evictLRU(): void {
    // Find least recently used item
    let lruKey: string | undefined;
    let oldestAccess = Date.now();

    for (const [key, item] of this.cache.entries()) {
      if (item.lastAccessed < oldestAccess) {
        oldestAccess = item.lastAccessed;
        lruKey = key;
      }
    }

    if (lruKey) {
      this.cache.delete(lruKey);
    }
  }

  public cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.ttl) {
        keysToDelete.push(key);
      }
    }

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  public getStats(): { size: number; maxSize: number; hitRate: number } {
    let totalAccess = 0;
    let hitCount = 0;

    for (const item of this.cache.values()) {
      totalAccess += item.accessCount;
      if (item.accessCount > 1) {
        hitCount += item.accessCount - 1;
      }
    }

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: totalAccess > 0 ? hitCount / totalAccess : 0
    };
  }
}

export class CacheService {
  private static instance: CacheService;
  private userCache: LRUCache<unknown>;
  private photoCache: LRUCache<string>;
  private presenceCache: LRUCache<unknown>;
  private cleanupInterval: number | undefined;

  private constructor() {
    this.userCache = new LRUCache(200, 30);
    this.photoCache = new LRUCache(100, 60);
    this.presenceCache = new LRUCache(150, 5);

    this.cleanupInterval = setInterval(() => {
      this.userCache.cleanup();
      this.photoCache.cleanup();
      this.presenceCache.cleanup();
    }, 10 * 60 * 1000);
  }

  public static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  public getUserData(key: string): unknown {
    return this.userCache.get(key);
  }

  public setUserData(key: string, data: unknown): void {
    this.userCache.set(key, data);
  }

  public getUserPhoto(userId: string): string | undefined {
    return this.photoCache.get(`photo_${userId}`);
  }

  public setUserPhoto(userId: string, photoUrl: string): void {
    this.photoCache.set(`photo_${userId}`, photoUrl);
  }

  public getUserPresence(userId: string): unknown {
    return this.presenceCache.get(`presence_${userId}`);
  }

  public setUserPresence(userId: string, presence: unknown): void {
    this.presenceCache.set(`presence_${userId}`, presence);
  }

  public clearAllCaches(): void {
    this.userCache.clear();
    this.photoCache.clear();
    this.presenceCache.clear();
  }

  public getCacheStats(): Record<string, unknown> {
    return {
      users: this.userCache.getStats(),
      photos: this.photoCache.getStats(),
      presence: this.presenceCache.getStats()
    };
  }

  public dispose(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = undefined;
    }
    this.userCache.clear();
    this.photoCache.clear();
    this.presenceCache.clear();
  }
}