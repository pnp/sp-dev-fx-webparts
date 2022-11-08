import { compress, decompress } from 'compressed-json';
import moment from 'moment-timezone';
import { User, arrayToMap, now } from "common";
import { IListItemResult, IUserInfoResult } from "./query_";
import { CurrentChangeToken, FieldType, InternalName, ParentSchema, IViewDefinition, ListDefinition, ViewId } from "./schema";
import { IUpdateListItem, UpdateHyperlink, UpdateMultiChoice, UpdateMultiLookup, UpdateTaxonomy } from './update';
import { ListItemEntity } from "./ListItemEntity";
import { RateableListItemEntity } from './RateableListItemEntity';

type CacheUserMap = { [id: number]: IUserInfoResult };
type CacheItem = {
    timestamp: string;
    changeToken: string;
    schemaVersion: number;
    users: CacheUserMap;
    results: IListItemResult[];
};

export type ListItemFunctions<E extends ListItemEntity<any>> = {
    toEntity: (row: IListItemResult) => Promise<E>;
    updateListItem: (entity: E) => IUpdateListItem;
    extractReferencedUsers: (entity: E) => User[];
};

export class ListItemCache<E extends ListItemEntity<any>> {
    private readonly _functions: ListItemFunctions<E>;

    constructor(
        private readonly _siteUrl: string,
        private readonly _cache: Cache,
        private readonly _view: IViewDefinition,
        functions: ListItemFunctions<E>
    ) {
        this._functions = functions;
    }

    private _extractAllUsersById(entities: E[]): Map<number, User> {
        const allUsersById = new Map<number, User>();

        entities.forEach(e => {
            this._functions.extractReferencedUsers(e).filter(Boolean).forEach(u => allUsersById.set(u.id, u));
            allUsersById.set(e.author.id, e.author);
            allUsersById.set(e.editor.id, e.editor);
        });

        return allUsersById;
    }

    public async save(entities: E[]): Promise<void> {
        const { [ListDefinition]: list } = this._view;
        const fieldsByName = arrayToMap(list.fields, f => f.name);
        list.fields.filter(f => f[InternalName]).forEach(f => fieldsByName.set(f[InternalName], f));
        list.fields.filter(f => f.type === FieldType.User || f.type === FieldType.Lookup).forEach(f => fieldsByName.set(`${f.name}Id`, f));

        const toUserInfoResult = ({ id, title, login, email }: User): IUserInfoResult => {
            return { id: id.toString(), title, picture: undefined, sip: login, email };
        };

        const entitiesToDehydrate = entities.filter(e => !e.isDeleted || e.softDeleteSupported);

        const allUsersById = this._extractAllUsersById(entitiesToDehydrate);

        const results = entitiesToDehydrate.map(e => {
            const uli: IUpdateListItem & { [p: string]: any } = this._functions.updateListItem(e);

            Object.entries(uli).forEach(([k, v]) => {
                const field = fieldsByName.get(k);
                if (!field) return;

                switch (field.type) {
                    case FieldType.Text: break; // no conversion necessary
                    case FieldType.DateTime:
                    case FieldType.Number:
                    case FieldType.Currency:
                        delete uli[k];
                        uli[`${k}.`] = v;
                        break;
                    case FieldType.Hyperlink:
                        if (v instanceof UpdateHyperlink) {
                            uli[k] = v.Url;
                        }
                        break;
                    case FieldType.Boolean:
                        delete uli[k];
                        uli[`${k}.value`] = (v as boolean) ? "1" : "0";
                        break;
                    case FieldType.Choice:
                        if (field.multi && v instanceof UpdateMultiChoice) {
                            uli[k] = v.results;
                        }
                        break;
                    case FieldType.Lookup: {
                        delete uli[k];
                        const lookupIDs = (v instanceof UpdateMultiLookup) ? v.results : [v as number];
                        uli[field.name] = lookupIDs.filter(Boolean).map(id => ({ lookupId: id, lookupValue: '-' }));
                        break;
                    }
                    case FieldType.User: {
                        delete uli[k];
                        const userIDs = (v instanceof UpdateMultiLookup) ? v.results : [v as number];
                        uli[field.name] = userIDs.filter(Boolean);
                        break;
                    }
                    case FieldType.Taxonomy:
                        if (v instanceof UpdateTaxonomy) {
                            const { TermGuid } = v;
                            uli[k] = { TermGuid };
                        } else if (field.multi && typeof v === "string") {
                            delete uli[k];
                            uli[field.name] = v.split(';#').filter(i => i !== "-1").map(i => {
                                const TermID = i.split("|")[1];
                                return { TermID };
                            });
                        }
                        break;
                    case FieldType.Recurrence:
                        uli[k] = (v as boolean) ? "1" : "0";
                        break;
                    // case FieldType.Image: break; - TODO
                    // case FieldType.Picture: break; - TODO
                    // case FieldType.Calculated: break; - TODO
                    // case FieldType.Thumbnail: break; - TODO
                }
            });

            if (e instanceof RateableListItemEntity) {
                e.rating.ratedBy.forEach(u => allUsersById.set(u.id, u));
                uli.RatedBy = e.rating.ratedBy.map(u => u.id);
                uli.Ratings = e.rating.ratings.join(',')
            }

            uli.ID = e.id.toString();
            uli.owshiddenversion = e.etag.toString();
            uli.UniqueId = e.uniqueId.toString();
            uli.Author = e.author.id;
            uli.Editor = e.editor?.id || uli.Author;
            uli["Created."] = e.created.toISOString();
            uli["Modified."] = e.modified.toISOString();

            return uli as IListItemResult;
        });

        const users: CacheUserMap = {};
        allUsersById.forEach((v, k) => users[k] = toUserInfoResult(v));

        const cacheItem: CacheItem = {
            timestamp: now().toISOString(),
            changeToken: list[CurrentChangeToken],
            schemaVersion: list[ParentSchema].version,
            users,
            results
        };

        const json = JSON.stringify(compress(cacheItem));
        const cacheKey = this._cacheKey();
        await this._cache.put(new Request(cacheKey), new Response(json, { status: 200 }));
    }

