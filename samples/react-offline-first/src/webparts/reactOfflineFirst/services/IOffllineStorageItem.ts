import { IOfflineStorageRequestValue } from './IOfflineStorageRequestValue';
export interface IOfflineStorageItem {
    offlineItem: any;
    onlineItem: Promise<any>;
}
