import moment from 'moment-timezone';
import { ICachingOptions } from '@pnp/odata';
import { extractWebUrl, sp } from '@pnp/sp';
import "@pnp/sp/regional-settings";
import { IWeb } from '@pnp/sp/webs/types';
import { arrayToMap, cloneWeb, now, } from '../../Utils';
import { DeveloperService, DeveloperServiceProp, IDeveloperService } from '../developer';
import { ServiceContext } from '../IService';
import { SpfxContext } from '../SpfxContext';
import { ITimeZone, ITimeZoneService } from './TimeZoneServiceDescriptor';

interface TimeZoneMapping {
    readonly name: string;
    readonly momentId: string;
    readonly sharepointId: number;
}
const timezoneMappings = require('./timezone-mappings.json') as TimeZoneMapping[];
const timezoneMappingsBySharePointId = arrayToMap(timezoneMappings, tz => tz.sharepointId);

class TimeZoneResult {
    public Id: number;
    public Description: string;
    public Information: {
        Bias: number;
        DaylightBias: number;
        StandardBias: number;
    };
}

class TimeZone implements ITimeZone {
    public static fromTimeZoneResult(result: TimeZoneResult): TimeZone {
        return new TimeZone(result.Id, result.Description);
    }

    private readonly _mapping: TimeZoneMapping;

    public get hasMomentMapping(): boolean { return !!this._mapping; }
    public get momentId(): string { return this._mapping.momentId; }

    constructor(
        public readonly id: number,
        public readonly description: string
    ) {
        this._mapping = timezoneMappingsBySharePointId.get(id);
    }
}

export class OnlineTimeZoneService implements ITimeZoneService {
    private readonly _dev: IDeveloperService;
    private readonly _currentWebUrl: string;
    private readonly _siteTimeZoneCache: Map<string, TimeZone>;

    private _timeZones: TimeZone[];
    private _timeZonesBySharePointId: Map<number, TimeZone>;
    private _localTimeZone: ITimeZone;

    public get timeZones(): ITimeZone[] {
        return this._timeZones;
    }

    public get siteTimeZone(): ITimeZone {
        return this._siteTimeZoneCache.get(sp.web.toUrl());
    }

    public get localTimeZone(): ITimeZone {
        return this._localTimeZone;
    }

    public timeZoneFromId(id: number): ITimeZone {
        return this._timeZonesBySharePointId.get(id);
    }

    constructor({
        [DeveloperService]: dev,
        [SpfxContext]: context
    }: ServiceContext<DeveloperServiceProp>) {
        this._dev = dev;
        this._currentWebUrl = context.pageContext.web.absoluteUrl;
        this._siteTimeZoneCache = new Map<string, TimeZone>();
    }

    public async initialize(): Promise<void> {
        const [
            timeZoneResults,
            siteTimeZone
        ] = await Promise.all([
            sp.web.regionalSettings.timeZones.usingCaching(this._cacheOptions(sp.web, 'timezones'))(),
            this._getTimeZone(sp.web)
        ]);

        this._timeZones = timeZoneResults.map(TimeZone.fromTimeZoneResult).filter(tz => tz.hasMomentMapping);
        this._timeZonesBySharePointId = arrayToMap(this._timeZones, tz => tz.id);
        this._localTimeZone = this._timeZones.find(tz => tz.momentId === moment.tz.guess());

        this._siteTimeZoneCache.set(sp.web.toUrl(), siteTimeZone);

        this._dev.registerScripts(this._devScripts);
    }

    public async timeZoneForWeb(web?: IWeb): Promise<ITimeZone> {
        web = cloneWeb(web);
        const key = extractWebUrl(web.toUrl()) || this._currentWebUrl;

        if (!this._siteTimeZoneCache.has(key)) {
            const timeZone = await this._getTimeZone(web);
            this._siteTimeZoneCache.set(key, timeZone);
        }

        return this._siteTimeZoneCache.get(key);
    }

    private async _getTimeZone(web: IWeb): Promise<TimeZone> {
        const timeZoneResult = await web.regionalSettings.timeZone.usingCaching(this._cacheOptions(web, 'timezone'))();
        const timeZone = TimeZone.fromTimeZoneResult(timeZoneResult);

        const { hasMomentMapping, id, description } = timeZone;
        if (!hasMomentMapping) {
            console.warn(`Site time zone (${id} - ${description}) cannot be mapped to an IANA time zone for moment library.`);
        }

        return timeZone;
    }

    private readonly _cacheOptions = (web: IWeb, key: string) => {
        return {
            expiration: now().add(1, 'day').toDate(),
            storeName: 'local',
            key: `${extractWebUrl(web.toUrl()) || this._currentWebUrl}-${key}`
        } as ICachingOptions;
    }

    private readonly _devScripts = {
        timezones: {
            list: () => {
                console.log(`Listing known timezones`);

                const tzToString = (tz: ITimeZone) => `'${tz.description}' (SPO ID: ${tz.id}, Moment ID: ${tz.momentId})`;

                this._timeZones.forEach((tz, idx) => {
                    console.log(`${idx} ${tzToString(tz)}`);
                });

                console.log(`Site time zone: ${tzToString(this.siteTimeZone)}`);
            }
        }
    };
}