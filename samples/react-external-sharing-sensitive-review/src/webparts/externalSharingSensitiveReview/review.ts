export const MAX_SOURCES = 4;
export const PAGE_SIZE = 50;
export const MAX_PAGES = 5;
export const MAX_ROWS = 200;

export interface RawRow { [key: string]: unknown; }
export type Severity = 'high' | 'medium' | 'low';
export interface Signal { code: string; label: string; severity: Severity; evidence: string; }
export interface ReviewRow { id: string; name: string; url?: string; modified?: string; author: string; contentType: string; signals: Signal[]; severity: Severity; source: string; }

export const SELECT_FIELDS = ['FileRef','FileLeafRef','FSObjType','Modified','Editor/Title','Author/Title','HasUniqueRoleAssignments','ContentType/Name','SensitivityLabel','ComplianceTag','SharingCapability','SharingLinkType','GuestAccess','ExternalSharing','ReviewDate'];

export function boundedSources(input: string): string[] { return input.split(/[\r\n,]+/).map(s => s.trim()).filter(Boolean).slice(0, MAX_SOURCES); }
export function safeListPath(path: string): string | undefined {
  if (!path || path.length > 400 || !path.startsWith('/') || path.startsWith('//') || /[\u0000-\u001f\u007f\\<>"']/.test(path)) return undefined;
  try { const u = new URL(path, 'https://tenant.invalid'); if (u.origin !== 'https://tenant.invalid' || u.search || u.hash || /[<>"']/.test(path)) return undefined; return u.pathname; } catch (_) { return undefined; }
}
export function safeItemUrl(value: unknown, origin: string): string | undefined {
  if (typeof value !== 'string' || !value || /[\u0000-\u001f\u007f<>"']/.test(value) || (!value.startsWith('/') && !/^https:\/\//i.test(value))) return undefined;
  try { const u = new URL(value, origin); const base = new URL(origin); if (u.protocol !== 'https:' || u.origin !== base.origin || !u.pathname.startsWith('/')) return undefined; return u.toString(); } catch (_) { return undefined; }
}
export function safeNextLink(value: unknown, origin: string): string | undefined { return safeItemUrl(value, origin); }
function text(row: RawRow, ...keys: string[]): string { for (const k of keys) { const v = row[k]; if (typeof v === 'string' && v.trim()) return v.trim(); if (v && typeof v === 'object' && typeof (v as { Title?: unknown }).Title === 'string') return String((v as { Title: string }).Title); } return ''; }
function present(row: RawRow, keys: string[]): boolean { return keys.some(k => row[k] !== undefined && row[k] !== null && String(row[k]).trim() !== ''); }
function indicatesExternalSharing(value: unknown): boolean {
  if (value === true) return true;
  if (typeof value !== 'string') return false;
  const normalized = value.trim().toLowerCase();
  return /^(?:true|yes|enabled|on|1)$/.test(normalized) || /^(?:external|guest)(?:[a-z][a-z0-9]*|[\s_-].*)?$/.test(normalized);
}
export function classify(row: RawRow, referenceDate: Date): Signal[] {
  const out: Signal[] = []; const add = (code: string, label: string, severity: Severity, evidence: string) => out.push({ code, label, severity, evidence });
  if (['GuestAccess', 'ExternalSharing'].some(key => indicatesExternalSharing(row[key])) || indicatesExternalSharing(row.SharingCapability)) add('external', 'External or guest sharing indicator', 'high', 'GuestAccess, ExternalSharing, or sharing capability indicates external access.');
  if (/anonymous|anyone|organization|org-wide/i.test(text(row, 'SharingLinkType','SharingCapability'))) add('link', 'Broad sharing-link indicator', 'high', `Sharing value: ${text(row, 'SharingLinkType','SharingCapability')}`);
  if (present(row, ['SensitivityLabel','ComplianceTag']) && /sensitive|confidential|secret|restricted|high/i.test(`${text(row,'SensitivityLabel')} ${text(row,'ComplianceTag')}`)) add('sensitive', 'Sensitive-content indicator', 'high', `Label/tag: ${text(row,'SensitivityLabel','ComplianceTag')}`);
  if (row.HasUniqueRoleAssignments === true || String(row.HasUniqueRoleAssignments).toLowerCase() === 'true') add('unique', 'Unique permissions', 'medium', 'HasUniqueRoleAssignments is true.');
  if (!present(row, ['SensitivityLabel','ComplianceTag'])) add('metadata', 'Missing sensitivity/governance metadata', 'medium', 'SensitivityLabel and ComplianceTag were absent.');
  const modified = Date.parse(text(row, 'ReviewDate','Modified')); if (Number.isFinite(modified) && referenceDate.getTime() - modified > 180 * 86400000) add('stale', 'Stale review/modified date', 'medium', `Date: ${new Date(modified).toISOString().slice(0,10)}`);
  return out;
}
export function normalize(row: RawRow, source: string, origin: string, referenceDate: Date): ReviewRow | undefined {
  const name = text(row, 'FileLeafRef') || text(row, 'Title'); if (!name) return undefined;
  const signals = classify(row, referenceDate); const rank: Record<Severity, number> = { low: 1, medium: 2, high: 3 }; const severity = signals.reduce<Severity>((a, s) => rank[s.severity] > rank[a] ? s.severity : a, 'low');
  return { id: text(row,'FileRef') || `${source}:${name}`, name, url: safeItemUrl(text(row,'FileRef'), origin), modified: text(row,'Modified'), author: text(row,'Editor/Title','Author/Title') || 'Unknown', contentType: text(row,'ContentType/Name') || 'Unknown', signals, severity, source };
}
export function canFetchPage(page: number, rows: number): boolean { return page >= 0 && page < MAX_PAGES && rows < MAX_ROWS; }
export function httpMessage(status: number, retryAfter?: string): string { if (status === 401 || status === 403) return 'SharePoint denied access (401/403). Check permissions and source scope.'; if (status === 429 || status === 503) return `SharePoint is throttling or unavailable.${retryAfter ? ` Retry after ${retryAfter}.` : ''}`; return `SharePoint request failed (${status}).`; }
