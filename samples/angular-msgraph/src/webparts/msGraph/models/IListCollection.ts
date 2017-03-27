export interface IListCollection {
  createdBy: ICreatedBy;
  createdDateTime: Date;
  description: string;
  eTag: string;
  id: string;
  lastModifiedDateTime: Date;
  name: string;
  webUrl: string;
  list: IListInfo;
}

export interface ICreatedBy {
  user: IUser;
}

export interface IUser {
  displayName: string;
}

export interface IListInfo {
  hidden: boolean;
  template: string;
}