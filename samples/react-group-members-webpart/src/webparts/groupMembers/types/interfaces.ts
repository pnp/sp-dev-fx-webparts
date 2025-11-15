import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface UserPersonaProps {
  user: IUser;
  context: WebPartContext;
}


export interface IGroup {
  id: string;
  displayName: string;
  '@odata.type': string;
  description?: string;
}

export interface ISite {
  id: string;
  displayName: string;
  webUrl: string;
  siteCollectionId?: string;
  webId?: string;
  isPersonalSite?: boolean;
}

export interface ISiteAccess {
  id: string;
  displayName: string;
  roles: string[];
  principalType: 'User' | 'Group' | 'SecurityGroup';
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

  accessLevel?: 'owner' | 'admin' | 'member' | 'visitor';

  source?: 'group' | 'site';
  principalType?: 'User' | 'Group' | 'SecurityGroup' | 'ClaimsPrincipal' | string;
  isGroup?: boolean;
}

export interface IUsersByRole {
  owner: IUser[];

  admin: IUser[];

  member: IUser[];

  visitor: IUser[];
}

export interface ICurrentPages {
  owner: number;

  admin: number;

  member: number;

  visitor: number;
}

export interface IUserPresence {
  availability: string;
  activity: string;
  lastSeenDateTime?: string;
}

