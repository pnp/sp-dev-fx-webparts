/** Mapped representation of a SharePoint site user. */
export interface IUserListItem {
  /** Numeric site user id. */
  id: number;
  /** Friendly display name. */
  displayName: string;
  /** Primary email address (empty string when unknown). */
  email: string;
  /** Azure AD user principal name (empty string when unknown). */
  userPrincipalName: string;
  /** Claim-formatted login name (e.g. `i:0#.f|membership|user@tenant.com`). */
  loginName: string;
  /** Whether the user is a site collection administrator. */
  isSiteAdmin: boolean;
}
