import { MSGraphClientFactory, MSGraphClientV3 } from '@microsoft/sp-http';
import { IDateRange, IEventItem, IEventSource } from '../models';
import { floatingDate } from '../common/dates';

interface IGraphDateTime {
  dateTime: string;
}

interface IGraphEvent {
  id: string;
  subject: string;
  bodyPreview?: string;
  start: IGraphDateTime;
  end: IGraphDateTime;
  isAllDay: boolean;
  type?: string;
  webLink?: string;
  categories?: string[];
  location?: { displayName?: string };
  organizer?: { emailAddress?: { name?: string } };
}

/** Reads events from Microsoft 365 group calendars through Microsoft Graph (requires Group.Read.All). */
export class GroupEventProvider {
  private _client: Promise<MSGraphClientV3> | undefined;

  constructor(private readonly _factory: MSGraphClientFactory) {}

  public async getEvents(source: IEventSource, range: IDateRange, top: number): Promise<IEventItem[]> {
    const client = await this.getClient();
    // calendarView expands recurring series into individual occurrences.
    const response = await client
      .api(`/groups/${source.id}/calendarView`)
      .header('Prefer', 'outlook.timezone="UTC"')
      .query({ startDateTime: range.start.toISOString(), endDateTime: range.end.toISOString() })
      .select('id,subject,bodyPreview,start,end,isAllDay,type,webLink,categories,location,organizer')
      .orderby('start/dateTime')
      .top(top)
      .get();

    return (response.value as IGraphEvent[]).map(event => ({
      key: `group:${source.id}:${event.id}`,
      title: event.subject,
      start: toDate(event.start, event.isAllDay),
      end: toDate(event.end, event.isAllDay),
      isAllDay: event.isAllDay,
      isRecurring: event.type === 'occurrence' || event.type === 'exception',
      description: event.bodyPreview?.trim() || undefined,
      location: event.location?.displayName || undefined,
      organizer: event.organizer?.emailAddress?.name,
      category: event.categories?.[0],
      url: event.webLink,
      openInNewTab: true,
      sourceTitle: source.title
    }));
  }

  public getClient(): Promise<MSGraphClientV3> {
    if (!this._client) {
      this._client = this._factory.getClient('3');
    }
    return this._client;
  }
}

/** Graph returns UTC values with 7 fractional digits and no offset; trim for reliable parsing. */
function toDate(value: IGraphDateTime, isAllDay: boolean): Date {
  const iso = `${value.dateTime.substring(0, 19)}Z`;
  return isAllDay ? floatingDate(iso) : new Date(iso);
}
