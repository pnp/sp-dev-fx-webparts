// Utilities for normalizing and hashing GitHub usernames, with caching (in-memory + IndexedDB)
// Designed for browser environment (uses crypto.subtle and indexedDB).

export function normalizeUsername(u: string) {
  return (u ?? '').trim().toLowerCase();
}

export async function sha256Hex(value: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(value);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Simple in-memory caches
const memoryHashCache = new Map<string, string>(); // normalizedUsername -> hash
const memoryFeedIndexCache = new Map<string, Map<string, Set<string>>>(); // feedKey -> username->set(sampleId)

// IndexedDB helper
function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    try {
      const req = indexedDB.open('pnp-samples-cache', 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('usernameHashes')) db.createObjectStore('usernameHashes');
        if (!db.objectStoreNames.contains('feedIndexes')) db.createObjectStore('feedIndexes');
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    } catch (err) {
      reject(err);
    }
  });
}

async function idbGet(storeName: string, key: string) {
  try {
    const db = await openDb();
    return await new Promise<any>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const r = store.get(key);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
  } catch {
    return null;
  }
}

async function idbSet(storeName: string, key: string, value: any) {
  try {
    const db = await openDb();
    return await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const r = store.put(value, key);
      r.onsuccess = () => resolve();
      r.onerror = () => reject(r.error);
    });
  } catch {
    return;
  }
}

// Get cached hash (memory first, then IndexedDB)
export async function getCachedHashForUsername(username: string): Promise<string | null> {
  const n = normalizeUsername(username);
  if (!n) return null;
  const m = memoryHashCache.get(n);
  if (m) return m;
  try {
    const stored = await idbGet('usernameHashes', n);
    if (stored && typeof stored === 'string') {
      memoryHashCache.set(n, stored);
      return stored;
    }
  } catch {
    // ignore
  }
  return null;
}

export async function setCachedHashForUsername(username: string, hash: string): Promise<void> {
  const n = normalizeUsername(username);
  if (!n) return;
  memoryHashCache.set(n, hash);
  try {
    await idbSet('usernameHashes', n, hash);
  } catch {
    // ignore
  }
}

// compute a feed key (short) from feed JSON for caching indexes
export async function computeFeedKey(feed: any): Promise<string> {
  try {
    const s = JSON.stringify(feed);
    const h = await sha256Hex(s);
    return h.substring(0, 32);
  } catch {
    return 'feed-unknown';
  }
}

// Build a username->Set<sampleId> index for a feed; use in-memory cache and persist to IDB
export async function buildUsernameToSamplesIndex(feed: Array<{ sampleId: string; allReactors: string[] }>, persist = true): Promise<Map<string, Set<string>>> {
  const feedKey = await computeFeedKey(feed);
  const mem = memoryFeedIndexCache.get(feedKey);
  if (mem) return mem;

  if (persist) {
    try {
      const stored = await idbGet('feedIndexes', feedKey);
      if (stored && typeof stored === 'object') {
        // stored as record username -> string[]
        const map = new Map<string, Set<string>>();
        for (const k of Object.keys(stored)) map.set(k, new Set(stored[k]));
        memoryFeedIndexCache.set(feedKey, map);
        return map;
      }
    } catch {
      // ignore
    }
  }

  const map = new Map<string, Set<string>>();
  for (const s of feed) {
    const sid = s.sampleId as string;
    for (const u of s.allReactors || []) {
      const n = normalizeUsername(u as string);
      if (!n) continue;
      let set = map.get(n);
      if (!set) { set = new Set<string>(); map.set(n, set); }
      set.add(sid);
    }
  }

  memoryFeedIndexCache.set(feedKey, map);
  if (persist) {
    try {
      const record: Record<string, string[]> = {};
      for (const [k, set] of map.entries()) record[k] = Array.from(set);
      await idbSet('feedIndexes', feedKey, record);
    } catch {
      // ignore
    }
  }
  return map;
}

// Find username matching target hash; stops early. Uses caching for username hashes.
export async function findUsernameForHashInFeed(feed: Array<{ sampleId: string; allReactors: string[] }>, targetHash: string, concurrency = 6): Promise<string | null> {
  if (!targetHash) return null;
  // gather unique normalized usernames
  const uniq = new Set<string>();
  for (const s of feed) for (const u of s.allReactors || []) uniq.add(normalizeUsername(u as string));
  const users = Array.from(uniq).filter(u => !!u);

  let idx = 0;
  let found: string | null = null;

  const worker = async () => {
    while (true) {
      if (found) return;
      const i = idx++;
      if (i >= users.length) return;
      const username = users[i];
      try {
        // check memory/idb cache first
        let h = memoryHashCache.get(username);
        if (!h) {
          const stored = await getCachedHashForUsername(username);
          if (stored) h = stored;
        }
        if (!h) {
          h = await sha256Hex(username);
          // store caches async
          memoryHashCache.set(username, h);
          setCachedHashForUsername(username, h).catch(() => null);
        }
        if (h === targetHash) { found = username; return; }
      } catch {
        // ignore per-username errors
      }
    }
  };

  await Promise.all(new Array(Math.min(concurrency, users.length)).fill(0).map(() => worker()));
  return found;
}

export function clearMemoryCaches() {
  memoryHashCache.clear();
  memoryFeedIndexCache.clear();
}

export default {
  normalizeUsername,
  sha256Hex,
  getCachedHashForUsername,
  setCachedHashForUsername,
  computeFeedKey,
  buildUsernameToSamplesIndex,
  findUsernameForHashInFeed,
  clearMemoryCaches,
};
