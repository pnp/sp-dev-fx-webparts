export type PendingLikesRecord = Record<
  string,
  {
    liked: boolean;
    likedAt: string | null; // ISO timestamp
  }
>;

const STORAGE_KEY = "sp-dev-fx-webparts:likes";

export function readPendingLikes(): PendingLikesRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PendingLikesRecord;
  } catch {
    return {};
  }
}

export function writePendingLikes(rec: PendingLikesRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rec));
  } catch {
    // ignore
  }
}

export function setPendingLike(sampleName: string, likedAt?: string | null, liked?: boolean) {
  const rec = readPendingLikes();
  // Preserve explicit null (means no date yet). If undefined, set to now.
  const timestamp = likedAt === undefined ? new Date().toISOString() : likedAt;
  rec[sampleName] = { liked: liked ?? true, likedAt: timestamp };
  writePendingLikes(rec);
  try {
    const detail = { key: sampleName, record: rec[sampleName] };
    window.dispatchEvent(new CustomEvent('pendingLikesChanged', { detail }));
  } catch (e) {
    // ignore
  }
}

export function removePendingLike(sampleName: string) {
  const rec = readPendingLikes();
  if (rec[sampleName]) {
    delete rec[sampleName];
    writePendingLikes(rec);
    try {
      const detail = { key: sampleName, removed: true };
      window.dispatchEvent(new CustomEvent('pendingLikesChanged', { detail }));
    } catch (e) {
      // ignore
    }
  }
}

export function reconcilePendingLikesWithGeneratedAt(generatedAt?: string | null) {
  try {
    if (!generatedAt) return;
    const gen = new Date(generatedAt);
    if (isNaN(gen.getTime())) return;

    const rec = readPendingLikes();
    const changed: string[] = [];
    for (const k of Object.keys(rec)) {
      const item = rec[k];
      if (item && item.likedAt) {
        const la = new Date(item.likedAt);
        if (!isNaN(la.getTime()) && la <= gen) {
          // remove the timestamp (set to null) per requirement
          rec[k] = { liked: item.liked, likedAt: null };
          changed.push(k);
        }
      }
    }

    if (changed.length > 0) {
      writePendingLikes(rec);
      try {
        window.dispatchEvent(new CustomEvent('pendingLikesChanged', { detail: { reconciled: true, keys: changed } }));
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore
  }
}

export function getPendingLike(sampleName: string) {
  const rec = readPendingLikes();
  return rec[sampleName] ?? null;
}
