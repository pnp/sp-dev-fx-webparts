/**
 * Exchange Public Calendar Service
 */
import { ICalendarService } from "..";
import { ICalendarEvent } from "../ICalendarEvent";
import { iCalCalendarService } from "../iCalCalendarService";

// tslint:disable-next-line:class-name
export class ExchangePublicCalendarService extends iCalCalendarService implements ICalendarService {
    constructor() {
        super();
        this.Name = "Exchange";
    }

    public getEvents = (): Promise<ICalendarEvent[]> => {
        // exchange public calendar shares are really ICS calendars.
        // we allow users to pass either the .html URL or
        // the .ics, but we really need the .ics file

        const htmlExtension:string = ".html";
        if (this.FeedUrl.indexOf(htmlExtension, this.FeedUrl.length - htmlExtension.length) >= 0) {
            // the url ends with .html. Replace it with .ics
            const root: string = this.FeedUrl.substring(0, this.FeedUrl.length - htmlExtension.length);
            this.FeedUrl= `${root}.ics`;
        }

        return this.getEvents();
    }
}
