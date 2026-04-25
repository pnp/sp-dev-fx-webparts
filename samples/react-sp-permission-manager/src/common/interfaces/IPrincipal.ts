export type TPrincipalType = 'User' | 'Group';

export interface IPrincipalListItem {
  key: string;
  id: number | string;
  displayName: string;
  secondaryText: string;
  principalType: TPrincipalType;
  loginName: string;
  email?: string;
}

export interface IPrincipalSearchOptions {
  includeUsers?: boolean;
  includeGroups?: boolean;
  /** When true, restricts group results to SharePoint site groups only (excludes M365 and security groups) */
  includeSpGroupsOnly?: boolean;
  top?: number;
}
