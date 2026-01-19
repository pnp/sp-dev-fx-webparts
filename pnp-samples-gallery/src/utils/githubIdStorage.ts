import { normalizeUsername, sha256Hex, setCachedHashForUsername, getCachedHashForUsername, findUsernameForHashInFeed } from './githubHash';
import type { DiscussionFeedItem } from '../types/discussionReactions';

const STORAGE_KEY = 'pnp:github.id';
const SESSION_ALIAS_KEY = 'pnp.github.alias';

export async function computeHashForUsername(username: string): Promise<string | null> {
  const n = normalizeUsername(username);
  if (!n) return null;
  // check cache first
  let h = await getCachedHashForUsername(n);
  if (h) return h;
  try {
    h = await sha256Hex(n);
    // cache it (async)
    setCachedHashForUsername(n, h).catch(() => null);
    return h;
  } catch {
    return null;
  }
}

export function getStoredHash(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setStoredHash(hash: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, hash);
  } catch {
    // ignore
  }
}

export async function storeHashForUsername(username: string): Promise<{ oldId: string | null; newId: string | null } | null> {
  const h = await computeHashForUsername(username);
  if (!h) return null;
  try {
    const existing = getStoredHash();
    if (!existing || existing !== h) {
      const oldId = existing ?? null;
      setStoredHash(h);
      try { window.sessionStorage.setItem(SESSION_ALIAS_KEY, normalizeUsername(username)); } catch {}
      // try { console.debug('[githubIdStorage] storeHashForUsername: updated stored hash', { storageKey: STORAGE_KEY, oldId, newId: h, alias: normalizeUsername(username) }); } catch {}
      return { oldId, newId: h };
    }
    return { oldId: existing, newId: existing };
  } catch {
    return null;
  }
}

export function getSessionAlias(): string | null {
  try {
    const a = window.sessionStorage.getItem(SESSION_ALIAS_KEY);
    // try { console.debug('[githubIdStorage] getSessionAlias:', { alias: a }); } catch {}
    return a;
  } catch { return null; }
}

export function setSessionAlias(alias: string | null): void {
  try {
    if (alias === null) window.sessionStorage.removeItem(SESSION_ALIAS_KEY);
    else window.sessionStorage.setItem(SESSION_ALIAS_KEY, alias);
    // try { console.debug('[githubIdStorage] setSessionAlias:', { alias }); } catch {}
  } catch {
    // ignore
  }
}

export async function verifyUsernameMatchesStoredHash(username: string): Promise<boolean> {
  const h = await computeHashForUsername(username);
  if (!h) return false;
  const stored = getStoredHash();
  return stored === h;
}

// Coerce various discussion feed shapes into an array of { sampleId, allReactors }
function coerceFeed(input: unknown): DiscussionFeedItem[] {
  if (input == null) return [];
  if (Array.isArray(input)) {
    // validate array entries
    return (input as unknown[]).map(v => v as DiscussionFeedItem).filter(v => typeof v.sampleId === 'string' && Array.isArray(v.allReactors));
  }
  if (typeof input === 'object' && input !== null) {
    const obj = input as Record<string, unknown>;
    if (obj.discussions && typeof obj.discussions === 'object' && !Array.isArray(obj.discussions)) {
      const out: DiscussionFeedItem[] = [];
      const discussions = obj.discussions as Record<string, unknown>;
      for (const key of Object.keys(discussions)) {
        const v = discussions[key] as Record<string, unknown> | undefined;
        const reactorsRaw = v?.allReactors ?? v?.reactors ?? v?.users ?? [];
        const reactors = Array.isArray(reactorsRaw) ? reactorsRaw.filter(r => typeof r === 'string') as string[] : [];
        out.push({ sampleId: key.replace(/^sample:/, ''), allReactors: reactors });
      }
      return out;
    }
    const keys = ['items', 'data', 'feed', 'results'];
    for (const k of keys) {
      const val = obj[k];
      if (Array.isArray(val)) return (val as unknown[]).map(v => v as DiscussionFeedItem).filter(v => typeof v.sampleId === 'string' && Array.isArray(v.allReactors));
    }
    const vals = Object.values(obj);
    if (vals.length > 0 && Array.isArray(vals[0])) {
      const flattened = (vals as unknown[][]).flat();
      return flattened.map(v => v as DiscussionFeedItem).filter(v => typeof v.sampleId === 'string' && Array.isArray(v.allReactors));
    }
  }
  return [];
}

// Attempt to resolve the stored hash to a username by scanning a discussion feed.
export async function lookupAliasFromDiscussionFeed(feed: unknown): Promise<string | null> {
  const stored = getStoredHash();
  if (!stored) return null;
  const coerced = coerceFeed(feed);
  if (!coerced || coerced.length === 0) return null;
  try {
    const found = await findUsernameForHashInFeed(coerced, stored, 6);
    if (found) {
      try { window.sessionStorage.setItem(SESSION_ALIAS_KEY, normalizeUsername(found)); } catch {}
      return found;
    }
    return null;
  } catch  {
    return null;
  }
}

export default {
  computeHashForUsername,
  getStoredHash,
  setStoredHash,
  storeHashForUsername,
  verifyUsernameMatchesStoredHash,
};
