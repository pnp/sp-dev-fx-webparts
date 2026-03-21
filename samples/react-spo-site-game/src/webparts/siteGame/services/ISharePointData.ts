export interface ISPList {
  Id: string;
  Title: string;
  BaseTemplate: number;
  ItemCount: number;
  DefaultViewUrl: string;
  Description: string;
  RootFolder?: { ServerRelativeUrl: string };
}

export interface ISPUser {
  Id: number;
  Title: string;
  Email: string;
  LoginName: string;
}

export interface ISPGroupUser extends ISPUser {
  groupName: 'Owners' | 'Members' | 'Visitors';
}

export interface ISPData {
  siteTitle: string;
  siteAbsoluteUrl: string;
  lists: ISPList[];
  users: ISPGroupUser[];
  currentUser: ISPUser;
}
