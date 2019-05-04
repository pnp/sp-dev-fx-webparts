import ICacheProvider, { CacheTimeout } from "./ICacheProvider";

export default class StorageCacheProvider implements ICacheProvider {
    private cacheKeyPrefix: string = "__E2.";
    private storage: Storage;

    constructor(storage: Storage = window.sessionStorage) {
        this.storage = storage;
    }

    public IsSupportStorage(): boolean {
        let isSupportStorage: boolean = false;
        const supportsStorage: boolean = this.storage && JSON && typeof JSON.parse === "function" && typeof JSON.stringify === "function";
        if (supportsStorage) {
            // check for dodgy behaviour from iOS Safari in private browsing mode
            try {
                const testKey: string = "e2-cache-isSupportStorage-testKey";
                this.storage[testKey] = "1";
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
        if (this.IsSupportStorage()) {
            if (!this.isCacheExpired(key)) {
                returnValue = this.storage[key];
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
        if (this.IsSupportStorage()) {
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
            this.storage[key] = cacheValue;
            const validityPeriodMs: number = this.getCacheTimeout(cacheTimeout);
            // cache expiry
            this.storage[this.getExpiryKey(key)] = ((new Date()).getTime() + validityPeriodMs).toString();
            didSetInCache = true;
        }
        return didSetInCache;
    }

    public async Clear(key: string): Promise<void> {
        key = this.ensureCacheKeyPrefix(key);
        this.storage.removeItem(key);
        this.storage.removeItem(this.getExpiryKey(key));
    }

    private getExpiryKey(key: string): string {
        return key + "_expiry";
    }

    private isCacheExpired(key: string): boolean {
        let isCacheExpired: boolean = true;
        const cacheExpiryString: string = this.storage[this.getExpiryKey(key)];
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