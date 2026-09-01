import {
  IRefinerEntry,
  ISearchRefiner,
  ISearchRequestOptions,
  ISearchResponse,
  ISearchResult,
  ISelectedRefiner,
  SearchErrorKind
} from '../models/ISearchModels';

export const DEFAULT_PAGE_SIZE = 10;
export const MAX_PAGE_SIZE = 50;
export const MAX_START_ROW = 10000;
export const MAX_QUERY_LENGTH = 500;
export const MAX_REFINERS = 10;
export const MAX_REFINER_LENGTH = 200;

const REFINER_NAME = /^[A-Za-z][A-Za-z0-9_]*$/;

function containsControlCharacters(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x1f || code === 0x7f) {
      return true;
    }
  }
  return false;
}

export class SearchValidationError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'SearchValidationError';
  }
}

export class SearchResponseError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'SearchResponseError';
  }
}

export class SearchHttpError extends Error {
  public readonly status: number;

  public constructor(status: number, statusText?: string) {
    super(`SharePoint Search request failed (${status}${statusText ? ` ${statusText}` : ''}).`);
    this.name = 'SearchHttpError';
    this.status = status;
  }
}

export function normalizeQuery(value: unknown): string {
  if (typeof value !== 'string') {
    throw new SearchValidationError('The search query must be text.');
  }
  if (containsControlCharacters(value)) {
    throw new SearchValidationError('The search query contains an unsupported control character.');
  }
  const query = value.trim();
  if (query.length > MAX_QUERY_LENGTH) {
    throw new SearchValidationError(`The search query must be ${MAX_QUERY_LENGTH} characters or fewer.`);
  }
  return query;
}

export function normalizePageSize(value: unknown): number {
  if (typeof value === 'string' && containsControlCharacters(value)) {
    throw new SearchValidationError('The page size contains an unsupported control character.');
  }
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numberValue)) {
    return DEFAULT_PAGE_SIZE;
  }
  return Math.max(1, Math.min(MAX_PAGE_SIZE, Math.floor(numberValue)));
}

export function normalizeStartRow(value: unknown): number {
  if (typeof value === 'string' && containsControlCharacters(value)) {
    throw new SearchValidationError('The result offset contains an unsupported control character.');
  }
  const numberValue = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(numberValue)) {
    return 0;
  }
  return Math.max(0, Math.min(MAX_START_ROW, Math.floor(numberValue)));
}

function validateRefinerPart(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || containsControlCharacters(value)) {
    throw new SearchValidationError(`${fieldName} is invalid.`);
  }
  const result = value.trim();
  if (!result || result.length > MAX_REFINER_LENGTH) {
    throw new SearchValidationError(`${fieldName} is invalid.`);
  }
  return result;
}

function refinementFilter(refiner: ISelectedRefiner): string {
  const name = validateRefinerPart(refiner.name, 'The refiner name');
  const token = validateRefinerPart(refiner.token, 'The refiner token');
  if (!REFINER_NAME.test(name)) {
    throw new SearchValidationError('The refiner name is invalid.');
  }
  return `${name}:${token}`;
}

function buildRefinementFilters(refiners: ISelectedRefiner[]): string {
  if (refiners.length > MAX_REFINERS) {
    throw new SearchValidationError(`Select no more than ${MAX_REFINERS} refiners.`);
  }
  return refiners.map(refinementFilter).join(',');
}

export function buildSearchUrl(siteUrl: string, options: ISearchRequestOptions): string {
  if (typeof siteUrl !== 'string' || containsControlCharacters(siteUrl)) {
    throw new SearchValidationError('The SharePoint site URL is invalid.');
  }
  const query = normalizeQuery(options.query);
  if (!query) {
    throw new SearchValidationError('Enter a search query.');
  }

  const params = new URLSearchParams();
  params.set('querytext', `'${query}'`);
  params.set('rowlimit', String(normalizePageSize(options.pageSize)));
  params.set('startrow', String(normalizeStartRow(options.startRow)));
  params.set('selectproperties', 'Title,Path,Description,FileType,ContentClass,HitHighlightedSummary,LastModifiedTime');
  params.set('refiners', 'FileType,ContentClass');

  const selectedRefiners = options.selectedRefiners || [];
  if (selectedRefiners.length > 0) {
    params.set('refinementfilters', buildRefinementFilters(selectedRefiners));
  }

  return `${siteUrl.replace(/\/+$/, '')}/_api/search/query?${params.toString()}`;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' ? value as Record<string, unknown> : null;
}

