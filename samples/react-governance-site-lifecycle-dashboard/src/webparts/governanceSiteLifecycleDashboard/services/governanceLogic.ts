export const MAX_SOURCES = 4;
export const MAX_PAGE_SIZE = 50;
export const MAX_PAGES = 5;
export const MAX_ITEMS = 200;
export const MIN_REVIEW_HORIZON_DAYS = 7;
export const MAX_REVIEW_HORIZON_DAYS = 365;
export const DEFAULT_INACTIVE_AFTER_DAYS = 180;
export const MAX_INACTIVE_AFTER_DAYS = 730;

export type GovernanceState = 'success' | 'empty' | 'partial' | 'permission' | 'throttled' | 'retry' | 'error';
export type ErrorKind = 'permission' | 'throttled' | 'retry' | 'error';

export interface ISourceConfig {
  id: string;
  label: string;
  url: string;
  pageSize: number;
  maxPages: number;
  maxItems: number;
  inactiveAfterDays: number;
}

export interface IConfigResult {
  sources: ISourceConfig[];
  errors: string[];
  reviewHorizonDays: number;
}

export interface IGovernanceSite {
  id: string;
  sourceId: string;
  sourceLabel: string;
  title: string;
  url: string;
  template: string;
  owners: string;
  hub: string;
  sharing: string;
  storage: string;
  lastActivity: string;
  expirationDate: string;
  reviewDate: string;
  inactive: boolean;
  needsReview: boolean;
  classification: 'inactive' | 'needs-review' | 'healthy' | 'unknown';
  sourceState: GovernanceState;
  sourceError?: string;
}

export interface ISourceResult {
  source: ISourceConfig;
  state: GovernanceState;
  items: IGovernanceSite[];
  pages: number;
  malformedRows: number;
  error?: string;
  errorKind?: ErrorKind;
}

export interface IResponseLike {
  ok: boolean;
  status: number;
  statusText?: string;
  json(): Promise<unknown>;
}

export interface IGetOnlyClient {
  get(url: string, configuration: unknown): Promise<IResponseLike>;
}

export interface IRawRow {
  [key: string]: unknown;
}

const asObject = (value: unknown): IRawRow | undefined => {
  return typeof value === 'object' && value !== null && !Array.isArray(value) ? value as IRawRow : undefined;
};

const asString = (value: unknown): string => {
  if (typeof value === 'string') { return value.trim(); }
  if (typeof value === 'number' || typeof value === 'boolean') { return String(value); }
  return '';
};

const firstString = (row: IRawRow, keys: string[]): string => {
  for (const key of keys) {
    const value = row[key];
    const direct = asString(value);
    if (direct) { return direct; }
    const nested = asObject(value);
    if (nested) {
      const nestedValue = firstString(nested, ['Title', 'Name', 'Email', 'Url', 'url']);
      if (nestedValue) { return nestedValue; }
    }
  }
  return '';
};

const listStrings = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((item: unknown) => {
      const object = asObject(item);
      return object ? firstString(object, ['Title', 'Name', 'Email', 'Value']) : asString(item);
    }).filter(Boolean);
  }
  return asString(value).split(/[;,]/).map((item: string) => item.trim()).filter(Boolean);
};

const dateValue = (value: string): number | undefined => {
  if (!value) { return undefined; }
  const time = Date.parse(value);
  return isFinite(time) ? time : undefined;
};

export const parseReferenceDate = (value: string, fallback: Date = new Date()): Date => {
  const parsed = /^\d{4}-\d{2}-\d{2}$/.test(value) ? Date.parse(`${value}T00:00:00Z`) : NaN;
  return isFinite(parsed) ? new Date(parsed) : new Date(fallback.getTime());
};

export const clampInteger = (value: unknown, minimum: number, maximum: number, fallback: number): number => {
  const number = typeof value === 'number' ? value : Number(value);
  if (!isFinite(number)) { return fallback; }
  return Math.min(maximum, Math.max(minimum, Math.floor(number)));
};

