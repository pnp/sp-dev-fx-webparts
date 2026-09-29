import { MSGraphClientFactory, SPHttpClient } from '@microsoft/sp-http';
import { IEventSource } from '../models';

interface ISearchCell {
  Key: string;
  Value: string;
}

/** Finds Events lists and Microsoft 365 groups for the source picker in the property pane. */
export class SourceSearchService {
  constructor(
    private readonly _spHttpClient: SPHttpClient,
    private readonly _graphFactory: MSGraphClientFactory,
    private readonly _webUrl: string
  ) {}

  public async search(term: string): Promise<IEventSource[]> {
    const [lists, groups] = await Promise.all([
      this._searchLists(term).catch(() => [] as IEventSource[]),
      this._searchGroups(term).catch(() => [] as IEventSource[])
    ]);
    return lists.concat(groups);
  }

  /** Events lists from SharePoint Search (tenant-wide), with the current site's lists first. */
  private async _searchLists(term: string): Promise<IEventSource[]> {
    const safeTerm = term.replace(/["'*()]/g, ' ').trim();
    const queryText = `contentclass:STS_List_Events${safeTerm ? ` ${safeTerm}*` : ''}`;
    const searchUrl = `${this._webUrl}/_api/search/query?querytext='${encodeURIComponent(queryText)}'` +
      `&selectproperties='Title,SPWebUrl,ListId,SiteTitle'&rowlimit=25&trimduplicates=false`;
    const localUrl = `${this._webUrl}/_api/web/lists?$select=Id,Title&$filter=BaseTemplate eq 106 and Hidden eq false`;

    const [search, local] = await Promise.all([this._get(searchUrl), this._get(localUrl).catch(() => ({ value: [] }))]);

    const localLists: IEventSource[] = (local.value as { Id: string; Title: string }[])
      .filter(list => !safeTerm || list.Title.toLowerCase().indexOf(safeTerm.toLowerCase()) >= 0)
      .map(list => ({ kind: 'list', id: list.Id, title: list.Title, siteUrl: this._webUrl, subtitle: this._webUrl }));

    const rows: { Cells: ISearchCell[] }[] = search.PrimaryQueryResult?.RelevantResults?.Table?.Rows ?? [];
    const searchLists: IEventSource[] = rows.map(row => {
      const cell = (key: string): string => row.Cells.filter(c => c.Key === key)[0]?.Value ?? '';
      return {
        kind: 'list',
        id: cell('ListId').replace(/[{}]/g, '').toLowerCase(),
        title: cell('Title'),
        siteUrl: cell('SPWebUrl'),
        subtitle: cell('SiteTitle') || cell('SPWebUrl')
      } as IEventSource;
    });

    const seen: Record<string, boolean> = {};
    return localLists.concat(searchLists).filter(source => {
      const key = source.id.toLowerCase();
      if (!source.id || !source.siteUrl || seen[key]) {
        return false;
      }
      seen[key] = true;
      return true;
    });
  }

  /** Microsoft 365 groups through Microsoft Graph (advanced query for $search). */
  private async _searchGroups(term: string): Promise<IEventSource[]> {
    const client = await this._graphFactory.getClient('3');
    let request = client
      .api('/groups')
      .header('ConsistencyLevel', 'eventual')
      .filter("groupTypes/any(c:c eq 'Unified')")
      .select('id,displayName,mail')
      .query({ $count: 'true' })
      .top(15);
    const safeTerm = term.replace(/["\\]/g, '').trim();
    if (safeTerm) {
      request = request.search(`"displayName:${safeTerm}"`);
    }
    const response = await request.get();
    return (response.value as { id: string; displayName: string; mail?: string }[]).map(group => ({
      kind: 'group',
      id: group.id,
      title: group.displayName,
      subtitle: group.mail
    }));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async _get(url: string): Promise<any> {
    const response = await this._spHttpClient.get(url, SPHttpClient.configurations.v1, {
      headers: { Accept: 'application/json;odata=nometadata' }
    });
    if (!response.ok) {
      throw new Error(`SharePoint request failed (${response.status})`);
    }
    return response.json();
  }
}
