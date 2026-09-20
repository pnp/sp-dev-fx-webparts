import type { IPrincipalListItem, IPrincipalSearchOptions } from './IPrincipal';
import type { IUserListItem } from './IUser';

/**
 * Result returned from {@link ISPService.ensureUser}. Mirrors the shape of
 * SharePoint's `_api/web/ensureuser` endpoint after mapping into camelCase.
 */
export interface IEnsureUserResult {
  /** Numeric SharePoint site user id. */
  id: number;
  /** Claim-formatted login name (e.g. `i:0#.f|membership|user@tenant.com`). */
  loginName: string;
  /** Display title of the user. */
  title: string;
  /** Email address, when available. */
  email?: string;
  /** User principal name, when available. */
  userPrincipalName?: string;
}

/**
 * SharePoint service surface required by the PeoplePicker. The default
 * implementation in `SPService` uses plain SPHttpClient REST calls — no
 * PnPjs dependency — so consumers can ship the picker without pulling in
 * the PnPjs runtime.
 */
export interface ISPService {
  /**
   * Searches for users and/or groups using the SharePoint
   * ClientPeoplePicker (`/_vti_bin/client.svc/ProcessQuery`) endpoint, with
   * a fall-back to the local site users / groups REST endpoints when the
   * ProcessQuery endpoint is unavailable or returns no results.
   *
   * @param searchText - Free-text query to match against display name,
   *   login, and email.
   * @param options - Optional toggles controlling which principal types
   *   are returned and how many results are surfaced.
   */
  searchPrincipals(searchText: string, options?: IPrincipalSearchOptions): Promise<IPrincipalListItem[]>;

  /**
   * Returns the users that belong to a specific SharePoint site group.
   * Used by the PeoplePicker when a caller restricts the search scope to
   * a particular SP site group via `searchInSharePointGroupId`.
   *
   * @param groupId - Numeric id of the SharePoint site group.
   */
  getUsersInGroup(groupId: number): Promise<IUserListItem[]>;

  /**
   * Resolves a user against the current site collection by calling
   * `_api/web/ensureuser`. Used after a Graph-resolved principal is
   * selected so the PeoplePicker can surface the SharePoint site user id
   * that downstream APIs (item permissions, role assignments, etc.)
   * require.
   *
   * @param emailOrLoginName - Either a UPN/email address or an already
   *   claim-formatted login name.
   */
  ensureUser(emailOrLoginName: string): Promise<IEnsureUserResult>;
}
