import { type WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPFx } from '@pnp/sp/behaviors/spfx';
import { spfi, SPFI } from '@pnp/sp';
import { type ISiteGroupInfo } from '@pnp/sp/site-groups';
import { type ISiteUserInfo } from '@pnp/sp/site-users';
import {
  type IBulkAddUsersResult,
  type IBulkUserInput,
  type ICreateGroupPayload,
  type ICreateOrUpdateUserPayload,
  type ICurrentUserPermissions,
  type IApiCollection,
  type IPrincipalListItem,
  type IPrincipalSearchOptions,
  type IPrincipalWithPermissions,
  type IPermissionLevel,
  type IRestPermissionLevel,
  type ISPService,
  type IUpdateGroupPayload,
  type IUserListItem,
  type IUserSitePermissions,
  type TPrincipalType,
  IClientPeoplePickerEntity,
  IShareObjectUserPrincipal
} from '../interfaces';
import { getErrorMessage } from '../utils/errorUtils';
import '@pnp/sp/batching';
import '@pnp/sp/security';
import '@pnp/sp/site-groups';
import '@pnp/sp/site-users';
import '@pnp/sp/webs';
import { PermissionKind } from '@pnp/sp/security';



export class SPService implements ISPService {
  private readonly _sp: SPFI;
  private readonly _context: WebPartContext;
  private readonly _webAbsoluteUrl: string;
  private static readonly _jsonAcceptHeaderValue = 'application/json;odata.metadata=none';
  private static readonly _legacyJsonAcceptHeaderValue = 'application/json;odata=verbose';

  public constructor(context: WebPartContext) {
    this._context = context;
    this._webAbsoluteUrl = context.pageContext.web.absoluteUrl;
    this._sp = spfi().using(SPFx(context));
  }

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

    // 1. Try ClientPeoplePicker (ProcessQuery)
    const pickerResults = await this._tryClientPeoplePickerSearch(
      normalizedSearchText, includeUsers, includeGroups, spGroupsOnly, top
    );
    if (pickerResults !== null) return pickerResults;

    // 2. ProcessQuery unavailable or returned nothing — SP-groups-only direct fallback
    if (spGroupsOnly) {
      return this._searchSpGroupsDirect(normalizedSearchText, includeUsers, top);
    }

