import type { LikesJson } from "../types/likes";

export interface NormalizedLikes {
    totals: Map<string, number>;
    reactorsMap: Map<string, string[]>;
}

export function normalizeLikes(raw: LikesJson | null | undefined): NormalizedLikes {
    const totals = new Map<string, number>();
    const reactorsMap = new Map<string, string[]>();
    if (!raw) return { totals, reactorsMap };

    // discussions shape
    const discussions = raw.discussions ?? {};
    if (discussions && typeof discussions === 'object') {
        for (const [k, v] of Object.entries(discussions)) {
            const short = k.replace(/^sample:/, '');
            const total = Number((v as any)?.totalReactions ?? 0) || 0;
            totals.set(short, total);
            const reactors = Array.isArray((v as any)?.allReactors) ? ((v as any).allReactors as string[]).map(r => String(r).toLowerCase()) : [];
            reactorsMap.set(short, reactors);
        }
    }

    // likes shape
    const likes = raw.likes ?? {};
    if (likes && typeof likes === 'object') {
        for (const [k, v] of Object.entries(likes)) {
            const short = k.replace(/^sample:/, '');
            const total = Number((v as any)?.count ?? 0) || 0;
            if (!totals.has(short)) totals.set(short, total);
        }
    }

    return { totals, reactorsMap };
}

export default normalizeLikes;
