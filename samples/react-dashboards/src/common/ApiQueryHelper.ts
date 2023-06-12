import { PnPClientStorage } from "@pnp/core";
import moment from "moment";
import { IResponseJson } from "./ApiHelper";
import { CacheExpiration } from "./CommonProps";

export interface DropDownOption {
    key: number;
    text: string;
}
export interface QueryPreset extends DropDownOption {
    description: string;
    query: string;
    columnsOrdering?: string[];
    sortby?: string;
}

export default class ApiQueryHelper {
    protected static queries: QueryPreset[];

    public static get Queries(): DropDownOption[] {
        return this.queries;
    }
    public static get Presets(): QueryPreset[] {
        return this.queries;
    }
    public static GetQueryById(key: number): QueryPreset {
        return this.queries.find((q) => q.key === key);
    }
    public static GetSanitisedQuery = (query: string): string => {
        return query
            .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '')
            .replace(/\s+/gm, ' ');
    }
    public static GetHash(str: string): string {
        let hash = 0, i, chr;
        if (str.length === 0) return hash.toString();
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return `spfxDashboard_${hash.toString()}`;
    }
    public static GetCachedResponse = (hash: string): IResponseJson => {
        const pnpStorage = new PnPClientStorage();
        pnpStorage.local
            .deleteExpired()
            .catch((e) => console.log(e));

        const lastResponseT = pnpStorage.local.get(`${hash}_data`);
        const lastResponseC = JSON.parse(pnpStorage.local.get(`${hash}_columns`));
        if (lastResponseT && lastResponseC) {
            return {
                tables: lastResponseT,
                columns: new Map(Object.entries(lastResponseC))
            };
        }
        return null;
    }
    public static SaveCachedResponse(hash: string, response: IResponseJson, cacheExpiration: CacheExpiration): void {
        //By default, the local cache size is 1 GB.
        const pnpStorage = new PnPClientStorage();
        const expiry = ApiQueryHelper.getExpirationDate(cacheExpiration);

        if (expiry) {
            pnpStorage.local.put(
                `${hash}_data`,
                response.tables,
                expiry
            );
            pnpStorage.local.put(
                `${hash}_columns`,
                JSON.stringify(Object.fromEntries(response.columns)),
                expiry
            );
        }
    }

    private static getExpirationDate(expiration: string): Date {
        const key = CacheExpiration[expiration as keyof typeof CacheExpiration]

        switch (key) {
            case CacheExpiration.FifteenMinutes:
                return moment().add(15, 'minutes').toDate();
            case CacheExpiration.OneHour:
                return moment().add(1, 'hour').toDate();
            case CacheExpiration.OneDay:
                return moment().endOf('day').toDate()
            default:
                return null;
        }
    }
}