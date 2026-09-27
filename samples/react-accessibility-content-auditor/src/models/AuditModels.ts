export type AuditSourceType = 'page' | 'list';
export type FindingSeverity = 'error' | 'warning' | 'info';
export type AuditErrorKind = 'accessDenied' | 'transient' | 'malformed' | 'unknown';

export const ALLOWED_CONTENT_FIELDS = [
  'Title',
  'Description',
  'CanvasContent1',
  'WikiField',
  'LinkUrl',
  'LinkDescription'
] as const;

export type AllowedContentField = typeof ALLOWED_CONTENT_FIELDS[number];

export interface IAuditConfig {
  sourceType: AuditSourceType;
  pagePath: string;
  listTitle: string;
  itemLimit: number;
  contentFields: string[];
  requiredFields: string[];
}

export interface IContentItem {
  id: string;
  title: string;
  sourceUrl: string;
  remediationUrl: string;
  fields: Record<string, unknown>;
}

export interface IAuditFinding {
  id: string;
  severity: FindingSeverity;
  rule: string;
  evidence: string;
  item: string;
  remediationUrl: string;
}

export interface IAuditResult {
  sourceLabel: string;
  itemsAudited: number;
  findings: IAuditFinding[];
  failures: string[];
}

export interface IContentReadResult {
  items: IContentItem[];
  failures: string[];
  sourceLabel: string;
}

export interface ISharePointContentService {
  read(config: IAuditConfig): Promise<IContentReadResult>;
}

export interface IClassifiedError {
  kind: AuditErrorKind;
  message: string;
}
