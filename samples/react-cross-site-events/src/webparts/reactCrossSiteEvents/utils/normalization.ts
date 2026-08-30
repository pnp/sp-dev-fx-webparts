import { ICalendarEvent, IGraphCalendarEvent } from '../models/CalendarEvent';
import { parseGraphDateTime } from './dates';

export function normalizeGraphEvent(raw: IGraphCalendarEvent, sourceUrl: string, sourceLabel: string): ICalendarEvent | undefined {
  if (!raw.id || !raw.start || !raw.end || !raw.start.dateTime || !raw.end.dateTime) {
    return undefined;
  }
  try {
    const start = parseGraphDateTime(raw.start.dateTime, raw.start.timeZone);
    const end = parseGraphDateTime(raw.end.dateTime, raw.end.timeZone || raw.start.timeZone);
    if (end.getTime() < start.getTime()) {
      return undefined;
    }
    return {
      id: raw.id,
      sourceUrl,
      sourceLabel,
      subject: raw.subject || '(No title)',
      bodyPreview: raw.bodyPreview || '',
      webLink: raw.webLink,
      isAllDay: Boolean(raw.isAllDay),
      start,
      end,
      location: raw.location && raw.location.displayName || '',
      organizer: raw.organizer && raw.organizer.emailAddress && (raw.organizer.emailAddress.name || raw.organizer.emailAddress.address) || ''
    };
  } catch (_) {
    return undefined;
  }
}

export function normalizeGraphEvents(raw: IGraphCalendarEvent[], sourceUrl: string, sourceLabel: string): ICalendarEvent[] {
  return raw.map(event => normalizeGraphEvent(event, sourceUrl, sourceLabel)).filter((event): event is ICalendarEvent => Boolean(event));
}

export function sortEvents(events: ICalendarEvent[]): ICalendarEvent[] {
  return events.slice().sort((a, b) => a.start.getTime() - b.start.getTime() || a.subject.localeCompare(b.subject));
}
