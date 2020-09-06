import IStorage from "./IStorage";

export default class MockStorage implements IStorage {

    private cache: any = {};

    constructor(storedKey: string, storedItem: any) {
        this.cache[storedKey] = storedItem;
    }

    public clear(): void {
        // do nothing
    }

    public getItem(key: string): string {
        return this.cache[key];
    }

    public removeItem(key: string): void {
        this.cache[key] = undefined;
    }

    public setItem(key: string, value: string): void {
        this.cache[key] = value;
    }
}