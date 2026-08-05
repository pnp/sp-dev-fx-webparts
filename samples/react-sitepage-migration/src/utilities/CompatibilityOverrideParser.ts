import { CompatibilityOverride } from '../models/CompatibilityOverride';

const allowedCompatibility = new Set(['FullySupported', 'PartiallySupported', 'Unsupported']);

export const parseCompatibilityOverrides = (json: string): ReadonlyArray<CompatibilityOverride> => {
  const trimmed = json.trim();
  if (!trimmed) {
    return [];
  }

  const parsed = JSON.parse(trimmed) as unknown;
  if (!Array.isArray(parsed)) {
    throw new Error('Compatibility override configuration must be a JSON array.');
  }

  return parsed.map((entry, index) => {
    if (typeof entry !== 'object' || entry === null) {
      throw new Error(`Compatibility override at index ${index.toString()} is invalid.`);
    }

    const candidate = entry as Record<string, unknown>;
    const id = typeof candidate.id === 'string' ? candidate.id.toLowerCase() : '';
    const title = typeof candidate.title === 'string' ? candidate.title : '';
    const compatibility = typeof candidate.compatibility === 'string' ? candidate.compatibility : '';
    const notes = typeof candidate.notes === 'string' ? candidate.notes : '';

    if (!id || !title || !notes || !allowedCompatibility.has(compatibility)) {
      throw new Error(`Compatibility override at index ${index.toString()} must include id, title, compatibility, and notes.`);
    }

    return {
      id,
      title,
      compatibility,
      notes
    } as CompatibilityOverride;
  });
};
