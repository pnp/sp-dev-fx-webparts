import {IWebPartContext} from '@microsoft/sp-webpart-base';
export interface ISearchAction {
    actionType: Number;
    context?: IWebPartContext;
    query?: string;
    maxResults?: number;
    sorting?: string;
    fields?: string;
}