import { first, flatten } from 'lodash';
import { sp } from '@pnp/sp';
import '@pnp/sp/lists';
import { IWeb, Web } from "@pnp/sp/webs/types";
import { IListItemFormUpdateValue, IChangeLogItemQuery } from '@pnp/sp/lists/types';
import { ErrorHandler, User, cloneWeb, AsyncDataCache, perf } from "common";
import { ISharePointService, IPagedListDataStream, ILiveUpdateService, ITimeZoneService, ITimeZone } from 'common/services';
import { Loader } from "../Loader";
import { IListItemResult } from "./query_";
import { IViewDefinition, ListDefinition, ListId, ViewId, CurrentChangeToken } from "./schema";
import { IUpdateListItem } from './update';
import { createEntity, ListItemEntityConstructor } from './createEntity';
import { CamlQuery } from './CamlQuery';
import { ListItemCache } from './ListItemCache';
import { ListItemEntity } from "./ListItemEntity";

const PERSIST_BATCH_SIZE = 50;
const FAST_LOAD_EXPIRATION_DAYS = 5;

export enum ErrorDiagnosis {
    Critical,
    Ignore,
    Propogate
}

interface IFastLoadConfiguration {
    useCache: boolean;
    expiration?: number;
}

export interface IPagedViewLoaderConfiguration<E extends ListItemEntity<any>> {
    ctor: ListItemEntityConstructor<E>;
    view: IViewDefinition;
    timezones: ITimeZoneService;
    spo: ISharePointService;
    liveUpdate?: ILiveUpdateService;
    siteURL?: string;
    fastLoad?: IFastLoadConfiguration;
}

export abstract class PagedViewLoader<E extends ListItemEntity<any>> extends Loader<E> {
    private readonly _ctor: ListItemEntityConstructor<E>;
    private readonly _web: IWeb;
    private readonly _fastLoadConfig: IFastLoadConfiguration;
    private readonly _fastLoad: ListItemCache<E>;
    private readonly _dependencies: Set<PagedViewLoader<any>>;
    private readonly _entitiesAsync: AsyncDataCache<readonly E[]>;

    private _timezone: ITimeZone;

    public readonly view: IViewDefinition;
    protected readonly timezones: ITimeZoneService;
    protected readonly spo: ISharePointService;

    constructor({ ctor: ctor, view, timezones, spo, liveUpdate, siteURL, fastLoad }: IPagedViewLoaderConfiguration<E>) {
        super();

        if (siteURL && fastLoad?.useCache)
            throw new Error('Cannot use fast load with non-local SPO site');

        this._ctor = ctor;
        this._web = siteURL ? Web(siteURL) : null;
        this._fastLoadConfig = Object.assign({ useCache: false, expiration: FAST_LOAD_EXPIRATION_DAYS }, fastLoad);

        if (this._fastLoadConfig.useCache && !liveUpdate)
            throw new Error('FastLoad cache requires Live Update service');

        this._fastLoad = liveUpdate.createCache(view, {
            toEntity: this._toEntityIgnoreAlreadyLoaded,
            updateListItem: (e) => this.updateListItem(e),
            extractReferencedUsers: (e) => this.extractReferencedUsers(e)
        });

        this._dependencies = new Set();
        this._entitiesAsync = new AsyncDataCache<readonly E[]>(async () => {
            await Promise.all([
                ...[...this._dependencies.values()].map(dependency => dependency.ensureLoaded()),
                this.ensureLoaded()
            ]);
            return this.all();
        });

        this.view = view;
        this.timezones = timezones;
        this.spo = spo;

        spo.registerListForPreflight(view[ListDefinition]);
        spo.registerViewForPreflight(view);

        if (liveUpdate) liveUpdate.register(view[ListDefinition], this._ensureLatest);
    }

    public registerDependency(dependency: PagedViewLoader<any>) {
        this._dependencies.add(dependency);
    }

    protected abstract readonly toEntity: (row: IListItemResult, entity: E) => void | Promise<void>;
    protected readonly updateListItem: (entity: E) => IUpdateListItem = null;
    protected readonly validateUpdateListItem: (entity: E) => IListItemFormUpdateValue[] = null;
    protected readonly diagnosePersistError: (error: any) => ErrorDiagnosis = () => ErrorDiagnosis.Critical;

