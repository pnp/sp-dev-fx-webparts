import { CalendarSystem, DateRangeKey, IDateRange, IEventItem } from '../models';

const DAY_MS: number = 24 * 60 * 60 * 1000;

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

/** Whole days between the start of two dates (b - a). */
export function dayDiff(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY_MS);
}

/**
 * Resolves a range key to concrete boundaries in the viewer's local time zone.
 * "Upcoming" starts now so that events already in progress are still shown.
 */
export function getDateRange(key: DateRangeKey, now: Date = new Date()): IDateRange {
  const today = startOfDay(now);
  switch (key) {
    case 'today':
      return { start: today, end: addDays(today, 1) };
    case 'week':
      return { start: now, end: addDays(today, 7) };
    case 'month':
      return { start: now, end: addDays(today, 30) };
    default:
      return { start: now, end: addDays(today, 366) };
  }
}

/** True when the event overlaps the range. */
export function overlaps(event: IEventItem, range: IDateRange): boolean {
  return event.end.getTime() > range.start.getTime() && event.start.getTime() < range.end.getTime();
}

/**
 * All-day events are stored as UTC midnight but are "floating": the 25th is the 25th
 * everywhere. Re-read the UTC date parts as a local date so they never shift a day.
 */
export function floatingDate(iso: string): Date {
  const utc = new Date(iso);
  return new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
}

/** Builds the BCP 47 tag used by every Intl formatter. */
export function buildLocale(locale: string, calendar: CalendarSystem, latinDigits: boolean): string {
  const extensions: string[] = [];
  if (calendar !== 'auto') {
    extensions.push(`ca-${calendar}`);
  }
  if (latinDigits) {
    extensions.push('nu-latn');
  }
  const tag = extensions.length ? `${locale}-u-${extensions.join('-')}` : locale;
  try {
    return Intl.DateTimeFormat.supportedLocalesOf(tag).length ? tag : 'en-US';
  } catch {
    return 'en-US';
  }
}