function resultArray(value: unknown): unknown[] {
  const record = asRecord(value);
  const results = record && record.results;
  return Array.isArray(results) ? results : [];
}

function stringValue(value: unknown): string {
  if (typeof value === 'string') {
    return value.trim();
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value.map(stringValue).filter(Boolean).join(', ');
  }
  return '';
}

function cellValue(cells: Record<string, string>, key: string): string {
  return cells[key] || '';
}

function safeHttpUrl(value: string): string | null {
  if (!value) {
    return null;
  }
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch (_error) {
    return null;
  }
}

function mapRow(row: unknown): ISearchResult {
  const rowRecord = asRecord(row);
  const cells = resultArray(rowRecord && rowRecord.Cells)
    .reduce<Record<string, string>>((result, cell) => {
      const cellRecord = asRecord(cell);
      const key = stringValue(cellRecord && cellRecord.Key);
      if (key) {
        result[key] = stringValue(cellRecord && cellRecord.Value);
      }
      return result;
    }, {});
  const path = safeHttpUrl(cellValue(cells, 'Path'));
  return {
    title: cellValue(cells, 'Title') || cellValue(cells, 'Path'),
    path,
    description: cellValue(cells, 'Description'),
    summary: cellValue(cells, 'HitHighlightedSummary'),
    fileType: cellValue(cells, 'FileType') || null,
    contentClass: cellValue(cells, 'ContentClass') || null,
    lastModifiedTime: cellValue(cells, 'LastModifiedTime') || null
  };
}

function mapRefiners(refinementResults: unknown): ISearchRefiner[] {
  const result = resultArray(refinementResults);
  return result.map((refiner): ISearchRefiner | null => {
    const refinerRecord = asRecord(refiner);
    const name = stringValue(refinerRecord && refinerRecord.Name);
    if (!name) {
      return null;
    }
    const entries = resultArray(refinerRecord && refinerRecord.Entries)
      .map((entry): IRefinerEntry | null => {
        const entryRecord = asRecord(entry);
        const token = stringValue(entryRecord && entryRecord.RefinementToken);
        const label = stringValue(entryRecord && (entryRecord.RefinementName || entryRecord.RefinementValue));
        if (!token || !label) {
          return null;
        }
        const countValue = Number(entryRecord && entryRecord.Count);
        return { label, token, count: Number.isFinite(countValue) && countValue >= 0 ? countValue : 0 };
      })
      .filter((entry): entry is IRefinerEntry => entry !== null);
    return entries.length > 0 ? { name, entries } : null;
  }).filter((refiner): refiner is ISearchRefiner => refiner !== null);
}

export function mapSearchResponse(payload: unknown, pageSize: unknown = DEFAULT_PAGE_SIZE): ISearchResponse {
  const root = asRecord(payload);
  const data = asRecord(root && root.d) || root;
  const query = asRecord(data && data.query);
  const primary = asRecord(query && query.PrimaryQueryResult);
  const relevant = asRecord(primary && primary.RelevantResults);
  const table = asRecord(relevant && relevant.Table);
  if (!table || !Array.isArray(table.Rows && (table.Rows as Record<string, unknown>).results)) {
    throw new SearchResponseError('SharePoint returned an unrecognised search response.');
  }

  const rows = resultArray(table.Rows);
  const totalValue = Number(relevant && relevant.TotalRows);
  const totalRows = Number.isFinite(totalValue) && totalValue >= 0 ? totalValue : rows.length;
  const refiners = mapRefiners(primary && primary.RefinementResults && (primary.RefinementResults as Record<string, unknown>).Refiners);
  return {
    results: rows.slice(0, normalizePageSize(pageSize)).map(mapRow),
    refiners,
    totalRows
  };
}

function statusFromError(error: unknown): number | null {
  const record = asRecord(error);
  const response = asRecord(record && record.response);
  const status = record && (record.status || record.statusCode);
  const responseStatus = response && (response.status || response.statusCode);
  const result = Number(status || responseStatus);
  return Number.isFinite(result) ? result : null;
}

export function classifySearchError(error: unknown): SearchErrorKind {
  const status = statusFromError(error);
  if (status === 401 || status === 403 || /\b(401|403)\b|access denied|unauthori[sz]ed|forbidden/i.test(error instanceof Error ? error.message : String(error))) {
    return 'accessDenied';
  }
  if (status === 429 || status === 503 || /\b(429|503)\b|throttl|too many requests|temporarily unavailable/i.test(error instanceof Error ? error.message : String(error))) {
    return 'throttled';
  }
  return 'generic';
}
