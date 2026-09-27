export const MAX_SOURCES = 8;
export const MAX_DAYS_BACK = 31;
export const MAX_DAYS_AHEAD = 92;

export interface ISiteCalendarSource {
  siteUrl: string;
  groupId: string;
  label: string;
}

export interface ICalendarDateRange {
  start: Date;
  end: Date;
}

export interface ISourceValidation {
  sources: ISiteCalendarSource[];
  errors: string[];
}

export interface ISourceState {
  source: ISiteCalendarSource;
  events: import('./CalendarEvent').ICalendarEvent[];
  error?: string;
  isLoading: boolean;
}
