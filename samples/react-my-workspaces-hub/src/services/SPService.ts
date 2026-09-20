import { SPHttpClient } from '@microsoft/sp-http';
import type { WebPartContext } from '@microsoft/sp-webpart-base';
import type {
  IEnsureUserResult,
  IPrincipalListItem,
  IPrincipalSearchOptions,
  ISPService,
  IUserListItem,
  TPrincipalType
} from '../interfaces';

/** Internal shape returned by `_api/web/siteusers`. */
interface IRestSiteUser {
  Id: number;
  Title: string;
  Email?: string;
  UserPrincipalName?: string;
  LoginName: string;
  IsSiteAdmin?: boolean;
}

/** Internal shape returned by `_api/web/sitegroups`. */
interface IRestSiteGroup {
  Id: number;
  Title: string;
  LoginName: string;
  Description?: string;
}

/** Internal shape returned by `_api/web/ensureuser`. */
interface IRestEnsureUserResponse {
  Id: number;
  Title: string;
  LoginName: string;
  Email?: string;
  UserPrincipalName?: string;
}

interface IClientPeoplePickerEntity {
  Key?: string;
  DisplayText?: string;
  Description?: string;
  EntityType?: string;
  EntityData?: {
    Email?: string;
    AccountName?: string;
    SPUserID?: string;
    SPGroupID?: string;
    PrincipalType?: string;
  };
}

/**
 * Lightweight SharePoint service backing the PeoplePicker.
 *
 * - Uses plain `SPHttpClient` REST calls (no PnPjs runtime dependency).
 * - Surfaces only the operations the PeoplePicker requires:
 *   {@link SPService.searchPrincipals}, {@link SPService.getUsersInGroup},
 *   and {@link SPService.ensureUser}.
 * - Internally orchestrates a multi-stage search: ClientPeoplePicker first,
 *   then site users / groups REST endpoints as a fallback.
 *
 * @example
 * ```ts
 * const sp = new SPService(this.context);
 * const matches = await sp.searchPrincipals('alice', { top: 10 });
 * ```
 */
export class SPService implements ISPService {
  private readonly _spHttpClient: SPHttpClient;
  private readonly _webAbsoluteUrl: string;
  private static readonly _jsonAcceptHeaderValue = 'application/json;odata.metadata=none';
  private static readonly _legacyJsonAcceptHeaderValue = 'application/json;odata=verbose';

  /**
   * Creates a new SPService bound to the supplied SPFx web-part context.
   *
   * @param context - The SPFx web-part context. Used to obtain the
   *   default `spHttpClient` and the current web's absolute url.
   * @param overrides - Optional injection points. Pass a custom
   *   `spHttpClient` to share auth/state with another component.
   */
  public constructor(
    context: WebPartContext,
    overrides?: { spHttpClient?: SPHttpClient }
  ) {
    this._spHttpClient = overrides?.spHttpClient ?? context.spHttpClient;
    this._webAbsoluteUrl = context.pageContext.web.absoluteUrl;
  }

  /**
   * Searches for users and/or groups visible to the current site.
   *
   * Strategy:
   * 1. Try ClientPeoplePicker (ProcessQuery) — broadest results, supports
   *    M365 groups via the substrate search hop.
   * 2. If ProcessQuery is unavailable or returns nothing, fall back to
   *    `_api/web/siteusers` and `_api/web/sitegroups`.
   *
   * @param searchText - Free-text query.
   * @param options - Optional filters:
   *   - `includeUsers` (default `true`) — include user principals.
   *   - `includeGroups` (default `false`) — include group principals.
   *   - `includeSpGroupsOnly` (default `false`) — when true, restrict
   *     group results to SharePoint site groups only.
   *   - `top` (default `20`) — maximum number of results.
   */
  public async searchPrincipals(
    searchText: string,
    options?: IPrincipalSearchOptions
  ): Promise<IPrincipalListItem[]> {
    const normalizedSearchText = searchText.trim();
    if (!normalizedSearchText) return [];

    const includeUsers = options?.includeUsers ?? true;
    const includeGroups = options?.includeGroups ?? false;
    const spGroupsOnly = options?.includeSpGroupsOnly ?? false;
    const top = options?.top ?? 20;

    const pickerResults = await this._tryClientPeoplePickerSearch(
      normalizedSearchText,
      includeUsers,
      includeGroups,
      spGroupsOnly,
      top
    );

    if (pickerResults !== null) return pickerResults;

    if (spGroupsOnly) {
      return this._searchSpGroupsDirect(normalizedSearchText, includeUsers, top);
    }

    return this._searchViaLocalEndpoints(normalizedSearchText, includeUsers, includeGroups, top);
  }

