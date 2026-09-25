import { fieldTypes, FieldType, IFieldDefinition } from './IFieldDefinition';

export interface IFormDefinition {
  schemaVersion: 1;
  id?: number;
  title: string;
  targetListTitle: string;
  published: boolean;
  fields: IFieldDefinition[];
}

export function parseFormDefinition(value: unknown): IFormDefinition {
  if (!isRecord(value) || value.schemaVersion !== 1 ||
      !isBoundedString(value.title, 255) || !isSafeListTitle(value.targetListTitle) ||
      typeof value.published !== 'boolean' || !Array.isArray(value.fields) ||
      value.fields.length > 100 ||
      (value.id !== undefined && (typeof value.id !== 'number' || !Number.isInteger(value.id) || value.id <= 0))) {
    throw new Error('Invalid form definition.');
  }

  const fields = value.fields.map(parseFieldDefinition);
  if (new Set(fields.map(field => field.id)).size !== fields.length ||
      new Set(fields.map(field => field.internalName.toLowerCase())).size !== fields.length) {
    throw new Error('Field IDs and internal names must be unique.');
  }

  return {
    schemaVersion: 1,
    ...(value.id === undefined ? {} : { id: value.id as number }),
    title: value.title.trim(),
    targetListTitle: value.targetListTitle.trim(),
    published: value.published,
    fields
  };
}

function parseFieldDefinition(value: unknown): IFieldDefinition {
  if (!isRecord(value) || !isBoundedString(value.id, 100) ||
      !isBoundedString(value.internalName, 32) || !/^[A-Za-z_][A-Za-z0-9_]*$/.test(value.internalName) ||
      !isBoundedString(value.label, 255) || fieldTypes.indexOf(value.type as FieldType) === -1 ||
      typeof value.required !== 'boolean' ||
      (value.helpText !== undefined && (typeof value.helpText !== 'string' || value.helpText.length > 2000))) {
    throw new Error('Invalid field definition.');
  }

  const options = value.options;
  if ((options !== undefined && (!Array.isArray(options) || options.length > 100 || !options.every(option => isBoundedString(option, 255)))) ||
      (value.type === 'choice' && (!Array.isArray(options) || options.length === 0 ||
        new Set(options.map(option => String(option).trim().toLowerCase())).size !== options.length)) ||
      (value.type !== 'choice' && options !== undefined)) {
    throw new Error('Choice fields require non-empty options.');
  }

  return {
    id: value.id.trim(),
    internalName: value.internalName.trim(),
    label: value.label.trim(),
    type: value.type as FieldType,
    required: value.required,
    ...(typeof value.helpText === 'string' && value.helpText.trim() ? { helpText: value.helpText.trim() } : {}),
    ...(Array.isArray(options) ? { options: options.map(option => String(option).trim()) } : {})
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isBoundedString(value: unknown, maxLength: number): value is string {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength && isSafeText(value);
}

function isSafeListTitle(value: unknown): value is string {
  if (!isBoundedString(value, 255)) return false;
  for (let index = 0; index < value.length; index++) {
    if (value.charCodeAt(index) < 32) return false;
  }
  return true;
}

function isSafeText(value: string): boolean {
  for (const character of value) {
    const codePoint = character.codePointAt(0) as number;
    if (codePoint < 32 || codePoint === 0xfffe || codePoint === 0xffff || (codePoint >= 0xd800 && codePoint <= 0xdfff)) {
      return false;
    }
  }
  return true;
}
