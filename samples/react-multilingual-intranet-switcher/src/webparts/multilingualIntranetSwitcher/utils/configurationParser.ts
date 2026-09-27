import { ILocaleConfiguration, INavigationItem, IParseResult } from '../models/NavigationModels';
import { isLocaleCode, normalizeLocale } from './locale';

export const CONFIG_LIMITS = {
  maxJsonCharacters: 100000,
  maxLocales: 12,
  maxItemsPerLocale: 24,
  maxLocaleCodeCharacters: 20,
  maxDisplayNameCharacters: 80,
  maxIdCharacters: 80,
  maxLabelCharacters: 160,
  maxUrlCharacters: 2048,
  maxDescriptionCharacters: 400
};

const text = (value: unknown, name: string, max: number, required: boolean = true): string | undefined => {
  if (typeof value !== 'string' || (required && !value.trim()) || value.length > max) {
    throw new Error(`${name} must be a non-empty string of at most ${max} characters.`);
  }
  return value.trim() || undefined;
};

export const parseConfiguration = (rawJson: string): IParseResult => {
  if (typeof rawJson !== 'string' || !rawJson.trim()) {
    return { error: 'Configuration JSON is empty.' };
  }
  if (rawJson.length > CONFIG_LIMITS.maxJsonCharacters) {
    return { error: `Configuration JSON exceeds ${CONFIG_LIMITS.maxJsonCharacters} characters.` };
  }
  try {
    const value: unknown = JSON.parse(rawJson);
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      throw new Error('The root value must be an object.');
    }
    const root: { defaultLocale?: unknown; locales?: unknown } = value as { defaultLocale?: unknown; locales?: unknown };
    const defaultLocale: string = text(root.defaultLocale, 'defaultLocale', CONFIG_LIMITS.maxLocaleCodeCharacters) as string;
    if (!isLocaleCode(defaultLocale)) {
      throw new Error('defaultLocale must be a valid BCP 47-style locale code.');
    }
    if (!Array.isArray(root.locales) || root.locales.length < 1 || root.locales.length > CONFIG_LIMITS.maxLocales) {
      throw new Error(`locales must contain 1 to ${CONFIG_LIMITS.maxLocales} entries.`);
    }
    const seenLocales: { [key: string]: boolean } = {};
    const locales: ILocaleConfiguration[] = root.locales.map((entry: unknown, localeIndex: number) => {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
        throw new Error(`locales[${localeIndex}] must be an object.`);
      }
      const item: { code?: unknown; displayName?: unknown; items?: unknown } = entry as { code?: unknown; displayName?: unknown; items?: unknown };
      const code: string = text(item.code, `locales[${localeIndex}].code`, CONFIG_LIMITS.maxLocaleCodeCharacters) as string;
      const normalizedCode: string = normalizeLocale(code);
      if (!isLocaleCode(code)) {
        throw new Error(`locales[${localeIndex}].code is invalid.`);
      }
      if (seenLocales[normalizedCode]) {
        throw new Error(`Duplicate locale: ${normalizedCode}.`);
      }
      seenLocales[normalizedCode] = true;
      const displayName: string = text(item.displayName, `locales[${localeIndex}].displayName`, CONFIG_LIMITS.maxDisplayNameCharacters) as string;
      if (!Array.isArray(item.items) || item.items.length > CONFIG_LIMITS.maxItemsPerLocale) {
        throw new Error(`locales[${localeIndex}].items must contain 0 to ${CONFIG_LIMITS.maxItemsPerLocale} entries.`);
      }
      const seenIds: { [key: string]: boolean } = {};
      const items: INavigationItem[] = item.items.map((rawItem: unknown, itemIndex: number) => {
        if (!rawItem || typeof rawItem !== 'object' || Array.isArray(rawItem)) {
          throw new Error(`locales[${localeIndex}].items[${itemIndex}] must be an object.`);
        }
        const navigation: { id?: unknown; label?: unknown; url?: unknown; description?: unknown } = rawItem as { id?: unknown; label?: unknown; url?: unknown; description?: unknown };
        const id: string = text(navigation.id, `items[${itemIndex}].id`, CONFIG_LIMITS.maxIdCharacters) as string;
        if (seenIds[id]) {
          throw new Error(`Duplicate item id in ${normalizedCode}: ${id}.`);
        }
        seenIds[id] = true;
        return {
          id,
          label: text(navigation.label, `items[${itemIndex}].label`, CONFIG_LIMITS.maxLabelCharacters) as string,
          url: text(navigation.url, `items[${itemIndex}].url`, CONFIG_LIMITS.maxUrlCharacters) as string,
          description: text(navigation.description, `items[${itemIndex}].description`, CONFIG_LIMITS.maxDescriptionCharacters, false)
        };
      });
      return { code: normalizedCode, displayName, items };
    });
    if (locales.every((locale: ILocaleConfiguration) => locale.code !== normalizeLocale(defaultLocale))) {
      throw new Error('defaultLocale must match one of locales[].code.');
    }
    return { configuration: { defaultLocale: normalizeLocale(defaultLocale), locales } };
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Configuration JSON is invalid.' };
  }
};
