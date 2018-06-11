import {IListItem} from "./IListItem";

export interface IDirectoryListItem extends IListItem {
        firstName: string;
        lastName: string;
        mobileNumber: string;
        internalNumber: string;
}