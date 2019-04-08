import IListsServiceExecutor from "./IListsServiceExecutor";

export default class MockListsServiceExecutor implements IListsServiceExecutor {
    private listsData: any[];

    constructor(listsData: any[]) {
        this.listsData = listsData;
    }

    public async Get(): Promise<any[]> {
        return this.listsData;
    }
}