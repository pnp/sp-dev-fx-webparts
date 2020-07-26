import { ServiceScope } from '@microsoft/sp-core-library';
export declare class PageStore {
    _clearPage: () => void;
    private _serviceScope;
    private _PAGE_DATA_KEY;
    private _serializePage;
    private _resolvePageReady;
    private _pageReadyPromise;
    constructor(serviceScope: ServiceScope);
    readonly serviceScope: ServiceScope;
    getSerializeCallback(): (toJson?: boolean) => string;
    setSerializeCallback(callback: (toJson?: boolean) => string): void;
    setClearCallback(callback: () => void): void;
    savePageState(): void;
    clearPageState(): void;
    getPageState(): string;
    getPageReadyPromise(): Promise<void>;
    setPageReady(): void;
}
//# sourceMappingURL=PageStore.d.ts.map