import { BaseType, CopyTaskState } from "./enums";
import { ISearchResult } from "@pnp/sp/search";

export interface ICopyTask {
    index: number;
    sourceView: IListView;
    targetList: IList;
    state: CopyTaskState;
    error?: string;
}

export interface IList {
    title: string;
    id: string;
    type: BaseType;
    siteUrl: string;
    listUrl: string;
    siteTitle?: string;
    uniqueKey?: string;
}

export interface IListSearchResult extends ISearchResult {
    BaseType: string;
    ListUrl: string;
    SPSiteURL: string;
    SiteTitle: string;
    SiteId: string;
    ListId: string;
}

export interface IListView {
    id: string;
    title: string;
    viewUrl:string;
    // eslint-disable-next-line @rushstack/no-new-null
    viewType: "KANBAN" | "TILES" | "COMPACTLIST" | "MODERNCALENDAR" | null;
    fileName: string;
    listId: string;
    listBaseType: BaseType;
    siteUrl: string;
}

export interface ISite {
    title: string;
    url: string;
}


export interface IDefaults {
    viewId?: string;
    listId?: string;
    siteUrl?: string;
}