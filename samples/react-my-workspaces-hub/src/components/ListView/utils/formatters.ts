import type { IColumnFormat, IListViewColumn, IListViewUser, TColumnDataType } from '../interfaces/IListView';
import { EMPTY_VALUE_LABEL } from '../constants';

/** Coerces unknown into a Date or returns undefined. */
export const toDate = (value: unknown): Date | undefined => {
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? undefined : value;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? undefined : parsed;
  }
  return undefined;
};

/** Coerces unknown into a finite number or undefined. */
export const toNumber = (value: unknown): number | undefined => {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }
  if (typeof value === 'string' && value.trim() !== '') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
};

/** Returns true when the value should be rendered as the empty placeholder. */
export const isEmptyValue = (value: unknown): boolean => {
  return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
};

/** Formats a date according to the supplied per-column date format. */
export const formatDate = (date: Date, fmt?: IColumnFormat<unknown>['date']): string => {
  if (fmt?.formatter) {
    return fmt.formatter(date);
  }

  const preset = fmt?.format ?? 'short';
  const locale = fmt?.locale;

  if (preset === 'iso') {
    return date.toISOString().substring(0, 10);
  }

  if (preset === 'relative') {
    const diffMs = date.getTime() - Date.now();
    const diffSec = Math.round(diffMs / 1000);
    const abs = Math.abs(diffSec);
    const rtf = typeof Intl !== 'undefined' && Intl.RelativeTimeFormat
      ? new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
      : undefined;
    const fallback = (n: number, unit: string): string => `${n > 0 ? 'in ' : ''}${Math.abs(n)} ${unit}${Math.abs(n) === 1 ? '' : 's'}${n < 0 ? ' ago' : ''}`;
    if (abs < 60) return rtf ? rtf.format(diffSec, 'second') : fallback(diffSec, 'second');
    if (abs < 3600) return rtf ? rtf.format(Math.round(diffSec / 60), 'minute') : fallback(Math.round(diffSec / 60), 'minute');
    if (abs < 86400) return rtf ? rtf.format(Math.round(diffSec / 3600), 'hour') : fallback(Math.round(diffSec / 3600), 'hour');
    if (abs < 86400 * 30) return rtf ? rtf.format(Math.round(diffSec / 86400), 'day') : fallback(Math.round(diffSec / 86400), 'day');
    if (abs < 86400 * 365) return rtf ? rtf.format(Math.round(diffSec / (86400 * 30)), 'month') : fallback(Math.round(diffSec / (86400 * 30)), 'month');
    return rtf ? rtf.format(Math.round(diffSec / (86400 * 365)), 'year') : fallback(Math.round(diffSec / (86400 * 365)), 'year');
  }

  const optionMap: Record<'short' | 'medium' | 'long', Intl.DateTimeFormatOptions> = {
    short: { year: 'numeric', month: '2-digit', day: '2-digit' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
  };
  return new Intl.DateTimeFormat(locale, optionMap[preset]).format(date);
};

/** Formats a number using `Intl.NumberFormat`. */
export const formatNumber = (value: number, fmt?: IColumnFormat<unknown>['number']): string => {
  return new Intl.NumberFormat(fmt?.locale, {
    minimumFractionDigits: fmt?.decimals,
    maximumFractionDigits: fmt?.decimals,
    notation: fmt?.notation
  }).format(value);
};

const getBrowserLocale = (): string | undefined => {
  if (typeof navigator === 'undefined') {
    return undefined;
  }

  const preferredLocale = navigator.languages?.find((locale) => typeof locale === 'string' && locale.trim() !== '');
  return preferredLocale ?? navigator.language;
};

/** Formats a number as currency using `Intl.NumberFormat`. */
export const formatCurrency = (value: number, fmt?: IColumnFormat<unknown>['currency']): string => {
  const locale = fmt?.useBrowserLocale ? (getBrowserLocale() ?? fmt?.locale) : fmt?.locale;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: fmt?.currency ?? 'USD',
    minimumFractionDigits: fmt?.decimals,
    maximumFractionDigits: fmt?.decimals
  }).format(value);
};

