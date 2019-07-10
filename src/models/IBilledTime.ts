import { ISPListItem } from "./ISPList";

export interface IBilledTime extends ISPListItem {
    MNMatter?: number;
    BTBillNbr?: number;
    BTMatter?: number;
    BTActualHrsWrk?: number;
    BTDate?: Date;
    BTTkprName?: string;
}