    public async load(expiration: number): Promise<boolean> {
        const { title, [ListDefinition]: list } = this._view;

        const cacheKey = this._cacheKey();
        console.log('Attempting to rehydrate', title, 'from cache with key', cacheKey);

        const response = await this._cache.match(cacheKey);
        const data = await response?.json();

        if (!data) {
            console.log('No data in cache', title);
            return false;
        }

        let success = false;
        try {
            const cacheItem: CacheItem = decompress(data);

            const userFieldNames = list.fields.filter(f => f.type === FieldType.User).map(f => f.name);

            cacheItem.results.forEach((r: { [p: string]: any }) => {
                r.Author = [cacheItem.users[r.Author]];
                r.Editor = [cacheItem.users[r.Editor]];
                userFieldNames.forEach(fieldName => {
                    r[fieldName] = (r[fieldName] as number[]).map(id => cacheItem.users[id]);
                });
                if (r.RatedBy) r.RatedBy = (r.RatedBy as number[]).map(id => cacheItem.users[id]);
            });

            const isExpired = this._isExpired(cacheItem, expiration);
            const sameSchema = this._sameSchema(cacheItem);

            if (!isExpired && sameSchema) {
                for (const r of cacheItem.results) {
                    await this._functions.toEntity(r);
                }
                list[CurrentChangeToken] = cacheItem.changeToken;
                success = true;
            } else {
                console.log(title, 'cache data is stale', `expired: ${isExpired}, same schema: ${sameSchema}`);
            }
        } catch (ex) {
            console.error('rehydrate', title, 'from cache failed');
            await this._cache.delete(cacheKey);
        }

        return success;
    }

    public async purge(): Promise<void> {
        const cacheKey = this._cacheKey();
        console.log('Purging cache with key', cacheKey);
        await this._cache.delete(cacheKey);
    }

    private _cacheKey(): string {
        return `${this._siteUrl}?view=${this._view[ViewId]}`;
    }

    private _isExpired(cacheItem: CacheItem, expiration: number): boolean {
        return now().diff(moment(cacheItem.timestamp), 'days') > expiration;
    }

    private _sameSchema(cacheItem: CacheItem): boolean {
        return cacheItem.schemaVersion === this._view[ListDefinition][ParentSchema].version;
    }
}