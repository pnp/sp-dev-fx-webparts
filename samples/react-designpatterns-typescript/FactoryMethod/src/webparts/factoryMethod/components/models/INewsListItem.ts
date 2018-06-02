import {IListItem} from "./IListItem";

export interface  INewsListItem extends IListItem {
    newsheader: string;
    newsbody: string;
    expiryDate: Date;
}