/** Type guard for a single user value. */
export const isUserValue = (value: unknown): value is IListViewUser => {
  return Boolean(value && typeof value === 'object' && 'displayName' in (value as Record<string, unknown>));
};

/** Returns an array of user values from a column getter. Accepts single user, array, or empty. */
export const toUserArray = (value: unknown): IListViewUser[] => {
  if (Array.isArray(value)) {
    return value.filter(isUserValue);
  }
  if (isUserValue(value)) {
    return [value];
  }
  return [];
};

/** Optional locale-aware overrides for default placeholder strings. */
export interface IFormatValueByTypeOptions {
  /** String returned when the underlying value is empty. */
  emptyLabel?: string;
  /** String returned for boolean `true` when no column-level override is set. */
  booleanTrueLabel?: string;
  /** String returned for boolean `false` when no column-level override is set. */
  booleanFalseLabel?: string;
}

/**
 * Produces the display string for a value based on its column's `dataType`.
 * Always returns a string suitable for sorting, filtering, and global search.
 */
export const formatValueByType = <TItem,>(
  raw: unknown,
  column: IListViewColumn<TItem>,
  fallbackDateFormatter?: (date?: Date) => string,
  options?: IFormatValueByTypeOptions
): string => {
  const dataType: TColumnDataType = column.dataType ?? 'text';
  const fmt = column.format;
  const emptyLabel = options?.emptyLabel ?? EMPTY_VALUE_LABEL;
  const trueLabel = options?.booleanTrueLabel ?? 'Yes';
  const falseLabel = options?.booleanFalseLabel ?? 'No';

  if (isEmptyValue(raw) && dataType !== 'boolean') {
    return emptyLabel;
  }

  switch (dataType) {
    case 'number': {
      const num = toNumber(raw);
      return num === undefined ? emptyLabel : formatNumber(num, fmt?.number);
    }
    case 'currency': {
      const num = toNumber(raw);
      return num === undefined ? emptyLabel : formatCurrency(num, fmt?.currency);
    }
    case 'date': {
      const date = toDate(raw);
      if (!date) return emptyLabel;
      if (fmt?.date) return formatDate(date, fmt.date);
      if (fallbackDateFormatter) return fallbackDateFormatter(date);
      return formatDate(date);
    }
    case 'boolean': {
      const truthy = Boolean(raw);
      return truthy ? (fmt?.boolean?.trueLabel ?? trueLabel) : (fmt?.boolean?.falseLabel ?? falseLabel);
    }
    case 'user': {
      const users = toUserArray(raw);
      return users.map((user) => user.displayName).join(', ');
    }
    case 'text':
    default: {
      let text = typeof raw === 'string' ? raw : String(raw ?? '');
      if (fmt?.text?.transform) {
        // The cast is safe because the formatter is column-typed.
        text = (fmt.text.transform as (v: string, item: unknown) => string)(text, undefined);
      }
      if (fmt?.text?.truncateAt && text.length > fmt.text.truncateAt) {
        text = `${text.substring(0, fmt.text.truncateAt)}…`;
      }
      return text;
    }
  }
};

/** Returns a comparable value for sorting. Numbers/dates compared numerically. */
export const getSortableValue = <TItem,>(raw: unknown, column: IListViewColumn<TItem>): number | string => {
  const dataType = column.dataType ?? 'text';
  if (dataType === 'number' || dataType === 'currency') {
    return toNumber(raw) ?? Number.NEGATIVE_INFINITY;
  }
  if (dataType === 'date') {
    const date = toDate(raw);
    return date ? date.getTime() : Number.NEGATIVE_INFINITY;
  }
  if (dataType === 'boolean') {
    return Boolean(raw) ? 1 : 0;
  }
  if (dataType === 'user') {
    return toUserArray(raw).map((u) => u.displayName).join(', ');
  }
  return typeof raw === 'string' ? raw : String(raw ?? '');
};
