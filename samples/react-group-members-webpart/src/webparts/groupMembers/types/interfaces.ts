import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface UserPersonaProps {
  user: IUser;
  context: WebPartContext;
}

export interface IGroupMembersProps {
  context: WebPartContext;
  roles: string[];
  itemsPerPage?: number;
  sortField?: string;
  showPresenceIndicator?: boolean;
  showSearchBox?: boolean;
  adminLabel: string;
  memberLabel: string;
  visitorLabel: string;
}

export interface IGroup {
  id: string;
  displayName: string;
  '@odata.type': string;
  description?: string;
}
export interface IUser {
  id: string;

  displayName: string;

  jobTitle?: string;

  mail?: string;

  userPrincipalName: string;

  department?: string;

  officeLocation?: string;

  businessPhones?: string[];

  mobilePhone?: string;
}

export interface IUsersByRole {
  admin: IUser[];

  member: IUser[];

  visitor: IUser[];
}

export interface ICurrentPages {
  admin: number;

  member: number;

  visitor: number;
}

export interface IUserPresence {
  availability: string;
  activity: string;
  lastSeenDateTime?: string;
}


export interface ISharedDocument {
  name: string;
  webUrl: string;
  lastModifiedDateTime: string;
  fileType?: string;
  size?: number;
}