import { ISPListItem } from "./ISPList";

export interface IBill extends ISPListItem {
    MNMatter?: number;
    BillType?: string;
    BillNbr?: number;
    BillAmt?: number;
    BillBalance?: number;
    MatBillTo?: number;
}