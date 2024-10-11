import { SiteList } from "./IListConfigProps";
import { SharePointType } from "./ISharePointFieldTypes";

export interface IMapQuery {
  [site: string]: IMapQueryList;
}

export interface IMapQueryList {
  [list: string]: IListSearchListQuery;
}

export interface IListSearchListQuery {
  list: SiteList;
  audienceEnabled: boolean;
  camlQuery?: string;
  viewName?: string;
  fields: Array<IListSearchListQueryItem>;
}

export interface IListSearchListQueryItem{
  originalField: string;
  newField: string;
  fieldType: SharePointType;
}

