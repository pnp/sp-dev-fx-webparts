import { IAggregatedCalendarService } from './IAggregatedCalendarService';
import { SelectedCalendar } from '../model/SelectedCalendar';
import { FullCalendarEvent } from '../model/FullCalendarEvent';
import * as moment from 'moment';
/**
 * Mock Service for AggregatedCalendarService
 *
 * @export
 * @class AggregatedCalendarMockService
 * @implements {IAggregatedCalendarService}
 */
export class AggregatedCalendarMockService implements IAggregatedCalendarService {

  /**
   * Returns the mock data for the calendar events
   *
   * @param {string} calendarRestApi
   * @param {string} calendarColor
   * @param {string} startDate
   * @param {string} endDate
   * @returns {Promise<FullCalendarEvent[]>}
   * @memberof AggregatedCalendarMockService
   */
  public getEventsForCalendar(calendarRestApi: string, calendarColor: string, startDate: string,
    endDate: string):
    Promise<FullCalendarEvent[]> {
    return new Promise<FullCalendarEvent[]>((resolve, reject) => {
      let calendarLists: FullCalendarEvent[] = [
        {
          id: 1,
          title: "Lunch",
          start: moment().add(1, 'days'),
          end: moment().add(1, 'days').add(1, "h"),
          color: "blue",
          allDay: false,
          description: "",
          location: "18223 Kilmacolm Drive, Richmond, TX 77407",
          category: "Get-together"
        },
        {
          id: 2,
          title: "Lunch & Learn",
          start: moment(),
          end: moment().add(1, "h"),
          color: "blue",
          allDay: false,
          description: "<p>Lunch &amp; Learn Session</p>\r\n",
          location: "Microsoft Store, 5015 Westheimer Rd Ste A2421, Houston, TX, United States",
          category: "Meeting"
        },
        {
          id: 3,
          title: "Town Hall",
          start: moment("2018-07-08T21:30:00.000Z"),
          end: moment("2018-07-08T22:30:00.000Z"),
          color: "red",
          allDay: false,
          description: "",
          location: "Deer Park, Texas, United States",
          category: ""
        },
        {
          id: 4,
          title: "Team Outing",
          start: moment("2018-07-12T00:00:00.000Z"),
          end: moment("2018-07-12T23:59:00.000Z"),
          color: "red",
          allDay: false,
          description: "",
          location: "Seaworld San Antonio, San Antonio, Texas, United States",
          category: ""
        }
      ];

      resolve(calendarLists);
    });
  }

}
