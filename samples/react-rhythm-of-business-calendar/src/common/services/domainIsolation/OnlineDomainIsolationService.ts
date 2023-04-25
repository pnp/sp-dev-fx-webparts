import { sp } from "@pnp/sp";
import "@pnp/sp/files";
import "@pnp/sp/items";
import { IItem, Item } from "@pnp/sp/items/types";
import "@pnp/sp/sites";
import { Site } from "@pnp/sp/sites/types";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs/types";
import { isExecutingInWorkbench, isExecutingInTeamsTab } from "../../Utils";
import { ServiceContext } from "../IService";
import { SpfxContext } from "../SpfxContext";
import { IDomainIsolationService } from "./DomainIsolationServiceDescriptor";

export class OnlineDomainIsolationService implements IDomainIsolationService {
    public readonly originalUrl: string;

    private readonly _spfxContext: SpfxContext;

    private _currentSitePrimaryUrl: string;
    private _currentPageListItem: IItem;
    private _currentPageRelativeUrl: string;

    constructor({
        [SpfxContext]: spfxContext
    }: ServiceContext) {
        this.originalUrl = window.location.href;
        this._spfxContext = spfxContext;
    }

    public async initialize(): Promise<void> {
        this._currentSitePrimaryUrl = (await sp.site()).PrimaryUri;

        const url = new URL(this.originalUrl);

        if (url.pathname.includes("/_layouts/15/webpart.aspx")) {
            if (url.searchParams.has("list") && url.searchParams.has("id")) {
                // executing inside isolated domain iframe - get list and item id for current page from the query string
                const listId = url.searchParams.get("list");
                const itemId = parseInt(url.searchParams.get("id"), 10);
                this._currentPageListItem = sp.web.lists.getById(listId).items.getById(itemId);
            } else {
                this._currentPageListItem = null;
            }
        } else if (!isExecutingInWorkbench() && !isExecutingInTeamsTab()) {
            const { list, listItem } = this._spfxContext.pageContext;
            this._currentPageListItem = sp.web.lists.getById(list.id.toString()).items.getById(listItem.id);
        }

        if (isExecutingInWorkbench() || !this._currentPageListItem)
            this._currentPageRelativeUrl = url.pathname;
        else
            this._currentPageRelativeUrl = (await this._currentPageListItem.file()).ServerRelativeUrl;
    }

    public get currentSitePrimaryUrl(): string {
        return this._currentSitePrimaryUrl;
    }

    public get currentPageRelativeUrl(): string {
        return this._currentPageRelativeUrl;
    }

    public get currentPageListItem(): IItem {
        return this._currentPageListItem?.clone(Item); // clone the Item so callers can't modify this._currentPageListItem
    }

    public convertToAppDomainUrl(url: string): string {
        const original = new URL(url, this.originalUrl);
        return new URL(original.pathname + original.search, this.originalUrl).toString();
    }

    public convertToPrimaryUrl(url: string): string {
        const original = new URL(url, this._currentSitePrimaryUrl);
        return new URL(original.pathname + original.search, this._currentSitePrimaryUrl).toString();
    }

    public async siteCompositeId(url: string): Promise<string> {
        const appDomainUrl = this.convertToAppDomainUrl(url);
        const primaryUrl = this.convertToPrimaryUrl(url);

        const [site, web] = await Promise.all([
            Site(appDomainUrl).select("Id")(),
            Web(appDomainUrl).select("Id,Url")()
        ]);

        const hostName = new URL(primaryUrl).hostname;
        return `${hostName},${site.Id},${web.Id}`;
    }
}