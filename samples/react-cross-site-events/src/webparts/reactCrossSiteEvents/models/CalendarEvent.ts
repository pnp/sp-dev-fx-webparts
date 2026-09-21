export interface IGraphDateTime {
  dateTime: string;
  timeZone?: string;
}

export interface IGraphCalendarEvent {
  id?: string;
  subject?: string;
  bodyPreview?: string;
  webLink?: string;
  isAllDay?: boolean;
  start?: IGraphDateTime;
  end?: IGraphDateTime;
  location?: { displayName?: string };
  organizer?: { emailAddress?: { name?: string; address?: string } };
}

export interface ICalendarEvent {
  id: string;
  sourceUrl: string;
  sourceLabel: string;
  subject: string;
  bodyPreview: string;
  webLink?: string;
  isAllDay: boolean;
  start: Date;
  end: Date;
  location: string;
  organizer: string;
}
