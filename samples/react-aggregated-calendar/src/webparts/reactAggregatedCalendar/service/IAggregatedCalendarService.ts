import { FullCalendarEvent } from "../model/FullCalendarEvent";

/**
 * Interface Service for the AggregatedCalendarService
 *
 * @export
 * @interface IAggregatedCalendarService
 */
export interface IAggregatedCalendarService {
  getEventsForCalendar(calendarRestApi: string, calendarColor: string,
    startDate: string, endDate: string): Promise<FullCalendarEvent[]>;
}
