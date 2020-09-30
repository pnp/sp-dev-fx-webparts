import ICacheProvider, { CacheTimeout } from "./ICacheProvider";
import IStorage from "./IStorage";

export default class StorageCacheProvider implements ICacheProvider {
    private cacheKeyPrefix: string = "__E2.";
    private storage: IStorage | undefined;

    constructor(storage: IStorage | undefined) {
        this.storage = storage;
    }

    public IsSupportStorage(): boolean {
        let isSupportStorage: boolean = false;
        if (!!this.storage && !!JSON && !!JSON.parse && !!JSON.stringify) {
            // check for dodgy behaviour from iOS Safari in private browsing mode
            try {
                const testKey: string = "e2-cache-isSupportStorage-testKey";
                this.storage.setItem(testKey, "1");
                this.storage.removeItem(testKey);
                isSupportStorage = true;
            } catch (ex) {
                // private browsing mode in iOS Safari, or possible full cache
            }
        }
        return isSupportStorage;
    }

    public async Get(key: string): Promise<any> {
        key = this.ensureCacheKeyPrefix(key);
        let returnValue: any = undefined;
        if (this.IsSupportStorage() && !!this.storage) {
            if (!this.isCacheExpired(key, this.storage)) {
                returnValue = this.storage.getItem(key);
                if (typeof returnValue === "string" && (returnValue.indexOf("{") === 0 || returnValue.indexOf("[") === 0)) {
                        returnValue = JSON.parse(returnValue);
                }
            }
        }
        return returnValue;
    }

    public async Set(key: string, valueObj: any, cacheTimeout: CacheTimeout = CacheTimeout.default): Promise<boolean> {
        key = this.ensureCacheKeyPrefix(key);
        let didSetInCache: boolean = false;
        if (!!this.storage && this.IsSupportStorage()) {
            // get value as a string
            let cacheValue: any = undefined;
            if (valueObj === null || valueObj === undefined) {
                cacheValue = valueObj;
            } else if (typeof valueObj === "object") {
                cacheValue = JSON.stringify(valueObj);
            } else {
                cacheValue = `${valueObj}`;
            }

            // cache value
            this.storage.setItem(key, cacheValue);
            const validityPeriodMs: number = this.getCacheTimeout(cacheTimeout);
            // cache expiry
            const expiry: string = ((new Date()).getTime() + validityPeriodMs).toString();
            this.storage.setItem(this.getExpiryKey(key), expiry);
            didSetInCache = true;
        }
        return didSetInCache;
    }

    public async Clear(key: string): Promise<void> {
        if (!!this.storage && this.IsSupportStorage()) {
            key = this.ensureCacheKeyPrefix(key);
            this.storage.removeItem(key);
            this.storage.removeItem(this.getExpiryKey(key));
        }
    }

    private getExpiryKey(key: string): string {
        return key + "_expiry";
    }

    private isCacheExpired(key: string, storage: IStorage): boolean {
        let isCacheExpired: boolean = true;
        const cacheExpiryString: string | null = storage.getItem(this.getExpiryKey(key));
        if (typeof cacheExpiryString === "string" && cacheExpiryString.length > 0) {
            const cacheExpiryInt: number = parseInt(cacheExpiryString, 10);
            if (cacheExpiryInt > (new Date()).getTime()) {
                isCacheExpired = false;
            }
        }
        return isCacheExpired;
    }

    private ensureCacheKeyPrefix(key: string): string {
        let prefixedKey: string = "";
        if (!key || key.indexOf(this.cacheKeyPrefix) !== 0) {
            prefixedKey = `${this.cacheKeyPrefix}${key}`;
        } else {
            prefixedKey = key;
        }
        return prefixedKey;
    }

    private getCacheTimeout(cacheTimeout: CacheTimeout): number {
        const oneMinute: number = 60000;
        let timeout: number;
        switch (cacheTimeout) {
            case CacheTimeout.oneSecond:
                timeout = 1000;
                break;
            case CacheTimeout.short:
                timeout = oneMinute;
                break;
            case CacheTimeout.long:
                timeout = oneMinute * 60; // 1 hour
                break;
            case CacheTimeout.verylong:
                timeout = oneMinute * 60 * 24; // 24 hours
                break;
            default:
                timeout = oneMinute * 10; // 10 minutes
                break;
        }
        return timeout;
    }
}