import { readAllOverrides, upsertOverride, writeAllOverrides } from '../utils/likesOverrides';

export type PendingLikesRecord = Record<
  string,
  {
    liked: boolean;
    likedAt: string; // ISO timestamp
  }
>;

export function readPendingLikes(): PendingLikesRecord {
  try {
    const all = readAllOverrides();
    const out: PendingLikesRecord = {};
    for (const e of all) {
      if (e && typeof e.sample === 'string' && (typeof e.pendingLiked === 'boolean' || typeof e.pendingLikedAt === 'string')) {
        out[e.sample] = { liked: Boolean(e.pendingLiked === undefined ? true : e.pendingLiked), likedAt: e.pendingLikedAt ?? e.updatedAt };
      }
    }
    return out;
  } catch {
    return {};
  }
}

export function writePendingLikes(rec: PendingLikesRecord) {
  try {
    const all = readAllOverrides();
    const map = new Map(all.map((a) => [a.sample, a] as const));
    // apply rec entries
    for (const [k, v] of Object.entries(rec)) {
      const existing = map.get(k) ?? { sample: k, updatedAt: new Date().toISOString() };
      const copy = { ...existing } as any;
      copy.pendingLiked = Boolean(v.liked);
      copy.pendingLikedAt = v.likedAt;
      copy.updatedAt = v.likedAt;
      map.set(k, copy);
    }
    // remove pending fields for keys not present in rec
    for (const [k, v] of map.entries()) {
      if (!rec[k] && (v as any).pendingLiked !== undefined) {
        const copy = { ...v } as any;
        delete copy.pendingLiked;
        delete copy.pendingLikedAt;
        map.set(k, copy);
      }
    }
    const merged = Array.from(map.values()) as any[];
    writeAllOverrides(merged);
  } catch {
    // ignore
  }
}

export function setPendingLike(sampleName: string, likedAt?: string | null, liked?: boolean) {
  const timestamp = likedAt === undefined || likedAt === null ? new Date().toISOString() : likedAt;
  try {
    upsertOverride(sampleName, { pendingLiked: liked ?? true, pendingLikedAt: timestamp, updatedAt: timestamp });
  } catch {
    // ignore
  }
  try {
    const detail = { key: sampleName, record: { liked: liked ?? true, likedAt: timestamp } };
    window.dispatchEvent(new CustomEvent('pendingLikesChanged', { detail }));
  } catch { }
}

export function removePendingLike(sampleName: string) {
  try {
    upsertOverride(sampleName, { pendingLiked: null, pendingLikedAt: null, updatedAt: new Date().toISOString() });
    try { window.dispatchEvent(new CustomEvent('pendingLikesChanged', { detail: { key: sampleName, removed: true } })); } catch { }
  } catch {
    // ignore
  }
}

export function reconcilePendingLikesWithGeneratedAt(generatedAt?: string | null) {
  try {
    if (!generatedAt) return;
    const gen = new Date(generatedAt);
    if (isNaN(gen.getTime())) return;

    const all = readAllOverrides();
    let changed = false;
    const updated = all.map((e) => {
      if (e && e.pendingLikedAt) {
        const la = new Date(e.pendingLikedAt);
        if (!isNaN(la.getTime()) && la <= gen) {
          const copy = { ...e } as any;
          delete copy.pendingLiked;
          delete copy.pendingLikedAt;
          changed = true;
          return copy;
        }
      }
      return e;
    });
    if (changed) {
      writeAllOverrides(updated as any[]);
      try { window.dispatchEvent(new CustomEvent('pendingLikesChanged', { detail: { reconciled: true } })); } catch { }
    }
  } catch {
    // ignore
  }
}

export function getPendingLike(sampleName: string) {
  try {
    const all = readAllOverrides();
    const e = all.find((x) => x.sample === sampleName);
    if (!e) return null;
    if (typeof e.pendingLiked === 'boolean' || typeof e.pendingLikedAt === 'string') {
      return { liked: Boolean(e.pendingLiked === undefined ? true : e.pendingLiked), likedAt: e.pendingLikedAt ?? e.updatedAt };
    }
    return null;
  } catch {
    return null;
  }
}
