export type MetadataFieldType = 'text' | 'url' | 'date' | 'number' | 'choice' | 'boolean';

export type MetadataStatus =
  | 'missing'
  | 'empty-required'
  | 'empty-optional'
  | 'invalid'
  | 'valid';

export type ReviewState = 'all' | 'needs-review' | 'complete';

export interface IMetadataFieldDefinition {
  internalName: string;
  displayName: string;
  required: boolean;
  type: MetadataFieldType;
  choices?: string[];
}

export interface IMetadataFieldReview {
  field: IMetadataFieldDefinition;
  status: MetadataStatus;
  value: unknown;
  displayValue: string;
}

export interface IDocumentRecord {
  id: number;
  name: string;
  url: string;
  modified: string;
  modifiedBy: string;
  metadata: Record<string, unknown>;
}

export interface IDocumentReview {
  document: IDocumentRecord;
  fields: IMetadataFieldReview[];
  needsReview: boolean;
}

export interface IDocumentQuery {
  libraryPath: string;
  folderPath?: string;
  fields: IMetadataFieldDefinition[];
  maxRows: number;
}

export interface IServiceError {
  kind: 'access-denied' | 'throttled' | 'not-found' | 'network' | 'unknown';
  title: string;
  message: string;
  retryable: boolean;
  retryAfterSeconds?: number;
}
