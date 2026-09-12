import type { MSGraphClientFactory, MSGraphClientV3 } from '@microsoft/sp-http';
import type { Group, User } from '@microsoft/microsoft-graph-types';

/** Categories of group the {@link GraphService} can search for. */
export type TGraphGroupKind = 'm365' | 'security';

/** Options accepted by {@link GraphService.searchUsers}. */
export interface IGraphSearchUsersOptions {
  /** Maximum number of users to return. Default 20. */
  top?: number;
  /**
   * When provided, restricts results to members of the supplied
   * AAD group object id.
   */
  groupObjectId?: string;
}

/** Options accepted by {@link GraphService.searchGroups}. */
export interface IGraphSearchGroupsOptions {
  /** Maximum number of groups to return. Default 20. */
  top?: number;
  /**
   * Group kinds to include. Defaults to `['m365']`.
   * - `'m365'` — unified (Microsoft 365) groups.
   * - `'security'` — security-enabled groups that are NOT unified.
   */
  kinds?: TGraphGroupKind[];
}

/** Result envelope returned by {@link GraphService} search calls. */
export interface IGraphSearchResult<TPayload> {
  /** Subset of fields most commonly displayed by the People Picker. */
  id: string;
  displayName: string;
  secondaryText?: string;
  email?: string;
  userPrincipalName?: string;
  loginName?: string;
  /** Full Graph payload — exposed verbatim so consumers can read any property. */
  data: TPayload;
}

const USER_SELECT_FIELDS = [
  'id',
  'displayName',
  'mail',
  'userPrincipalName',
  'givenName',
  'surname',
  'jobTitle',
  'department',
  'officeLocation',
  'mobilePhone',
  'businessPhones',
  'preferredLanguage',
  'accountEnabled',
  'companyName'
].join(',');

const GROUP_SELECT_FIELDS = [
  'id',
  'displayName',
  'mail',
  'mailNickname',
  'description',
  'groupTypes',
  'securityEnabled',
  'visibility',
  'createdDateTime'
].join(',');

/**
 * Encapsulates Microsoft Graph queries used by the People Picker.
 *
 * @remarks
 * The class is **additive** — it does not modify or wrap the existing
 * `SPService`. Pass an `MSGraphClientFactory` (typically
 * `webPartContext.msGraphClientFactory`) at construction time. Each call
 * obtains a v3 client lazily so consumers do not need to await the factory
 * themselves.
 */
export class GraphService {
  private readonly _factory: MSGraphClientFactory;
  private _clientPromise: Promise<MSGraphClientV3> | undefined;

  public constructor(factory: MSGraphClientFactory) {
    this._factory = factory;
  }

  /**
   * Searches AAD users by display name / email / UPN.
   *
   * @param query - The user-entered search text (already trimmed).
   * @param options - Optional `top` and `groupObjectId` filters.
   * @returns Up to `top` matching users, each carrying the full Graph payload
   *          on `.data` so unmapped properties remain available to consumers.
   */
  public async searchUsers(
    query: string,
    options?: IGraphSearchUsersOptions
  ): Promise<IGraphSearchResult<User>[]> {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return [];
    }

    const top = options?.top ?? 20;
    const client = await this._getClient();

    if (options?.groupObjectId) {
      // Members endpoint does not support $search reliably; pull a page and
      // filter client-side. Group membership pickers are typically small.
      const request = client
        .api(`/groups/${options.groupObjectId}/members/microsoft.graph.user`)
        .version('v1.0')
        .select(USER_SELECT_FIELDS)
        .top(Math.min(top * 10, 999));

      const response = (await request.get()) as { value: User[] };
      const lowered = trimmedQuery.toLowerCase();

      const filtered = (response.value ?? []).filter((user) => {
        const haystacks = [user.displayName, user.mail, user.userPrincipalName, user.givenName, user.surname]
          .filter((value): value is string => Boolean(value))
          .map((value) => value.toLowerCase());

        return haystacks.some((value) => value.includes(lowered));
      });

      return filtered.slice(0, top).map((user) => GraphService._mapUser(user));
    }

