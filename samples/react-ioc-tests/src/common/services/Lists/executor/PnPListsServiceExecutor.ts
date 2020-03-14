import IListsServiceExecutor from "./IListsServiceExecutor";
import { sp } from "@pnp/sp/rest";
import "@pnp/sp/webs";
import "@pnp/sp/lists/web";

export default class PnPListsServiceExecutor implements IListsServiceExecutor {
    public async Get(): Promise<any[]> {
        const listsData = await sp.web.lists.select("Title", "DefaultViewUrl").get();
        return listsData;
    }
}