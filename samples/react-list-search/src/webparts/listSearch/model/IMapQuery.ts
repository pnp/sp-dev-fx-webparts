import { SiteList } from "./IListConfigProps";
import { SharePointType } from "./ISharePointFieldTypes";

export interface IMapQuery {
  [site: string]: Array<IMapQueryList>;
}

export interface IMapQueryList {
  [list: string]: Array<IListSearchListQuery>;
}

export interface IListSearchListQuery {
  list: SiteList;
  audienceEnabled: boolean;
  camlQuery?: string;
  viewName?: string;
  fields: Array<{ originalField: string, newField: string, fieldType: SharePointType }>;
}

