import type { SPFI } from '@pnp/sp';
import type { ISiteDirectoryItem } from '../models/ISiteDirectoryItem';

export const MIN_PAGE_SIZE = 1;
export const MAX_PAGE_SIZE = 50;
export const MAX_PAGE_INDEX = 100;
const MAX_SEARCH_LENGTH = 200;

export interface ISiteDirectoryConfig {
  readonly listTitle: string;
  readonly titleField: string;
  readonly categoryField?: string;
  readonly urlField: string;
  readonly descriptionField?: string;
  readonly ownerField?: string;
  readonly logoUrlField?: string;
  readonly pageSize: number;
}

export interface ISiteDirectoryQuery {
  readonly searchText: string;
  readonly category: string;
  readonly sort: 'asc' | 'desc';
  readonly pageIndex: number;
  readonly pageSize: number;
}

export interface ISiteDirectoryRequest {
  readonly fields: ReadonlyArray<string>;
  readonly filter?: string;
  readonly orderBy: { readonly field: string; readonly ascending: boolean };
  readonly top: number;
  readonly skip: number;
}

export interface ISiteDirectoryPage {
  readonly items: ReadonlyArray<ISiteDirectoryItem>;
  readonly hasNext: boolean;
  readonly pageIndex: number;
}

const fieldNamePattern = /^[A-Za-z_][A-Za-z0-9_]*$/;

export function validateConfig(config: Partial<ISiteDirectoryConfig>): ReadonlyArray<string> {
  const errors: string[] = [];
  if (!config.listTitle || !config.listTitle.trim()) {
    errors.push('Set the SharePoint list title.');
  }

  const requiredFields: ReadonlyArray<[string, string | undefined]> = [
    ['Title field', config.titleField],
    ['URL field', config.urlField]
  ];
  requiredFields.forEach(([label, value]) => {
    if (!value || !value.trim()) {
      errors.push(`Set the ${label.toLowerCase()} internal name.`);
    } else if (!fieldNamePattern.test(value.trim())) {
      errors.push(`${label} must be a SharePoint internal field name (letters, numbers, and underscores).`);
    }
  });

  const optionalFields: ReadonlyArray<[string, string | undefined]> = [
    ['Category field', config.categoryField],
    ['Description field', config.descriptionField],
    ['Owner field', config.ownerField],
    ['Logo URL field', config.logoUrlField]
  ];
  optionalFields.forEach(([label, value]) => {
    if (value && !fieldNamePattern.test(value.trim())) {
      errors.push(`${label} must be a SharePoint internal field name (letters, numbers, and underscores).`);
    }
  });

  const pageSize = config.pageSize;
  if (typeof pageSize !== 'number' || !Number.isFinite(pageSize) || pageSize < MIN_PAGE_SIZE || pageSize > MAX_PAGE_SIZE) {
    errors.push(`Page size must be between ${MIN_PAGE_SIZE} and ${MAX_PAGE_SIZE}.`);
  }

  return errors;
}

function escapedODataText(value: string): string {
  return value.replace(/'/g, "''");
}

function trimmedField(value: string | undefined): string | undefined {
  return value && value.trim() ? value.trim() : undefined;
}

function boundedPageSize(value: number): number {
  return Number.isFinite(value)
    ? Math.min(MAX_PAGE_SIZE, Math.max(MIN_PAGE_SIZE, Math.floor(value)))
    : MIN_PAGE_SIZE;
}

function boundedPageIndex(value: number): number {
  return Math.min(MAX_PAGE_INDEX, Math.max(0, Math.floor(value)));
}

export function buildSelectFields(config: ISiteDirectoryConfig): ReadonlyArray<string> {
  const fields = [
    'Id',
    config.titleField,
    config.categoryField,
    config.urlField,
    config.descriptionField,
    config.ownerField,
    config.logoUrlField
  ].filter((field): field is string => !!field && !!field.trim()).map((field) => field.trim());

  return Array.from(new Set(fields));
}

export function buildFilter(config: ISiteDirectoryConfig, query: ISiteDirectoryQuery): string | undefined {
  const clauses: string[] = [];
  const search = query.searchText.trim().slice(0, MAX_SEARCH_LENGTH);
  const titleField = config.titleField.trim();
  const descriptionField = trimmedField(config.descriptionField);

  if (search) {
    const phrase = escapedODataText(search);
    const searchClauses = [`substringof('${phrase}',${titleField})`];
    if (descriptionField) {
      searchClauses.push(`substringof('${phrase}',${descriptionField})`);
    }
    clauses.push(`(${searchClauses.join(' or ')})`);
  }

  const categoryField = trimmedField(config.categoryField);
  const category = query.category.trim().slice(0, MAX_SEARCH_LENGTH);
  if (categoryField && category) {
    clauses.push(`${categoryField} eq '${escapedODataText(category)}'`);
  }

  return clauses.length ? clauses.join(' and ') : undefined;
}

export function buildListQuery(config: ISiteDirectoryConfig, query: ISiteDirectoryQuery): ISiteDirectoryRequest {
  const errors = validateConfig(config);
  if (errors.length) {
    throw new Error(errors.join(' '));
  }

  const pageSize = boundedPageSize(query.pageSize);
  const pageIndex = boundedPageIndex(query.pageIndex);
  return {
    fields: buildSelectFields(config),
    filter: buildFilter(config, query),
    orderBy: { field: config.titleField.trim(), ascending: query.sort !== 'desc' },
    top: pageSize + 1,
    skip: pageIndex * pageSize
  };
}

function valueAsText(value: unknown): string {
  if (value === undefined || value === null) {
    return '';
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return String(value).trim();
  }
  if (Array.isArray(value)) {
    return value.map(valueAsText).filter(Boolean).join(', ');
  }
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return valueAsText(record.Description ?? record.Title ?? record.LookupValue ?? record.Url ?? record.Email);
  }
  return '';
}

