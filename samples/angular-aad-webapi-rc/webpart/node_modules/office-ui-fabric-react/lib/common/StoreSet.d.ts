import { IStoreKey } from './storeKey';
import { ISubscribable } from './ISubscribable';
export declare class StoreSet {
    private _stores;
    constructor();
    add<T extends ISubscribable>(key: IStoreKey<T>, value: T): StoreSet;
    getStore<T extends ISubscribable>(key: IStoreKey<T>): T;
    merge(stores: StoreSet): StoreSet;
}