    const escaped = GraphService._escapeODataLiteral(trimmedQuery);
    const filter =
      `startswith(displayName,'${escaped}') ` +
      `or startswith(mail,'${escaped}') ` +
      `or startswith(userPrincipalName,'${escaped}') ` +
      `or startswith(givenName,'${escaped}') ` +
      `or startswith(surname,'${escaped}')`;

    const request = client
      .api('/users')
      .version('v1.0')
      .header('ConsistencyLevel', 'eventual')
      .filter(filter)
      .select(USER_SELECT_FIELDS)
      .top(top);

    const response = (await request.get()) as { value: User[] };
    return (response.value ?? []).slice(0, top).map((user) => GraphService._mapUser(user));
  }

  /**
   * Searches AAD groups, optionally restricted to Microsoft 365 (unified)
   * groups, security groups, or both.
   */
  public async searchGroups(
    query: string,
    options?: IGraphSearchGroupsOptions
  ): Promise<IGraphSearchResult<Group>[]> {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) {
      return [];
    }

    const top = options?.top ?? 20;
    const kinds = options?.kinds && options.kinds.length > 0 ? options.kinds : ['m365' as TGraphGroupKind];

    const wantsM365 = kinds.includes('m365');
    const wantsSecurity = kinds.includes('security');

    if (!wantsM365 && !wantsSecurity) {
      return [];
    }

    const client = await this._getClient();
    const escaped = GraphService._escapeODataLiteral(trimmedQuery);
    const nameFilter = `(startswith(displayName,'${escaped}') or startswith(mail,'${escaped}'))`;

    const kindClauses: string[] = [];

    if (wantsM365) {
      kindClauses.push(`groupTypes/any(c:c eq 'Unified')`);
    }

    if (wantsSecurity) {
      // Security groups: securityEnabled=true AND not Unified
      kindClauses.push(`(securityEnabled eq true and not(groupTypes/any(c:c eq 'Unified')))`);
    }

    const kindFilter = kindClauses.length === 1 ? kindClauses[0] : `(${kindClauses.join(' or ')})`;
    const filter = `${nameFilter} and ${kindFilter}`;

    const request = client
      .api('/groups')
      .version('v1.0')
      .header('ConsistencyLevel', 'eventual')
      .filter(filter)
      .select(GROUP_SELECT_FIELDS)
      .top(top);

    const response = (await request.get()) as { value: Group[] };
    return (response.value ?? []).slice(0, top).map((group) => GraphService._mapGroup(group));
  }

  private async _getClient(): Promise<MSGraphClientV3> {
    if (!this._clientPromise) {
      this._clientPromise = this._factory.getClient('3') as Promise<MSGraphClientV3>;
    }

    return this._clientPromise;
  }

  private static _mapUser(user: User): IGraphSearchResult<User> {
    const id = user.id ?? '';
    const displayName = (user.displayName ?? user.userPrincipalName ?? user.mail ?? id).toString();
    const email = (user.mail ?? user.userPrincipalName ?? undefined) || undefined;

    return {
      id,
      displayName,
      secondaryText: email ?? user.jobTitle ?? undefined,
      email,
      userPrincipalName: user.userPrincipalName ?? undefined,
      loginName: user.userPrincipalName
        ? `i:0#.f|membership|${user.userPrincipalName}`
        : undefined,
      data: user
    };
  }

  private static _mapGroup(group: Group): IGraphSearchResult<Group> {
    const id = group.id ?? '';
    const displayName = (group.displayName ?? group.mailNickname ?? id).toString();
    const email = group.mail ?? undefined;

    return {
      id,
      displayName,
      secondaryText: email ?? group.description ?? undefined,
      email,
      data: group
    };
  }

  private static _escapeODataLiteral(value: string): string {
    return value.replace(/'/g, "''");
  }
}
