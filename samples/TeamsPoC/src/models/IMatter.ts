import { ISPListItem } from "./ISPList";

export interface IMatter extends ISPListItem {
    Client?: string;
    MatSysNbr?: number;
    MatCliNbr?: number;
    MatBillTo?: number;
    MatCode?: string;
    MatDescription?: string;
}