export const limits: { MAX_SOURCES: number; MAX_PAGE_SIZE: number; MAX_PAGES: number; MAX_ROWS: number };
export function classifyFreshness(reviewDate: string | undefined, referenceDate: string): 'fresh' | 'due soon' | 'stale' | 'missing review date';
export function parseTaxonomy(value: unknown): string[];
export function isValidServerRelativePath(value: string): boolean;
export function safeItemUrl(webUrl: string, fileRef: string): string | undefined;
export function safeNextUrl(webUrl: string, next: unknown): string | undefined;
export function retryAfter(response: { headers?: { get(name: string): string | null } }): number;
