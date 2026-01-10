// Utility to resolve configured jsonPath values from a sample object.
// Supports dot-string ("metadata.CLIENT-SIDE-DEV"), array paths (["metadata","CLIENT-SIDE-DEV"]) and
// special-cases `metadata` arrays of { key, value } entries (case-insensitive key match).
export function resolveJsonPath(sample: any, jsonPath: string | string[]): string[] {
    if (!sample) return [];

    const path = Array.isArray(jsonPath) ? jsonPath.slice() : String(jsonPath || "").split('.').filter(Boolean);
    if (path.length === 0) return [];

    // Special-case metadata lookups: if first token is 'metadata' and next token is a key name,
    // look through sample.metadata array for matching keys (case-insensitive) and return their values.
    if (path[0].toLowerCase() === 'metadata') {
        const key = path[1];
        if (!key) return [];
        const meta = sample.metadata;
        if (!Array.isArray(meta)) return [];
        const target = String(key).toUpperCase();
        const vals: string[] = [];
        for (const m of meta) {
            try {
                if (!m || typeof m.key !== 'string') continue;
                if (String(m.key).toUpperCase() === target && m.value != null) {
                    if (Array.isArray(m.value)) {
                        for (const v of m.value) if (v != null) vals.push(String(v));
                    } else {
                        vals.push(String(m.value));
                    }
                }
            } catch {
                // ignore
            }
        }
        return uniqPreserveCaseInsensitive(vals);
    }

    // Generic traversal: walk the path tokens through the sample object.
    let cur: any = sample;
    for (const token of path) {
        if (cur == null) return [];
        // If cur is an array of primitives and token is empty, return its items
        if (Array.isArray(cur) && cur.length > 0 && typeof cur[0] !== 'object') {
            // can't traverse deeper into primitives
            break;
        }
        cur = cur[token];
    }

    if (cur == null) return [];

    // Normalize to string array
    if (Array.isArray(cur)) {
        return uniqPreserveCaseInsensitive(cur.filter(v => v != null).map(v => String(v)));
    }

    if (typeof cur === 'string') {
        // split comma separated lists
        const parts = cur.split(',').map(s => s.trim()).filter(Boolean);
        return uniqPreserveCaseInsensitive(parts);
    }

    // Fallback: toString
    return [String(cur)];
}

function uniqPreserveCaseInsensitive(values: string[]): string[] {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const v of values) {
        const key = v.trim();
        const lower = key.toLowerCase();
        if (!seen.has(lower)) {
            seen.add(lower);
            out.push(key);
        }
    }
    return out;
}
