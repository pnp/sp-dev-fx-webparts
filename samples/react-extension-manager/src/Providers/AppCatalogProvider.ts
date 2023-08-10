import { SPFI } from "@pnp/sp";
import { IWeb } from "@pnp/sp/webs";
import { ListType } from "../Models/ListType";
import { CleanExtension, ExtensionSelects, IExtension } from "../Models/Extension";

export interface IAppCatalogProvider {
    getExtension(): Promise<IExtension[]>;
    getExtensionById(Id: number): Promise<IExtension>;
    updateExtension(Id: number, extension: Partial<IExtension>): Promise<void>;
}

export class AppCatalogProvider implements IAppCatalogProvider {
    private SP: SPFI = null;
    private _appCatalog: IWeb = null;
    private _tenantWideExtensionsListId: string = null;

    private async getAppCatalog(): Promise<IWeb> {
        if (this._appCatalog === null) {
            const res = await this.SP.getTenantAppCatalogWeb();
            this._appCatalog = res;
        }
        return this._appCatalog;
    }

    private async getTenantWideExtensionsListId(): Promise<string> {
        if (this._tenantWideExtensionsListId === null) {
            const appCatalog = await this.getAppCatalog();
            const lists = await appCatalog.lists.filter(`BaseTemplate eq ${ListType.TenantWideExtensions}`).select("ID").top(1)();
            this._tenantWideExtensionsListId = lists[0].Id;
        }
        return this._tenantWideExtensionsListId;
    }

    constructor(sp: SPFI) {
        this.SP = sp;
    }

    public async getExtension(): Promise<IExtension[]> {
        const appCatalog = await this.getAppCatalog();
        const LIST_ID = await this.getTenantWideExtensionsListId();

        const result: Partial<IExtension[]> = await appCatalog.lists.getById(LIST_ID).items.select(...ExtensionSelects)();
        const items: IExtension[] = result.map((item) => CleanExtension(item));

        return items;
    }

    public async getExtensionById(Id: number): Promise<IExtension> {
        const appCatalog = await this.getAppCatalog();
        const LIST_ID = await this.getTenantWideExtensionsListId();

        const result: Partial<IExtension> = await appCatalog.lists.getById(LIST_ID).items.getById(Id).select(...ExtensionSelects)();
        const item: IExtension = CleanExtension(result);

        return item;
    }

    public async updateExtension(Id: number, extension: Partial<IExtension>): Promise<void> {
        const appCatalog = await this.getAppCatalog();
        const LIST_ID = await this.getTenantWideExtensionsListId();
        try {
            await appCatalog.lists.getById(LIST_ID).items.getById(Id).update(extension);
        } catch (error) {
            alert(error);
        }
    }
}