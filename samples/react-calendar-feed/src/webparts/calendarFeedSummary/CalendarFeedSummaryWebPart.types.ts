import { DateRange } from "../../shared/services/CalendarService";

/**
 * Web part properties stored in web part configuration
 */
export interface ICalendarFeedSummaryWebPartProps {
    title: string; // title of the web part
    feedUrl: string; // the URL where to get the feed from
    feedType: string; // the type of feed provider
    maxEvents: number; // maximum number of events
    dateRange: DateRange; // date range to retrieve events
    useCORS: boolean; // use CORS proxy when retrieving events
    cacheDuration: number; // how long to cache events for
  }
