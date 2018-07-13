import { IAggregatedCalendarService } from './IAggregatedCalendarService';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ServiceKey, ServiceScope, Log } from '@microsoft/sp-core-library';
import { PageContext } from '@microsoft/sp-page-context';
import * as moment from 'moment';
import { SPCalendarItems } from '../model/SPCalendarItems';
import { FullCalendarEvent } from '../model/FullCalendarEvent';

/**
 * Aggregated Calendar Service for teh Aggregated Calendar Webpart to get the Calendar Events
 *
 * @export
 * @class AggregatedCalendarService
 * @implements {IAggregatedCalendarService}
 */
export class AggregatedCalendarService implements IAggregatedCalendarService {
  public static readonly serviceKey: ServiceKey<IAggregatedCalendarService>
    = ServiceKey.create<IAggregatedCalendarService>('ayka:IAggregatedCalendarService', AggregatedCalendarService);
  private _spHttpClient: SPHttpClient;
  private _serviceScope: ServiceScope;
  /**
   *Creates an instance of AggregatedCalendarService.
   * @param {ServiceScope} serviceScope
   * @memberof AggregatedCalendarService
   */
  constructor(serviceScope: ServiceScope) {
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this._serviceScope = serviceScope;
    });
  }

  /**
   * Gets the Events from the SharePoint Calendar between startDate and endDate
   *
   * @param {string} calendarRestApi
   * @param {string} calendarColor
   * @param {string} startDate
   * @param {string} endDate
   * @returns {Promise<any[]>}
   * @memberof AggregatedCalendarService
   */
  public getEventsForCalendar(calendarRestApi: string, calendarColor: string, startDate: string, endDate: string): Promise<any[]> {
    return new Promise<FullCalendarEvent[]>((resolve, reject) => {
      let _webRestApi: string = calendarRestApi +
        '?$Select=Title,EventDate,EndDate,Location,Description,Category,fAllDayEvent&$filter=((EventDate ge \''
        + startDate + '\' and EventDate le \'' + endDate + '\'))';
      Log.info("getEventsForCalendar()", "REST API : " + calendarRestApi, this._serviceScope);
      this._spHttpClient.get(_webRestApi, SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          response.json().then((spEvents: SPCalendarItems) => {
            Log.verbose("getEventsForCalendar()", JSON.stringify(spEvents), this._serviceScope);
            let fullCalendarEvents: FullCalendarEvent[] = [];

            // Convert the SharePoint Events into compatible Full Calendar Events
            spEvents.value.forEach((spEvent) => {

              fullCalendarEvents.push({
                id: spEvent.Id,
                title: spEvent.Title,
                start: moment(spEvent.EventDate),
                end: moment(spEvent.EndDate),
                color: calendarColor,
                allDay: spEvent.fAllDayEvent,
                description: spEvent.Description || '',
                location: spEvent.Location || '',
                category: spEvent.Category || ''
              });

            });
            Log.info("getEventsForCalendar()", "Returning Full Calendar Events ", this._serviceScope);
            Log.verbose("getEventsForCalendar()", JSON.stringify(fullCalendarEvents), this._serviceScope);
            resolve(fullCalendarEvents);
          }).catch((error) => {
            Log.error("getEventsForCalendar()", new Error("Error Fetching events from Calendar"), this._serviceScope);
            reject(error);
          });
        });
    });
  }

}
