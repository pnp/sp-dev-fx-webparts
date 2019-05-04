export default class MockStorage implements Storage {
    constructor(storedKey?: string, storedItem?: any) {
        this.length = 0;
        if (!!storedKey) {
            this[storedKey] = storedItem;
            this.length = 1;
        }
    }

    [name: string]: any;    
    public length: number;

    public clear(): void {
        // do nothign
    }
    public getItem(key: string): string {
        return this[key];
    }
    public key(index: number): string {
        return "";
    }
    public removeItem(key: string): void {
        this[key] = undefined;
    }
    public setItem(key: string, value: string): void {
        this[key] = value;
    }
}