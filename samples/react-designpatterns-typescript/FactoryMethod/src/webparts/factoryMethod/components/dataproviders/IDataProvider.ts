import { IWebPartContext } from "@microsoft/sp-webpart-base";
import List from "../models/List";
import {IListItem} from "../models/IListItem";

interface IDataProvider {
  selectedList: List;
  webPartContext: IWebPartContext;
  getLists(): Promise<List[]>;
}

export default IDataProvider;