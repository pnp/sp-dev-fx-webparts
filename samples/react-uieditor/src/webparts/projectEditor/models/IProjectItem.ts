export interface IProjectItem {
  Id?: number;
  Title: string;
  Description: string;
  Active?: boolean;
  SortOrder?: number;
}

export interface IListInfo {
  Id: string;
  Title: string;
}