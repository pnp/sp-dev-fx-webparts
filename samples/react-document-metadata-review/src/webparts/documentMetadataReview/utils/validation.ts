import { IMetadataFieldDefinition, MetadataFieldType } from '../models/DocumentMetadataModels';

export const MAX_METADATA_FIELDS = 8;
export const MAX_ROWS = 500;

export interface IValidationResult<T> {
  valid: boolean;
  value?: T;
  message?: string;
}

const FIELD_TYPES: MetadataFieldType[] = ['text', 'url', 'date', 'number', 'choice', 'boolean'];
const INTERNAL_NAME_PATTERN = /^[A-Za-z_][A-Za-z0-9_x]*$/;

export const DEFAULT_METADATA_FIELDS: IMetadataFieldDefinition[] = [
  { internalName: 'Title', displayName: 'Title', required: true, type: 'text' },
  { internalName: 'DocumentOwner', displayName: 'Document owner', required: true, type: 'text' }
];

export function normalizeServerRelativePath(path: string): string {
  return path.trim().replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
}

export function validateServerRelativePath(path: string, label: string): IValidationResult<string> {
  const candidate = path.trim();
  if (!candidate) {
    return { valid: false, message: `${label} is required.` };
  }
  if (candidate.length > 400) {
    return { valid: false, message: `${label} must be 400 characters or fewer.` };
  }
  if (!candidate.startsWith('/') || candidate.includes('?') || candidate.includes('#')) {
    return { valid: false, message: `${label} must be a server-relative path such as /sites/finance/Shared Documents.` };
  }
  if (candidate.includes('//') || candidate.split('/').some(segment => segment === '.' || segment === '..')) {
    return { valid: false, message: `${label} contains an invalid path segment.` };
  }
  return { valid: true, value: normalizeServerRelativePath(candidate) };
}

export function validateFolderPath(path: string): IValidationResult<string | undefined> {
  if (!path.trim()) {
    return { valid: true, value: undefined };
  }
  const result = validateServerRelativePath(path, 'Folder path');
  return result.valid ? { valid: true, value: result.value } : result;
}

function isValidFieldName(value: unknown): value is string {
  return typeof value === 'string' && value.length <= 128 && INTERNAL_NAME_PATTERN.test(value);
}

export function parseMetadataFields(raw: string): IValidationResult<IMetadataFieldDefinition[]> {
  if (!raw.trim()) {
    return { valid: true, value: DEFAULT_METADATA_FIELDS };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (_error) {
    return { valid: false, message: 'Metadata fields must be valid JSON.' };
  }
  if (!Array.isArray(parsed) || parsed.length === 0) {
    return { valid: false, message: 'Metadata fields must be a non-empty JSON array.' };
  }
  if (parsed.length > MAX_METADATA_FIELDS) {
    return { valid: false, message: `Select no more than ${MAX_METADATA_FIELDS} metadata fields.` };
  }

  const fields: IMetadataFieldDefinition[] = [];
  const names = new Set<string>();
  for (const item of parsed) {
    if (!item || typeof item !== 'object') {
      return { valid: false, message: 'Each metadata field must be an object.' };
    }
    const candidate = item as Record<string, unknown>;
    if (!isValidFieldName(candidate.internalName)) {
      return { valid: false, message: 'Every field needs a safe SharePoint internalName.' };
    }
    if (names.has(candidate.internalName)) {
      return { valid: false, message: `The field ${candidate.internalName} is listed more than once.` };
    }
    if (typeof candidate.displayName !== 'string' || !candidate.displayName.trim()) {
      return { valid: false, message: `${candidate.internalName} needs a displayName.` };
    }
    if (typeof candidate.required !== 'boolean') {
      return { valid: false, message: `${candidate.internalName} needs required: true or false.` };
    }
    if (typeof candidate.type !== 'string' || FIELD_TYPES.indexOf(candidate.type as MetadataFieldType) === -1) {
      return { valid: false, message: `${candidate.internalName} has an unsupported type.` };
    }
    if (candidate.type === 'choice' && (!Array.isArray(candidate.choices) || candidate.choices.length === 0 || candidate.choices.some(choice => typeof choice !== 'string'))) {
      return { valid: false, message: `${candidate.internalName} needs a non-empty choices array.` };
    }
    names.add(candidate.internalName);
    fields.push({
      internalName: candidate.internalName,
      displayName: candidate.displayName.trim(),
      required: candidate.required,
      type: candidate.type as MetadataFieldType,
      choices: candidate.type === 'choice' ? (candidate.choices as string[]) : undefined
    });
  }
  return { valid: true, value: fields };
}

export function validateMaxRows(value: number): IValidationResult<number> {
  const rows = Number(value);
  if (!Number.isInteger(rows) || rows < 1 || rows > MAX_ROWS) {
    return { valid: false, message: `Maximum rows must be an integer from 1 to ${MAX_ROWS}.` };
  }
  return { valid: true, value: rows };
}

export function validateConfiguration(libraryPath: string, folderPath: string, fields: string, maxRows: number): IValidationResult<true> {
  const library = validateServerRelativePath(libraryPath, 'Library path');
  if (!library.valid) return library as unknown as IValidationResult<true>;
  const folder = validateFolderPath(folderPath);
  if (!folder.valid) return folder as unknown as IValidationResult<true>;
  const metadata = parseMetadataFields(fields);
  if (!metadata.valid) return metadata as unknown as IValidationResult<true>;
  const rows = validateMaxRows(maxRows);
  if (!rows.valid) return rows as unknown as IValidationResult<true>;
  return { valid: true, value: true };
}
