import { ListField } from "../model/IListConfigProps";
import { IListSearchListQuery } from "../model/IMapQuery";
import GraphService from "./GraphService";

export default interface IListService {
  getListItems(listQueryOptions: IListSearchListQuery, listPropertyName: string, sitePropertyName: string, sitePropertyValue: string, rowLimit: number, graphService?: GraphService): Promise<Array<any>>;
  getListItemById(listQueryOptions: IListSearchListQuery, itemId: number): Promise<any>;
  getSiteListsTitle(): Promise<Array<any>>;
  getListFields(listTitle: string): Promise<Array<ListField>>;
}
