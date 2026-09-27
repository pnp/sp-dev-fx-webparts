export const MAX_SOURCES = 4;
export const MAX_PAGES = 5;
export const PAGE_SIZE = 50;
export const MAX_ROWS = 200;

export interface IAnnouncement { id: string; title: string; description: string; imageUrl?: string; linkUrl?: string; created?: string; modified?: string; publishDate?: string; expiryDate?: string; audience: string[]; category: string; priority: string; source: string; }
export interface IRawResponse { value?: any[]; ['@odata.nextLink']?: string; }
export interface IReadResult { items: IAnnouncement[]; pages: number; truncated: boolean; }

export function boundedPaths(value: string): string[] {
  return value.split(/[\r\n,]+/).map((x) => x.trim()).filter(Boolean).slice(0, MAX_SOURCES);
}

export function validServerRelativePath(value: string): boolean {
  return typeof value === 'string' && /^\/(?!\/)[^?#\\\u0000-\u001F\u007F-\u009F]+$/.test(value) && !value.split('/').some((segment) => segment === '.' || segment === '..');
}

export function safeTenantUrl(value: unknown, siteOrigin: string): string | undefined {
  if (typeof value !== 'string' || !value.trim()) return undefined;
  const candidate = value.trim();
  if (/[\u0000-\u001F\u007F-\u009F\\]/.test(candidate) || candidate.indexOf('//') === 0 || /^https:\/\/[^/?#]*@/i.test(candidate) || (candidate.indexOf('/') !== 0 && !/^https:\/\//i.test(candidate))) return undefined;
  try {
    const url = new URL(candidate, siteOrigin);
    const origin = new URL(siteOrigin).origin;
    if (url.protocol !== 'https:' || url.origin !== origin || url.username || url.password) return undefined;
    return url.href;
  } catch (_) { return undefined; }
}

export function parseAudience(value: unknown): string[] {
  const values = Array.isArray(value) ? value : typeof value === 'string' ? value.split(/[;,|]/) : value && typeof value === 'object' ? Object.keys(value as object).map((k) => (value as any)[k]) : [];
  return values.map((item: any) => typeof item === 'string' ? item : item && (item.Label || item.Title || item.LookupValue || item.displayName)).filter(Boolean).map((x: string) => x.trim().toLowerCase()).filter(Boolean);
}

export function audienceMatches(rowAudience: unknown, currentAudience: string): boolean {
  const labels = parseAudience(rowAudience);
  return !currentAudience.trim() || !labels.length || labels.indexOf(currentAudience.trim().toLowerCase()) >= 0;
}

function date(value: unknown): number | undefined { if (!value) return undefined; const parsed = Date.parse(String(value)); return isNaN(parsed) ? undefined : parsed; }
export function eligible(row: any, referenceDate: string | Date): boolean {
  if (row.IsPublished === false) return false;
  const now = typeof referenceDate === 'string' ? date(referenceDate) : referenceDate.getTime();
  if (now === undefined) return false;
  const publish = date(row.PublishDate);
  const expiry = date(row.ExpiryDate);
  return !(publish !== undefined && publish > now) && !(expiry !== undefined && expiry < now);
}

export function normalizeRow(row: any, source: string, siteOrigin: string, currentAudience: string): IAnnouncement | undefined {
  if (!row || typeof row !== 'object' || typeof row.Title !== 'string' || !row.Title.trim() || !eligible(row, new Date(row.__referenceDate || Date.now()))) return undefined;
  if (!audienceMatches(row.Audience || row.TargetAudience, currentAudience)) return undefined;
  const image = safeTenantUrl(typeof row.BannerImageUrl === 'string' ? row.BannerImageUrl : row.BannerImageUrl && row.BannerImageUrl.Url, siteOrigin);
  const link = safeTenantUrl(row.FileRef, siteOrigin);
  return { id: String(row.Id || row.FileRef || `${source}:${row.Title}`), title: row.Title.trim(), description: String(row.Description || row.Body || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim(), imageUrl: image, linkUrl: link, created: row.Created, modified: row.Modified, publishDate: row.PublishDate, expiryDate: row.ExpiryDate, audience: parseAudience(row.Audience || row.TargetAudience), category: String(row.Category || 'General'), priority: String(row.Priority || 'Normal'), source };
}

export function nextPageUrl(value: unknown, origin: string): string | undefined {
  if (typeof value !== 'string') return undefined;
  try { const url = new URL(value, origin); return url.origin === new URL(origin).origin && url.protocol === 'https:' && url.pathname.indexOf('/_api/') >= 0 ? url.href : undefined; } catch (_) { return undefined; }
}

export function httpError(status: number, retryAfter?: string): Error {
  const retry = retryAfter ? ` Retry after ${retryAfter}.` : '';
  if (status === 401) return new Error('You are not authenticated to read these announcements.');
  if (status === 403) return new Error('You do not have permission to read one of the configured announcement lists.');
  if (status === 429 || status === 503) return new Error(`SharePoint is temporarily unavailable.${retry}`);
  return new Error(`SharePoint returned HTTP ${status}.`);
}

export async function readAnnouncements(get: (url: string) => Promise<{ ok: boolean; status: number; headers: { get(name: string): string | null }; json(): Promise<IRawResponse> }>, siteOrigin: string, paths: string[], referenceDate: string | Date, currentAudience: string): Promise<IReadResult> {
  const items: IAnnouncement[] = []; let pages = 0; let truncated = false;
  const select = 'Id,Title,Description,Body,BannerImageUrl,FileRef,Created,Modified,PublishDate,ExpiryDate,Audience,TargetAudience,Category,Priority,IsPublished,Author/Title,Editor/Title';
  for (const path of boundedPaths(paths.join('\n'))) {
    if (!validServerRelativePath(path)) continue;
    let url = `${siteOrigin}/_api/web/GetList(@listUrl)/items?@listUrl='${encodeURIComponent(path)}'&$select=${select}&$expand=Author,Editor&$top=${PAGE_SIZE}`;
    let sourcePages = 0;
    while (url && sourcePages < MAX_PAGES && items.length < MAX_ROWS) {
      const response = await get(url); pages++; sourcePages++;
      if (!response.ok) throw httpError(response.status, response.headers.get('Retry-After') || undefined);
      const body = await response.json();
      (Array.isArray(body.value) ? body.value : []).forEach((row) => { row.__referenceDate = typeof referenceDate === 'string' ? referenceDate : referenceDate.toISOString(); const normalized = normalizeRow(row, path, siteOrigin, currentAudience); if (normalized) items.push(normalized); });
      url = nextPageUrl(body['@odata.nextLink'], siteOrigin) || '';
    }
    if (url) truncated = true;
    if (items.length >= MAX_ROWS) { truncated = true; break; }
  }
  return { items, pages, truncated };
}
