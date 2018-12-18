/**
 * RSS Calendar Service
 * Renders events from an RSS feed. It only renders events in the future, so not every plain old RSS feed will do, but
 * calendar RSS feeds should work ok.
 * Before anyone complains that I should have used a readily available RSS parser library, I tried almost
 * every one I could find on NPM and GitHub and found that they did not meet my needs.
 * I'm open to suggestions, though, if you have a library that you think would work better.
 */
import { HttpClientResponse } from "@microsoft/sp-http";
import * as convert from "xml-js";
import { ICalendarService } from "..";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";
import { unescape } from "@microsoft/sp-lodash-subset";

export class RSSCalendarService extends BaseCalendarService implements ICalendarService {
    constructor() {
        super();
        this.Name = "RSS";
    }

    public getEvents = (): Promise<ICalendarEvent[]> => {
        const parameterizedFeedUrl: string = this.replaceTokens(this.FeedUrl, this.EventRange);

        return this.fetchResponse(parameterizedFeedUrl)
            .then((response: HttpClientResponse) => response.text())
            .then((xml: string): ICalendarEvent[] => {
                // convert RSS feed from XML to JSON
                const results: any = convert.xml2js(xml, { compact: false });
                if (results === undefined) {
                    throw "No results";
                }

                // get the RSS element
                const rss: any = results.elements[0];
                if (rss === undefined) {
                    throw "No root";
                }

                // get the first channel in the RSS feed
                const channel: any = rss.elements[0];
                if (channel === undefined) {
                    throw "No channel";
                }

                // get all items in the feed
                const items: any[] = channel.elements.filter(e => e.name === "item" && e.type === "element");

                // convert each RSS element to an event
                let events: ICalendarEvent[] = items.map((item: any) => {
                    let title: string = this._getElementValue(item, "title");
                    let link: string = this._getElementValue(item, "link");
                    let pubDate: Date = new Date(this._getElementValue(item, "pubDate"));
                    let description: string = this._getElementValue(item, "description");
                    return {
                        title: title,
                        start: pubDate,
                        end: pubDate,
                        url: link,
                        allDay: true,
                        description: description,
                        location: undefined, // no equivalent in RSS
                        category: undefined // no equivalent in RSS
                    };
                });

                return this.filterEventRange(events);
            }).catch((error: any) => {
                console.log("Exception caught by catch in RSS provider", error);
                throw error;
            });
    }

    private _getElementValue(item: any, fieldName: string): string {
        if (!item || !item.elements) {
            return undefined;
        }

        // get the elements
        const filteredElements: any[] = item.elements.filter(e => e.name === fieldName);

        if (filteredElements.length < 1 || filteredElements[0].elements.length < 1) {
            return undefined;
        }

        const firstElement: any = filteredElements[0].elements[0];

        switch (firstElement.type) {
            case "text":
                return firstElement.text;
            case "cdata":
                let cdata:string = firstElement.cdata;
                if (cdata !== undefined) {
                    cdata = unescape(cdata);
                }
                return cdata;
        }

        console.log("Found an RSS field type I didn't know", firstElement.type);
        return "";
    }
}
