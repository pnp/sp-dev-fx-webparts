export const categories = ['Hardware', 'Software', 'Network', 'Access', 'Other'] as const;
export const urgencies = ['Low', 'Normal', 'High'] as const;
export const impacts = ['Just me', 'My team', 'Multiple teams'] as const;
export const contactMethods = ['Email', 'Teams'] as const;

export interface SupportDraft {
  title: string;
  description: string;
  category: typeof categories[number];
  urgency: typeof urgencies[number];
  impact: typeof impacts[number];
  device: string;
  location: string;
  contactMethod: typeof contactMethods[number];
}

export const emptyDraft: SupportDraft = {
  title: '', description: '', category: 'Software', urgency: 'Normal',
  impact: 'Just me', device: '', location: '', contactMethod: 'Email'
};

export const sampleDraft: SupportDraft = {
  title: 'VPN disconnects during video calls',
  description: 'The VPN on my demo laptop disconnects every few minutes during Teams calls. ' +
    'It started this morning. Restarting the laptop did not help.',
  category: 'Network', urgency: 'High', impact: 'Just me',
  device: 'DEMO-LAPTOP-042', location: 'Remote', contactMethod: 'Teams'
};

const textLimits = { title: 120, description: 2000, device: 100, location: 100 };
const choiceFields = { category: categories, urgency: urgencies, impact: impacts, contactMethod: contactMethods };

export const draftSchema = {
  type: 'object',
  additionalProperties: false,
  minProperties: 1,
  properties: {
    title: { type: 'string', minLength: 1, maxLength: 120, description: 'Short issue summary.' },
    description: { type: 'string', minLength: 1, maxLength: 2000, description: 'Symptoms, timing, and troubleshooting already tried. Do not include passwords or secrets.' },
    category: { type: 'string', enum: categories },
    urgency: { type: 'string', enum: urgencies, description: 'Use High only if the user says work is blocked or time-critical.' },
    impact: { type: 'string', enum: impacts },
    device: { type: 'string', maxLength: 100, description: 'Optional device name. Do not invent one.' },
    location: { type: 'string', maxLength: 100, description: 'Optional office or Remote. Do not invent one.' },
    contactMethod: { type: 'string', enum: contactMethods }
  }
};

export type PatchValidation =
  | { valid: true; patch: Partial<SupportDraft> }
  | { valid: false; errors: string[] };

export function validatePatch(input: unknown): PatchValidation {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { valid: false, errors: ['Arguments must be an object containing draft fields.'] };
  }
  const errors: string[] = [];
  const values = input as Record<string, unknown>;
  const keys = Object.keys(values);
  if (!keys.length) errors.push('Provide at least one draft field.');
  for (const key of keys) {
    const value = values[key];
    if (!Object.prototype.hasOwnProperty.call(emptyDraft, key)) {
      errors.push(`Unknown field: ${key}.`);
    } else if (typeof value !== 'string') {
      errors.push(`${key} must be a string.`);
    } else if (Object.prototype.hasOwnProperty.call(textLimits, key)) {
      const limit = textLimits[key as keyof typeof textLimits];
      if (value.length > limit) errors.push(`${key} must be ${limit} characters or fewer.`);
      if ((key === 'title' || key === 'description') && !value.trim()) errors.push(`${key} must not be blank.`);
    } else {
      const choices: readonly string[] = choiceFields[key as keyof typeof choiceFields];
      if (choices.indexOf(value) === -1) errors.push(`${key} must be one of: ${choices.join(', ')}.`);
    }
  }
  if (errors.length) return { valid: false, errors };
  // Every key and value has been checked before the input becomes a typed patch.
  return { valid: true, patch: { ...input } as Partial<SupportDraft> };
}

export function missingFields(draft: SupportDraft): string[] {
  return (['title', 'description'] as const).filter(key => !draft[key].trim());
}
