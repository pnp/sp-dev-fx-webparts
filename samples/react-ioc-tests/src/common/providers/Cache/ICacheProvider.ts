
export enum CacheTimeout {
    oneSecond,
    short,
    default,
    long,
    verylong
}

export default interface ICacheProvider {
    Get(key: string): Promise<any>;
    Set(key: string, valueObj: any, cacheTimeout: CacheTimeout): Promise<boolean>;
    Clear(key: string): Promise<void>;
}