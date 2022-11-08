import { Guid } from '@microsoft/sp-core-library';
import { ListSubscriptionFactory, IListSubscription } from '@microsoft/sp-list-subscription';
import { FastLoadFunctions, IListDefinition, IViewDefinition, ListId, ListItemCache, ListItemEntity } from 'common/sharepoint';
import { DeveloperService, DeveloperServiceProp, IDeveloperService } from '../developer';
import { DirectoryService, DirectoryServiceProp, IDirectoryService } from '../directory';
import { ServiceContext } from "../IService";
import { SpfxComponent, SpfxContext } from "../SpfxContext";
import { ILiveUpdateService } from "./LiveUpdateServiceDescriptor";

interface IListRegistration {
    list: IListDefinition;
    callback: () => void;
    subscription?: IListSubscription;
}

export class OnlineLiveUpdateService implements ILiveUpdateService {
    private readonly _context: SpfxContext;
    private readonly _directory: IDirectoryService;
    private readonly _dev: IDeveloperService;
    private readonly _factory: ListSubscriptionFactory;
    private readonly _registrations: IListRegistration[];

    private _cache: Cache;

    constructor({
        [SpfxContext]: context,
        [SpfxComponent]: component,
        [DeveloperService]: dev,
        [DirectoryService]: directory
    }: ServiceContext<DeveloperServiceProp & DirectoryServiceProp>) {
        this._context = context;
        this._dev = dev;
        this._directory = directory;

        this._factory = new ListSubscriptionFactory(component);
        this._registrations = [];
    }

    public async initialize() {
        this._cache = await caches.open(this._cacheName());
        this._dev.registerScripts(this._devScripts);
    }

    public register(list: IListDefinition, callback: () => void) {
        this._registrations.push({ list, callback });
    }

    public async begin(): Promise<void> {
        for (const registration of this._registrations) {
            const { list, callback } = registration;

            const subscription = await this._factory.createSubscription({
                listId: Guid.parse(list[ListId]),
                callbacks: {
                    notification: () => callback(),
                    connect: () => console.debug(new Date().toLocaleTimeString(), 'Subscribed to', list.title),
                    disconnect: () => console.debug(new Date().toLocaleTimeString(), 'Disconnected', list.title)
                }
            });

            registration.subscription = subscription;
        }
    }

    public createCache<E extends ListItemEntity<any>>(view: IViewDefinition, functions: FastLoadFunctions<E>): ListItemCache<E> {
        const siteUrl = this._context.pageContext.web.absoluteUrl;
        return new ListItemCache<E>(siteUrl, this._cache, view, functions);
    }

    public async purgeCaches(): Promise<boolean> {
        const result = await caches.delete(this._cacheName());
        this._cache = await caches.open(this._cacheName());
        return result;
    }

    private _cacheName() {
        const { currentUser: { login } } = this._directory;
        return `SPFxFastLoad-${login}`;
    }

    private readonly _devScripts = {
        liveUpdate: {
            purgeCaches: async () => {
                console.log(`Starting 'clearCache()'`);

                const result = await this.purgeCaches();
                console.log('Result:', result);

                console.log(`Completed 'clearCache()'`);
            }
        }
    };
}