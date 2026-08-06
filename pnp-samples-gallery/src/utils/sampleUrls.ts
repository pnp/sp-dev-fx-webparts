import type { PnPSample } from "../types/index";

export function slugifySampleName(name: string): string {
    return String(name ?? "")
        .trim()
        .toLowerCase()
        .replace(/['"]/g, "")
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function getGalleryBasePath(baseUrl?: string): string {
    const raw = String(baseUrl ?? "/").trim() || "/";

    try {
        const fallbackOrigin =
            typeof window !== "undefined" && window.location
                ? window.location.origin
                : "https://example.invalid";
        const url = new URL(raw, fallbackOrigin);
        return url.pathname.replace(/\/+$/, "");
    } catch {
        const path = raw.startsWith("/") ? raw : `/${raw}`;
        return path.replace(/\/+$/, "");
    }
}

export function getGalleryPath(baseUrl?: string): string {
    const basePath = getGalleryBasePath(baseUrl);
    return `${basePath || ""}/`;
}

export function getSampleDetailPath(sampleOrSlug: PnPSample | string, baseUrl?: string): string {
    const rawSlug = typeof sampleOrSlug === "string" ? sampleOrSlug : sampleOrSlug.name;
    const slug = slugifySampleName(rawSlug);
    const basePath = getGalleryBasePath(baseUrl);
    return `${basePath || ""}/samples/${encodeURIComponent(slug)}/`;
}

export function getSampleSlugFromPath(pathname: string, baseUrl?: string): string | null {
    const basePath = getGalleryBasePath(baseUrl);
    let path = pathname || "/";

    if (basePath && path.toLowerCase().startsWith(`${basePath.toLowerCase()}/`)) {
        path = path.slice(basePath.length);
    }

    const match = path.match(/^\/samples\/([^/]+)\/?$/i);
    return match ? decodeURIComponent(match[1]) : null;
}
