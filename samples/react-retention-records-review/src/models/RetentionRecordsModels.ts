export type ReviewFieldKind = 'text' | 'date' | 'status';
export type RetentionClassification = 'record' | 'retained' | 'needs-review' | 'unclassified';
export type ReviewDateClassification = 'missing' | 'invalid' | 'overdue' | 'due-soon' | 'scheduled';

export interface ReviewFieldConfig {
  key: string;
  label: string;
  kind: ReviewFieldKind;
}

export interface SourceConfig {
  id: string;
  label: string;
  siteUrl?: string;
  libraryServerRelativeUrl: string;
  folderServerRelativeUrl: string;
  enabled?: boolean;
}

export interface DashboardConfig {
  tenantOrigin?: string;
  pageSize: number;
  maxPages: number;
  maxSources: number;
  reviewFields: ReviewFieldConfig[];
  sources: SourceConfig[];
}

export interface InventoryItem {
  id: number;
  title: string;
  path: string;
  modified: string | null;
  contentType: string | null;
  isRecord: boolean | null;
  retentionLabel: string | null;
  retentionLabelAppliedDate: string | null;
  reviewValues: Record<string, unknown>;
  missingReviewMetadata: string[];
  classification: RetentionClassification;
  sourceLabel: string;
}

export interface SourceFailure {
  sourceLabel: string;
  kind: ErrorKind;
  message: string;
}

export interface InventoryResult {
  items: InventoryItem[];
  failures: SourceFailure[];
  truncatedSources: string[];
}

export type ErrorKind = 'permission-denied' | 'throttled' | 'network' | 'config' | 'unknown';
