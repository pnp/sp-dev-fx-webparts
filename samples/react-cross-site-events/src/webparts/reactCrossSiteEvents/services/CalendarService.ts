import { GraphFI } from '@pnp/graph';
import '@pnp/graph/groups';
import '@pnp/graph/sites';
import { ICalendarEvent, IGraphCalendarEvent } from '../models/CalendarEvent';
import { ICalendarDateRange, ISiteCalendarSource } from '../models/Configuration';
import { normalizeGraphEvents, sortEvents } from '../utils/normalization';

interface IGraphCollection<T> {
  value: T[];
}

export interface ICalendarService {
  getEvents(source: ISiteCalendarSource, range: ICalendarDateRange): Promise<ICalendarEvent[]>;
}

/** Read-only adapter for the Graph site lookup and Microsoft 365 group calendarView. */
export class CalendarService implements ICalendarService {
  public constructor(private readonly graph: GraphFI) {}

  public async getEvents(source: ISiteCalendarSource, range: ICalendarDateRange): Promise<ICalendarEvent[]> {
    const siteUrl = new URL(source.siteUrl);
    // Resolving the URL confirms the configured source is a site the current user can see.
    await this.graph.sites.getByUrl(siteUrl.hostname, siteUrl.pathname);
    const result = await this.graph.groups
      .getById(source.groupId)
      .getCalendarView(range.start, range.end) as IGraphCalendarEvent[];
    const events = Array.isArray(result) ? result : (result as unknown as IGraphCollection<IGraphCalendarEvent>).value;
    return sortEvents(normalizeGraphEvents(events || [], source.siteUrl, source.label));
  }
}