  /**
   * Returns every user that belongs to the supplied SharePoint site group.
   * The result is sorted by SharePoint's default order; titles that look
   * like email addresses are not rewritten — that hydration is owned by
   * the caller (e.g. the PeoplePicker hook).
   *
   * @param groupId - Numeric SharePoint site group id.
   */
  public async getUsersInGroup(groupId: number): Promise<IUserListItem[]> {
    const url =
      `${this._webAbsoluteUrl}/_api/web/sitegroups/getbyid(${groupId})/users` +
      `?$select=Id,Title,Email,LoginName,UserPrincipalName,IsSiteAdmin` +
      `&$top=500`;

    const users = await this._getJson<{ value: IRestSiteUser[] }>(url);
    return users.value.map((user) => this._mapUser(user));
  }

  /**
   * Ensures a user exists in the current site collection (creating the
   * site user record on first call) and returns the resolved metadata.
   *
   * @param emailOrLoginName - Either an email/UPN or an already
   *   claim-formatted login name. Bare emails are wrapped automatically.
   * @throws If `emailOrLoginName` is empty or the REST call fails.
   */
  public async ensureUser(emailOrLoginName: string): Promise<IEnsureUserResult> {
    const value = emailOrLoginName?.trim();
    if (!value) {
      throw new Error('SPService.ensureUser: emailOrLoginName must be provided.');
    }

    const logonName = this._toLoginName(value);

    const response = await this._spHttpClient.post(
      `${this._webAbsoluteUrl}/_api/web/ensureuser`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: SPService._jsonAcceptHeaderValue,
          'Content-Type': 'application/json;odata.metadata=none'
        },
        body: JSON.stringify({ logonName })
      }
    );

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`ensureUser failed (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as IRestEnsureUserResponse;

    return {
      id: data.Id,
      loginName: data.LoginName,
      title: data.Title,
      email: data.Email || undefined,
      userPrincipalName: data.UserPrincipalName || undefined
    };
  }

  // ---------------------------------------------------------------------------
  // ClientPeoplePicker (ProcessQuery)
  // ---------------------------------------------------------------------------

  /**
   * Runs the ClientPeoplePicker search and returns the mapped results, or
   * `null` when the endpoint fails or yields zero rows so the caller can
   * try the next strategy.
   */
  private async _tryClientPeoplePickerSearch(
    searchText: string,
    includeUsers: boolean,
    includeGroups: boolean,
    spGroupsOnly: boolean,
    top: number
  ): Promise<IPrincipalListItem[] | null> {
    try {
      const results = await this._searchPrincipalsWithClientPeoplePicker(
        searchText,
        includeUsers,
        includeGroups,
        top,
        spGroupsOnly
      );

      return results.slice(0, top);
    } catch {
      return null;
    }
  }

  private async _searchPrincipalsWithClientPeoplePicker(
    queryText: string,
    includeUsers: boolean,
    includeGroups: boolean,
    top: number,
    spGroupsOnly?: boolean
  ): Promise<IPrincipalListItem[]> {
    const principalTypeMask = this._getPrincipalTypeMask(includeUsers, includeGroups, spGroupsOnly);
    const classicEntities = await this._executeClientPeoplePickerQuery(
      queryText,
      top,
      principalTypeMask,
      false
    );

    const mappedClassic = classicEntities
      .map((entity) => this._mapClientPeoplePickerEntity(entity, includeUsers, includeGroups, spGroupsOnly))
      .filter((principal): principal is IPrincipalListItem => Boolean(principal));

    if (!includeGroups || spGroupsOnly) {
      return mappedClassic.slice(0, top);
    }

    const substrateEntities = await this._executeClientPeoplePickerQuery(
      queryText,
      top,
      this._getPrincipalTypeMask(false, true),
      true
    );

    const mappedSubstrate = substrateEntities
      .map((entity) => this._mapClientPeoplePickerEntity(entity, false, true))
      .filter((principal): principal is IPrincipalListItem => Boolean(principal));

    return this._mergePrincipals(mappedClassic, mappedSubstrate).slice(0, top);
  }

  private async _executeClientPeoplePickerQuery(
    queryText: string,
    top: number,
    principalTypeMask: number,
    useSubstrateSearch: boolean
  ): Promise<IClientPeoplePickerEntity[]> {
    const payload = this._buildClientPeoplePickerPayload(queryText, top, principalTypeMask, useSubstrateSearch);

    const response = await this._spHttpClient.post(
      `${this._webAbsoluteUrl}/_vti_bin/client.svc/ProcessQuery`,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: SPService._legacyJsonAcceptHeaderValue,
          'Content-Type': 'text/xml;charset=utf-8'
        },
        body: payload
      }
    );

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`PeoplePicker ProcessQuery failed (${response.status}): ${responseText}`);
    }

    const responseText = await response.text();
    return this._parseClientPeoplePickerResponse(responseText);
  }

  private _getPrincipalTypeMask(includeUsers: boolean, includeGroups: boolean, spGroupsOnly?: boolean): number {
    if (includeUsers && includeGroups) {
      return spGroupsOnly ? 9 : 15;
    }
    if (includeUsers) return 1;
    if (includeGroups) return spGroupsOnly ? 8 : 14;
    return 1;
  }

  private _buildClientPeoplePickerPayload(
    queryText: string,
    top: number,
    principalTypeMask: number,
    useSubstrateSearch: boolean
  ): string {
    const escapedQuery = this._escapeXmlValue(queryText);

    return `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPFx PeoplePicker"><Actions><StaticMethod TypeId="{de2db963-8bab-4fb4-8a58-611aebc5254b}" Name="ClientPeoplePickerSearchUser" Id="0"><Parameters><Parameter TypeId="{ac9358c6-e9b1-4514-bf6e-106acbfb19ce}"><Property Name="AllowEmailAddresses" Type="Boolean">false</Property><Property Name="AllowMultipleEntities" Type="Boolean">false</Property><Property Name="AllowOnlyEmailAddresses" Type="Boolean">false</Property><Property Name="AllUrlZones" Type="Boolean">false</Property><Property Name="EnabledClaimProviders" Type="Null" /><Property Name="ForceClaims" Type="Boolean">false</Property><Property Name="MaximumEntitySuggestions" Type="Number">${top}</Property><Property Name="PrincipalSource" Type="Number">15</Property><Property Name="PrincipalType" Type="Number">${principalTypeMask}</Property><Property Name="QuerySettings" Type="Null" /><Property Name="QueryString" Type="String">${escapedQuery}</Property><Property Name="Required" Type="Boolean">true</Property><Property Name="SharePointGroupID" Type="Number">0</Property><Property Name="UrlZone" Type="Number">0</Property><Property Name="UrlZoneSpecified" Type="Boolean">false</Property><Property Name="UseSubstrateSearch" Type="Boolean">${useSubstrateSearch}</Property><Property Name="Web" Type="Null" /><Property Name="WebApplicationID" Type="String">{00000000-0000-0000-0000-000000000000}</Property></Parameter></Parameters></StaticMethod></Actions><ObjectPaths /></Request>`;
  }

  private _parseClientPeoplePickerResponse(rawResponse: string): IClientPeoplePickerEntity[] {
    const parsed = JSON.parse(rawResponse) as unknown;
    if (!Array.isArray(parsed)) return [];

    const metadata = parsed[0];
    if (metadata && typeof metadata === 'object') {
      const errorInfo = (metadata as { ErrorInfo?: { ErrorMessage?: string } }).ErrorInfo;
      if (errorInfo?.ErrorMessage) {
        throw new Error(errorInfo.ErrorMessage);
      }
    }

    const resultChunk = parsed.find((entry) => typeof entry === 'string' && entry.trim().startsWith('['));
    if (typeof resultChunk !== 'string') return [];

    const entities = JSON.parse(resultChunk) as unknown;
    if (!Array.isArray(entities)) return [];

    return entities.filter((entry): entry is IClientPeoplePickerEntity => Boolean(entry && typeof entry === 'object'));
  }

  private _mapClientPeoplePickerEntity(
    entity: IClientPeoplePickerEntity,
    includeUsers: boolean,
    includeGroups: boolean,
    spGroupsOnly?: boolean
  ): IPrincipalListItem | undefined {
    const entityType = (entity.EntityType ?? '').toLowerCase();
    const entityKey = (entity.Key ?? '').toLowerCase();
    const accountName = (entity.EntityData?.AccountName ?? '').toLowerCase();
    let principalType: TPrincipalType = 'User';

    if (entityType.includes('group') || entityType.includes('formsrole') || entityType.includes('role')) {
      principalType = 'Group';
    }

    if (
      entityKey.includes('federateddirectoryclaimprovider') ||
      accountName.includes('federateddirectoryclaimprovider')
    ) {
      principalType = 'Group';
    }

    const principalTypeValue = Number(entity.EntityData?.PrincipalType ?? '');
    if (!Number.isNaN(principalTypeValue) && [2, 4, 8].includes(principalTypeValue)) {
      principalType = 'Group';
    }

    if (principalType === 'User' && !includeUsers) return undefined;
    if (principalType === 'Group' && !includeGroups) return undefined;

    if (principalType === 'Group' && spGroupsOnly) {
      const isSpGroup =
        principalTypeValue === 8 ||
        (!Number.isNaN(Number(entity.EntityData?.SPGroupID)) && Number(entity.EntityData?.SPGroupID) > 0);
      if (!isSpGroup) return undefined;
    }

    const id = this._extractPrincipalId(entity, principalType);
    const loginName = (entity.Key ?? entity.EntityData?.AccountName ?? '').trim();
    const displayName = (entity.DisplayText ?? '').trim() || loginName;
    const email = (entity.EntityData?.Email ?? '').trim();
    const secondaryText = email || (entity.Description ?? '').trim() || loginName;

    return {
      key: `${principalType.toLowerCase()}:${id}`,
      id,
      displayName,
      secondaryText,
      principalType,
      loginName,
      email: email || undefined
    };
  }

  private _extractPrincipalId(entity: IClientPeoplePickerEntity, principalType: TPrincipalType): number | string {
    const rawId = principalType === 'User' ? entity.EntityData?.SPUserID : entity.EntityData?.SPGroupID;
    const numericId = Number(rawId);
    if (!Number.isNaN(numericId) && numericId > 0) return numericId;
    return (entity.Key ?? '').trim() || `${principalType}-${Date.now()}`;
  }

  private _mergePrincipals(primary: IPrincipalListItem[], additional: IPrincipalListItem[]): IPrincipalListItem[] {
    const result = new Map<string, IPrincipalListItem>();
    primary.forEach((principal) => result.set(principal.key, principal));
    additional.forEach((principal) => {
      if (!result.has(principal.key)) result.set(principal.key, principal);
    });
    return [...result.values()];
  }

  // ---------------------------------------------------------------------------
  // Direct REST fall-backs
  // ---------------------------------------------------------------------------

  /** SP-groups-only fall-back used when ClientPeoplePicker is unavailable. */
  private async _searchSpGroupsDirect(
    searchText: string,
    includeUsers: boolean,
    top: number
  ): Promise<IPrincipalListItem[]> {
    const groupItems = (await this._getSiteGroups(searchText)).map<IPrincipalListItem>((group) => ({
      key: `group:${group.Id}`,
      id: group.Id,
      displayName: group.Title,
      secondaryText: group.Description || group.LoginName,
      principalType: 'Group',
      loginName: group.LoginName
    }));

    if (!includeUsers) return groupItems.slice(0, top);

    const userItems = (await this._getSiteUsers(searchText)).map<IPrincipalListItem>((user) => ({
      key: `user:${user.id}`,
      id: user.id,
      displayName: user.displayName,
      secondaryText: user.email || user.loginName,
      principalType: 'User',
      loginName: user.loginName,
      email: user.email || undefined
    }));

    return [...userItems, ...groupItems].slice(0, top);
  }

  /** Last-resort search using the site's users + groups REST endpoints. */
  private async _searchViaLocalEndpoints(
    searchText: string,
    includeUsers: boolean,
    includeGroups: boolean,
    top: number
  ): Promise<IPrincipalListItem[]> {
    const [users, groups] = await Promise.all([
      includeUsers ? this._getSiteUsers(searchText) : Promise.resolve([] as IUserListItem[]),
      includeGroups ? this._getSiteGroups(searchText) : Promise.resolve([] as IRestSiteGroup[])
    ]);

    const userPrincipals: IPrincipalListItem[] = users.map((user) => ({
      key: `user:${user.id}`,
      id: user.id,
      displayName: user.displayName,
      secondaryText: user.email || user.userPrincipalName || user.loginName,
      principalType: 'User',
      loginName: user.loginName,
      email: user.email || undefined
    }));

    const groupPrincipals: IPrincipalListItem[] = groups.map((group) => ({
      key: `group:${group.Id}`,
      id: group.Id,
      displayName: group.Title,
      secondaryText: (group.Description ?? '') || group.LoginName,
      principalType: 'Group',
      loginName: group.LoginName
    }));

    return [...userPrincipals, ...groupPrincipals].slice(0, top);
  }

  /** Fetches site users, optionally filtered client-side by a free-text query. */
  private async _getSiteUsers(searchText?: string): Promise<IUserListItem[]> {
    const url =
      `${this._webAbsoluteUrl}/_api/web/siteusers` +
      `?$select=Id,Title,Email,LoginName,UserPrincipalName,IsSiteAdmin` +
      `&$top=500`;

    const data = await this._getJson<{ value: IRestSiteUser[] }>(url);
    const mapped = data.value.map((user) => this._mapUser(user));

    if (!searchText?.trim()) return mapped;

    const normalized = searchText.trim().toLowerCase();
    return mapped.filter(
      (user) =>
        user.displayName.toLowerCase().includes(normalized) ||
        (user.email ?? '').toLowerCase().includes(normalized) ||
        (user.userPrincipalName ?? '').toLowerCase().includes(normalized)
    );
  }

  /** Fetches site groups, optionally filtered client-side and stripped of system groups. */
  private async _getSiteGroups(searchText?: string): Promise<IRestSiteGroup[]> {
    const url = `${this._webAbsoluteUrl}/_api/web/sitegroups?$select=Id,Title,LoginName,Description&$top=500`;
    const data = await this._getJson<{ value: IRestSiteGroup[] }>(url);

    const cleaned = data.value.filter(
      (group) =>
        !(group.Title ?? '').toLowerCase().includes('limited access system group') &&
        !(group.Title ?? '').toLowerCase().includes('sharinglinks')
    );

    if (!searchText?.trim()) return cleaned;

    const normalized = searchText.trim().toLowerCase();
    return cleaned.filter(
      (group) =>
        (group.Title ?? '').toLowerCase().includes(normalized) ||
        (group.Description ?? '').toLowerCase().includes(normalized)
    );
  }

  // ---------------------------------------------------------------------------
  // Tiny helpers
  // ---------------------------------------------------------------------------

  private async _getJson<T>(url: string): Promise<T> {
    const response = await this._spHttpClient.get(url, SPHttpClient.configurations.v1, {
      headers: { Accept: SPService._jsonAcceptHeaderValue }
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => response.statusText);
      throw new Error(`SP REST GET failed (${response.status}) ${url}: ${errorText}`);
    }

    return (await response.json()) as T;
  }

  private _mapUser(user: IRestSiteUser): IUserListItem {
    return {
      id: user.Id,
      displayName: user.Title,
      email: user.Email ?? '',
      userPrincipalName: user.UserPrincipalName ?? '',
      loginName: user.LoginName,
      isSiteAdmin: Boolean(user.IsSiteAdmin)
    };
  }

  private _toLoginName(emailOrLoginName: string): string {
    const value = emailOrLoginName.trim();
    if (value.startsWith('i:0#.f|') || value.startsWith('c:0')) return value;
    return `i:0#.f|membership|${value}`;
  }

  private _escapeXmlValue(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
