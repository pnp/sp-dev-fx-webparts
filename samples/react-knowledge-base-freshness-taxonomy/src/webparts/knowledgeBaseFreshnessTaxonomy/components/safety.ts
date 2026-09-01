import { limits, isValidServerRelativePath, safeItemUrl, safeNextUrl, retryAfter } from './shared';
export { limits, isValidServerRelativePath, safeItemUrl, safeNextUrl, retryAfter };
export function parseSources(value: string | undefined): string[] { return (value || '').split(/[\r\n,]+/).map((x) => x.trim()).filter(Boolean).slice(0, limits.MAX_SOURCES); }
