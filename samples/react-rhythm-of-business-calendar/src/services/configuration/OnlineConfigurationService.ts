import { first } from 'lodash';
import { sp } from "@pnp/sp";
import "@pnp/sp/lists";
import { ErrorHandler } from "common";
import { ServiceContext, DeveloperService, DeveloperServiceProp, ISharePointService, SharePointService, SharePointServiceProp, IDeveloperService, TimeZoneService, TimeZoneServiceProp, ITimeZoneService, LiveUpdateServiceProp, LiveUpdateService, ILiveUpdateService } from "common/services";
import { Configuration, ReadonlyConfigurationMap, ConfigurationList } from "schema";
import { IConfigurationService } from "./ConfigurationServiceDescriptor";
import { ConfigurationLoader } from "./ConfigurationLoader";

export class OnlineConfigurationService implements IConfigurationService {
    private readonly _dev: IDeveloperService;
    private readonly _timezones: ITimeZoneService;
    private readonly _liveUpdate: ILiveUpdateService;
    private readonly _spo: ISharePointService;

    private _configurations: readonly Configuration[];
    private _configurationsById: ReadonlyConfigurationMap;
    private _active: Configuration;

    private _configurationLoader: ConfigurationLoader;

    constructor({
        [DeveloperService]: dev,
        [TimeZoneService]: timezones,
        [LiveUpdateService]: liveUpdate,
        [SharePointService]: spo
    }: ServiceContext<DeveloperServiceProp & TimeZoneServiceProp & SharePointServiceProp & LiveUpdateServiceProp>) {
        this._dev = dev;
        this._timezones = timezones;
        this._liveUpdate = liveUpdate;
        this._spo = spo;
    }

    public async initialize(): Promise<void> {
        this._configurationLoader = new ConfigurationLoader(this._timezones, this._spo, this._liveUpdate);

        await this._spo.preflightSchema();
        this._configurations = await this._configurationLoader.all();
        this._configurationsById = await this._configurationLoader.entitiesById();
        this._active = first(this._configurations);

        this._dev.registerScripts(this._devScripts);
    }

    public get active(): Configuration { return this._active; }
    public set active(val: Configuration) {
        if (!val || this._configurationsById.has(val.id))
            this._active = val;
    }

    public get all(): readonly Configuration[] { return this._configurations; }
    public getById(id: number): Configuration { return this._configurationsById.get(id); }

    public track(entity: Configuration): void {
        this._configurationLoader.track(entity);
    }

    public async persist(): Promise<void> {
        await this._configurationLoader.persist();
    }

    private readonly _devScripts = {
        schema: {
            obliterate: async () => {
                console.log(`Starting 'obliterate()'`);

                const { id, title, schema } = this._active;

                console.log(`Deleting '${title}' (${id}) configuration list item`);
                this._active.snapshot();
                this._active.delete();
                await this.persist();

                const eh = new ErrorHandler();
                const batch = sp.web.createBatch();

                schema.lists.forEach(list => {
                    if (list !== ConfigurationList || this._configurations.length === 0) { // only delete the Configurations list if this is the last configuration
                        console.log(`\tDeleteing list '${list.title}'`);
                        sp.web.lists.getByTitle(list.title).inBatch(batch).delete().catch(eh.catch);
                    }
                });

                await batch.execute();
                eh.reportIfError();

                console.log(`Completed 'obliterate()'`);
            }
        }
    };
}