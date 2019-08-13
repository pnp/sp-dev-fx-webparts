import { ISPListItem } from "./ISPList";

export interface IEmployee extends ISPListItem {
    MNMatter?: number;
    Title?: string;
    MatBillTo?: number;    
}