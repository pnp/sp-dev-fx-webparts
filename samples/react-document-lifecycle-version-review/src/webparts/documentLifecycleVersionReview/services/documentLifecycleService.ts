import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { IReviewItem, ISource, ISourceResult } from '../models';
import { classify, displayDate, parseRow } from '../utils/review';

export const MAX_SOURCES = 4; export const PAGE_SIZE = 50; export const MAX_PAGES = 5; export const MAX_ITEMS = 200; export const MAX_HORIZON_DAYS = 3650;
export function parseSources(value: string): ISource[] { try { const data: unknown = JSON.parse(value || '[]'); if (!Array.isArray(data)) return []; return data.slice(0, MAX_SOURCES).map((x: unknown) => x as ISource).filter(x => x && typeof x.listTitle === 'string' && x.listTitle.trim().length > 0); } catch (_) { return []; } }
export function safeUrl(value: string, base: string): string | undefined {
  if (typeof value !== 'string' || value.length > 2048) return undefined;
  if (value.charAt(0) === '/') { if (value.slice(0, 2) === '//') return undefined; return value; }
  try { const candidate = new URL(value); const origin = new URL(base).origin; return candidate.protocol === 'https:' && candidate.origin === origin ? candidate.toString() : undefined; } catch (_) { return undefined; }
}
function quoteOData(value: string): string { return "'" + value.replace(/'/g, "''") + "'"; }
export async function readSource(http: HttpClient, source: ISource, baseUrl: string, referenceDate: Date): Promise<ISourceResult> {
  const site = source.siteUrl ? safeUrl(source.siteUrl, baseUrl) : baseUrl;
  if (!site || !/^[^\r\n]{1,120}$/.test(source.listTitle)) return { source: source.listTitle, items: [], state: 'error', message: 'Source URL or list title is unsafe.' };
  let next = site.replace(/\/$/, '') + "/_api/web/lists/GetByTitle(" + quoteOData(source.listTitle.trim()) + ")/items?$select=Id,File,FileLeafRef,FileRef,ContentType,Author,Editor,Created,Modified,FSObjType,File_x0020_Size,_UIVersionString,OData__UIVersionString,CheckoutUser,CheckOutType,Level,ApprovalStatus&$expand=File,Author,Editor,CheckoutUser&$top=" + PAGE_SIZE;
  const items: IReviewItem[] = []; let page = 0;
  try {
    while (next && page < MAX_PAGES && items.length < MAX_ITEMS) {
      const url = safeUrl(next, baseUrl); if (!url) return { source: source.listTitle, items, state: 'error', message: 'Unsafe pagination link rejected.' };
      const response: HttpClientResponse = await http.get(url, HttpClient.configurations.v1, { headers: { Accept: 'application/json;odata=nometadata' } } as IHttpClientOptions);
      if (response.status === 401 || response.status === 403) return { source: source.listTitle, items, state: items.length ? 'partial' : 'permission', message: 'Permission denied.' };
      if (response.status === 429) return { source: source.listTitle, items, state: items.length ? 'partial' : 'throttled', message: 'SharePoint throttled the request.' };
      if (response.status >= 500) return { source: source.listTitle, items, state: items.length ? 'partial' : 'retry', message: 'SharePoint is temporarily unavailable.' };
      if (!response.ok) return { source: source.listTitle, items, state: items.length ? 'partial' : 'error', message: 'Request failed (' + response.status + ').' };
      const body: { value?: unknown[]; ['@odata.nextLink']?: string } = await response.json();
      (Array.isArray(body.value) ? body.value : []).forEach(row => { const parsed = parseRow(row, source.listTitle, referenceDate); if (parsed) items.push(parsed); });
      next = typeof body['@odata.nextLink'] === 'string' ? body['@odata.nextLink'] : ''; page++;
    }
    const state = items.length ? (next ? 'partial' : 'ready') : 'empty'; return { source: source.listTitle, items: items.slice(0, MAX_ITEMS), state, message: next ? 'Page limit reached.' : undefined };
  } catch (error) { return { source: source.listTitle, items, state: items.length ? 'partial' : 'error', message: error instanceof Error ? error.message : 'Unexpected error.' }; }
}
