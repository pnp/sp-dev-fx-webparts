import { IFormDefinition } from '../../../shared/models/IFormDefinition';

export type FormValues = Record<string, unknown>;
export type ValidationErrors = Record<string, string>;

export function validateFormValues(definition: IFormDefinition, values: FormValues): ValidationErrors {
  const errors: ValidationErrors = {};

  for (const field of definition.fields) {
    const value = values[field.internalName];
    const text = typeof value === 'string' ? value.trim() : '';

    if (field.required && (value === undefined || value === null || (typeof value === 'string' && text === ''))) {
      errors[field.internalName] = `${field.label} is required.`;
      continue;
    }
    if (value === undefined || value === null || text === '') continue;

    if (field.type === 'number' && (typeof value !== 'string' || !Number.isFinite(Number(value)))) {
      errors[field.internalName] = `${field.label} must be a number.`;
    } else if (field.type === 'choice' && (typeof value !== 'string' || field.options?.indexOf(value) === -1)) {
      errors[field.internalName] = `Choose a valid ${field.label.toLowerCase()} option.`;
    } else if (field.type === 'date' && (typeof value !== 'string' || !isValidDate(value))) {
      errors[field.internalName] = `${field.label} must be a valid date.`;
    } else if (field.type === 'yesno' && typeof value !== 'boolean') {
      errors[field.internalName] = `${field.label} must be yes or no.`;
    }
  }

  return errors;
}

export function buildSubmissionPayload(definition: IFormDefinition, values: FormValues): Record<string, unknown> {
  if (Object.keys(validateFormValues(definition, values)).length > 0) throw new Error('Form values are invalid.');

  const payload: Record<string, unknown> = {};
  for (const field of definition.fields) {
    const value = values[field.internalName];
    if (value === undefined || value === null || value === '') continue;

    if (field.type === 'number') payload[field.internalName] = Number(value);
    else if (field.type === 'date') payload[field.internalName] = `${value as string}T00:00:00Z`;
    else if (field.type === 'text' || field.type === 'multiline') payload[field.internalName] = (value as string).trim();
    else payload[field.internalName] = value;
  }
  return payload;
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}
