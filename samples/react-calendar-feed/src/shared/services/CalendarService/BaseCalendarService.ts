import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import * as moment from "moment";
import { CalendarEventRange } from ".";
import { ICalendarEvent } from "./ICalendarEvent";
import { ICalendarService } from "./ICalendarService";

/**
 * Base Calendar Service
 * Implements some generic methods that can be used by ICalendarService providers.
 * Each provider can also implement their own ways to retrieve and parse events, if they
 * choose to do so. We won't judge.
 */
export abstract class BaseCalendarService implements ICalendarService {
  public Context: IWebPartContext;
  public FeedUrl: string;
  public EventRange: CalendarEventRange;
  public UseCORS: boolean;
  public CacheDuration: number;
  public Name: string;
  public MaxTotal: number;
  public ConvertFromUTC: boolean;

  public getEvents: () => Promise<ICalendarEvent[]>;
  /**
   * Solves an issue where some providers (I'm looking at you, WordPress) returns all-day events
   * as starting from midight on the first day, and ending at midnight on the second day, making events
   * appear as lasting 2 days when they should last only 1 day
   * @param event The event that needs to be fixed
   */
  protected fixAllDayEvents(events: ICalendarEvent[]): ICalendarEvent[] {
    events.forEach((event: ICalendarEvent) => {
      if (event.allDay) {
        const startMoment: moment.Moment = moment(event.start);
        const endMoment: moment.Moment = moment(event.end).add(-1, "minute");

        if (startMoment.isSame(endMoment, "day")) {
          event.end = event.start;
        }
      }
      return event;
    });
    return events;
  }

  /**
   * Not every provider allows the feed to be filtered. Use this method to filter events after
   * the provider has retrieved them so that we can be consistent regardless of the provider
   * @param events The list of events to filter
   */
  protected filterEventRange(events: ICalendarEvent[]): ICalendarEvent[] {
    const {
      Start,
      End } = this.EventRange;

    // not all providers are good at (or capable of) filtering by events, let's just filter out events that fit outside the range
    events = events.filter(e => e.start >= Start && e.end <= End);

    // sort events by date in case we need to truncate
    events.sort((leftSide: ICalendarEvent, rightSide: ICalendarEvent): number => {
      if (leftSide.start < rightSide.start) {
        return -1;
      }

      if (leftSide.start > rightSide.start) {
        return 1;
      }
      return 0;
    });

    return events;
  }

  /**
   * This is a cheesy approach to inject start and end dates from a feed url.
   */
  protected replaceTokens(feedUrl: string, dateRange: CalendarEventRange): string {
    const startMoment: moment.Moment = moment(dateRange.Start);
    const startDate: string = startMoment.format("YYYY-MM-DD");
    const endDate: string = startMoment.format("YYYY-MM-DD");

    return feedUrl.replace("{s}", startDate)
      .replace("{e}", endDate);
  }

  /**
   * Retrieves the response using a CORS proxy or directly, depending on the settings
   * @param feedUrl The URL where to retrieve the events
   */
  protected fetchResponse(feedUrl: string): Promise<HttpClientResponse> {
    // would love to use a different approach to workaround CORS issues
    const requestUrl: string = this.getCORSUrl(feedUrl);

    return this.Context.httpClient.fetch(requestUrl,
      HttpClient.configurations.v1, {});
  }

  /**
   * Returns a URL or a CORS-formatted URL
   * @param feedUrl The URL for the feed
   */
  protected getCORSUrl(feedUrl: string): string {
    // would love to use a different approach to workaround CORS issues
    return this.UseCORS ?
      `https://cors-anywhere.herokuapp.com/${feedUrl}` :
      feedUrl;
  }

  /**
   * Retrives the response and returns a JSON object
   * @param feedUrl The URL where to retrieve the events
   */
  protected async fetchResponseAsJson(feedUrl: string): Promise<any> {
    try {
      const response = await this.fetchResponse(feedUrl);
      return await response.json();
    }
    catch (error) {
      throw error;
    }
  }

  /**
   * Converts a value to a date, possibly as a UTC date
   * @param dateValue The date value to convert
   */
  protected convertToDate(dateValue: any): Date {
    let returnDate: Date = new Date(dateValue);
    if (this.ConvertFromUTC) {
      returnDate = new Date(returnDate.getUTCFullYear(),
        returnDate.getUTCMonth(),
        returnDate.getUTCDate(),
        returnDate.getUTCHours(),
        returnDate.getUTCMinutes(),
        returnDate.getUTCSeconds()
      );
    }

    return returnDate;
  }
}

