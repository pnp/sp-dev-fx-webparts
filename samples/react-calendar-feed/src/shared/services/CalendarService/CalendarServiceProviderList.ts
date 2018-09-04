import { MockCalendarService } from './MockCalendarService';
import { RSSCalendarService } from './RSSCalendarService';
import { WordPressFullCalendarService } from './WordPressFullCalendarService';
import { iCalCalendarService } from './iCalCalendarService';
import { ExchangePublicCalendarService } from './ExchangePublicCalendarService';

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
    WordPress = "WordPress",
    iCal = "iCal",
    RSS = "RSS",
    Mock = "Mock"
}