export const parseConfig = (sourcesJson: string, reviewHorizonValue: unknown): IConfigResult => {
  const errors: string[] = [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(sourcesJson || '[]');
  } catch (_) {
    return { sources: [], errors: ['Configuration is not valid JSON.'], reviewHorizonDays: clampInteger(reviewHorizonValue, MIN_REVIEW_HORIZON_DAYS, MAX_REVIEW_HORIZON_DAYS, 60) };
  }

  const array = Array.isArray(parsed) ? parsed : [];
  if (!Array.isArray(parsed)) { errors.push('Configuration must be a JSON array of sources.'); }
  if (array.length > MAX_SOURCES) { errors.push(`Only the first ${MAX_SOURCES} sources are allowed.`); }

  const sources = array.slice(0, MAX_SOURCES).map((candidate: unknown, index: number): ISourceConfig | undefined => {
    const row = asObject(candidate);
    const url = row ? firstString(row, ['url', 'endpoint', 'siteUrl']) : '';
    const id = row ? firstString(row, ['id', 'key']) : '';
    const label = row ? firstString(row, ['label', 'title', 'name']) : '';
    if (!row || !url) {
      errors.push(`Source ${index + 1} is missing a URL.`);
      return undefined;
    }
    return {
      id: id || `source-${index + 1}`,
      label: label || `Source ${index + 1}`,
      url,
      pageSize: clampInteger(row.pageSize, 1, MAX_PAGE_SIZE, 25),
      maxPages: clampInteger(row.maxPages, 1, MAX_PAGES, MAX_PAGES),
      maxItems: clampInteger(row.maxItems, 1, MAX_ITEMS, MAX_ITEMS),
      inactiveAfterDays: clampInteger(row.inactiveAfterDays, 30, MAX_INACTIVE_AFTER_DAYS, DEFAULT_INACTIVE_AFTER_DAYS)
    };
  }).filter((source: ISourceConfig | undefined): source is ISourceConfig => !!source);

  return {
    sources,
    errors,
    reviewHorizonDays: clampInteger(reviewHorizonValue, MIN_REVIEW_HORIZON_DAYS, MAX_REVIEW_HORIZON_DAYS, 60)
  };
};

export const validateUrlShape = (value: string): { valid: boolean; reason?: string } => {
  const input = value.trim();
  if (!input || input.indexOf('\\') !== -1 || /(^|\/)\.\.?(\/|$)/.test(input)) {
    return { valid: false, reason: 'URL path is empty or contains unsafe path segments.' };
  }
  if (input.indexOf('//') === 0) { return { valid: false, reason: 'Protocol-relative URLs are not allowed.' }; }
  if (/^https?:\/\//i.test(input) && !/^https:\/\//i.test(input)) {
    return { valid: false, reason: 'Only HTTPS absolute URLs are allowed.' };
  }
  if (input.indexOf('/') !== 0 && !/^https:\/\//i.test(input)) {
    return { valid: false, reason: 'Use a root-relative or same-tenant HTTPS URL.' };
  }
  if (!/(^|\/)\/_api\//i.test(input) && input.toLowerCase().indexOf('/_api/') === -1) {
    return { valid: false, reason: 'The endpoint must be a SharePoint REST URL containing /_api/.' };
  }
  return { valid: true };
};

export const safeSharePointUrl = (value: string, tenantOrigin: string): URL => {
  const shape = validateUrlShape(value);
  if (!shape.valid) { throw new Error(shape.reason); }
  const input = value.trim();
  const tenant = new URL(tenantOrigin);
  const result = new URL(input, tenant.origin);
  if (result.protocol !== 'https:' || result.origin !== tenant.origin) {
    throw new Error('URL must remain on the current SharePoint HTTPS tenant.');
  }
  return result;
};

export const pagedRequestUrl = (value: string, tenantOrigin: string, pageSize: number): string => {
  const url = safeSharePointUrl(value, tenantOrigin);
  url.searchParams.set('$top', String(clampInteger(pageSize, 1, MAX_PAGE_SIZE, 25)));
  return url.toString();
};

export const mapHttpError = (status: number): { kind: ErrorKind; message: string } => {
  if (status === 401 || status === 403) { return { kind: 'permission', message: 'SharePoint denied access to this source.' }; }
  if (status === 429) { return { kind: 'throttled', message: 'SharePoint throttled this source. Try again later.' }; }
  if (status === 408 || status >= 500) { return { kind: 'retry', message: `SharePoint returned ${status}; retry may succeed.` }; }
  return { kind: 'error', message: `SharePoint returned HTTP ${status}.` };
};

