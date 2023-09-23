import { ChatMessage } from "@microsoft/microsoft-graph-types";

export interface ITeamsMessage{
    value: ChatMessage[];
    ['@odata.context']:string;
    ['@odata.count']:number;
    ['@odata.nextLink']?:string;
}