import { MockCalendarService } from "./MockCalendarService";
import { RSSCalendarService } from "./RSSCalendarService";
import { WordPressFullCalendarService } from "./WordPressFullCalendarService";
import { iCalCalendarService } from "./iCalCalendarService";
import { ExchangePublicCalendarService } from "./ExchangePublicCalendarService";
import { SharePointCalendarService } from "./SharePointCalendarService";

// Localization
import * as strings from "CalendarServicesStrings";

export enum CalendarServiceProviderType {
  SharePoint = "SharePoint",
  WordPress = "WordPress",
  Exchange = "Exchange",
  iCal = "iCal",
  RSS = "RSS",
  Mock = "Mock"
}

export class CalendarServiceProviderList {
  public static getProviders(): any[] {
    const providers: any[] = [
      {
        label: strings.SharePointProviderName,
        key: CalendarServiceProviderType.SharePoint,
        initialize: () => new SharePointCalendarService()
      },
      {
        label: strings.ExchangeProviderName,
        key: CalendarServiceProviderType.Exchange,
        initialize: () => new ExchangePublicCalendarService()
      },
      {
        label: strings.WordPressProviderName,
        key: CalendarServiceProviderType.WordPress,
        initialize: () => new WordPressFullCalendarService()
      },
      {
        label: strings.iCalProviderName,
        key: CalendarServiceProviderType.iCal,
        initialize: () => new iCalCalendarService()
      },
      {
        label: strings.RSSProviderName,
        key: CalendarServiceProviderType.RSS,
        initialize: () => new RSSCalendarService()
      }
    ];

    // only include the Mock service provider in DEBUG
    if (DEBUG) {
      providers.push({
        label: strings.MockProviderName,
        key: CalendarServiceProviderType.Mock,
        initialize: () => new MockCalendarService()
      });
    }

    return providers;
  }
}

