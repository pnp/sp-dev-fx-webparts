import { FieldKind, IListField, IListRecord } from './ListModels';

export const EMPTY_VALUE = '—';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function textValue(value: unknown): string {
  if (typeof value === 'string') {
    return stripHtml(value).trim();
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  return '';
}

function personValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map(personValue).filter(Boolean).join(', ');
  }
  if (isObject(value)) {
    return textValue(value.Title || value.DisplayName || value.Name);
  }
  return textValue(value);
}

export function stripHtml(value: string): string {
  return value
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/[\t\r\n ]+/g, ' ')
    .trim();
}

function numberValue(value: unknown): string {
  if (typeof value !== 'number' && typeof value !== 'string') {
    return '';
  }
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? String(number) : '';
}

export function getRawFieldValue(record: IListRecord, field: IListField): unknown {
  return record.values[field.internalName];
}

export function formatFieldValue(value: unknown, kind: FieldKind): string {
  if (value === null || value === undefined || value === '') {
    return EMPTY_VALUE;
  }

  let result = '';
  switch (kind) {
    case 'number':
    case 'currency':
      result = numberValue(value);
      break;
    case 'date': {
      const date = value instanceof Date ? value : new Date(String(value));
      result = Number.isNaN(date.getTime()) ? '' : date.toLocaleDateString();
      break;
    }
    case 'boolean':
      result = value === true ? 'Yes' : value === false ? 'No' : '';
      break;
    case 'person':
      result = personValue(value);
      break;
    case 'hyperlink':
      result = isObject(value) ? textValue(value.Description || value.Url) : textValue(value);
      break;
    case 'text':
    case 'choice':
      result = Array.isArray(value) ? value.map(textValue).filter(Boolean).join(', ') : textValue(value);
      break;
  }

  return result || EMPTY_VALUE;
}

export function getHyperlinkUrl(value: unknown, baseUrl?: string): string | undefined {
  const candidate = isObject(value) ? value.Url : value;
  if (typeof candidate !== 'string') {
    return undefined;
  }
  try {
    const url = new URL(candidate, baseUrl);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.href : undefined;
  } catch {
    return undefined;
  }
}

export function searchText(record: IListRecord, fields: IListField[]): string {
  return fields.map((field) => formatFieldValue(getRawFieldValue(record, field), field.kind)).join(' ').toLowerCase();
}

export function compareRecords(left: IListRecord, right: IListRecord, field: IListField, ascending: boolean): number {
  const leftValue = formatFieldValue(getRawFieldValue(left, field), field.kind);
  const rightValue = formatFieldValue(getRawFieldValue(right, field), field.kind);
  const comparison = leftValue.localeCompare(rightValue, undefined, { numeric: true, sensitivity: 'base' });
  return ascending ? comparison : -comparison;
}
