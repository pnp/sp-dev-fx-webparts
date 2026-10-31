import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IOrgNode } from '../models/IOrgNode';

/** The reporting slice around one person: the person, their manager chain, and their direct reports. */
export interface IOrgView {
  me: IOrgNode;
  managerAccount: string;        // immediate manager account, '' if none
  managerChainAccounts: string[];// full top-down manager chain (highest first)
  reportAccounts: string[];      // direct report accounts
}

/** A person suggestion from the client people-picker search. */
export interface IPersonSuggestion {
  login: string;      // claims login name (use directly as the chart root)
  name: string;
  email?: string;
  title?: string;
}

/** Some SP collection endpoints return a bare array, others { results: [] }. Normalise. */
function asArray(v: unknown): string[] {
  if (Array.isArray(v)) { return v as string[]; }
  if (v && typeof v === 'object' && Array.isArray((v as { results?: unknown[] }).results)) {
    return (v as { results: string[] }).results;
  }
  return [];
}

/**
 * Reads the reporting line from the SharePoint User Profile service (PeopleManager).
 * No Microsoft Graph, no admin consent. Resolved people are cached for the session
 * so navigating back and forth does not refetch.
 */
export class OrgService {
  private _cache: Map<string, IOrgNode> = new Map<string, IOrgNode>();

  public constructor(private spHttpClient: SPHttpClient, private webUrl: string) { }

  private _get(url: string): Promise<SPHttpClientResponse> {
    return this.spHttpClient.get(url, SPHttpClient.configurations.v1, {
      headers: { 'Accept': 'application/json;odata=nometadata' }
    });
  }

  /** Load the centre person (undefined = the signed-in user) with their manager and direct report accounts. */
  public async getView(account: string | undefined): Promise<IOrgView> {
    const select = '$select=AccountName,DisplayName,Email,Title,ExtendedManagers,DirectReports';
    const url = account
      ? `${this.webUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='${encodeURIComponent(account)}'&${select}`
      : `${this.webUrl}/_api/SP.UserProfiles.PeopleManager/GetMyProperties?${select}`;
    const res = await this._get(url);
    if (!res.ok) { throw new Error(`HTTP ${res.status}`); }
    const p = await res.json();
    const managers = asArray(p.ExtendedManagers);
    const me: IOrgNode = {
      name: p.DisplayName || 'You',
      title: p.Title || undefined,
      email: p.Email || undefined,
      account: p.AccountName || account || undefined
    };
    if (me.account) { this._cache.set(me.account, me); }
    return {
      me: me,
      managerAccount: managers.length > 0 ? managers[managers.length - 1] : '',
      managerChainAccounts: managers,
      reportAccounts: asArray(p.DirectReports)
    };
  }

  /** Resolve a single account to a display node (cached). */
  public async resolve(account: string): Promise<IOrgNode | undefined> {
    if (!account) { return undefined; }
    const hit = this._cache.get(account);
    if (hit) { return hit; }
    const url = `${this.webUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='${encodeURIComponent(account)}'`
      + `&$select=AccountName,DisplayName,Email,Title`;
    const res = await this._get(url);
    if (!res.ok) { return undefined; }
    const p = await res.json();
    if (!p || !p.DisplayName) { return undefined; }
    const node: IOrgNode = { name: p.DisplayName, title: p.Title || undefined, email: p.Email || undefined, account: p.AccountName || account };
    this._cache.set(account, node);
    return node;
  }

  /** Type-ahead people search against the site's client people-picker service (no consent). */
  public async searchPeople(query: string): Promise<IPersonSuggestion[]> {
    const q = (query || '').trim();
    if (q.length < 2) { return []; }
    const url = `${this.webUrl}/_api/SP.UI.ApplicationPages.ClientPeoplePickerWebServiceInterface.clientPeoplePickerSearchUser`;
    const body = JSON.stringify({
      queryParams: {
        AllowEmailAddresses: true,
        AllowMultipleEntities: false,
        MaximumEntitySuggestions: 10,
        PrincipalSource: 15,
        PrincipalType: 1,
        QueryString: q
      }
    });
    try {
      const res = await this.spHttpClient.post(url, SPHttpClient.configurations.v1, {
        headers: { 'Accept': 'application/json;odata=nometadata', 'Content-type': 'application/json;odata=nometadata' },
        body: body
      });
      if (!res.ok) { return []; }
      const json = await res.json();
      const payload: string = json.value ? json.value : (json.d && json.d.ClientPeoplePickerSearchUser);
      if (!payload) { return []; }
      const entities: Array<{ Key: string; DisplayText: string; EntityData?: { Email?: string; Title?: string } }> = JSON.parse(payload);
      return entities
        .filter((e) => e && e.Key && e.Key.indexOf('|membership|') >= 0)
        .map((e) => ({
          login: e.Key,
          name: e.DisplayText,
          email: e.EntityData && e.EntityData.Email ? e.EntityData.Email : undefined,
          title: e.EntityData && e.EntityData.Title ? e.EntityData.Title : undefined
        }));
    } catch {
      return [];
    }
  }
}
