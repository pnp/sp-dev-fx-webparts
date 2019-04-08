import ICacheProvider, { CacheTimeout } from "./ICacheProvider";

export default class MockCacheProvider implements ICacheProvider {
    private valueObj: any = null;
  
    constructor(valueObj?: any) {
        this.valueObj = valueObj;
    }

    public async Get(key: string): Promise<any> {
        return this.valueObj;
    }
    public async Set(key: string, valueObj: any, cacheTimeout: CacheTimeout): Promise<boolean> {
        this.valueObj = valueObj;
        return true;
    }
    public async Clear(key: string): Promise<void> {
        // do nothing
    }

}