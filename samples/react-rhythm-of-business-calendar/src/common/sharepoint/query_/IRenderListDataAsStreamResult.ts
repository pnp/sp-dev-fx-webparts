import { IRenderListDataAsStreamResult as IRenderListDataAsStreamResult_PNP } from "@pnp/sp/lists/types";
import { IListItemResult } from "./IListItemResult";

export interface IRenderListDataAsStreamResult<T extends IListItemResult> extends IRenderListDataAsStreamResult_PNP {
    readonly NextHref: string;
    readonly PrevHref: string;
    readonly Row: T[];
}