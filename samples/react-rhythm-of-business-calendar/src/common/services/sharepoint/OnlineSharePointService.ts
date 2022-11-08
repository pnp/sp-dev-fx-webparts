import { Guid } from "@microsoft/sp-core-library";
import { sp, SPBatch, SharePointQueryable, spPost } from "@pnp/sp";
import { IFieldInfo } from '@pnp/sp/fields/types';
import { Items } from '@pnp/sp/items/types';
import "@pnp/sp/lists/web";
import { IList, RenderListDataOptions, IRenderListDataParameters, IListItemFormUpdateValue } from "@pnp/sp/lists/types";
import "@pnp/sp/sites";
import "@pnp/sp/webs";
import { IWeb } from "@pnp/sp/webs/types";
import "@pnp/sp/views/list";
import { IViewInfo } from "@pnp/sp/views/types";
import { cloneWeb, now, User, ErrorHandler, arrayToMap, ValidationError } from "common";
import "common/extensions";
import { IChoiceFieldInfo, IRenderListDataAsStreamResult, IListItemResult, IAddListItemResult, IListDefinition, ModeratedUpdateListItem, ChoiceFieldValue, ListItemEntity, CamlQuery, ModerationStatus, IViewDefinition, FieldType, InternalName, IUpdateListItem, ListDefinition, ListItemEntityTypeFullName, ListId, RateableListItemEntity, ViewId, CurrentChangeToken, SPField } from "common/sharepoint";
import { IDirectoryService, DirectoryService, DirectoryServiceProp } from "../directory";
import { ITimeZoneService, TimeZoneService, TimeZoneServiceProp } from "../timezones";
import { ServiceContext } from "../IService";
import { SpfxContext } from "../SpfxContext";
import { IPagedListDataStream } from "./IPagedListDataStream";
import { ListDataAsStream } from "./ListDataAsStream";
import { ISharePointService } from "./SharePointServiceDescriptor";

const ENSURE_USERS_BATCH_SIZE = 100;
const ENSURE_UNIQUEIDS_BATCH_SIZE = 50;

const PendingStatusUpdateListItem: ModeratedUpdateListItem = {
    Title: undefined,
    OData__ModerationStatus: ModerationStatus.Pending.value
};
function isPendingModeratedItem(updateListItem: any): updateListItem is ModeratedUpdateListItem {
    if (updateListItem instanceof ModeratedUpdateListItem)
        return updateListItem.OData__ModerationStatus === ModerationStatus.Pending.value;
    else
        return false;
}
function shouldCallValidateUpdateListItem(updateListItem: any): updateListItem is IListItemFormUpdateValue[] {
    return updateListItem instanceof Array;
}

const listFromTitle = (listTitle: string, web?: IWeb): IList =>
    (web || sp.web).lists.getByTitle(listTitle);

const listFromDefinition = (listDefinition: IListDefinition, web?: IWeb): IList =>
    listFromTitle(listDefinition.title, web);

const preflightRegisteredLists = new Set<IListDefinition>();
const preflightRegisteredViews = new Set<IViewDefinition>();
const listViewCache = new Map<IViewDefinition, IViewInfo>();

export class OnlineSharePointService implements ISharePointService {
    private readonly _directory: IDirectoryService;
    private readonly _timezones: ITimeZoneService;
    private readonly _context: SpfxContext;

    constructor({
        [DirectoryService]: directory,
        [TimeZoneService]: timezones,
        [SpfxContext]: context
    }: ServiceContext<DirectoryServiceProp & TimeZoneServiceProp>) {
        this._directory = directory;
        this._timezones = timezones;
        this._context = context;
    }

    public async initialize() {
    }

    public get currentWebServerRelativeUrl(): string {
        return this._context.pageContext.web.serverRelativeUrl;
    }

    public registerListForPreflight(listDefinition: IListDefinition) {
        preflightRegisteredLists.add(listDefinition);
    }

