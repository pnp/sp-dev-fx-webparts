import { ListItem } from "./ListItem";
import { SPHttpClient } from "@microsoft/sp-http";

export interface IListService {
    getAll(listName:string): Promise<Array<ListItem>>;
}