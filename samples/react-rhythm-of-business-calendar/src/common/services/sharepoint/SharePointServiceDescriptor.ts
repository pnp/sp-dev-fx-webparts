import { SPBatch } from "@pnp/sp";
import { IFieldInfo } from "@pnp/sp/fields/types";
import { IListItemFormUpdateValue } from "@pnp/sp/lists/types";
import { IWeb } from "@pnp/sp/webs/types";
import { User } from "common";
import { IListDefinition, IListItemResult, CamlQuery, ChoiceFieldValue, ListItemEntity, IViewDefinition, IUpdateListItem } from "common/sharepoint";
import { DirectoryService } from "../directory";
import { IService } from "../IService";
import { IServiceDescriptor } from "../IServiceDescriptor";
import { useServices } from "../withServices";
import { OnlineSharePointService } from "./OnlineSharePointService";
import { IPagedListDataStream } from "./IPagedListDataStream";

export const SharePointService: unique symbol = Symbol("SharePoint Service");

export interface ISharePointService extends IService {
    readonly currentWebServerRelativeUrl: string;

    registerListForPreflight(listDefinition: IListDefinition): void;
    registerViewForPreflight(viewDefinition: IViewDefinition): void;
    preflightSchema(web?: IWeb): Promise<void>;

    preflightEnsureUsers(principals: User[], web?: IWeb): Promise<void>;
    preflightEnsureUniqueIds<T extends ListItemEntity<any>>(entities: T[], listDefinition: IListDefinition, web?: IWeb): Promise<void>;

    pagedListItems<TRow extends IListItemResult, T>(
        viewDefinition: IViewDefinition,
        search: string,
        rowMap: (row: TRow) => T | Promise<T>,
        web?: IWeb,
        datesInUtc?: boolean
    ): Promise<IPagedListDataStream<T>>;

    listItems<TRow extends IListItemResult, T>(
        listDefinition: IListDefinition,
        rowLimit: number,
        viewFields: string[],
        query: CamlQuery,
        rowMap: (row: TRow) => T,
        web?: IWeb,
        datesInUtc?: boolean
    ): Promise<T[]>;

    serverRelativeListItems<TRow extends IListItemResult, T>(
        listDefinition: IListDefinition,
        folderServerRelativeUrl: string,
        recursive: boolean,
        rowLimit: number,
        viewFields: string[],
        query: CamlQuery,
        rowMap: (row: TRow) => T,
        web?: IWeb,
        datesInUtc?: boolean
    ): Promise<T[]>;

    field<T extends IFieldInfo>(fieldName: string, listDefinition?: IListDefinition): Promise<T>;

    fieldChoices<T extends ChoiceFieldValue>(
        choiceFieldValueType: { new(name: string): T },
        fieldName: string,
        listDefinition?: IListDefinition
    ): Promise<T[]>;

    fieldChoicesAsMap<T extends ChoiceFieldValue>(choiceFieldValueType: { new(name: string): T }, fieldName: string, listDefinition?: IListDefinition): Promise<Map<string, T>>;

    persistEntity<T extends ListItemEntity<any>>(entity: T, listDefinition: IListDefinition, toUpdateListItem: (entity: T) => IUpdateListItem | IListItemFormUpdateValue[], batch?: SPBatch, web?: IWeb): Promise<any>;

    configureEntityPermissions<T extends ListItemEntity<any>>(entity: T, listDefinition: IListDefinition, permissions?: Map<number /*role id*/, User[]>, web?: IWeb): Promise<void>;
}

export type SharePointServiceProp = {
    [SharePointService]: ISharePointService;
};

export const useSharePointService = () => useServices<SharePointServiceProp>()[SharePointService];

export const SharePointServiceDescriptor: IServiceDescriptor<typeof SharePointService, ISharePointService, SharePointServiceProp> = {
    symbol: SharePointService,
    dependencies: [DirectoryService],
    online: OnlineSharePointService
};
