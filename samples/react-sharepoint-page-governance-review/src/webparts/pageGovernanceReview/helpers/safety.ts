export const MAX_SOURCES = 4; export const PAGE_SIZE = 50; export const MAX_PAGES = 5; export const MAX_ROWS = 200;
const control = /[\u0000-\u001f\u007f]/;
const unsafeUrlInput = /[\s\u0000-\u001f\u007f\\]/;
const traversal = /(?:^|\/)\.\.(?:\/|$)|%2e/i;
export function validatePath(path: string): string {
  if (!path || path.charAt(0) !== '/' || path.indexOf('//') === 0 || path.indexOf('\\') >= 0 || path.indexOf('?') >= 0 || path.indexOf('#') >= 0 || path.split('/').some(part => part === '..') || control.test(path)) throw new Error('Source path must be a safe server-relative path.');
  return path;
}
export function validateWebUrl(value: unknown): URL {
  if (typeof value !== 'string' || !value || unsafeUrlInput.test(value) || !/^https:\/\/[^/]/i.test(value)) throw new Error('Web URL is invalid.');
  let url: URL; try { url = new URL(value); } catch (_) { throw new Error('Web URL must be absolute HTTPS.'); }
  if (url.protocol !== 'https:' || !url.hostname || url.username || url.password) throw new Error('Web URL must be HTTPS.');
  return url;
}
export function safeNextLink(next: unknown, base: URL): string | undefined {
  if (typeof next !== 'string' || !next || unsafeUrlInput.test(next) || next.indexOf('//') === 0 || traversal.test(next)) return undefined;
  let url: URL; try { url = new URL(next, base.toString()); } catch (_) { return undefined; }
  if (url.protocol !== 'https:' || url.origin !== base.origin) return undefined;
  if (url.username || url.password || url.hash) return undefined;
  return url.toString();
}
export const SELECT_FIELDS = 'Id,Title,FileRef,Created,Modified,PromotedState,CanvasContent1,LayoutWebpartsContent,Description,Author/Title,Editor/Title,File/TimeCreated,File/TimeLastModified,CheckoutUser/Title,FSObjType';
export function requestUrl(webUrl: string, path: string): string { const web = validateWebUrl(webUrl); const relative = validatePath(path); const managed = web.pathname.replace(/\/$/, ''); const query = `?$select=${SELECT_FIELDS}&$expand=Author,Editor,File,CheckoutUser&$top=${PAGE_SIZE}&@listUrl='${relative.replace(/'/g, "''")}'`; return `${web.origin}${managed}/_api/web/GetList(@listUrl)/items${query}`; }
export function responseMessage(status: number, retryAfter?: string | null): string { if (status === 401) return 'Not signed in (401).'; if (status === 403) return 'Access denied (403).'; if (status === 429 || status === 503) return `SharePoint is temporarily unavailable (${status}). Retry after ${retryAfter || 'a short delay'}.`; return `SharePoint request failed (${status}).`; }
