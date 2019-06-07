import IListsService, { IList } from "./IListsService";
import IListsServiceExecutor from "./executor/IListsServiceExecutor";

export default class PnPListsService implements IListsService {
    private executor: IListsServiceExecutor;

    constructor(executor: IListsServiceExecutor) {
        this.executor = executor;
    }

    public async GetLists(): Promise<IList[]> {
        const listsData = await this.executor.Get();
        const lists = listsData.map(l => {
            return {
                Title: l.Title,
                DefaultViewUrl: l.DefaultViewUrl
            };
        });
        return lists;
    }
}