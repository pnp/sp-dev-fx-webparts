import IListsService, { IList } from "./IListsService";

export default class MockListsService implements IListsService {
    private lists: IList[] = [];
    
    constructor(lists: IList[]) {
        this.lists = lists;
    }
    
    public async GetLists(): Promise<IList[]> {
        return this.lists;
    }
}