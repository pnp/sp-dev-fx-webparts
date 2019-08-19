import IListsServiceExecutor from "./IListsServiceExecutor";

export default class PnPListsServiceExecutor implements IListsServiceExecutor {
    private webUrl: string;

    constructor(webUrl: string) {
        this.webUrl = webUrl;
    }

    public async Get(): Promise<any[]> {
        const { Web } = await import(/* webpackChunkName: 'pnp-sp-bundle' */"@pnp/sp");
        const listsData = await new Web(this.webUrl).lists.select("Title", "DefaultViewUrl").get();
        return listsData;
    }
}