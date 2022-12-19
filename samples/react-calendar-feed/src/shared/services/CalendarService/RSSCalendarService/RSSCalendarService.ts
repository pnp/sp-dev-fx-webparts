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
import * as RSSParser from 'rss-parser';

export class RSSCalendarService extends BaseCalendarService implements ICalendarService {
  constructor() {
    super();
    this.Name = "RSS";
  }

  public getEvents = (): Promise<ICalendarEvent[]> => {
    const parameterizedFeedUrl: string = this.getCORSUrl(this.replaceTokens(this.FeedUrl, this.EventRange));

    console.log("Alina range")
  console.log(this.EventRange)
    
  console.log(this.EventRange.End)
    const parser = new RSSParser({
      customFields: {
      //  feed: ['otherTitle', 'extendedDescription'],
        item: 
      //     ['mc:EventDate',  'EventDate' , {keepArray: true}],
         [
          'mc:AllDayEvent',  'mc:AllDayEvent' , {keepArray: true}          ] ,
             
          
        // ['mc:EventDate',  'EventDate' , {keepArray: true}] 
        }}
      ); 
    return parser.parseURL(parameterizedFeedUrl).then(feed => {
   //  console.log(parameterizedFeedUrl);
   //  console.log(this);
    // console.log("end of first test");
      const events: ICalendarEvent[] = feed.items.map(item => {
        const pubDate: Date = this.convertToDate(item.isoDate);
        let allDayFlag= false;
        if (item["mc:AllDayEvent"]=='True')
        {
          allDayFlag=true;
        };
        const eventItem: ICalendarEvent = {
          title: item.title,
          start: pubDate,
          end: pubDate,
          url: item.link, 
          allDay:allDayFlag, 
          description: item.content,
          location: undefined, // no equivalent in RSS
          category: item.categories && item.categories.length > 0 && item.categories[0],
          BannerUrl:{ Url:"www.google.com"}
        };   
        //console.log("Alina Test1s with allevent")
         
    //    console.log(item)
    //    console.log(item.title)
    //    console.log(item["mc:AllDayEvent"])
    //    console.log("new test4")
         console.log(eventItem) 
         //console.log(eventItem.start) 
         
         //console.log(eventItem.end)
        return eventItem;
      });
      return events;
    });
  }
}
