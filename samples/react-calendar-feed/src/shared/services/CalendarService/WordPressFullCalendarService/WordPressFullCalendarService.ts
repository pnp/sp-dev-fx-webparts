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

    public getEvents = (): Promise<ICalendarEvent[]> => {
        const parameterizedFeedUrl: string = this.replaceTokens(this.FeedUrl, this.EventRange);

        return this.fetchResponseAsJson(parameterizedFeedUrl)
            .then((data: IWordPressFullCalendarEventResponse[]): ICalendarEvent[] => {
                let events: ICalendarEvent[] = data.map((e: IWordPressFullCalendarEventResponse) => {
                    return {
                        title: e.title,
                        start: new Date(e.start),
                        end: new Date(e.end),
                        url: e.url,
                        post_id: e.post_id,
                        event_id: e.event_id,
                        allDay: e.allDay,
                        description: undefined, // none found in WordPress
                        category: undefined, // none found in WordPress
                        location: undefined // none found in WordPress
                    };
                });

                return this.filterEventRange(this.fixAllDayEvents(events));
            }).catch((error: any) => {
                console.log("Exception caught by catch in WordPress provider", error);
                throw error;
            });

    }
}
