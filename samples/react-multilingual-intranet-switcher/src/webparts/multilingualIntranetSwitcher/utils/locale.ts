import { ILocaleConfiguration } from '../models/NavigationModels';

export const normalizeLocale = (locale: string): string => {
  const parts: string[] = locale.trim().replace(/_/g, '-').split('-');
  if (!parts[0]) {
    return '';
  }
  return parts.map((part: string, index: number) => {
    if (index === 0) {
      return part.toLowerCase();
    }
    return part.length === 2 || /^\d{3}$/.test(part) ? part.toUpperCase() : part[0].toUpperCase() + part.slice(1).toLowerCase();
  }).join('-');
};

export const isLocaleCode = (locale: unknown): locale is string => {
  return typeof locale === 'string' && /^(?:[a-z]{2,3})(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|\d{3}))?$/.test(normalizeLocale(locale));
};

export const selectInitialLocale = (
  locales: ILocaleConfiguration[],
  defaultLocale: string,
  browserLocales: string[]
): string => {
  const supported: string[] = locales.map((locale: ILocaleConfiguration) => normalizeLocale(locale.code));
  const configuredDefault: string = normalizeLocale(defaultLocale);
  for (const candidate of browserLocales) {
    if (!isLocaleCode(candidate)) {
      continue;
    }
    const normalized: string = normalizeLocale(candidate);
    const exactIndex: number = supported.indexOf(normalized);
    if (exactIndex >= 0) {
      return supported[exactIndex];
    }
    const language: string = normalized.split('-')[0];
    for (let index: number = 0; index < supported.length; index++) {
      if (supported[index].split('-')[0] === language) {
        return supported[index];
      }
    }
  }
  return supported.indexOf(configuredDefault) >= 0 ? configuredDefault : supported[0];
};

export const getBrowserLocales = (navigatorValue?: Navigator): string[] => {
  if (!navigatorValue) {
    return [];
  }
  return (navigatorValue.languages && navigatorValue.languages.length ? navigatorValue.languages : [navigatorValue.language]).filter(Boolean);
};
