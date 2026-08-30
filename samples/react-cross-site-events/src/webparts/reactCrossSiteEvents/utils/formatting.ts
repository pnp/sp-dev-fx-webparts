import { ICalendarEvent } from '../models/CalendarEvent';

export function formatEventDate(event: ICalendarEvent, locale: string = 'en-GB', timeZone: string = 'UTC'): string {
  const dateOptions: Intl.DateTimeFormatOptions = { timeZone, weekday: 'short', day: 'numeric', month: 'short' };
  const date = new Intl.DateTimeFormat(locale, dateOptions).format(event.start);
  if (event.isAllDay) {
    const endDate = new Date(event.end.getTime() - 1);
    const end = new Intl.DateTimeFormat(locale, dateOptions).format(endDate);
    return date === end ? `${date} · All day` : `${date} – ${end} · All day`;
  }
  const timeOptions: Intl.DateTimeFormatOptions = { timeZone, hour: 'numeric', minute: '2-digit' };
  const times = new Intl.DateTimeFormat(locale, timeOptions);
  return `${date} · ${times.format(event.start)}–${times.format(event.end)}`;
}

export function formatLastUpdated(date: Date, locale: string = 'en-GB', timeZone: string = 'UTC'): string {
  return new Intl.DateTimeFormat(locale, { timeZone, dateStyle: 'medium', timeStyle: 'short' }).format(date);
}