export const extractRows = (payload: unknown): { rows: IRawRow[]; malformedRows: number; nextLink?: string } => {
  const root = asObject(payload);
  const d = root ? asObject(root.d) : undefined;
  const value = root && Array.isArray(root.value) ? root.value : d && Array.isArray(d.results) ? d.results : Array.isArray(payload) ? payload : [];
  const rows: IRawRow[] = [];
  let malformedRows = Array.isArray(value) ? 0 : 1;
  (Array.isArray(value) ? value : []).forEach((candidate: unknown) => {
    const row = asObject(candidate);
    if (row) { rows.push(row); } else { malformedRows += 1; }
  });
  const nextLink = root ? firstString(root, ['@odata.nextLink', 'odata.nextLink', '__next']) || (d ? firstString(d, ['__next']) : '') : '';
  return { rows, malformedRows, nextLink: nextLink || undefined };
};

export const classifyLifecycle = (row: IRawRow, referenceDate: Date, reviewHorizonDays: number, inactiveAfterDays: number): Pick<IGovernanceSite, 'inactive' | 'needsReview' | 'classification'> => {
  const activity = firstString(row, ['LastItemUserModifiedDate', 'LastActivityDate', 'LastModified', 'Modified']);
  const expiration = firstString(row, ['ExpirationDate', 'SiteExpirationDate', 'ReviewDate', 'NextReviewDate']);
  const activityTime = dateValue(activity);
  const expirationTime = dateValue(expiration);
  const referenceTime = referenceDate.getTime();
  const inactive = activityTime !== undefined && activityTime < referenceTime - inactiveAfterDays * 86400000;
  const needsReview = expirationTime !== undefined && expirationTime <= referenceTime + reviewHorizonDays * 86400000;
  return {
    inactive,
    needsReview,
    classification: inactive ? 'inactive' : needsReview ? 'needs-review' : activityTime !== undefined || expirationTime !== undefined ? 'healthy' : 'unknown'
  };
};

export const normalizeRow = (row: IRawRow, source: ISourceConfig, tenantOrigin: string, referenceDate: Date, reviewHorizonDays: number): IGovernanceSite | undefined => {
  const title = firstString(row, ['Title', 'SiteTitle', 'Name', 'WebTitle']);
  const url = firstString(row, ['Url', 'url', 'SiteUrl', 'WebUrl', 'AbsoluteUrl']);
  if (!title && !url) { return undefined; }
  let safeUrl = url;
  if (url) {
    try { safeUrl = safeSharePointUrl(url, tenantOrigin).toString(); } catch (_) { safeUrl = ''; }
  }
  const owners = listStrings(row.Owners).concat(listStrings(row.Owner)).concat(listStrings(row.OwnerEmail)).filter((item: string, index: number, all: string[]) => all.indexOf(item) === index).join(', ');
  const lifecycle = classifyLifecycle(row, referenceDate, reviewHorizonDays, source.inactiveAfterDays);
  const id = firstString(row, ['Id', 'ID', 'SiteId', 'UniqueId']) || `${source.id}-${title || url}`;
  return {
    id,
    sourceId: source.id,
    sourceLabel: source.label,
    title: title || '(Untitled site)',
    url: safeUrl,
    template: firstString(row, ['WebTemplate', 'Template', 'TemplateName', 'WebTemplateConfiguration']) || 'Not supplied',
    owners: owners || 'Not supplied',
    hub: firstString(row, ['HubSiteUrl', 'HubSiteTitle', 'HubSiteId', 'HubAssociation']) || 'Not supplied',
    sharing: firstString(row, ['SharingCapability', 'SharingMode', 'SharingStatus']) || 'Not supplied',
    storage: firstString(row, ['StorageUsageCurrent', 'StorageUsage', 'StorageMetrics', 'StorageQuota']) || 'Not supplied',
    lastActivity: firstString(row, ['LastItemUserModifiedDate', 'LastActivityDate', 'LastModified', 'Modified']) || 'Not supplied',
    expirationDate: firstString(row, ['ExpirationDate', 'SiteExpirationDate']) || 'Not supplied',
    reviewDate: firstString(row, ['ReviewDate', 'NextReviewDate']) || 'Not supplied',
    ...lifecycle,
    sourceState: 'success'
  };
};

export const summarizeState = (items: IGovernanceSite[], malformedRows: number, hasMorePages: boolean): GovernanceState => {
  if (!items.length && !malformedRows && !hasMorePages) { return 'empty'; }
  if (malformedRows || hasMorePages) { return 'partial'; }
  return 'success';
};