    public registerViewForPreflight(viewDefinition: IViewDefinition) {
        preflightRegisteredViews.add(viewDefinition);
    }

    public async preflightSchema(web?: IWeb): Promise<void> {
        const eh = new ErrorHandler();
        const batch = (web || sp.web).createBatch();

        const lietfnPromises = [...preflightRegisteredLists.values()].map(async listDefinition => {
            if (!listDefinition[ListItemEntityTypeFullName] || !listDefinition[CurrentChangeToken]) {
                const result = await listFromDefinition(listDefinition, web).select('ID', 'ListItemEntityTypeFullName', "CurrentChangeToken").inBatch(batch)();
                listDefinition[CurrentChangeToken] = result.CurrentChangeToken.StringValue;
                listDefinition[ListItemEntityTypeFullName] = result.ListItemEntityTypeFullName;
                listDefinition[ListId] = result.Id;
            }
            await Promise.all(listDefinition.fields
                .filter(field => field.type === FieldType.Taxonomy && field.multi)
                .map(async field => {
                    const result = await listFromDefinition(listDefinition, web).fields.usingCaching().getByInternalNameOrTitle(field.name + '_0')();
                    field[InternalName] = result.InternalName;
                }));
        });

        const viewPromises = [...preflightRegisteredViews.values()].map(async viewDefinition => {
            if (!listViewCache.has(viewDefinition)) {
                const view = await listFromDefinition(viewDefinition[ListDefinition], web).views.getByTitle(viewDefinition.title).inBatch(batch)();
                listViewCache.set(viewDefinition, view);
                viewDefinition[ViewId] = view.Id;
            }
        });

        await batch.execute().catch(eh.catch);
        await Promise.all(lietfnPromises).catch(eh.catch);
        await Promise.all(viewPromises).catch(eh.catch);
        eh.reportIfError();
    }

    public async preflightEnsureUsers(principals: readonly User[], web?: IWeb): Promise<void> {
        const usersToEnsure = principals.slice(0);
        while (usersToEnsure.length > 0) {
            const batch = sp.createBatch();
            const batchOfUsersToEnsure = usersToEnsure.splice(0, ENSURE_USERS_BATCH_SIZE);
            this._directory.ensureUsers(batchOfUsersToEnsure, batch, web);
            await batch.execute();
        }
    }

    public async preflightEnsureUniqueIds<T extends ListItemEntity<any>>(entities: T[], listDefinition: IListDefinition, web?: IWeb): Promise<void> {
        const entitiesToEnsure = entities.filter(e => !e.isNew && (!e.uniqueId || Guid.empty.equals(e.uniqueId)));
        while (entitiesToEnsure.length > 0) {
            const batch = sp.createBatch();
            const batchOfEntitiesToEnsure = entitiesToEnsure.splice(0, ENSURE_UNIQUEIDS_BATCH_SIZE);
            const list = listFromDefinition(listDefinition, cloneWeb(web));
            for (const entity of batchOfEntitiesToEnsure) {
                list.items.getById(entity.id).select("UniqueId").inBatch(batch).get()
                    .then((result: IListItemResult) => entity.setId(entity.id, Guid.parse(result.UniqueId)));
            }
            await batch.execute();
        }
    }

    public async pagedListItems<TRow extends IListItemResult, T>(
        viewDefinition: IViewDefinition,
        search: string,
        rowMap: (row: TRow) => T | Promise<T>,
        web?: IWeb,
        datesInUtc: boolean = undefined
    ): Promise<IPagedListDataStream<T>> {

        const renderParams: IRenderListDataParameters = {
            DatesInUtc: datesInUtc,
            RenderOptions: RenderListDataOptions.ListData
        };

        const list = listFromDefinition(viewDefinition[ListDefinition], web);
        const view = listViewCache.get(viewDefinition) || await list.views.getByTitle(viewDefinition.title)();

        return ListDataAsStream.beginStream(list, view, search, renderParams, null, rowMap);
    }

