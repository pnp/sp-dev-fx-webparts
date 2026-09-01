export const LIMITS = { sources: 4, page: 50, pages: 5, rows: 200 };
export const FIELDS = 'Id,Title,FileRef,FileLeafRef,Created,Modified,FSObjType,File/Size,File/TimeCreated,File/TimeLastModified,ContentType/Name,Author/Title,Editor/Title,UniqueId,ComplianceAssetId';
export interface Source { title?: string; path: string; }
export interface Thresholds { maxPathLength: number; staleDays: number; largeFileBytes: number; }
export interface Signal { id: string; title: string; path: string; link?: string; extension: string; size?: number; owner?: string; modified?: string; risks: string[]; readiness: 'Ready' | 'Review' | 'Blocked' | 'Unknown'; source: string; }
export interface ReadClient { get(url: string, configuration?: unknown, options?: unknown): Promise<ReadResponse>; }
export interface ReadResponse { status: number; ok: boolean; headers: { get(name: string): string | null }; json(): Promise<any>; }
export interface AssessmentProps extends Thresholds { client: ReadClient; webUrl: string; sources?: Source[]; referenceDate?: string; }
export interface FetchResult { rows: Signal[]; warnings: string[]; }

export function safePath(path: unknown): string | undefined {
  if (typeof path !== 'string' || !path || /[\u0000-\u001f\\?#]/.test(path) || path.startsWith('//') || /(^|\/)\.\.?($|\/)/.test(path)) return undefined;
  if (path.startsWith('/')) return path;
  try { const u = new URL(path); return u.protocol === 'https:' ? u.pathname : undefined; } catch (_) { return undefined; }
}
export function safeOrigin(value: unknown): string | undefined {
  if (typeof value !== 'string' || /[\u0000-\u001f]/.test(value)) return undefined;
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password ? u.origin : undefined; } catch (_) { return undefined; }
}
export function safeNext(next: unknown, origin: string): string | undefined {
  if (typeof next !== 'string') return undefined;
  try { const u = new URL(next, origin); return u.origin === origin && u.protocol === 'https:' && safePath(u.pathname) ? u.href : undefined; } catch (_) { return undefined; }
}
export function safeLink(origin: unknown, path: unknown): string | undefined {
  const safeWebOrigin = safeOrigin(origin); const safeFilePath = safePath(path);
  if (!safeWebOrigin || !safeFilePath) return undefined;
  try { return new URL(safeFilePath, safeWebOrigin).href; } catch (_) { return undefined; }
}
function object(value: unknown): { [key: string]: any } { return value && typeof value === 'object' ? value as { [key: string]: any } : {}; }
function dateValue(value: unknown): string | undefined { return typeof value === 'string' && !isNaN(Date.parse(value)) ? value : undefined; }
export function normalize(row: unknown, source: string, thresholds: Thresholds, referenceDate: string, origin: string): Signal | undefined {
  const r = object(row); const file = object(r.File); const path = safePath(r.FileRef); if (!path) return undefined;
  const link = safeLink(origin, path); if (!link) return undefined;
  const title = typeof r.Title === 'string' && r.Title ? r.Title : (typeof r.FileLeafRef === 'string' ? r.FileLeafRef : 'Untitled');
  const name = typeof r.FileLeafRef === 'string' ? r.FileLeafRef : title;
  const ext = name.indexOf('.') >= 0 ? name.split('.').pop()!.toLowerCase() : '';
  const risks: string[] = []; const modified = dateValue(r.Modified || file.TimeLastModified); const owner = object(r.Editor).Title || object(r.Author).Title;
  if (path.length > thresholds.maxPathLength) risks.push('Long path');
  if (!ext || /^(exe|dll|bat|cmd|ps1|lnk|url|iso)$/i.test(ext)) risks.push(ext ? 'Unsupported extension' : 'Unknown extension');
  if (modified && (Date.parse(referenceDate) - Date.parse(modified)) / 86400000 > thresholds.staleDays) risks.push('Stale');
  const size = typeof file.Size === 'number' ? file.Size : undefined; if (size !== undefined && size > thresholds.largeFileBytes) risks.push('Large file');
  if (!owner) risks.push('Missing owner');
  const readiness = risks.some(x => /Unsupported|Long path/.test(x)) ? 'Blocked' : risks.length ? 'Review' : (ext ? 'Ready' : 'Unknown');
  return { id: String(r.Id || r.UniqueId || path), title, path, link, extension: ext, size, owner, modified, risks, readiness, source };
}
function wait(ms: number): Promise<void> { return new Promise(resolve => setTimeout(resolve, ms)); }
async function get(client: ReadClient, url: string): Promise<ReadResponse> {
  for (let attempt = 0; ; attempt++) { const response = await client.get(url, undefined, { headers: { Accept: 'application/json;odata=nometadata' } }); if ([429, 503].indexOf(response.status) < 0 || attempt === 2) return response; const retry = Number(response.headers.get('Retry-After')); await wait((retry > 0 ? retry : 1) * 1000); }
}
export async function assess(props: AssessmentProps): Promise<FetchResult> {
  const thresholds = { maxPathLength: props.maxPathLength || 400, staleDays: props.staleDays || 365, largeFileBytes: props.largeFileBytes || 104857600 };
  const origin = safeOrigin(props.webUrl); if (!origin) throw new Error('The SharePoint web URL must be an HTTPS URL.'); const sources = (props.sources || []).slice(0, LIMITS.sources); const rows: Signal[] = []; const warnings: string[] = [];
  for (const source of sources) { const path = safePath(source.path); if (!path) { warnings.push(`Skipped unsafe source: ${source.path}`); continue; } let next: string | undefined = `${origin}${path}/items?$select=${FIELDS}&$expand=File,ContentType,Author,Editor&$top=${LIMITS.page}`;
    let pages = 0; while (next && pages++ < LIMITS.pages && rows.filter(r => r.source === (source.title || path)).length < LIMITS.rows) { const response = await get(props.client, next); if (!response.ok) { warnings.push(`${source.title || path}: HTTP ${response.status}`); break; } let body: any; try { body = await response.json(); } catch (_) { warnings.push(`${source.title || path}: malformed response`); break; } const values = Array.isArray(body.value) ? body.value : []; values.forEach((row: unknown) => { const signal = normalize(row, source.title || path, thresholds, props.referenceDate || new Date().toISOString().slice(0, 10), origin); if (signal && rows.filter(r => r.source === signal.source).length < LIMITS.rows) rows.push(signal); }); next = safeNext(body['@odata.nextLink'] || body['odata.nextLink'], origin); }
    if (pages >= LIMITS.pages && next) warnings.push(`${source.title || path}: page limit reached`);
  } return { rows, warnings };
}
