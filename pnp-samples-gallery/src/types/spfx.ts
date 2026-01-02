export type SpfxBucket = "< 1.1" | `${number}.${number}`;

export function spfxToBucket(raw?: string): SpfxBucket | "" {
    const v = (raw ?? "").trim();
    if (!v) return "";

    const lower = v.toLowerCase();

    // Legacy/non-semver labels (bucketed)
    const legacy = new Set([
        "drop1",
        "drop2",
        "drop3",
        "drop4",
        "drop5",
        "ga",
        "rc0",
        "1.0",
        "1.0.0",
    ]);
    if (legacy.has(lower)) return "< 1.1";

    // Parse major.minor(.patch) from strings like:
    // "1.4", "1.4.0", "1.4.1", "1.4.0-beta", etc.
    const m = lower.match(/^(\d+)\.(\d+)/);
    if (!m) return "";

    const major = Number(m[1]);
    const minor = Number(m[2]);
    if (!Number.isFinite(major) || !Number.isFinite(minor)) return "";

    // Bucket all 1.0.x as legacy
    if (major === 1 && minor === 0) return "< 1.1";

    return `${major}.${minor}` as SpfxBucket;
}

export function spfxBucketSortKeyDesc(bucket: SpfxBucket): number {
    // Want newest at top, legacy at bottom
    if (bucket === "< 1.1") return -1; // will be handled specially below

    const m = bucket.match(/^(\d+)\.(\d+)$/);
    if (!m) return 0;

    const major = Number(m[1]);
    const minor = Number(m[2]);

    // key for DESC sorting; higher = newer
    return major * 10_000 + minor;
}
