import {IListItem} from "./IListItem";

export interface  IAnnouncementListItem extends IListItem {
    announcementBody: string;
    expiryDate: Date;
}