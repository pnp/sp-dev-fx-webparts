/**
 * MockExtensionService
 * This provider will NOT be listed in the list of available providers when this solution is packaged with --ship.
 * Don't freak out, it didn't just disappear.
 */
import * as moment from "moment";
import { BaseCalendarService } from "../BaseCalendarService";
import { ICalendarEvent } from "../ICalendarEvent";
import { ICalendarService } from "../ICalendarService";

const sampleEvents: ICalendarEvent[] = [
  {
    title: "This event will be tomorrow",
    start: moment().add(1, "d").toDate(),
    end: moment().add(1, "d").toDate(),
    url: "https://www.contoso.com/news-events/events/1/",
    allDay: true,
    category: "Meeting",
    location: "Barrie, ON",
    description: "This is a description"
  },
  {
    title: "This event will be in one week",
    start: moment().add(1, "w").toDate(),
    end: moment().add(1, "w").add(1, "h").toDate(),
    url: "https://www.contoso.com/news-events/events/2/",
    allDay: false,
    category: "Meeting",
    location: undefined,
    description: undefined
  },
  {
    title: "This event will last two days",
    start: moment().add(1, "w").toDate(),
    end: moment().add(1, "w").add(2, "d").toDate(),
    url: "https://www.contoso.com/news-events/events/2/",
    allDay: true,
    category: "Meeting",
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in two weeks",
    start: moment().add(2, "w").toDate(),
    end: moment().add(2, "w").toDate(),
    url: "https://www.contoso.com/news-events/events/3/",
    allDay: true,
    category: "Meeting",
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in one month",
    start: moment().add(1, "M").toDate(),
    end: moment().add(1, "M").add(2, "d").toDate(),
    url: "https://www.contoso.com/news-events/events/4/",
    allDay: true,
    category: "Meeting",
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in two months",
    start: moment().add(2, "M").toDate(),
    end: moment().add(2, "M").toDate(),
    url: "https://www.contoso.com/news-events/events/5/",
    allDay: true,
    category: "Meeting",
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 1 quarter",
    start: moment().add(1, "Q").toDate(),
    end: moment().add(1, "Q").toDate(),
    url: "https://www.contoso.com/news-events/events/6/",
    allDay: true,
    category: undefined,
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 4 months",
    start: moment().add(4, "M").toDate(),
    end: moment().add(4, "M").toDate(),
    url: "https://www.contoso.com/news-events/events/7/",
    allDay: true,
    category: undefined,
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 5 months",
    start: moment().add(5, "M").toDate(),
    end: moment().add(5, "M").toDate(),
    url: "https://www.contoso.com/news-events/events/8/",
    allDay: true,
    category: undefined,
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 6 months",
    start: moment().add(6, "M").toDate(),
    end: moment().add(6, "M").toDate(),
    url: "https://www.contoso.com/news-events/events/9/",
    allDay: true,
    category: undefined,
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 9 months",
    start: moment().add(9, "M").toDate(),
    end: moment().add(9, "M").toDate(),
    url: "https://www.contoso.com/news-events/events/10/",
    allDay: true,
    category: undefined,
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 1 year",
    start: moment().add(1, "y").toDate(),
    end: moment().add(1, "y").toDate(),
    url: "https://www.contoso.com/news-events/events/11/",
    allDay: true,
    category: "Partayyyy!",
    location: undefined,
    description: undefined
  },
  {
    title: "This event will be in 18 months",
    start: moment().add(18, "M").toDate(),
    end: moment().add(18, "M").toDate(),
    url: "https://www.contoso.com/news-events/events/12/",
    allDay: true,
    category: "Meeting",
    location: undefined,
    description: undefined
  }
];

export class MockCalendarService extends BaseCalendarService implements ICalendarService {
  constructor() {
    super();
    this.Name = "Mock";
  }

  public getEvents = (): Promise<ICalendarEvent[]> => {
    return new Promise<ICalendarEvent[]>((resolve: any) => {
      setTimeout(() => {
        resolve(this.filterEventRange(sampleEvents));
      }, 1000);
    });
  }
}
