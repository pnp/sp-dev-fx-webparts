import { MSGraphClientFactory, SPHttpClient } from '@microsoft/sp-http';
import { IDateRange, IEventItem, IEventSource } from '../models';
import { overlaps } from '../common/dates';
import { SharePointEventProvider } from './SharePointEventProvider';
import { GroupEventProvider } from './GroupEventProvider';

export interface IEventsResult {
  events: IEventItem[];
  /** Titles of the sources that could not be read (missing permission, deleted list...). */
  failedSources: string[];
}

/** Aggregates events from every configured source into one sorted feed. */
export class EventService {
  private readonly _lists: SharePointEventProvider;
  private readonly _groups: GroupEventProvider;

  constructor(private readonly _spHttpClient: SPHttpClient, graphFactory: MSGraphClientFactory, private readonly _webUrl: string) {
    this._lists = new SharePointEventProvider(_spHttpClient);
    this._groups = new GroupEventProvider(graphFactory);
  }

  public async getEvents(sources: IEventSource[], range: IDateRange, maxEvents: number): Promise<IEventsResult> {
    const results = await Promise.all(sources.map(source => {
      const provider = source.kind === 'group' ? this._groups : this._lists;
      return provider.getEvents(source, range, maxEvents).then(
        events => ({ events, failed: undefined as string | undefined }),
        () => ({ events: [] as IEventItem[], failed: source.title })
      );
    }));

    const events = results
      .reduce<IEventItem[]>((all, result) => all.concat(result.events), [])
      .filter(event => overlaps(event, range))
      .sort((a, b) => a.start.getTime() - b.start.getTime())
      .slice(0, maxEvents);

    const failedSources = results.filter(result => !!result.failed).map(result => result.failed as string);
    if (failedSources.length === sources.length && sources.length > 0) {
      throw new Error(failedSources.join(', '));
    }
    return { events, failedSources };
  }

  /** Finds the Events list of the current site, used when no source has been configured yet. */
  public async getDefaultSource(): Promise<IEventSource | undefined> {
    const url = `${this._webUrl}/_api/web/lists?$select=Id,Title&$filter=BaseTemplate eq 106 and Hidden eq false&$orderby=Created asc&$top=1`;
    const response = await this._spHttpClient.get(url, SPHttpClient.configurations.v1, {
      headers: { Accept: 'application/json;odata=nometadata' }
    });
    if (!response.ok) {
      return undefined;
    }
    const list: { Id: string; Title: string } | undefined = (await response.json()).value[0];
    return list ? { kind: 'list', id: list.Id, title: list.Title, siteUrl: this._webUrl } : undefined;
  }
}
