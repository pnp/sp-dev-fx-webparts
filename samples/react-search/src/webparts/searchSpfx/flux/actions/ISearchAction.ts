import {IWebPartContext} from '@microsoft/sp-client-preview';
export interface ISearchAction {
    actionType: Number;
    context?: IWebPartContext;
    query?: string;
    maxResults?: number;
    sorting?: string;
    fields?: string;
}