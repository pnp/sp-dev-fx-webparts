import {
  IDocumentRecord,
  IDocumentReview,
  IMetadataFieldDefinition,
  IMetadataFieldReview,
  MetadataStatus,
  ReviewState
} from '../models/DocumentMetadataModels';

export function classifyMetadataValue(value: unknown, field: IMetadataFieldDefinition): MetadataStatus {
  if (value === undefined || value === null) return 'missing';
  const empty = typeof value === 'string' && value.trim() === '' || Array.isArray(value) && value.length === 0;
  if (empty) return field.required ? 'empty-required' : 'empty-optional';

  switch (field.type) {
    case 'text':
      return typeof value === 'string' || typeof value === 'number' ? 'valid' : 'invalid';
    case 'url':
      if (typeof value !== 'string') return 'invalid';
      try {
        const parsed = new URL(value, 'https://sharepoint.local');
        return parsed.protocol === 'http:' || parsed.protocol === 'https:' ? 'valid' : 'invalid';
      } catch (_error) {
        return 'invalid';
      }
    case 'date':
      return !Number.isNaN(new Date(String(value)).getTime()) ? 'valid' : 'invalid';
    case 'number':
      return (typeof value === 'number' && Number.isFinite(value)) || (typeof value === 'string' && value.trim() !== '' && Number.isFinite(Number(value))) ? 'valid' : 'invalid';
    case 'choice':
      return typeof value === 'string' && !!field.choices && field.choices.indexOf(value) !== -1 ? 'valid' : 'invalid';
    case 'boolean':
      return typeof value === 'boolean' || value === 'Yes' || value === 'No' ? 'valid' : 'invalid';
    default:
      return 'invalid';
  }
}

export function formatMetadataValue(value: unknown, field: IMetadataFieldDefinition, locale = 'en-GB'): string {
  if (value === undefined || value === null || value === '') return '—';
  if (field.type === 'date') {
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? String(value) : new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
  }
  if (field.type === 'number' && Number.isFinite(Number(value))) {
    return new Intl.NumberFormat(locale).format(Number(value));
  }
  if (field.type === 'boolean') return value === true || value === 'Yes' ? 'Yes' : value === false || value === 'No' ? 'No' : String(value);
  if (Array.isArray(value)) return value.map(item => formatPerson(item)).join(', ');
  return formatPerson(value);
}

function formatPerson(value: unknown): string {
  if (typeof value === 'object' && value !== null) {
    const person = value as Record<string, unknown>;
    return String(person.Title || person.title || person.DisplayName || person.displayName || person.EMail || person.email || '—');
  }
  return String(value);
}

export function classifyDocument(document: IDocumentRecord, fields: IMetadataFieldDefinition[]): IDocumentReview {
  const reviews: IMetadataFieldReview[] = fields.map(field => {
    const value = document.metadata[field.internalName];
    return { field, value, status: classifyMetadataValue(value, field), displayValue: formatMetadataValue(value, field) };
  });
  return { document, fields: reviews, needsReview: reviews.some(review => ['missing', 'empty-required', 'invalid'].indexOf(review.status) !== -1) };
}

export function filterDocuments(documents: IDocumentReview[], state: ReviewState): IDocumentReview[] {
  if (state === 'all') return documents;
  return documents.filter(document => state === 'needs-review' ? document.needsReview : !document.needsReview);
}

export function statusLabel(status: MetadataStatus): string {
  switch (status) {
    case 'missing': return 'Missing';
    case 'empty-required': return 'Required but empty';
    case 'empty-optional': return 'Empty';
    case 'invalid': return 'Invalid';
    case 'valid': return 'Valid';
  }
}