    protected readonly prepareToLoadEntities: () => Promise<void> = async () => { };
    protected readonly extractReferencedUsers: (entity: E) => User[] = () => [];

    public readonly asyncData = () => this._entitiesAsync.get();

    public readonly all = async (): Promise<readonly E[]> => {
        await this.ensureLoaded();
        return this._entities;
    }

    public readonly getById = async (id: number): Promise<E> => {
        await this.ensureLoaded();

        let entity = this._entitiesById.get(id);

        if (!entity) {
            await this._ensureLatest();
            entity = this._entitiesById.get(id);
        }

        return entity;
    }

    public async entitiesById(): Promise<ReadonlyMap<number, E>> {
        await this.ensureLoaded();
        return this._entitiesById;
    }

    private _ensureLoadedPromise: Promise<void> = null;
    public async ensureLoaded(): Promise<void> {
        try {
            await (this._ensureLoadedPromise = (this._ensureLoadedPromise || perf(this.view.title, () => this._loadEntities())));
        } catch (e) {
            this._ensureLoadedPromise = null;
        }
    }

    protected async persistCore(singleEntity?: E): Promise<void> {
        if (this.entitiesWithChanges.length === 0) return;

        const async = this._entitiesAsync.get();

        try {
            async.savingStarted();

            const eh = new ErrorHandler();
            const updateListItem = this.validateUpdateListItem || this.updateListItem;

            const entitiesToPersist = (singleEntity ? [singleEntity] : this.entitiesWithChanges.slice(0)).reverse();

            const referencedUsers = flatten(entitiesToPersist.map(this.extractReferencedUsers)).filter(Boolean);
            await this.spo.preflightEnsureUsers(referencedUsers, this._web);

            await this.spo.preflightEnsureUniqueIds(entitiesToPersist, this.view[ListDefinition], this._web);

            while (entitiesToPersist.length > 0) {
                const web = cloneWeb(this._web);
                const batch = web.createBatch();

                const persistEntity = (entity: E) =>
                    this.spo.persistEntity(entity, this.view[ListDefinition], updateListItem, batch, web)
                        .catch(e => {
                            eh.catch(e);
                            if (entity.isNew) this.untrack(entity);
                        });

                const batchOfEntitiesToPersist = entitiesToPersist.splice(0, PERSIST_BATCH_SIZE);
                const persistPromises = Promise.all(batchOfEntitiesToPersist.map(persistEntity));

                await batch.execute();
                eh.throwIfError();

                await persistPromises;
            }

            this.refreshEntityCollections();

            async.saveSuccessful();

            await this._dehydrate();
        } catch (error) {
            const diagnosis = this.diagnosePersistError(error) || ErrorDiagnosis.Critical;
            switch (diagnosis) {
                case ErrorDiagnosis.Ignore:
                    async.saveSuccessful();
                    break;
                case ErrorDiagnosis.Critical:
                    if (this._fastLoadConfig.useCache) this._fastLoad.purge();
                    async.saveFailed(error);
                    break;
                case ErrorDiagnosis.Propogate:
                    async.saveSuccessful();
                    throw error;
            }
        }
    }

    private readonly _toEntityIgnoreAlreadyLoaded = async (row: IListItemResult) => {
        this._timezone = this._timezone || await this.timezones.timeZoneForWeb(this._web);

        try {
            const id = parseInt(row.ID, 10);

            if (!this._entitiesById.has(id)) {
                const entity = createEntity(this._ctor, row, this._timezone);
                await this.toEntity(row, entity);
                this._entities.push(entity);
                this._entitiesById.set(entity.id, entity);

                return entity;
            }
        } catch (e) {
            console.warn(e);
        }

        return null;
    };

    private async _loadEntities(): Promise<void> {
        await this.prepareToLoadEntities();

        let cacheSuccess = false;

        if (this._fastLoadConfig.useCache) {
            cacheSuccess = await this._fastLoad.load(this._fastLoadConfig.expiration);

            if (cacheSuccess) {
                console.log('rehydrated', this.view.title, 'from local storage');
                this._queryForLatestChanges().then(this._dehydrate);
            }
        }

        if (!cacheSuccess) {
            console.log('loading', this.view.title, 'from sharepoint');
            return new Promise((resolve, reject) => {
                let modelsPagedPromise = this.spo.pagedListItems(this.view, null, this._toEntityIgnoreAlreadyLoaded, this._web);

                const fetchPage = () => modelsPagedPromise.then((stream: IPagedListDataStream<E>) => {
                    if (stream.hasNext) {
                        this._entitiesAsync.get().dataUpdated();
                        modelsPagedPromise = stream.next();
                        fetchPage();
                    } else {
                        this._dehydrate().then(resolve, reject);
                    }
                }, reject);

                fetchPage();
            });
        }
    }

