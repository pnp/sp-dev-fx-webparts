import { ChatMessage } from "@microsoft/microsoft-graph-types";

export interface IAllConversationsState{
    allChatMessage : ChatMessage[];
    filteredMessage : ChatMessage[];
    nextLink:string;
    expandedMessageId: string;
    allRepliedMessage: ChatMessage[];
    filteredRepliedMessage: ChatMessage[];
    isFilterOpen: boolean;
    viewName:ViewName;
    isLoading: boolean;
}

export enum ViewName{
    "Grid",
    "Table"
}