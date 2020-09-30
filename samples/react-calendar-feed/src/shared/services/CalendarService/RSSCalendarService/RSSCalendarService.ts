/**
 * RSS Calendar Service
 * Renders events from an RSS feed. It only renders events in the future, so not every plain old RSS feed will do, but
 * calendar RSS feeds should work ok.
 * Before anyone complains that I should have used a readily available RSS parser library, I tried almost
 * every one I could find on NPM and GitHub and found that they did not meet my needs.
 * I'm open to suggestions, though, if you have a library that you think would work better.
 */
import { ICalendarService } from "..";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";
import RSSParser from 'rss-parser';

export class RSSCalendarService extends BaseCalendarService implements ICalendarService {
  constructor() {
    super();
    this.Name = "RSS";
  }

  public getEvents = (): Promise<ICalendarEvent[]> => {
    const parameterizedFeedUrl: string = this.getCORSUrl(this.replaceTokens(this.FeedUrl, this.EventRange));

    let parser = new RSSParser();
    return parser.parseURL(parameterizedFeedUrl).then(feed => {

      let events: ICalendarEvent[] = feed.items.map(item => {
        let pubDate: Date = this.convertToDate(item.isoDate);
        const eventItem: ICalendarEvent = {
          title: item.title,
          start: pubDate,
          end: pubDate,
          url: item.link,
          allDay: false,
          description: item.content,
          location: undefined, // no equivalent in RSS
          category: item.categories && item.categories.length > 0 && item.categories[0]
        };
        return eventItem;
      });
      return events;
    });
  }
}
