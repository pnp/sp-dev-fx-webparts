import { ICalendarEvent } from '../models/CalendarEvent';
import { formatEventDate } from './formatting';

const event: ICalendarEvent = {
  id: '1', sourceUrl: 'url', sourceLabel: 'source', subject: 'Event', bodyPreview: '', isAllDay: false,
  start: new Date('2026-08-30T09:00:00Z'), end: new Date('2026-08-30T10:30:00Z'), location: '', organizer: ''
};

describe('formatEventDate', () => {
  it('formats the same instant in the requested display zone', () => {
    expect(formatEventDate(event, 'en-GB', 'Europe/London')).toContain('10:00–11:30');
  });
});
