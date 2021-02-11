import { ListField } from "../model/IListConfigProps";
import { IListSearchListQuery } from "../model/IMapQuery";

export default interface IListService {
  getListItems(listQueryOptions: IListSearchListQuery, listPropertyName: string, sitePropertyName: string, sitePropertyValue: string, rowLimit: number): Promise<Array<any>>;
  getListItemById(listQueryOptions: IListSearchListQuery, itemId: number): Promise<any>;
  getSiteListsTitle(): Promise<Array<any>>;
  getListFields(listTitle: string): Promise<Array<ListField>>;
}
