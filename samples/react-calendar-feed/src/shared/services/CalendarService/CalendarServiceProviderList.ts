import { MockCalendarService } from "./MockCalendarService";
import { RSSCalendarService } from "./RSSCalendarService";
import { WordPressFullCalendarService } from "./WordPressFullCalendarService";
import { iCalCalendarService } from "./iCalCalendarService";
import { ExchangePublicCalendarService } from "./ExchangePublicCalendarService";
import { SharePointCalendarService } from "./SharePointCalendarService";

export class CalendarServiceProviderList {
  public static getProviders(): any[] {
    const providers: any[] = [];

    // only include the Mock service provider in DEBUG
    if (DEBUG) {
      providers.push({
        label: "Mock",
        key: "mock",
        initialize: () => new MockCalendarService()
      });
    }

    providers.push({
      label: "SharePoint Calendar",
      key: "sharepoint",
      initialize: () => new SharePointCalendarService()
    });

    providers.push({
      label: "Exchange Public Calendar",
      key: "exchange",
      initialize: () => new ExchangePublicCalendarService()
    });

    providers.push({
      label: "WordPress",
      key: "wordpress",
      initialize: () => new WordPressFullCalendarService()
    });

    providers.push({
      label: "iCal",
      key: "ical",
      initialize: () => new iCalCalendarService()
    });

    providers.push({
      label: "RSS",
      key: "RSS",
      initialize: () => new RSSCalendarService()
    });

    return providers;
  }
}

export enum CalendarServiceProviderType {
  SharePoint = "SharePoint",
  WordPress = "WordPress",
  iCal = "iCal",
  RSS = "RSS",
  Mock = "Mock"
}