    public async listItems<TRow extends IListItemResult, T>(
        listDefinition: IListDefinition,
        rowLimit: number,
        viewFields: string[],
        query: CamlQuery,
        rowMap: (row: TRow) => T | Promise<T>,
        web?: IWeb,
        datesInUtc: boolean = undefined
    ): Promise<T[]> {
        return this.serverRelativeListItems(listDefinition, undefined, false, rowLimit, viewFields, query, rowMap, web, datesInUtc);
    }

    public async serverRelativeListItems<TRow extends IListItemResult, T>(
        listDefinition: IListDefinition,
        folderServerRelativeUrl: string,
        recursive: boolean,
        rowLimit: number,
        viewFields: string[],
        query: CamlQuery,
        rowMap: (row: TRow) => T | Promise<T>,
        web?: IWeb,
        datesInUtc: boolean = undefined
    ): Promise<T[]> {
        const queryXml: string = query ? `<Query>${query.caml}</Query>` : "";
        const viewFieldXml: string = viewFields.map(field => `<FieldRef Name='${field}' />`).join("");
        const rowLimitXml: string = `<RowLimit>${rowLimit}</RowLimit>`;
        const scope: string = recursive ? `Scope='Recursive'` : ``;
        const params: IRenderListDataParameters = {
            ViewXml: `<View ${scope}>${queryXml}<ViewFields>${viewFieldXml}</ViewFields>${rowLimitXml}</View>`,
            RenderOptions: RenderListDataOptions.ListData,
            FolderServerRelativeUrl: folderServerRelativeUrl,
            DatesInUtc: datesInUtc
        };

        const list = listFromDefinition(listDefinition, web);
        const data = await list.renderListDataAsStream(params) as IRenderListDataAsStreamResult<TRow>;

        const results: T[] = [];
        for (const row of data.Row) {
            const result = await rowMap(row);
            results.push(result);
        }

        return results;
    }

    public field<T extends IFieldInfo>(fieldName: string, listDefinition?: IListDefinition): Promise<T> {
        const fields = listDefinition ? listFromDefinition(listDefinition).fields : sp.web.fields;
        return fields.getByInternalNameOrTitle(fieldName)();
    }

    public async fieldChoices<T extends ChoiceFieldValue>(
        choiceFieldValueType: { new(name: string): T },
        fieldName: string,
        listDefinition?: IListDefinition
    ): Promise<T[]> {
        const field = await this.field<IChoiceFieldInfo>(fieldName, listDefinition);
        return field.Choices.map(choice => new choiceFieldValueType(choice));
    }

    public async fieldChoicesAsMap<T extends ChoiceFieldValue>(choiceFieldValueType: { new(name: string): T }, fieldName: string, listDefinition?: IListDefinition): Promise<Map<string, T>> {
        const choices = await this.fieldChoices(choiceFieldValueType, fieldName, listDefinition);
        return arrayToMap(choices, choice => choice.name);
    }

