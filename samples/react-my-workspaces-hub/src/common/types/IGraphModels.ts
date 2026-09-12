/** A person (owner/member) resolved from Microsoft Graph. */
export interface IPersonInfo {
  id: string;
  displayName: string;
  email?: string;
  userPrincipalName?: string;
  jobTitle?: string;
}

/** Owners + members of a group-connected site/team. */
export interface IMembership {
  owners: IPersonInfo[];
  members: IPersonInfo[];
  visitors: IPersonInfo[];
}

/** Microsoft 365 / Entra group the current user belongs to. */
export interface IGroupInfo {
  id: string;
  displayName: string;
  description?: string;
  mail?: string;
  mailNickname?: string;
  visibility?: string;
  groupTypes: string[];
  securityEnabled: boolean;
  mailEnabled: boolean;
  createdDateTime?: string;
  renewedDateTime?: string;
  webUrl?: string;
  isTeam: boolean;
}

/** Group metadata plus owners and members for the detail drawer. */
export interface IGroupDetails extends IGroupInfo {
  owners: IPersonInfo[];
  members: IPersonInfo[];
  visitors: IPersonInfo[];
  currentUser?: IPersonInfo;
  canManageMembership: boolean;
}

/** Storage + lifecycle details for a site. */
export interface ISiteDetails {
  description?: string;
  createdDateTime?: string;
  lastModifiedDateTime?: string;
  storageUsed?: number;
  storageTotal?: number;
  storageRemaining?: number;
}

/** A recently used file surfaced from Graph insights/search. */
export interface IRecentFile {
  id: string;
  name: string;
  webUrl?: string;
  type?: string;
  lastUsed?: string;
  containerName?: string;
}

/** A SharePoint file surfaced from Search for dashboard file activity. */
export interface IFileInfo {
  id: string;
  name: string;
  webUrl?: string;
  type?: string;
  modified?: string;
  containerName?: string;
  checkedOutTo?: string;
}
