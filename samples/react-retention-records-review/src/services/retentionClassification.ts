import { RetentionClassification, ReviewDateClassification } from '../models/RetentionRecordsModels';

export function classifyRetention(isRecord: boolean | null, retentionLabel: string | null, missingReviewMetadata: string[]): RetentionClassification {
  if (isRecord === true) return 'record';
  if (retentionLabel) return 'retained';
  if (missingReviewMetadata.length > 0) return 'needs-review';
  return 'unclassified';
}

export function missingFields(values: Record<string, unknown>, fields: { key: string; label: string }[]): string[] {
  return fields.filter(field => values[field.key] === undefined || values[field.key] === null || values[field.key] === '').map(field => field.label);
}

export function classifyReviewDate(value: string | null, now: Date): ReviewDateClassification {
  if (!value) return 'missing';
  const date = new Date(value);
  if (Number.isNaN(date.valueOf())) return 'invalid';
  if (date.valueOf() < now.valueOf()) return 'overdue';
  if (date.valueOf() <= now.valueOf() + 30 * 24 * 60 * 60 * 1000) return 'due-soon';
  return 'scheduled';
}
