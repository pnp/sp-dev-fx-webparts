/** The six visual layouts offered in the property pane. */
export type LayoutType = 'agenda' | 'grid' | 'list' | 'filmstrip' | 'carousel' | 'timeline';

/** Date windows available in the property pane and in the in-place date filter. */
export type DateRangeKey = 'upcoming' | 'today' | 'week' | 'month';

/** Text direction: follow the page language, or force one. */
export type DirectionMode = 'auto' | 'ltr' | 'rtl';

/** Calendar system used for date formatting. */
export type CalendarSystem = 'auto' | 'gregory' | 'islamic-umalqura';

/** Where events are read from. */
export type EventSourceKind = 'list' | 'group';

/** A configured event source, persisted in the web part properties. */
export interface IEventSource {
  kind: EventSourceKind;
  /** List id (GUID) for SharePoint lists, group id for Microsoft 365 groups. */
  id: string;
  title: string;
  /** Web URL that hosts the list. Only set for SharePoint lists. */
  siteUrl?: string;
  /** Friendly name of the site or group, shown in the picker. */
  subtitle?: string;
}

/** A normalized event, independent of the source it was read from. */
export interface IEventItem {
  key: string;
  title: string;
  start: Date;
  end: Date;
  isAllDay: boolean;
  isRecurring: boolean;
  description?: string;
  location?: string;
  organizer?: string;
  category?: string;
  imageUrl?: string;
  url?: string;
  /** Group events open in Outlook on the web, so they use a new tab. */
  openInNewTab: boolean;
  sourceTitle: string;
}

/** Inclusive start / exclusive end boundaries in the viewer's local time. */
export interface IDateRange {
  start: Date;
  end: Date;
}

/** Display switches shared by every layout. */
export interface IDisplayOptions {
  titleLines: number;
  descriptionLines: number;
  showDescription: boolean;
  showLocation: boolean;
  showOrganizer: boolean;
  showCategory: boolean;
  showImage: boolean;
}
