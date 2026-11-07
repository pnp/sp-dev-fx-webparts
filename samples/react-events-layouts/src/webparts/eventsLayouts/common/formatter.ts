import { IEventItem } from '../models';
import { dayDiff, isSameDay } from './dates';

/** Locale-aware date helpers shared by every layout. Built once per locale. */
export interface IEventFormatter {
  locale: string;
  dayNumber(date: Date): string;
  month(date: Date): string;
  weekday(date: Date): string;
  time(date: Date): string;
  /** "Today", "Tomorrow" or a short date such as "Wed, 17 Jun". */
  dayLabel(date: Date): string;
  /** Full human-readable schedule, e.g. "Mon, May 25 · 9:00 – 11:00 PM". */
  when(event: IEventItem): string;
}

export function createFormatter(locale: string, allDayLabel: string): IEventFormatter {
  const dayNumberFmt = new Intl.DateTimeFormat(locale, { day: 'numeric' });
  const monthFmt = new Intl.DateTimeFormat(locale, { month: 'short' });
  const weekdayFmt = new Intl.DateTimeFormat(locale, { weekday: 'short' });
  const timeFmt = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' });
  const dateFmt = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' });
  const dateTimeFmt = new Intl.DateTimeFormat(locale, {
    weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit'
  });
  const relativeFmt = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const capitalize = (value: string): string => value.charAt(0).toLocaleUpperCase(locale) + value.slice(1);

  // Intl.DateTimeFormat.formatRange is available in every browser SharePoint supports,
  // the fallback only keeps older engines readable.
  const range = (fmt: Intl.DateTimeFormat, start: Date, end: Date): string =>
    typeof fmt.formatRange === 'function' ? fmt.formatRange(start, end) : `${fmt.format(start)} – ${fmt.format(end)}`;

  return {
    locale,
    dayNumber: date => dayNumberFmt.format(date),
    month: date => monthFmt.format(date),
    weekday: date => weekdayFmt.format(date),
    time: date => timeFmt.format(date),
    dayLabel: date => {
      const diff = dayDiff(new Date(), date);
      return diff >= -1 && diff <= 1 ? capitalize(relativeFmt.format(diff, 'day')) : dateFmt.format(date);
    },
    when: event => {
      if (event.isAllDay) {
        // All-day events carry an exclusive end (midnight of the following day).
        const lastDay = new Date(event.end.getTime() - 1);
        return isSameDay(event.start, lastDay)
          ? `${dateFmt.format(event.start)} · ${allDayLabel}`
          : range(dateFmt, event.start, lastDay);
      }
      return isSameDay(event.start, event.end)
        ? `${dateFmt.format(event.start)} · ${range(timeFmt, event.start, event.end)}`
        : range(dateTimeFmt, event.start, event.end);
    }
  };
}
