/**
 * ExtensionService
 */
import * as ICAL from "ical.js";
import { ICalendarService } from "..";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";

// tslint:disable-next-line:class-name
export class iCalCalendarService extends BaseCalendarService implements ICalendarService {
  constructor() {
    super();
    this.Name = "iCal";
  }

  public getEvents = async (): Promise<ICalendarEvent[]> => {
    const parameterizedFeedUrl: string = this.replaceTokens(this.FeedUrl, this.EventRange);

    try {
      const response = await this.fetchResponse(parameterizedFeedUrl);
      const data = await response.text();
      const jsonified: any = ICAL.parse(data);
      const comp: any = new ICAL.Component(jsonified);
      const veventList: any[] = comp.getAllSubcomponents("vevent");
      let events: ICalendarEvent[] = veventList.map((vevent: any) => {
        const event: ICAL.Event = new ICAL.Event(vevent);
        let startDate = this.convertToDate(event.startDate);
        let endDate = this.convertToDate(event.endDate);

        const eventItem: ICalendarEvent = {
          title: event.summary,
          start: startDate,
          end: endDate,
          url: event.url,
          allDay: event.startDate.icaltype === "date",
          category: event.category,
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
