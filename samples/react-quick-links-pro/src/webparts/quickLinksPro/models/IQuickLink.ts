export interface IQuickLink {
  id: string;
  title: string;
  url: string;
  iconName?: string;
  description?: string;
  sortOrder?: number;
  openInNewWindow?: boolean;
}

export interface IListInfo {
  id: string;
  title: string;
}