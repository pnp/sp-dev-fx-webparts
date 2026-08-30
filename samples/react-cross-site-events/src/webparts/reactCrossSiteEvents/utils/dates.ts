import { Temporal } from '@js-temporal/polyfill';
import { ICalendarDateRange } from '../models/Configuration';

const WINDOWS_ZONES: { [name: string]: string } = {
  'UTC': 'UTC',
  'GMT Standard Time': 'Europe/London',
  'W. Europe Standard Time': 'Europe/Berlin',
  'Romance Standard Time': 'Europe/Paris',
  'Eastern Standard Time': 'America/New_York',
  'Central Standard Time': 'America/Chicago',
  'Mountain Standard Time': 'America/Denver',
  'Pacific Standard Time': 'America/Los_Angeles',
  'Tokyo Standard Time': 'Asia/Tokyo',
  'China Standard Time': 'Asia/Shanghai',
  'India Standard Time': 'Asia/Calcutta',
  'AUS Eastern Standard Time': 'Australia/Sydney'
};

function parsePlainDateTime(value: string): Temporal.PlainDateTime {
  const trimmed = value.trim().replace(' ', 'T');
  return Temporal.PlainDateTime.from(trimmed.length === 16 ? `${trimmed}:00` : trimmed);
}

export function parseGraphDateTime(value: string, timeZone: string = 'UTC'): Date {
  if (/([zZ]|[+-]\d{2}:?\d{2})$/.test(value.trim())) {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) {
      return date;
    }
  }
  const zone = WINDOWS_ZONES[timeZone] || timeZone || 'UTC';
  const plain = parsePlainDateTime(value);
  const zoned = Temporal.ZonedDateTime.from({
    timeZone: zone,
    year: plain.year,
    month: plain.month,
    day: plain.day,
    hour: plain.hour,
    minute: plain.minute,
    second: plain.second,
    millisecond: plain.millisecond,
    microsecond: plain.microsecond,
    nanosecond: plain.nanosecond
  });
  return new Date(Number(zoned.epochMilliseconds));
}

export function createDateRange(now: Date, daysBack: number, daysAhead: number): ICalendarDateRange {
  const current = new Date(now.getTime());
  const start = Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate() - daysBack);
  const end = Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate() + daysAhead + 1);
  return { start: new Date(start), end: new Date(end) };
}