    public async persistEntity<T extends ListItemEntity<any>>(entity: T, listDefinition: IListDefinition, toUpdateListItem: (entity: T) => IUpdateListItem | IListItemFormUpdateValue[], batch?: SPBatch, web?: IWeb): Promise<any> {
        let entityPromise: Promise<any> = Promise.resolve();

        if (entity.hasChanges()) {
            const items = listFromDefinition(listDefinition, web).items;

            if (entity.isDeleted && !entity.softDeleteSupported && !entity.isNew) {
                const listItem = items.getById(entity.id);
                const batchedItem = (batch ? listItem.inBatch(batch) : listItem);
                entityPromise = batchedItem.delete();
            }
            else if (!entity.isDeleted || entity.softDeleteSupported) {
                const listItemEntityTypeFullName = listDefinition[ListItemEntityTypeFullName];
                const updateListItem = toUpdateListItem(entity);

                if (entity.isNew) {
                    const batchedItems = (batch ? Items(items, '').inBatch(batch) : items);
                    entityPromise = batchedItems.add(updateListItem, listItemEntityTypeFullName).then(async result => {
                        const timeZone = await this._timezones.timeZoneForWeb(web);
                        const { currentUser } = this._directory;
                        const data = result.data as IAddListItemResult;
                        const modified = SPField.fromDateTime(data, 'Created', timeZone);
                        const etag = parseInt(data['odata.etag'].slice(1, -1));
                        entity.setEditor(currentUser, modified, etag);
                        entity.setId(parseInt(data.ID, 10));
                    });
                }
                else {
                    const item = items.getById(entity.id);
                    const batchedItem = batch ? item.inBatch(batch) : item;

                    // Need to force the item in to Pending status if the list uses moderation,
                    // otherwise a new draft version will be created rather than replacing the existing approved version
                    if (isPendingModeratedItem(updateListItem)) {
                        entityPromise = batchedItem.update(PendingStatusUpdateListItem, undefined, listItemEntityTypeFullName);
                        updateListItem.OData__ModerationStatus = undefined;

                        if (!batch) await entityPromise;
                    }

                    if (shouldCallValidateUpdateListItem(updateListItem))
                        entityPromise = batchedItem.validateUpdateListItem(updateListItem, false).then(this._handleValidateUpdateListItemResponse);
                    else
                        entityPromise = batchedItem.update(updateListItem, `"${entity.uniqueId},${entity.etag}"`, listItemEntityTypeFullName).then(result => {
                            const { currentUser } = this._directory;
                            entity.setEditor(currentUser, now(), entity.etag + 1);
                        });
                }
            }
        }

        if (entity instanceof RateableListItemEntity && entity.rating.hasChanges() && (!entity.isDeleted || entity.softDeleteSupported)) {
            entityPromise = entityPromise.then(async () => {
                const { currentUser } = this._directory;
                const itemId = entity.id;
                const listId = listDefinition[ListId];
                const rating = entity.rating.forUser(currentUser);

                if (rating && !Number.isNaN(rating)) {
                    entity.setEditor(currentUser, now(), entity.etag + 1);
                    return spPost(SharePointQueryable((web || sp.web), `../Microsoft.Office.Server.ReputationModel.Reputation.SetRating(listID=@a1,itemID=@a2,rating=@a3)?@a1=${encodeURIComponent(`'{${listId}}'`)}&@a2=${encodeURIComponent(`'${itemId}'`)}&@a3=${rating}`));
                }
            });
        }

        return entityPromise;
    }

    private readonly _handleValidateUpdateListItemResponse = (fields: IListItemFormUpdateValue[]) => {
        for (const field of fields) {
            const { HasException, ErrorMessage, FieldName } = field;
            if (HasException) {
                throw new ValidationError(FieldName, ErrorMessage);
            }
        }
    }

    public async configureEntityPermissions<T extends ListItemEntity<any>>(entity: T, listDefinition: IListDefinition, permissions?: Map<number /*role id*/, User[]>, web?: IWeb): Promise<void> {
        if (entity.isNew) throw new Error('This entity must be persisted to SharePoint before configuring permissions');

        const items = listFromDefinition(listDefinition, web).items;
        const listItem = items.getById(entity.id);

        const hasUniqueRoleAssignments = (await listItem.select('HasUniqueRoleAssignments').get())?.HasUniqueRoleAssignments;

        if (hasUniqueRoleAssignments) {
            await listItem.resetRoleInheritance();
        }

        if (permissions) {
            await listItem.breakRoleInheritance(false, false);

            const eh = new ErrorHandler();
            const batch = (web || sp.web).createBatch();

            permissions.forEach((users, roleId) => {
                users.forEach(user =>
                    listItem.roleAssignments.inBatch(batch).add(user.id, roleId).catch(eh.catch)
                );
            });

            await batch.execute();
            eh.throwIfError();
        }
    }
}