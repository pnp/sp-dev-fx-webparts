import { IListItem } from "./models/IListItem";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
export  interface IFactory {
    getItems(requester: SPHttpClient, siteUrl: string, listName: string): Promise<any[]>;
}