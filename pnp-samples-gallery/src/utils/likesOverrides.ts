export interface OverrideEntry {
    sample: string;
    count?: number;
    viewerReacted?: boolean;
    pendingLiked?: boolean;
    pendingLikedAt?: string;
    updatedAt: string;
}

function normalizeSampleKey(sample: string): string {
    return String(sample ?? '').replace(/^sample:/, '');
}

let STORAGE_OVERRIDES_KEY = 'pnp:likes:overrides';

function sanitizeScope(repo?: string | null): string {
    if (!repo) return (window.location.pathname || 'site').replace(/[^a-z0-9-_]/gi, '-').replace(/^-+|-+$/g, '').toLowerCase();
    return String(repo).replace('/', '-').replace(/[^a-z0-9-_]/gi, '-').toLowerCase();
}

export function setScope(repo?: string | null) {
    const scope = sanitizeScope(repo);
    STORAGE_OVERRIDES_KEY = `pnp:likes:overrides:${scope}`;
}

export function getStorageKey() {
    return STORAGE_OVERRIDES_KEY;
}

export function readAllOverrides(): OverrideEntry[] {
    try {
        const raw = localStorage.getItem(STORAGE_OVERRIDES_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
            return parsed.filter((v): v is OverrideEntry => isOverrideEntry(v));
        }
    } catch {
        // ignore
    }
    return [];
}

export function readOverrideFor(sample: string): OverrideEntry | null {
    const key = normalizeSampleKey(sample);
    const all = readAllOverrides();
    return all.find((e) => normalizeSampleKey(e.sample) === key) ?? null;
}

export function writeAllOverrides(entries: OverrideEntry[]): void {
    try {
        const existingRaw = localStorage.getItem(STORAGE_OVERRIDES_KEY);
        const newRaw = JSON.stringify(entries);
        if (existingRaw !== newRaw) {
            localStorage.setItem(STORAGE_OVERRIDES_KEY, newRaw);
            try { window.dispatchEvent(new CustomEvent('pnp:likesOverrideChanged', { detail: { sample: null } })); } catch { }
        }
    } catch {
        // ignore
    }
}

export function upsertOverride(sample: string, fields: { count?: number | null; viewerReacted?: boolean | null; pendingLiked?: boolean | null; pendingLikedAt?: string | null; updatedAt?: string }): void {
    const key = normalizeSampleKey(sample);
    const all = readAllOverrides();
    const now = fields.updatedAt ?? new Date().toISOString();
    const idx = all.findIndex((e) => normalizeSampleKey(e.sample) === key);
    if (idx >= 0) {
        const entry = { ...all[idx] } as OverrideEntry;
        if (fields.count === null) delete entry.count;
        else if (typeof fields.count === 'number') entry.count = fields.count;

        if (fields.viewerReacted === null) delete entry.viewerReacted;
        else if (typeof fields.viewerReacted === 'boolean') entry.viewerReacted = fields.viewerReacted;

        if (fields.pendingLiked === null) delete entry.pendingLiked;
        else if (typeof fields.pendingLiked === 'boolean') entry.pendingLiked = fields.pendingLiked;

        if (fields.pendingLikedAt === null) delete entry.pendingLikedAt;
        else if (typeof fields.pendingLikedAt === 'string') entry.pendingLikedAt = fields.pendingLikedAt;

        entry.updatedAt = now;
        entry.sample = sample;
        all[idx] = entry;
    } else {
        const entry: OverrideEntry = { sample: sample, updatedAt: now };
        if (typeof fields.count === 'number') entry.count = fields.count;
        if (typeof fields.viewerReacted === 'boolean') entry.viewerReacted = fields.viewerReacted;
        if (typeof fields.pendingLiked === 'boolean') entry.pendingLiked = fields.pendingLiked;
        if (typeof fields.pendingLikedAt === 'string') entry.pendingLikedAt = fields.pendingLikedAt;
        all.push(entry);
    }
    writeAllOverrides(all);
    try { window.dispatchEvent(new CustomEvent('pnp:likesOverrideChanged', { detail: { sample } })); } catch { }
}

function isOverrideEntry(v: unknown): v is OverrideEntry {
    if (!v || typeof v !== 'object') return false;
    const o = v as Record<string, unknown>;
    if (typeof o.sample !== 'string') return false;
    if (typeof o.updatedAt !== 'string') return false;
    if ('count' in o && o.count !== undefined && typeof o.count !== 'number') return false;
    if ('viewerReacted' in o && o.viewerReacted !== undefined && typeof o.viewerReacted !== 'boolean') return false;
    if ('pendingLiked' in o && o.pendingLiked !== undefined && typeof o.pendingLiked !== 'boolean') return false;
    if ('pendingLikedAt' in o && o.pendingLikedAt !== undefined && typeof o.pendingLikedAt !== 'string') return false;
    return true;
}

export function clearOverridesOlderThan(isoDate: string): void {
    try {
        const all = readAllOverrides();
        const cutoff = new Date(isoDate).toISOString();
        const filtered = all.map((e) => {
            // If entry is newer or equal, keep as-is
            if (e.updatedAt >= cutoff) return e;

            // Entry is older than cutoff: preserve viewerReacted if present, but
            // remove transient numeric/pending fields so counts are refreshed
            if (typeof e.viewerReacted === 'boolean') {
                return { sample: e.sample, viewerReacted: e.viewerReacted, updatedAt: e.updatedAt } as OverrideEntry;
            }

            // otherwise, drop the entry (return undefined marker)
            return undefined as unknown as OverrideEntry;
        }).filter((v): v is OverrideEntry => !!v);
        const newRaw = JSON.stringify(filtered);
        const existingRaw = localStorage.getItem(STORAGE_OVERRIDES_KEY);
        if (existingRaw !== newRaw) {
            localStorage.setItem(STORAGE_OVERRIDES_KEY, newRaw);
            try { window.dispatchEvent(new CustomEvent('pnp:likesOverrideChanged', { detail: { sample: null } })); } catch { }
        }
    } catch {
        // ignore
    }
}

export function subscribe(listener: (sample: string | null) => void): () => void {
    const handler = (ev: Event) => {
        try {
            const ce = ev as CustomEvent;
            const sample = (ce.detail && typeof ce.detail.sample === 'string') ? ce.detail.sample : null;
            listener(sample);
        } catch {
            listener(null);
        }
    };
    window.addEventListener('pnp:likesOverrideChanged', handler as EventListener);
    return () => window.removeEventListener('pnp:likesOverrideChanged', handler as EventListener);
}