function fieldValue(item: Record<string, unknown>, field: string | undefined): unknown {
  return field ? item[field] : undefined;
}

function valueAsUrl(value: unknown): string {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    return valueAsText(record.Url ?? record.Description);
  }
  return valueAsText(value);
}

function itemId(value: unknown): number | undefined {
  const id = typeof value === 'number' ? value : Number(value);
  return Number.isInteger(id) && id > 0 ? id : undefined;
}

export function mapSiteDirectoryItem(
  rawItem: Record<string, unknown>,
  config: ISiteDirectoryConfig
): ISiteDirectoryItem | undefined {
  const id = itemId(rawItem.Id);
  if (!id) {
    return undefined;
  }

  return {
    key: `site-directory-${id}`,
    id,
    title: valueAsText(fieldValue(rawItem, trimmedField(config.titleField))) || 'Untitled site',
    category: valueAsText(fieldValue(rawItem, trimmedField(config.categoryField))),
    url: valueAsUrl(fieldValue(rawItem, trimmedField(config.urlField))),
    description: valueAsText(fieldValue(rawItem, trimmedField(config.descriptionField))),
    owner: valueAsText(fieldValue(rawItem, trimmedField(config.ownerField))),
    logoUrl: valueAsUrl(fieldValue(rawItem, trimmedField(config.logoUrlField)))
  };
}

export function paginateItems(
  items: ReadonlyArray<ISiteDirectoryItem>,
  pageIndex: number,
  pageSize: number
): ISiteDirectoryPage {
  const safePageSize = boundedPageSize(pageSize);
  const safePageIndex = boundedPageIndex(pageIndex);
  const start = safePageIndex * safePageSize;
  const page = items.slice(start, start + safePageSize + 1);
  return {
    items: page.slice(0, safePageSize),
    hasNext: page.length > safePageSize,
    pageIndex: safePageIndex
  };
}

export function isSafeSiteUrl(value: string, currentOrigin: string): boolean {
  const candidate = value.trim();
  if (!candidate || !currentOrigin) {
    return false;
  }

  if (/^https:\/\//i.test(candidate)) {
    try {
      return new URL(candidate).protocol === 'https:';
    } catch {
      return false;
    }
  }

  if (/^[A-Za-z][A-Za-z0-9+.-]*:/.test(candidate) || candidate.startsWith('//')) {
    return false;
  }

  try {
    const parsed = new URL(candidate, currentOrigin);
    return parsed.origin === currentOrigin && (parsed.protocol === 'http:' || parsed.protocol === 'https:');
  } catch {
    return false;
  }
}

export class SiteDirectoryService {
  public constructor(private readonly _sp: SPFI, private readonly _config: ISiteDirectoryConfig) {}

  public async getPage(query: ISiteDirectoryQuery): Promise<ISiteDirectoryPage> {
    const request = buildListQuery(this._config, query);
    const pageSize = request.top - 1;
    let items = this._sp.web.lists.getByTitle(this._config.listTitle.trim()).items.select(...request.fields);
    if (request.filter) {
      items = items.filter(request.filter);
    }

    const rawItems = await items
      .orderBy(request.orderBy.field, request.orderBy.ascending)
      .top(request.top)
      .skip(request.skip)();
    const mapped = (rawItems as Array<Record<string, unknown>>)
      .map((item) => mapSiteDirectoryItem(item, this._config))
      .filter((item): item is ISiteDirectoryItem => !!item);

    return {
      items: mapped.slice(0, pageSize),
      hasNext: mapped.length > pageSize,
      pageIndex: Math.floor(request.skip / pageSize)
    };
  }
}
