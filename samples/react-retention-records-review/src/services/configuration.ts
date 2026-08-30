import { DashboardConfig, ReviewFieldConfig, SourceConfig } from '../models/RetentionRecordsModels';

export const CONFIG_LIMITS = { maxSources: 8, maxPages: 10, maxPageSize: 100, maxReviewFields: 12 };
const INTERNAL_NAME = /^[A-Za-z_][A-Za-z0-9_]*$/;

function asObject(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function stringValue(value: unknown, label: string, max = 512): string {
  if (typeof value !== 'string' || !value.trim() || value.length > max) throw new Error(`${label} must be a non-empty string`);
  return value.trim();
}

function integerValue(value: unknown, label: string, min: number, max: number): number {
  if (!Number.isInteger(value) || (value as number) < min || (value as number) > max) throw new Error(`${label} must be an integer from ${min} to ${max}`);
  return value as number;
}

function parseField(value: unknown, index: number): ReviewFieldConfig {
  const object = asObject(value, `reviewFields[${index}]`);
  const key = stringValue(object.key, `reviewFields[${index}].key`, 80);
  if (!INTERNAL_NAME.test(key)) throw new Error(`reviewFields[${index}].key is not a valid SharePoint internal name`);
  const kind = object.kind;
  if (kind !== 'text' && kind !== 'date' && kind !== 'status') throw new Error(`reviewFields[${index}].kind is invalid`);
  return { key, label: stringValue(object.label, `reviewFields[${index}].label`, 120), kind };
}

function parseSource(value: unknown, index: number): SourceConfig {
  const object = asObject(value, `sources[${index}]`);
  const library = stringValue(object.libraryServerRelativeUrl, `sources[${index}].libraryServerRelativeUrl`, 260);
  const folder = stringValue(object.folderServerRelativeUrl, `sources[${index}].folderServerRelativeUrl`, 400);
  for (const [label, url] of [['libraryServerRelativeUrl', library], ['folderServerRelativeUrl', folder]]) {
    if (!url.startsWith('/')) throw new Error(`sources[${index}].${label} must be server-relative`);
  }
  return {
    id: stringValue(object.id, `sources[${index}].id`, 80),
    label: stringValue(object.label, `sources[${index}].label`, 120),
    siteUrl: object.siteUrl === undefined ? undefined : stringValue(object.siteUrl, `sources[${index}].siteUrl`, 260),
    libraryServerRelativeUrl: library,
    folderServerRelativeUrl: folder,
    enabled: object.enabled === undefined ? true : object.enabled === true
  };
}

export function parseConfig(value: unknown): DashboardConfig {
  const object = asObject(value, 'configuration');
  const fields = object.reviewFields;
  const sources = object.sources;
  if (!Array.isArray(fields) || fields.length > CONFIG_LIMITS.maxReviewFields) throw new Error(`reviewFields must contain 0-${CONFIG_LIMITS.maxReviewFields} entries`);
  if (!Array.isArray(sources) || sources.length > CONFIG_LIMITS.maxSources) throw new Error(`sources must contain 1-${CONFIG_LIMITS.maxSources} entries`);
  const parsedSources = sources.map(parseSource);
  if (!parsedSources.some(source => source.enabled !== false)) throw new Error('sources must contain an enabled source');
  return {
    tenantOrigin: object.tenantOrigin === undefined ? undefined : stringValue(object.tenantOrigin, 'tenantOrigin', 260),
    pageSize: integerValue(object.pageSize, 'pageSize', 1, CONFIG_LIMITS.maxPageSize),
    maxPages: integerValue(object.maxPages, 'maxPages', 1, CONFIG_LIMITS.maxPages),
    maxSources: CONFIG_LIMITS.maxSources,
    reviewFields: fields.map(parseField),
    sources: parsedSources
  };
}

export function safeTenantUrl(candidate: string, tenantOrigin: string): URL {
  const tenant = new URL(tenantOrigin);
  if (tenant.username || tenant.password || (tenant.protocol !== 'https:' && tenant.protocol !== 'http:')) throw new Error('Invalid tenant origin');
  const url = new URL(candidate, tenant);
  if (url.username || url.password || url.origin !== tenant.origin || (url.protocol !== 'https:' && url.protocol !== 'http:')) throw new Error('URL is outside the current SharePoint tenant');
  return url;
}
