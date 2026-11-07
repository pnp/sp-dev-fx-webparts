import { SPHttpClient } from '@microsoft/sp-http';
import { IDateRange, IEventItem, IEventSource } from '../models';
import { addDays, floatingDate } from '../common/dates';
import { toPlainText } from '../common/text';

interface IListItem {
  Id: number;
  Title: string;
  EventDate: string;
  EndDate: string;
  fAllDayEvent?: boolean;
  fRecurrence?: boolean;
  Location?: string;
  Description?: string;
  Category?: string;
  BannerUrl?: { Url?: string };
  Author?: { Title?: string };
}

/** Columns that only exist on some Events lists (modern vs. classic); selected only when present. */
const OPTIONAL_FIELDS: string[] = ['Location', 'Description', 'Category', 'BannerUrl'];

/** Reads events from SharePoint Events lists (template 106) through the REST API. */
export class SharePointEventProvider {
  private readonly _fieldCache: Map<string, Promise<string[]>> = new Map();

  constructor(private readonly _spHttpClient: SPHttpClient) {}

  public async getEvents(source: IEventSource, range: IDateRange, top: number): Promise<IEventItem[]> {
    const listUrl = this._listUrl(source);
    const optional = await this._getOptionalFields(source);
    const select = ['Id', 'Title', 'EventDate', 'EndDate', 'fAllDayEvent', 'fRecurrence', 'Author/Title'].concat(optional);

    // All-day events are stored as UTC midnight, so widen the server window by a day on each side
    // and let the caller apply the exact local boundaries.
    const from = toODataDate(addDays(range.start, -1));
    const to = toODataDate(addDays(range.end, 1));
    const query = [
      `$select=${select.join(',')}`,
      '$expand=Author',
      `$filter=EndDate ge datetime'${from}' and EventDate lt datetime'${to}'`,
      '$orderby=EventDate asc',
      `$top=${top}`
    ].join('&');

    const items = await this._get<IListItem[]>(`${listUrl}/items?${query}`);
    return items.map(item => this._toEvent(item, source));
  }

  private _toEvent(item: IListItem, source: IEventSource): IEventItem {
    const isAllDay = !!item.fAllDayEvent;
    return {
      key: `list:${source.id}:${item.Id}`,
      title: item.Title,
      start: isAllDay ? floatingDate(item.EventDate) : new Date(item.EventDate),
      // SharePoint stores the last minute of an all-day event; normalize to an exclusive end.
      end: isAllDay ? addDays(floatingDate(item.EndDate), 1) : new Date(item.EndDate),
      isAllDay,
      isRecurring: !!item.fRecurrence,
      description: toPlainText(item.Description),
      location: item.Location || undefined,
      organizer: item.Author?.Title,
      category: item.Category || undefined,
      imageUrl: item.BannerUrl?.Url || undefined,
      url: `${source.siteUrl}/_layouts/15/Event.aspx?ListGuid=${source.id}&ItemId=${item.Id}`,
      openInNewTab: false,
      sourceTitle: source.title
    };
  }

  private _getOptionalFields(source: IEventSource): Promise<string[]> {
    let request = this._fieldCache.get(source.id);
    if (!request) {
      const filter = OPTIONAL_FIELDS.map(name => `InternalName eq '${name}'`).join(' or ');
      request = this._get<{ InternalName: string }[]>(`${this._listUrl(source)}/fields?$select=InternalName&$filter=${filter}`)
        .then(fields => fields.map(field => field.InternalName));
      this._fieldCache.set(source.id, request);
    }
    return request;
  }

  private _listUrl(source: IEventSource): string {
    return `${source.siteUrl}/_api/web/lists(guid'${source.id}')`;
  }

  private async _get<T>(url: string): Promise<T> {
    const response = await this._spHttpClient.get(url, SPHttpClient.configurations.v1, {
      headers: { Accept: 'application/json;odata=nometadata' }
    });
    if (!response.ok) {
      throw new Error(`SharePoint request failed (${response.status})`);
    }
    const json = await response.json();
    return json.value as T;
  }
}

function toODataDate(date: Date): string {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}