    // 3. Final fallback to local site users/groups endpoints
    return this._searchViaLocalEndpoints(normalizedSearchText, includeUsers, includeGroups, top);
  }

  /**
   * Attempts ClientPeoplePicker (ProcessQuery). Returns results on success, null when
   * the endpoint fails or yields zero results (so the caller can try the next strategy).
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
        searchText, includeUsers, includeGroups, top, spGroupsOnly
      );

      if (results.length === 0) return null;

      return results.slice(0, top);
    } catch {
      // ProcessQuery endpoint unavailable — signal caller to try next strategy
      return null;
    }
  }

  /**
   * Direct SP site-group (and optional user) lookup used when ClientPeoplePicker
   * is unavailable and the caller restricts results to SP site groups only.
   */
  private async _searchSpGroupsDirect(
    searchText: string,
    includeUsers: boolean,
    top: number
  ): Promise<IPrincipalListItem[]> {
    const spGroups = await this.getGroups(searchText);
    const groupItems: IPrincipalListItem[] = spGroups.map((g) => ({
      key: `group:${g.Id}`,
      id: g.Id,
      displayName: g.Title,
      secondaryText: g.Description || g.LoginName,
      principalType: 'Group',
      loginName: g.LoginName
    }));

    if (!includeUsers) return groupItems.slice(0, top);

    const userResults = await this.getUsers(searchText);
    const userItems: IPrincipalListItem[] = userResults.map((u) => ({
      key: `user:${u.id}`,
      id: u.id,
      displayName: u.displayName,
      secondaryText: u.email || u.loginName,
      principalType: 'User',
      loginName: u.loginName,
      email: u.email
    }));

    return [...userItems, ...groupItems].slice(0, top);
  }

  /** Last-resort local search using the site's users and groups endpoints. */
  private async _searchViaLocalEndpoints(
    searchText: string,
    includeUsers: boolean,
    includeGroups: boolean,
    top: number
  ): Promise<IPrincipalListItem[]> {
    const [users, groups] = await Promise.all([
      includeUsers ? this.getUsers(searchText) : Promise.resolve([]),
      includeGroups ? this.getGroups(searchText) : Promise.resolve([])
    ]);

    const userPrincipals: IPrincipalListItem[] = users.map((user) => ({
      key: `user:${user.id}`,
      id: user.id,
      displayName: user.displayName,
      secondaryText: user.email || user.userPrincipalName || user.loginName,
      principalType: 'User',
      loginName: user.loginName,
      email: user.email
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

    if (!includeGroups) {
      return mappedClassic.slice(0, top);
    }

    // When restricted to SP site groups only, skip the substrate (M365) search entirely
    if (spGroupsOnly) {
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

    const response = await this._context.spHttpClient.post(
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
      // 1=Users 8=SP Groups 9=Users+SP Groups 15=All
      return spGroupsOnly ? 9 : 15;
    }

    if (includeUsers) {
      return 1;
    }

    if (includeGroups) {
      // 8=SP Groups only  14=All group types (DL+Security+SP)
      return spGroupsOnly ? 8 : 14;
    }

    return 1;
  }

  private _buildClientPeoplePickerPayload(
    queryText: string,
    top: number,
    principalTypeMask: number,
    useSubstrateSearch: boolean
  ): string {
    const escapedQuery = this._escapeXmlValue(queryText);

    return `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPFx User Group Manager"><Actions><StaticMethod TypeId="{de2db963-8bab-4fb4-8a58-611aebc5254b}" Name="ClientPeoplePickerSearchUser" Id="0"><Parameters><Parameter TypeId="{ac9358c6-e9b1-4514-bf6e-106acbfb19ce}"><Property Name="AllowEmailAddresses" Type="Boolean">false</Property><Property Name="AllowMultipleEntities" Type="Boolean">false</Property><Property Name="AllowOnlyEmailAddresses" Type="Boolean">false</Property><Property Name="AllUrlZones" Type="Boolean">false</Property><Property Name="EnabledClaimProviders" Type="Null" /><Property Name="ForceClaims" Type="Boolean">false</Property><Property Name="MaximumEntitySuggestions" Type="Number">${top}</Property><Property Name="PrincipalSource" Type="Number">15</Property><Property Name="PrincipalType" Type="Number">${principalTypeMask}</Property><Property Name="QuerySettings" Type="Null" /><Property Name="QueryString" Type="String">${escapedQuery}</Property><Property Name="Required" Type="Boolean">true</Property><Property Name="SharePointGroupID" Type="Number">0</Property><Property Name="UrlZone" Type="Number">0</Property><Property Name="UrlZoneSpecified" Type="Boolean">false</Property><Property Name="UseSubstrateSearch" Type="Boolean">${useSubstrateSearch}</Property><Property Name="Web" Type="Null" /><Property Name="WebApplicationID" Type="String">{00000000-0000-0000-0000-000000000000}</Property></Parameter></Parameters></StaticMethod></Actions><ObjectPaths /></Request>`;
  }

  private _parseClientPeoplePickerResponse(rawResponse: string): IClientPeoplePickerEntity[] {
    const parsed = JSON.parse(rawResponse) as unknown;

    if (!Array.isArray(parsed)) {
      return [];
    }

    const metadata = parsed[0];
    if (metadata && typeof metadata === 'object') {
      const errorInfo = (metadata as { ErrorInfo?: { ErrorMessage?: string } }).ErrorInfo;
      if (errorInfo?.ErrorMessage) {
        throw new Error(errorInfo.ErrorMessage);
      }
    }

    const resultChunk = parsed.find((entry) => typeof entry === 'string' && entry.trim().startsWith('['));

    if (typeof resultChunk !== 'string') {
      return [];
    }

    const entities = JSON.parse(resultChunk) as unknown;
    if (!Array.isArray(entities)) {
      return [];
    }

    return entities.filter((entry): entry is IClientPeoplePickerEntity => this._isClientPeoplePickerEntity(entry));
  }

  private _isClientPeoplePickerEntity(value: unknown): value is IClientPeoplePickerEntity {
    return Boolean(value && typeof value === 'object');
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
    let principalType: 'User' | 'Group' = 'User';

    if (entityType.includes('group')) {
      principalType = 'Group';
    }

    if (entityType.includes('formsrole') || entityType.includes('role')) {
      principalType = 'Group';
    }

    if (entityKey.includes('federateddirectoryclaimprovider') || accountName.includes('federateddirectoryclaimprovider')) {
      principalType = 'Group';
    }

    const principalTypeValue = Number(entity.EntityData?.PrincipalType ?? '');
    if (!Number.isNaN(principalTypeValue) && [2, 4, 8].includes(principalTypeValue)) {
      principalType = 'Group';
    }

    if (principalType === 'User' && !includeUsers) {
      return undefined;
    }

    if (principalType === 'Group' && !includeGroups) {
      return undefined;
    }

    // When restricted to SP site groups only, reject M365 and security groups.
    // SP site groups have PrincipalType=8 and a numeric SPGroupID.
    // PrincipalType 2 = DistributionList/M365, 4 = SecurityGroup.
    if (principalType === 'Group' && spGroupsOnly) {
      const isSpGroup =
        principalTypeValue === 8 ||
        (!Number.isNaN(Number(entity.EntityData?.SPGroupID)) && Number(entity.EntityData?.SPGroupID) > 0);

      if (!isSpGroup) {
        return undefined;
      }
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

  private _extractPrincipalId(entity: IClientPeoplePickerEntity, principalType: 'User' | 'Group'): number | string {
    const rawId = principalType === 'User' ? entity.EntityData?.SPUserID : entity.EntityData?.SPGroupID;
    const numericId = Number(rawId);

    if (!Number.isNaN(numericId) && numericId > 0) {
      return numericId;
    }

    return (entity.Key ?? '').trim() || `${principalType}-${Date.now()}`;
  }

  private _escapeXmlValue(value: string): string {
    return value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&apos;');
  }

  private _mergePrincipals(primary: IPrincipalListItem[], additional: IPrincipalListItem[]): IPrincipalListItem[] {
    const result = new Map<string, IPrincipalListItem>();

    primary.forEach((principal) => {
      result.set(principal.key, principal);
    });

    additional.forEach((principal) => {
      if (!result.has(principal.key)) {
        result.set(principal.key, principal);
      }
    });

    return [...result.values()];
  }

  public async getUsers(searchText?: string): Promise<IUserListItem[]> {
    const users: ISiteUserInfo[] = await this._sp.web.siteUsers();

    const mappedUsers: IUserListItem[] = users.map((user) => ({
      id: user.Id,
      displayName: user.Title,
      email: user.Email,
      userPrincipalName: user.UserPrincipalName ?? '',
      loginName: user.LoginName,
      isSiteAdmin: user.IsSiteAdmin
    }));

    if (!searchText?.trim()) {
      return mappedUsers;
    }

    const normalizedSearch = searchText.trim().toLowerCase();

    return mappedUsers.filter((user) =>
      user.displayName.toLowerCase().includes(normalizedSearch) ||
      user.email.toLowerCase().includes(normalizedSearch)
    );
  }

  public async addUser(payload: ICreateOrUpdateUserPayload): Promise<IUserListItem> {
    const ensureResult = await this._sp.web.ensureUser(this._toLoginName(payload.email));

    if (payload.displayName?.trim()) {
      await this._sp.web.getUserById(ensureResult.Id).update({
        Title: payload.displayName.trim()
      });
    }

    const user = await this._sp.web.getUserById(ensureResult.Id)();

    return this._mapUser(user);
  }

  public async updateUser(userId: number, payload: ICreateOrUpdateUserPayload): Promise<IUserListItem> {
    const updatePayload: Partial<ISiteUserInfo> = {};

    if (payload.displayName?.trim()) {
      updatePayload.Title = payload.displayName.trim();
    }

    if (payload.email?.trim()) {
      updatePayload.Email = payload.email.trim();
    }

    if (Object.keys(updatePayload).length > 0) {
      await this._sp.web.getUserById(userId).update(updatePayload);
    }

    const user = await this._sp.web.getUserById(userId)();

    return this._mapUser(user);
  }

  public async deleteUser(userId: number): Promise<void> {
    await this._sp.web.siteUsers.removeById(userId);
  }

  public async getGroupsForUser(userId: number): Promise<ISiteGroupInfo[]> {
    return this._sp.web.siteUsers.getById(userId).groups();
  }

  public async getGroups(searchText?: string): Promise<ISiteGroupInfo[]> {
    const groups: ISiteGroupInfo[] = await this._sp.web.siteGroups();

    if (!searchText?.trim()) {
      return groups?.filter((group) => !group.Title?.toLowerCase().includes('limited access system group') && !group.Title.toLowerCase().includes("sharinglinks")) ?? [];
    }

    const normalizedSearch = searchText.trim().toLowerCase();

    return groups.filter((group) =>
      group.Title.toLowerCase().includes(normalizedSearch) ||
      (group.Description ?? '').toLowerCase().includes(normalizedSearch)
    );
  }

  public async getGroupsWithPermissions(): Promise<Array<ISiteGroupInfo & { permissionLevelNames: string[] }>> {
    // Single call: role assignments expanded with Member (full group fields) + RoleDefinitionBindings.
    // When Member.PrincipalType === 8 the Member object IS the SP.Group, so all ISiteGroupInfo
    // fields are available directly — no separate siteGroups() call needed.
    type IRoleAssignmentExpanded = {
      Member: ISiteGroupInfo & { PrincipalType: number };
      RoleDefinitionBindings: Array<{ Name: string }>;
    };

    const roleAssignments = await (this._sp.web.roleAssignments
      .expand('Member', 'RoleDefinitionBindings')
      .select(
        'Member/Id',
        'Member/Title',
        'Member/Description',
        'Member/LoginName',
        'Member/PrincipalType',
        'Member/OwnerTitle',
        'Member/IsHiddenInUI',
        'Member/OnlyAllowMembersViewMembership',
        'Member/AllowMembersEditMembership',
        'Member/AllowRequestToJoinLeave',
        'Member/AutoAcceptRequestToJoinLeave',
        'Member/RequestToJoinLeaveEmailSetting',
        'RoleDefinitionBindings/Name'
      ) as unknown as (() => Promise<IRoleAssignmentExpanded[]>))();

    const results: Array<ISiteGroupInfo & { permissionLevelNames: string[] }> = [];
    const seen = new Set<number>();

    for (const assignment of roleAssignments) {
      const member = assignment.Member;

      // Only SP site groups (PrincipalType 8), skip system/sharing-link groups
      if (
        member?.PrincipalType !== 8 ||
        member.Title?.toLowerCase().includes('limited access system group') ||
        member.Title?.toLowerCase().includes('sharinglinks')
      ) {
        continue;
      }

      const names = (assignment.RoleDefinitionBindings ?? []).map((r) => r.Name);

      if (seen.has(member.Id)) {
        // Same group appears in multiple assignments — merge permission names
        const existing = results.find((r) => r.Id === member.Id);
        if (existing) existing.permissionLevelNames.push(...names);
      } else {
        seen.add(member.Id);
        results.push({ ...member, permissionLevelNames: names });
      }
    }

    return results;
  }

  public async getAllPrincipalsWithPermissions(): Promise<IPrincipalWithPermissions[]> {
    type IRoleAssignmentExpanded = {
      Member: {
        Id: number;
        Title: string;
        LoginName: string;
        PrincipalType: number;
        Email?: string;
        Description?: string;
        OwnerTitle?: string;
        IsHiddenInUI?: boolean;
        IsSiteAdmin?: boolean;
        AllowMembersEditMembership?: boolean;
        AllowRequestToJoinLeave?: boolean;
        AutoAcceptRequestToJoinLeave?: boolean;
        OnlyAllowMembersViewMembership?: boolean;
        RequestToJoinLeaveEmailSetting?: string | null;
      };
      RoleDefinitionBindings: Array<{ Name: string }>;
    };

    const roleAssignments = await (this._sp.web.roleAssignments
      .expand('Member', 'RoleDefinitionBindings')
      .select(
        'Member/Id', 'Member/Title', 'Member/LoginName', 'Member/PrincipalType',
        'Member/Email', 'Member/Description', 'Member/OwnerTitle', 'Member/IsHiddenInUI',
        'Member/IsSiteAdmin',
        'Member/AllowMembersEditMembership', 'Member/AllowRequestToJoinLeave',
        'Member/AutoAcceptRequestToJoinLeave', 'Member/OnlyAllowMembersViewMembership',
        'Member/RequestToJoinLeaveEmailSetting',
        'RoleDefinitionBindings/Name'
      ) as unknown as (() => Promise<IRoleAssignmentExpanded[]>))();

    const results: IPrincipalWithPermissions[] = [];
    const seen = new Set<number>();

    for (const assignment of roleAssignments) {
      let member = assignment.Member;
      if (!member) continue;
      if (this._isExcludedPrincipal(member)) continue;

      // In some environments, the role-assignments API returns the user's
      // login name or email in the Title field instead of the friendly
      // display name. When we detect a user principal whose Title looks
      // like an email address (contains '@'), resolve it via ensureUser
      // and hydrate the proper Title/LoginName/Email from the user
      // profile. For non-user principals, or when Title already looks
      // like a display name, we keep the original values.
      if (member.PrincipalType === 1) {
        const rawTitle = (member.Title ?? '').trim();
        if (rawTitle.includes('@')) {
          try {
            const candidate = (member.Email ?? member.LoginName ?? rawTitle).trim();
            if (candidate) {
              const ensured = await this._sp.web.ensureUser(this._toLoginName(candidate));
              const user = await this._sp.web.getUserById(ensured.Id)();
              member = {
                ...member,
                Title: user.Title ?? member.Title,
                Email: user.Email ?? member.Email,
                LoginName: user.LoginName ?? member.LoginName
              };
            }
          } catch {
            // Best-effort only — fall back to the original member data
          }
        }
      }

      const names = (assignment.RoleDefinitionBindings ?? []).map((r) => r.Name);

      let canCurrentUserViewMembership: boolean | undefined;
      if (member.PrincipalType === 8) {
        try {
          canCurrentUserViewMembership = await this._getGroupBooleanProp(
            member.Id,
            'CanCurrentUserViewMembership'
          );
        } catch {
          canCurrentUserViewMembership = undefined;
        }
      }

      const normalizedMember = {
        ...member,
        RequestToJoinLeaveEmailSetting: member.RequestToJoinLeaveEmailSetting ?? undefined,
        canCurrentUserViewMembership
      } as IPrincipalWithPermissions;
      this._mergePrincipalPermissions(results, seen, normalizedMember, names);
    }

    return results;
  }

  /** Returns true when a role-assignment member should be omitted from results. */
  private _isExcludedPrincipal(member: { Title?: string; PrincipalType: number }): boolean {
    const titleLower = (member.Title ?? '').toLowerCase();
    if (titleLower.includes('limited access system group')) return true;
    if (titleLower.includes('sharinglinks')) return true;
    return member.PrincipalType !== 1 && member.PrincipalType !== 8;
  }

  /** Adds or merges a principal into the accumulation array. */
  private _mergePrincipalPermissions(
    results: IPrincipalWithPermissions[],
    seen: Set<number>,
    member: Omit<IPrincipalWithPermissions, 'permissionLevelNames'>,
    permissionLevelNames: string[]
  ): void {
    if (seen.has(member.Id)) {
      const existing = results.find((r) => r.Id === member.Id);
      if (existing) existing.permissionLevelNames.push(...permissionLevelNames);
    } else {
      seen.add(member.Id);
      results.push({ ...member, permissionLevelNames });
    }
  }

  private async setGroupOwner(targetGroupId: number, owner: { id: number | string; principalType: 'User' | 'Group'; loginName: string }): Promise<void> {
    if (owner.principalType === 'User') {
      // SetUserAsOwner works correctly for user principals.
      if (typeof owner.id === 'number') {
        await this._sp.web.siteGroups.getById(targetGroupId).setUserAsOwner(owner.id);
      } else {
        // Graph / AAD-resolved user whose ID is a string key — ensureUser returns a numeric site user ID.
        const ensured = await this._sp.web.ensureUser(this._toLoginName(owner.loginName));
        await this._sp.web.siteGroups.getById(targetGroupId).setUserAsOwner(ensured.Id);
      }
      return;
    }

    // SP site groups: SetUserAsOwner only accepts user IDs and is silently ignored when
    // passed a group ID. The only reliable approach is CSOM ProcessQuery, which lets us
    // set the Owner navigation property via Identity-path references and then call Update().
    let ownerGroupId: number;
    if (typeof owner.id === 'number') {
      ownerGroupId = owner.id;
    } else {
      // LoginName for SP site groups equals the group Title — resolve it to a numeric ID.
      const resolved = await this._sp.web.siteGroups.getByName(owner.loginName)();
      ownerGroupId = resolved.Id;
    }

    // Fetch the site collection ID needed to build CSOM Identity paths.
    // pageContext.site.id is always populated in SPFx — no extra REST call needed.
    const siteId: string = this._context.pageContext.site.id.toString();

    // CSOM Identity format for a site group: <fixedGuid>:site:<siteId>:g:<groupId>
    // The fixed GUID (740c6a0b-…) is the well-known CSOM object identity prefix for
    // site-collection-scoped objects and is the same across all SharePoint tenants.
    const csomGuid = '740c6a0b-85e2-48a0-a494-e0f1759d4aa7';
    const targetIdentity = `${csomGuid}:site:${siteId}:g:${targetGroupId}`;
    const ownerIdentity  = `${csomGuid}:site:${siteId}:g:${ownerGroupId}`;

    const csomBody = `<Request AddExpandoFieldTypeSuffix="true" SchemaVersion="15.0.0.0" LibraryVersion="15.0.0.0" ApplicationName=".NET Library" xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009">
  <Actions>
    <SetProperty Id="1" ObjectPathId="2" Name="Owner">
      <Parameter ObjectPathId="3" />
    </SetProperty>
    <Method Name="Update" Id="4" ObjectPathId="2" />
  </Actions>
  <ObjectPaths>
    <Identity Id="2" Name="${targetIdentity}" />
    <Identity Id="3" Name="${ownerIdentity}" />
  </ObjectPaths>
</Request>`;

    const csomResponse = await this._context.spHttpClient.post(
      `${this._webAbsoluteUrl}/_vti_bin/client.svc/ProcessQuery`,
      SPHttpClient.configurations.v1,
      {
        headers: { 'Content-Type': 'text/xml' },
        body: csomBody
      }
    );

    if (!csomResponse.ok) {
      const errorText = await csomResponse.text().catch(() => csomResponse.statusText);
      throw new Error(`Failed to set group owner via ProcessQuery (HTTP ${csomResponse.status}): ${errorText}`);
    }

    // ProcessQuery always returns HTTP 200; errors are embedded in the JSON payload.
    const csomResult: Array<{ ErrorInfo?: { ErrorMessage?: string } }> = await csomResponse.json().catch(() => []);
    const csomError = csomResult.find((r) => r?.ErrorInfo)?.ErrorInfo;
    if (csomError) {
      throw new Error(`Failed to set group owner: ${csomError.ErrorMessage ?? JSON.stringify(csomError)}`);
    }
  }

  public async createGroup(payload: ICreateGroupPayload): Promise<ISiteGroupInfo> {
    // Send all settings in the single creation POST — no separate update() needed.
    const createdGroup = await this._sp.web.siteGroups.add({
      Title: payload.name,
      Description: payload.description ?? '',
      OnlyAllowMembersViewMembership: payload.onlyAllowMembersViewMembership ?? false,
      AllowMembersEditMembership: payload.allowMembersEditMembership ?? false,
      AllowRequestToJoinLeave: payload.allowRequestToJoinLeave ?? true,
      AutoAcceptRequestToJoinLeave: payload.autoAcceptRequestToJoinLeave ?? false,
      RequestToJoinLeaveEmailSetting: payload.requestToJoinLeaveEmailSetting ?? ''
    });

    // Owner must be set in a separate call — SP ignores the Owner field in the add() body.
    if (payload.owner) {
      await this.setGroupOwner(createdGroup.Id, payload.owner);
    }

    if (payload.permissionLevelIds?.length) {
      await this.setGroupPermissions(createdGroup.Id, payload.permissionLevelIds);
    }

    return this._sp.web.siteGroups.getById(createdGroup.Id)();
  }

  public async updateGroup(groupId: number, payload: IUpdateGroupPayload): Promise<ISiteGroupInfo> {
    const updatePayload: Partial<ISiteGroupInfo> = {};

    if (payload.name?.trim()) {
      updatePayload.Title = payload.name.trim();
    }

    if (payload.description !== undefined) {
      updatePayload.Description = payload.description;
    }

    if (payload.onlyAllowMembersViewMembership !== undefined) {
      updatePayload.OnlyAllowMembersViewMembership = payload.onlyAllowMembersViewMembership;
    }

    if (payload.allowMembersEditMembership !== undefined) {
      updatePayload.AllowMembersEditMembership = payload.allowMembersEditMembership;
    }

    if (payload.allowRequestToJoinLeave !== undefined) {
      updatePayload.AllowRequestToJoinLeave = payload.allowRequestToJoinLeave;
    }

    if (payload.autoAcceptRequestToJoinLeave !== undefined) {
      updatePayload.AutoAcceptRequestToJoinLeave = payload.autoAcceptRequestToJoinLeave;
    }

    if (payload.requestToJoinLeaveEmailSetting !== undefined) {
      updatePayload.RequestToJoinLeaveEmailSetting = payload.requestToJoinLeaveEmailSetting;
    }

    if (Object.keys(updatePayload).length > 0) {
      await this._sp.web.siteGroups.getById(groupId).update(updatePayload);
    }

    if (payload.owner) {
      await this.setGroupOwner(groupId, payload.owner);
    }

    if (payload.permissionLevelIds !== undefined) {
      await this.setGroupPermissions(groupId, payload.permissionLevelIds);
    }

    return this._sp.web.siteGroups.getById(groupId)();
  }

  public async deleteGroup(groupId: number): Promise<void> {
    await this._sp.web.siteGroups.removeById(groupId);
  }

  public async getUsersInGroup(groupId: number): Promise<IUserListItem[]> {
    const users = await this._sp.web.siteGroups.getById(groupId).users
      .select('Id', 'Title', 'Email', 'LoginName', 'UserPrincipalName', 'IsSiteAdmin')();

    // For any user whose Title looks like an email address, resolve their
    // true display name by calling ensureUser + getUserById (same technique
    // used in getAllPrincipalsWithPermissions). This handles accounts where
    // SharePoint stores the UPN/email in the Title field instead of the
    // friendly display name (e.g. admin@<tenant>.onmicrosoft.com).
    const resolved = await Promise.all(
      users.map(async (user) => {
        const title = (user.Title ?? '').trim();
        if (title.includes('@')) {
          try {
            const candidate = (user.Email ?? user.LoginName ?? title).trim();
            if (candidate) {
              const ensured = await this._sp.web.ensureUser(this._toLoginName(candidate));
              const userProfile = await this._sp.web.getUserById(ensured.Id)();
              return {
                ...user,
                Title: userProfile.Title ?? user.Title,
                Email: userProfile.Email ?? user.Email,
                LoginName: userProfile.LoginName ?? user.LoginName
              };
            }
          } catch {
            // Best-effort only — fall back to the original user data
          }
        }
        return user;
      })
    );

    return resolved.map((user) => this._mapUser(user));
  }

  public async getCurrentUserPermissions(): Promise<ICurrentUserPermissions> {
    try {
      const canManageGroups = await this._sp.web.currentUserHasPermissions(PermissionKind.ManagePermissions);
      return { canManageGroups };
    } catch {
      return { canManageGroups: false };
    }
  }

  public async getGroupOwner(groupId: number): Promise<IPrincipalListItem | undefined> {
    try {
      const response = await this._context.spHttpClient.get(
        `${this._webAbsoluteUrl}/_api/web/SiteGroups/getById(${groupId})/Owner`,
        SPHttpClient.configurations.v1,
        { headers: { Accept: SPService._jsonAcceptHeaderValue } }
      );

      if (!response.ok) {
        return undefined;
      }

      const ownerData = await response.json() as {
        Id?: number;
        Title?: string;
        LoginName?: string;
        Email?: string;
        PrincipalType?: number;
      };

      if (!ownerData.Id || !ownerData.LoginName) {
        return undefined;
      }

      const principalType: TPrincipalType =
        ownerData.PrincipalType !== undefined && [2, 4, 8].includes(ownerData.PrincipalType)
          ? 'Group'
          : 'User';

      return {
        key: `${principalType.toLowerCase()}:${ownerData.Id}`,
        id: ownerData.Id,
        displayName: ownerData.Title ?? ownerData.LoginName,
        secondaryText: ownerData.Email ?? ownerData.LoginName,
        principalType,
        loginName: ownerData.LoginName,
        email: ownerData.Email || undefined
      };
    } catch {
      return undefined;
    }
  }

  public async getGroupPermissions(groupId: number): Promise<IPermissionLevel[]> {
    try {
      const response = await this._getJson<IApiCollection<IRestPermissionLevel>>(
        `/_api/web/roleassignments/getbyprincipalid(${groupId})/roledefinitionbindings`
      );

      return response.value.map((permissionLevel) => this._mapPermissionLevel(permissionLevel));
    } catch (error) {
      if (error instanceof Error && error.message.includes('(404)')) {
        return [];
      }

      throw error;
    }
  }

  public async getPermissionLevels(searchText?: string): Promise<IPermissionLevel[]> {
    const roleDefinitions = await this._sp.web.roleDefinitions();

    const mappedPermissionLevels = (roleDefinitions as unknown as IRestPermissionLevel[])
      .map((permissionLevel) => this._mapPermissionLevel(permissionLevel))
      // Hide internal/system levels (for example System.LimitedView/System.LimitedEdit)
      // to match the out-of-the-box SharePoint UI.
      .filter((level) => !level.name.startsWith('System.'));

    if (!searchText?.trim()) {
      return mappedPermissionLevels;
    }

    const normalizedSearch = searchText.trim().toLowerCase();

    return mappedPermissionLevels.filter((permissionLevel) =>
      permissionLevel.name.toLowerCase().includes(normalizedSearch) ||
      permissionLevel.description.toLowerCase().includes(normalizedSearch)
    );
  }

  public async setGroupPermissions(groupId: number, permissionLevelIds: number[]): Promise<void> {
    await this._replacePrincipalPermissions(groupId, permissionLevelIds);
  }

  public async addUserToGroup(groupId: number, userEmailOrLoginName: string): Promise<void> {
    const ensuredUser = await this._sp.web.ensureUser(this._toLoginName(userEmailOrLoginName));
    await this._sp.web.siteGroups.getById(groupId).users.add(ensuredUser.LoginName);
  }

  public async removeUserFromGroup(groupId: number, userId: number): Promise<void> {
    await this._sp.web.siteGroups.getById(groupId).users.removeById(userId);
  }

  public async removeUsersFromGroup(groupId: number, userIds: number[]): Promise<void> {
    await Promise.all(userIds.map((userId) => this.removeUserFromGroup(groupId, userId)));
  }


  public async changeUserPermissions(userEmailOrLoginName: string, permissionLevelIds: number[]): Promise<void> {
    const ensuredUser = await this._sp.web.ensureUser(this._toLoginName(userEmailOrLoginName));
    await this._replacePrincipalPermissions(ensuredUser.Id, permissionLevelIds);
  }

  public async removeUserPermissionsFromSite(userId: number): Promise<void> {
    // Removes all direct role assignments on the web for this user
    await this._replacePrincipalPermissions(userId, []);
  }

  public async grantPermissionsToUsers(
    loginNames: string[],
    mode: 'group' | 'direct',
    groupIdOrPermLevelIds: number[]
  ): Promise<void> {
    if (groupIdOrPermLevelIds.length === 0 || loginNames.length === 0) return;

    if (mode === 'group') {
      await Promise.all(
        groupIdOrPermLevelIds.map((groupId) =>
          Promise.all(loginNames.map((loginName) => this.addUserToGroup(groupId, loginName)))
        )
      );
    } else {
      const ensuredUsers = await Promise.all(
        loginNames.map((loginName) => this._sp.web.ensureUser(this._toLoginName(loginName)))
      );

      await Promise.all(
        ensuredUsers.map((user) =>
          this._replacePrincipalPermissions(user.Id, groupIdOrPermLevelIds)
        )
      );
    }
  }

  public async getUserPermissionsOnSite(loginName: string): Promise<IUserSitePermissions> {
    const resolvedLoginName = this._toLoginName(loginName);
    const ensuredUser = await this._sp.web.ensureUser(resolvedLoginName);
    const userId = ensuredUser.Id;

    const [userData, userGroups, groupsWithPermissions, directPermLevels] = await Promise.all([
      this._sp.web.getUserById(userId)(),
      this.getGroupsForUser(userId),
      this.getGroupsWithPermissions(),
      this.getGroupPermissions(userId)
    ]);

    const displayName = userData.Title ?? loginName;

   
    const userGroupIds = new Set(userGroups.map((g) => g.Id));
   
    const visibleGroupMemberships: Array<{ groupId: number; groupTitle: string; permissionLevelNames: string[]; isDirectMember: boolean; canEditMembership: boolean }> = [];

    for (const group of groupsWithPermissions) {
      try {
        const [canView, canEdit] = await Promise.all([
            this._getGroupBooleanProp(group.Id, 'CanCurrentUserViewMembership'),
            this._getGroupBooleanProp(group.Id, 'CanCurrentUserEditMembership')
          ]);
        if (!canView) {
          continue;
        }

        const uniquePermissionNames = [...new Set(group.permissionLevelNames)];
        visibleGroupMemberships.push({
          groupId: group.Id,
          groupTitle: group.Title,
          permissionLevelNames: uniquePermissionNames,
          isDirectMember: userGroupIds.has(group.Id),
          canEditMembership: canEdit
        });
      } catch {
        // If we can't evaluate CanCurrentUserViewMembership for this group,
        // just skip it and continue with the rest.
      }
    }

    return {
      id: userId,
      loginName: ensuredUser.LoginName,
      displayName,
      directPermissions: directPermLevels.map((p) => ({ permissionLevelId: p.id, permissionLevelName: p.name })),
      groupMemberships: visibleGroupMemberships
    };
  }

  public async bulkAddUsers(
    users: IBulkUserInput[],
    onProgress?: (processed: number, total: number) => void
  ): Promise<IBulkAddUsersResult> {
    const validUsers = users
      .map((user, index) => ({
        row: index + 1,
        email: user.email?.trim(),
        displayName: user.displayName?.trim() ?? '',
        role: user.role
      }))
      .filter((user) => Boolean(user.email) && Boolean(user.displayName));

    const result: IBulkAddUsersResult = {
      total: users.length,
      processed: 0,
      added: 0,
      failed: users.length - validUsers.length,
      errors: users
        .map((user, index) => ({ user, row: index + 1 }))
        .filter(({ user }) => !user.email?.trim() || !user.displayName?.trim())
        .map(({ user, row }) => ({
          row,
          email: user.email ?? '',
          error: 'Missing required fields: Email and Display Name'
        }))
    };

    const chunkedUsers = this._chunkArray(validUsers, 100);

    for (const chunk of chunkedUsers) {
      const [batchedSp, execute] = this._sp.batched();
      const operations = chunk.map((user: { email: string; row: number; displayName: string }) => batchedSp.web.ensureUser(this._toLoginName(user.email)));
      await execute();

      const settledResults = await Promise.allSettled(operations);

      for (let index = 0; index < settledResults.length; index += 1) {
        const settled = settledResults[index];
        const user = chunk[index];

        result.processed += 1;

        if (settled.status === 'fulfilled') {
          result.added += 1;

          if (user.displayName) {
            await this._sp.web.getUserById(settled.value.Id).update({
              Title: user.displayName
            });
          }
        } else {
          result.failed += 1;
          result.errors.push({
            row: user.row,
            email: user.email ?? '',
            error: settled.reason instanceof Error ? settled.reason.message : 'Failed to add user'
          });
        }

        onProgress?.(result.processed, validUsers.length);
      }
    }

    return result;
  }

  public async bulkAddUsersToGroup(
    groupId: number,
    users: IBulkUserInput[],
    onProgress?: (processed: number, total: number) => void,
    options?: {
      sendEmail?: boolean;
      emailSubject?: string;
      emailBody?: string;
    }
  ): Promise<IBulkAddUsersResult> {
    const validUsers = users
      .map((user, index) => ({
        row: index + 1,
        email: user.email?.trim(),
        displayName: user.displayName?.trim() ?? ''
      }))
      .filter((user) => Boolean(user.email));

    const result: IBulkAddUsersResult = {
      total: users.length,
      processed: 0,
      added: 0,
      failed: users.length - validUsers.length,
      errors: users
        .map((user, index) => ({ user, row: index + 1 }))
        .filter(({ user }) => !user.email?.trim())
        .map(({ user, row }) => ({
          row,
          email: user.email ?? '',
          error: 'Missing required field: Email'
        }))
    };

    const resolvedPrincipals: Array<IShareObjectUserPrincipal & { row: number; email: string }> = [];

    for (const element of validUsers) {
      const user = element;

      result.processed += 1;

      try {
        const ensuredUser = await this._sp.web.ensureUser(this._toLoginName(user.email));
        const siteUser = await this._sp.web.getUserById(ensuredUser.Id)();

        const normalizedEmail = (siteUser.Email ?? user.email ?? '').trim();
        const displayName = (siteUser.Title ?? user.displayName ?? normalizedEmail).trim();
        const loginName = (siteUser.LoginName ?? ensuredUser.LoginName ?? this._toLoginName(normalizedEmail)).trim();

        resolvedPrincipals.push({
          row: user.row,
          email: normalizedEmail,
          Key: loginName,
          DisplayText: displayName,
          IsResolved: true,
          Description: normalizedEmail,
          EntityType: 'User',
          EntityData: {
            Email: normalizedEmail
          },
          ProviderName: 'Tenant',
          ProviderDisplayName: 'Tenant',
          Resolved: true
        });

      } catch (error) {
        result.failed += 1;
        result.errors.push({
          row: user.row,
          email: user.email ?? '',
          error: getErrorMessage(error)
        });
      }

      onProgress?.(result.processed, validUsers.length);
    }

    if (resolvedPrincipals.length === 0) {
      return result;
    }

    try {
      await this._shareUsersWithGroup(
        groupId,
        resolvedPrincipals,
        options?.sendEmail ?? false,
        options?.emailSubject,
        options?.emailBody
      );

      result.added += resolvedPrincipals.length;
    } catch (error) {
      const errorMessage = getErrorMessage(error);

      resolvedPrincipals.forEach((principal) => {
        result.failed += 1;
        result.errors.push({
          row: principal.row,
          email: principal.email,
          error: errorMessage
        });
      });
    }

    return result;
  }

  private async _shareUsersWithGroup(
    groupId: number,
    users: Array<IShareObjectUserPrincipal>,
    sendEmail: boolean,
    emailSubject?: string,
    emailBody?: string
  ): Promise<void> {
    const groupAccessUrl = `${this._webAbsoluteUrl}/_layouts/15/aclinv.aspx?GroupId=${groupId}&IsDlg=1`;
    const escapedUrl = this._escapeXmlValue(groupAccessUrl);
    const escapedUserPayload = this._escapeXmlValue(JSON.stringify(users));
    const escapedSubject = this._escapeXmlValue(emailSubject ?? '');
    const escapedBody = this._escapeXmlValue(emailBody ?? '');

    const payload = `<Request xmlns="http://schemas.microsoft.com/sharepoint/clientquery/2009" SchemaVersion="15.0.0.0" LibraryVersion="16.0.0.0" ApplicationName="SPFx User Group Manager"><Actions><ObjectPath Id="1" ObjectPathId="0" /><Query Id="2" ObjectPathId="0"><Query SelectAllProperties="true"><Properties /></Query></Query></Actions><ObjectPaths><StaticMethod Id="0" Name="ShareObject" TypeId="{a489add2-5d3a-4de8-9445-49259462dceb}"><Parameters><Parameter Type="String">${escapedUrl}</Parameter><Parameter Type="String">${escapedUserPayload}</Parameter><Parameter Type="Null" /><Parameter Type="Number">${groupId}</Parameter><Parameter Type="Boolean">false</Parameter><Parameter Type="Boolean">${sendEmail}</Parameter><Parameter Type="Boolean">false</Parameter><Parameter Type="String">${escapedSubject}</Parameter><Parameter Type="String">${escapedBody}</Parameter><Parameter Type="Null" /></Parameters></StaticMethod></ObjectPaths></Request>`;

    const response = await this._context.spHttpClient.post(
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
      throw new Error(`ShareObject ProcessQuery failed (${response.status}): ${responseText}`);
    }

    const responseText = await response.text();
    const parsed = JSON.parse(responseText) as unknown;

    if (Array.isArray(parsed) && parsed.length > 0) {
      const first = parsed[0];

      if (first && typeof first === 'object') {
        const errorInfo = (first as { ErrorInfo?: { ErrorMessage?: string } }).ErrorInfo;

        if (errorInfo?.ErrorMessage) {
          throw new Error(errorInfo.ErrorMessage);
        }
      }
    }
  }

  private _toLoginName(emailOrLoginName: string): string {
    const normalizedValue = emailOrLoginName.trim();

    if (normalizedValue.toLowerCase().startsWith('i:0#.f|membership|')) {
      return normalizedValue;
    }

    return `i:0#.f|membership|${normalizedValue}`;
  }

  private async _replacePrincipalPermissions(principalId: number, permissionLevelIds: number[]): Promise<void> {
    const currentPermissions = await this.getGroupPermissions(principalId);
    const currentPermissionIds = new Set(currentPermissions.map(({ id }) => id));
    const nextPermissionIds = new Set(permissionLevelIds);

    const permissionIdsToRemove = [...currentPermissionIds].filter(id => !nextPermissionIds.has(id));
    const permissionIdsToAdd = [...nextPermissionIds].filter(id => !currentPermissionIds.has(id));

    await Promise.all([
        ...permissionIdsToRemove.map(id => this._sp.web.roleAssignments.remove(principalId, id)),
        ...permissionIdsToAdd.map(id => this._sp.web.roleAssignments.add(principalId, id))
    ]);
  }

  /**
   * SharePoint returns group boolean properties e.g. CanCurrentUserEditMembership
   * wrapped in an OData envelope: { d: { CanCurrentUserEditMembership: false } }.
   * After _normalizeODataResponse the envelope is unwrapped to the inner object,
   * NOT to the raw boolean — so casting it as boolean yields `true` (object is truthy).
   * This helper extracts the actual boolean from whichever shape is returned.
   */
  private async _getGroupBooleanProp(groupId: number, propName: string): Promise<boolean> {
    const raw = await this._getJson<Record<string, unknown>>(
      `/_api/web/sitegroups/getById(${groupId})/${propName}`
    );
    // OData v3 unwrapped: { PropName: true/false }
    if (raw && typeof raw[propName] === 'boolean') {
      return raw[propName];
    }
    // OData v4 unwrapped: { value: true/false }
    if (raw && typeof raw.value === 'boolean') {
      return raw.value;
    }
    // Fallback: treat as falsy so we never grant access by accident
    return false;
  }

  private async _getJson<T>(apiUrl: string): Promise<T> {
    const requestUrl = `${this._webAbsoluteUrl}${apiUrl}`;
    const acceptCandidates: Array<string | undefined> = [
      SPService._jsonAcceptHeaderValue,
      SPService._legacyJsonAcceptHeaderValue,
      undefined
    ];

    let lastError: Error | undefined;

    for (const acceptHeader of acceptCandidates) {
      const response = await this._context.spHttpClient.get(
        requestUrl,
        SPHttpClient.configurations.v1,
        {
          headers: acceptHeader
            ? {
              Accept: acceptHeader
            }
            : undefined
        }
      );

      if (response.ok) {
        const rawData = (await response.json()) as unknown;
        return this._normalizeODataResponse<T>(rawData);
      }

      const responseText = await response.text();
      const error = new Error(`SharePoint request failed (${response.status}): ${responseText}`);
      lastError = error;

      const isInvalidAcceptError = response.status === 400 && responseText.toLowerCase().includes('header accept');
      if (!isInvalidAcceptError) {
        throw error;
      }
    }

    throw lastError ?? new Error('SharePoint request failed with unknown error');
  }

  private _normalizeODataResponse<T>(rawData: unknown): T {
    if (!rawData || typeof rawData !== 'object') {
      return rawData as T;
    }

    const data = rawData as { d?: unknown; value?: unknown };

    if (Array.isArray(data.value)) {
      return rawData as T;
    }

    if (data.d && typeof data.d === 'object') {
      const dData = data.d as { results?: unknown[] };

      if (Array.isArray(dData.results)) {
        return { value: dData.results } as T;
      }

      return data.d as T;
    }

    return rawData as T;
  }

  private _mapUser(user: ISiteUserInfo): IUserListItem {
    return {
      id: user.Id,
      displayName: user.Title,
      email: user.Email,
      userPrincipalName: user.UserPrincipalName ?? '',
      loginName: user.LoginName,
      isSiteAdmin: user.IsSiteAdmin
    };
  }

  private _mapPermissionLevel(permissionLevel: IRestPermissionLevel): IPermissionLevel {
    return {
      id: permissionLevel.Id,
      name: permissionLevel.Name,
      description: permissionLevel.Description ?? '',
      roleTypeKind: permissionLevel.RoleTypeKind,
      order: permissionLevel.Order,
      basePermissionsLow: permissionLevel.BasePermissions ? Number.parseInt(permissionLevel.BasePermissions.Low, 10) || 0 : 0,
      basePermissionsHigh: permissionLevel.BasePermissions ? Number.parseInt(permissionLevel.BasePermissions.High, 10) || 0 : 0
    };
  }

  public async createPermissionLevel(
    name: string,
    description: string,
    basePermissionsLow: number,
    basePermissionsHigh: number
  ): Promise<IPermissionLevel> {
    const result = await this._sp.web.roleDefinitions.add(
      name,
      description,
      0,
      { Low: basePermissionsLow, High: basePermissionsHigh }
    );

    return this._mapPermissionLevel(result.data as unknown as IRestPermissionLevel);
  }

  public async updatePermissionLevel(
    id: number,
    name: string,
    description: string,
    basePermissionsLow: number,
    basePermissionsHigh: number
  ): Promise<void> {
    await this._sp.web.roleDefinitions.getById(id).update({
      Name: name,
      Description: description,
      BasePermissions: { Low: basePermissionsLow, High: basePermissionsHigh }
    });
  }

  public async deletePermissionLevel(id: number): Promise<void> {
    await this._sp.web.roleDefinitions.getById(id).delete();
  }

  private _chunkArray<T>(array: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
}
