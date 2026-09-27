import { ALLOWED_CONTENT_FIELDS, AllowedContentField, AuditSourceType, IAuditConfig } from './AuditModels';

export const DEFAULT_AUDIT_CONFIG: IAuditConfig = {
  sourceType: 'page',
  pagePath: '/SitePages/Home.aspx',
  listTitle: 'Site Pages',
  itemLimit: 25,
  contentFields: ['Title', 'Description', 'CanvasContent1'],
  requiredFields: ['Title']
};

export const MAX_ITEMS = 50;

const asFields = (fields: string[], fallback: AllowedContentField[]): string[] => {
  const allowed = new Set<string>(ALLOWED_CONTENT_FIELDS);
  const result = Array.from(new Set(fields.map((field) => field.trim()).filter((field) => allowed.has(field))));
  return result.length ? result : fallback.slice();
};

export const normalizeAuditConfig = (input: Partial<IAuditConfig>): IAuditConfig => ({
  sourceType: input.sourceType === 'list' ? 'list' : 'page',
  pagePath: input.pagePath?.trim() || DEFAULT_AUDIT_CONFIG.pagePath,
  listTitle: input.listTitle?.trim() || DEFAULT_AUDIT_CONFIG.listTitle,
  itemLimit: Math.min(MAX_ITEMS, Math.max(1, Math.floor(Number(input.itemLimit) || DEFAULT_AUDIT_CONFIG.itemLimit))),
  contentFields: asFields(input.contentFields || [], DEFAULT_AUDIT_CONFIG.contentFields as AllowedContentField[]),
  requiredFields: asFields(input.requiredFields || [], DEFAULT_AUDIT_CONFIG.requiredFields as AllowedContentField[])
});

export const getQueryBounds = (config: IAuditConfig): { itemLimit: number; fields: string[] } => {
  const normalized = normalizeAuditConfig(config);
  return {
    itemLimit: normalized.sourceType === 'page' ? 1 : normalized.itemLimit,
    fields: Array.from(new Set(['Id', 'FileRef', 'FileLeafRef', ...normalized.contentFields]))
  };
};

export const isAuditSourceType = (value: unknown): value is AuditSourceType => value === 'page' || value === 'list';
