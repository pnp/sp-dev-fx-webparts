import { ISPListItem } from "./ISPList";

export interface IClient extends ISPListItem {
    CliSysNbr?: number;
    CliCode?: string;
    CliNickName?: string;
}