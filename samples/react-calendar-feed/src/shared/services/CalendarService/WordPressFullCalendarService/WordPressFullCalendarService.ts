/**
 * ExtensionService
 */
import { ICalendarService } from "..";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";
import { IWordPressFullCalendarEventResponse } from "./IWordPressFullCalendarEventResponse";

export class WordPressFullCalendarService extends BaseCalendarService implements ICalendarService {
    constructor() {
        super();
        this.Name = "WordPress";
    }

    public getEvents = async (): Promise<ICalendarEvent[]> => {
        const parameterizedFeedUrl: string = this.replaceTokens(this.FeedUrl, this.EventRange);

        try {
        const data = await this.fetchResponseAsJson(parameterizedFeedUrl);
        let events: ICalendarEvent[] = data.map((e: IWordPressFullCalendarEventResponse) => {
          const startDate: Date = this.convertToDate(e.start);
          const endDate: Date = this.convertToDate(e.end);
          const eventItem: ICalendarEvent = {
            title: e.title,
            start: startDate,
            end: endDate,
            url: e.url,
            allDay: e.allDay,
            description: undefined,
            category: undefined,
            location: undefined // none found in WordPress
          };
          return eventItem;
        });
        return this.filterEventRange(this.fixAllDayEvents(events));
      }
      catch (error) {
        console.log("Exception caught by catch in WordPress provider", error);
        throw error;
      }

    }
}