    private _ensureLatestPromise: Promise<void> = null;
    private readonly _ensureLatest = async () => {
        console.log('Processing live update for', this.view[ListDefinition].title);
        try {
            this._dependencies.forEach(dependency => dependency._ensureLatest());
            await (this._ensureLatestPromise = (this._ensureLatestPromise || this._queryForLatestChanges()));
        } finally {
            this._ensureLatestPromise = null;
        }
    }

    private async _queryForLatestChanges() {
        const {
            [ListDefinition]: list,
            [ViewId]: viewId,
            fields
        } = this.view;
        const {
            [ListId]: listId,
            [CurrentChangeToken]: currentChangeToken
        } = list;

        const query: IChangeLogItemQuery = {
            ChangeToken: currentChangeToken,
            ViewName: viewId.toString(),
            QueryOptions: `
                <QueryOptions>
                    <IncludeMandatoryColumns>FALSE</IncludeMandatoryColumns>
                    <DateInUtc>FALSE</DateInUtc>
                    <IncludePermissions>FALSE</IncludePermissions>
                    <IncludeAttachmentUrls>FALSE</IncludeAttachmentUrls>
                </QueryOptions>`,
            ViewFields: `
                <ViewFields>
                    <FieldRef Name="ID"></FieldRef>
                </ViewFields>`
        };

        const result = await sp.web.lists.getById(listId).getListItemChangesSinceToken(query);
        const timezone = await this.timezones.timeZoneForWeb(this._web);

        const parser = new DOMParser();
        const dom = parser.parseFromString(result, "application/xml");
        const changesElement = dom.querySelector("Changes");
        if (!changesElement) return;

        const nextChangeToken = changesElement.attributes.getNamedItem("LastChangeToken").value;
        list[CurrentChangeToken] = nextChangeToken;

        const updatedEntities: E[] = [];

        const deletes = dom.querySelectorAll('Changes Id[ChangeType="Delete"]');
        deletes.forEach(change => {
            const id = parseInt(change.textContent);
            const existingEntity = this._entitiesById.get(id);
            if (existingEntity) {
                existingEntity.beginLiveUpdate();
                existingEntity.delete();
                updatedEntities.push(existingEntity);
            }
        });

        const changePromises: Promise<void>[] = [];
        const changes = dom.querySelectorAll('row');
        changes.forEach(({ attributes }) => {
            const promise = (async () => {
                const id = parseInt(attributes.getNamedItem("ows_ID").value);
                const etag = parseInt(attributes.getNamedItem("ows_owshiddenversion").value);
                const existingEntity = this._entitiesById.get(id);

                if (existingEntity?.etag !== etag) {
                    existingEntity?.beginLiveUpdate(false);

                    const toEntity = async (row: IListItemResult) => {
                        const entity = createEntity(this._ctor, row, timezone, existingEntity);
                        entity.beginLiveUpdate(true);
                        await this.toEntity(row, entity);
                        return entity;
                    };

                    const updatedEntity = await first(await this.spo.listItems(list, 1, fields, CamlQuery.id(id), toEntity));

                    if (!existingEntity) {
                        this._entities.push(updatedEntity);
                        this._entitiesById.set(updatedEntity.id, updatedEntity);
                    }

                    updatedEntities.push(updatedEntity);
                }
            })();

            changePromises.push(promise);
        });

        await Promise.all(changePromises);
        updatedEntities.forEach(entity => entity.endLiveUpdate());
        this._entitiesAsync.get().dataUpdated();
    }

    private readonly _dehydrate = async () => {
        if (this._fastLoadConfig.useCache) {
            try {
                await this._fastLoad.save(this._entities);
            } catch (ex) {
                console.warn('Dehydrate failed', ex);
            }
        }
    }
}