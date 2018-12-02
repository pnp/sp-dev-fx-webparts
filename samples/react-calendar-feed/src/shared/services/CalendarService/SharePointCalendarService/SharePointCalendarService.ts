/**
 * ExtensionService
 */
import { HttpClientResponse } from "@microsoft/sp-http";
import { ICalendarService } from "..";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";
import { Web, sp } from "@pnp/sp";
import { combine } from "@pnp/common";

export class SharePointCalendarService extends BaseCalendarService
  implements ICalendarService {
  constructor() {
    super();
    this.Name = "SharePoint";
  }

  public getEvents = (): Promise<ICalendarEvent[]> => {
    const parameterizedFeedUrl: string = this.replaceTokens(
      this.FeedUrl,
      this.EventRange
    );

    // Get the URL
    let webUrl = this.FeedUrl.toLowerCase();

    // Break the URL into parts
    let urlParts = webUrl.split("/");

    // Get the web root
    let webRoot = urlParts[0] + "/" + urlParts[1] + "/" + urlParts[2];

    // Get the list URL
    let listUrl = webUrl.substring(webRoot.length);

    // Find the "lists" portion of the URL to get the site URL
    let webLocation = listUrl.substr(0, listUrl.indexOf("lists/"));
    let siteUrl = webRoot + webLocation;

    // Open the web associated to the site
    let web = new Web(siteUrl);

    // Get the web
    return web.get().then(() => {
      // Build a filter so that we don't retrieve every single thing unless necesssary
      let dateFilter:string = "EventDate ge datetime'"+this.EventRange.Start.toISOString()+"' and EndDate lt datetime'"+this.EventRange.End.toISOString()+"'";

      // When we receive the web, get the list
      return web
        .getList(listUrl)
        .items.select("Id,Title,Description,EventDate,EndDate,fAllDayEvent,Category,Location")
        .filter(dateFilter)
        .getAll()
        .then((items: any[]) => {
          // Once we get the list, convert to calendar events
          let events: ICalendarEvent[] = items.map((item: any) => {
            let eventUrl:string = combine(webUrl, "DispForm.aspx?ID="+item.Id);
            return {
              title: item.Title,
              start: item.EventDate,
              end: item.EndDate,
              url: eventUrl,
              allDay: item.fAllDayEvent,
              category: item.Category,
              description: item.Description,
              location: item.Location
            };
          });

          // Return the calendar items
          return events;
        })
        .catch((error: any) => {
          console.log(
            "Exception caught by catch in SharePoint provider",
            error
          );
          throw error;
        });
    });
  }
}
