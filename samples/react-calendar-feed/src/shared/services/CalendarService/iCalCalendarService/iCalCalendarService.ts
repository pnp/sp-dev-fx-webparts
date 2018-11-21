/**
 * ExtensionService
 */
import { HttpClientResponse } from "@microsoft/sp-http";
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

    public getEvents = (): Promise<ICalendarEvent[]> => {
        const parameterizedFeedUrl: string = this.replaceTokens(this.FeedUrl, this.EventRange);

        return this.fetchResponse(parameterizedFeedUrl)
            .then((response: HttpClientResponse) => response.text())
            .then((data: string) => {
                let jsonified: any = ICAL.parse(data);
                var comp: any = new ICAL.Component(jsonified);
                var veventList: any[] = comp.getAllSubcomponents("vevent");
                return veventList;
            })
            .then((data: any[]) => {
                let events: ICalendarEvent[] = data.map((vevent: any) => {
                    var event: ICAL.Event = new ICAL.Event(vevent);
                    return {
                        title: event.summary,
                        start: new Date(event.startDate),
                        end: new Date(event.endDate),
                        url: event.url,
                        allDay: event.allDay,
                        category: event.category,
                        description: event.description,
                        location: event.location
                    };
                });

                return this.filterEventRange(events);
            }).catch((error: any) => {
                console.log("Exception caught by catch in iCal provider", error);
                throw error;
            });

    }
}
