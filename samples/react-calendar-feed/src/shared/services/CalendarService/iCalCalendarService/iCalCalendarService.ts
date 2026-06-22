/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * ExtensionService
 */
import { parseFile } from '@filecage/ical/parser';

import { ICalendarService } from "..";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";

// tslint:disable-next-line:class-name
export class iCalCalendarService extends BaseCalendarService implements ICalendarService {
  constructor() {
    super();
    this.Name = "iCal";
  }

  public async getEvents(): Promise<ICalendarEvent[]>  {
    const parameterizedFeedUrl: string = this.replaceTokens(this.FeedUrl, this.EventRange);

    try {
      const response = await this.fetchResponse(parameterizedFeedUrl);
     
      let data ="";
      if(response.type === 'opaque') {
        alert("CORS error: The feed URL is not accessible due to CORS restrictions. Please check the feed URL and make sure it is CORS-enabled.");
      }
      else {
         data = await response.text();
      }
      
      const parsedData = await parseFile(data);
      const events: ICalendarEvent[] = Object.values(parsedData).filter((item: any) => item.type === 'VEVENT').map((event: any) => {
        const startDate = this.convertToDate(event.start);
        const endDate = this.convertToDate(event.end);

        const eventItem: ICalendarEvent = {
          title: event.summary,
          start: startDate,
          end: endDate,
          url: event.url,
          allDay: event.start.icaltype === "date",
          category: event.categories ? event.categories.join(', ') : '',
          description: event.description,
          location: event.location
        };

        return eventItem;
      });

      return this.filterEventRange(events);
    }
    catch (error) {
      console.log("Exception caught by catch in iCal provider", error);
      throw error;
    }
  }
}