import moment, { Moment } from "moment-timezone";
import { IPagedListDataStream } from "../services/sharepoint";
import { AsyncData } from "../AsyncData";
import { Entity } from "../Entity";
import { IKey } from "../IKey";
import { mapGetOrAdd, now } from "../Utils";

export interface IRangedListItemLoaderKey extends IKey {
    date: Moment;
}

export class DateKey implements IRangedListItemLoaderKey {
    constructor(
        public readonly date: Moment
    ) { }

    public valueOf(): number {
        return this.date.valueOf();
    }
}

export type CadenceGeneratorFn<T, K extends IRangedListItemLoaderKey> = (start: Moment, end: Moment, callbackFn: (key: K) => T) => T[];

enum ListItemLoaderState {
    initial,
    pageRequested,
    pageLoaded,
    done
}

class DateRange {
    private _start: Moment;
    private _end: Moment;

    constructor(start: Moment, end: Moment) {
        this._start = start;
        this._end = end;
    }

    public get start(): Moment { return this._start.clone(); }
    public get end(): Moment { return this._end.clone(); }

    public expand(date: Moment) {
        this._start = moment.min(this._start, date);
        this._end = moment.max(this._end, date);
    }
}

class PagedListItemLoader<TEntity extends Entity<TState>, TState> {
    private readonly _fetchInitialPageFn: () => Promise<IPagedListDataStream<TEntity>>;
    private readonly _allEntitiesInRangeAreLoaded: () => void;
    private readonly _isRangeCovered: (date: Moment) => boolean;
    private readonly _processPageResults: (entities: readonly TEntity[]) => Moment;

    private _state: ListItemLoaderState;
    private _currentPage: IPagedListDataStream<TEntity>;

    constructor(
        fetchInitialPageFn: () => Promise<IPagedListDataStream<TEntity>>,
        allEntitiesInRangeAreLoaded: () => void,
        isRangeCovered: (date: Moment) => boolean,
        processPageResults: (entities: TEntity[]) => Moment
    ) {
        this._fetchInitialPageFn = fetchInitialPageFn;
        this._allEntitiesInRangeAreLoaded = allEntitiesInRangeAreLoaded;
        this._isRangeCovered = isRangeCovered;
        this._processPageResults = processPageResults;

        this._state = ListItemLoaderState.initial;
        this._currentPage = null;
    }

    public loadMoreItems() {
        let pagePromise: Promise<IPagedListDataStream<TEntity>> = null;

        switch (this._state) {
            case ListItemLoaderState.initial:
                pagePromise = this._fetchInitialPageFn();
                this._state = ListItemLoaderState.pageRequested;
                break;
            case ListItemLoaderState.pageRequested:
                return;
            case ListItemLoaderState.pageLoaded:
                if (this._currentPage.hasNext) {
                    pagePromise = this._currentPage.next();
                    this._state = ListItemLoaderState.pageRequested;
                    break;
                } else {
                    this._state = ListItemLoaderState.done;
                    this._currentPage = null;
                    this._allEntitiesInRangeAreLoaded();
                    return;
                }
            case ListItemLoaderState.done:
                this._allEntitiesInRangeAreLoaded();
                return;
        }

        pagePromise.then(page => {
            const finalDate = this._processPageResults(page.results);

            this._currentPage = page;
            this._state = ListItemLoaderState.pageLoaded;

            if (!finalDate || this._isRangeCovered(finalDate)) {
                this._allEntitiesInRangeAreLoaded();
            } else {
                this.loadMoreItems();
            }
        });
    }
}

export abstract class RangedListItemLoader<TEntity extends Entity<TState>, TState, TKey extends IRangedListItemLoaderKey, TAsyncDataEntity, TAsyncData extends AsyncData<TAsyncDataEntity, TKey>> {
    private readonly _generateCadenceFn: CadenceGeneratorFn<TAsyncData, TKey>;
    private readonly _entitiesById: Map<number, TEntity>;
    private readonly _entitiesAsyncCache: Map<number, TAsyncData>;
    private readonly _pastItemsLoader: PagedListItemLoader<TEntity, TState>;
    private readonly _futureItemsLoader: PagedListItemLoader<TEntity, TState>;

    private _range: DateRange = null;

    constructor(
        initialPastPagePromiseFn: () => Promise<IPagedListDataStream<TEntity>>,
        initialFuturePagePromiseFn: () => Promise<IPagedListDataStream<TEntity>>,
        generateDatesFn: CadenceGeneratorFn<TAsyncData, TKey>
    ) {
        this._generateCadenceFn = generateDatesFn;
        this._entitiesById = new Map<number, TEntity>();
        this._entitiesAsyncCache = new Map<number, TAsyncData>();

        this._pastItemsLoader = new PagedListItemLoader<TEntity, TState>(
            initialPastPagePromiseFn,
            this._allEntitiesInPastRangeAreLoaded,
            this._isPastRangeCovered,
            this._processPageResults
        );
        this._futureItemsLoader = new PagedListItemLoader<TEntity, TState>(
            initialFuturePagePromiseFn,
            this._allEntitiesInFutureRangeAreLoaded,
            this._isFutureRangeCovered,
            this._processPageResults
        );
    }

    public get entitiesById(): Map<number, TEntity> {
        return this._entitiesById;
    }

    public get entitiesAsyncCache(): Map<number, TAsyncData> {
        return this._entitiesAsyncCache;
    }

    public loadEntitiesInRange(start: Moment, end: Moment): TAsyncData[] {
        if (this._range) {
            this._range.expand(start);
            this._range.expand(end);
        } else {
            this._range = new DateRange(start, end);
        }

        const entitiesAsync = this._generateCadenceFn(start, end, key => {
            return this.entityAsyncForKey(key);
        });

        const rangeIncludesPast = entitiesAsync.some(async => async.key.date.isBefore(now(), 'day'));
        const rangeIncludesFuture = entitiesAsync.some(async => async.key.date.isSameOrAfter(now(), 'day'));

        if (rangeIncludesPast)
            this._pastItemsLoader.loadMoreItems();

        if (rangeIncludesFuture)
            this._futureItemsLoader.loadMoreItems();

        return entitiesAsync;
    }

    public entityAsyncForKey(key: TKey): TAsyncData {
        return mapGetOrAdd(this._entitiesAsyncCache, key.valueOf(), () => this.newEntityAsync(key));
    }

    protected entityLoaded(entity: TEntity) {
        this._entitiesById.set(entity.id, entity);
    }

    protected abstract entityKey(item: TEntity): TKey;
    protected abstract newEntityAsync(key: TKey): TAsyncData;
    protected abstract allEntitiesAreLoaded(entityAsync: TAsyncData): void;

    private readonly _processPageResults = (entities: TEntity[]): Moment => {
        let finalKey: TKey = null;

        entities.filter(entity => !!entity).forEach(entity => {
            const entityKey = this.entityKey(entity);
            if (finalKey !== null && finalKey.valueOf() !== entityKey.valueOf()) {
                this.allEntitiesAreLoaded(this.entityAsyncForKey(finalKey));
            }
            finalKey = entityKey;
            this._range.expand(finalKey.date);
            this.entityLoaded(entity);
        });

        return finalKey && finalKey.date;
    }

    private readonly _allEntitiesInPastRangeAreLoaded = () => {
        this._allEntitiesAreLoadedInRange(this._range.start, now(), "[)");
    }

    private readonly _allEntitiesInFutureRangeAreLoaded = () => {
        this._allEntitiesAreLoadedInRange(now(), this._range.end, "[]");
    }

    private readonly _allEntitiesAreLoadedInRange = (start: Moment, end: Moment, inclusivity: '()' | '[)' | '(]' | '[]') => {
        this._entitiesAsyncCache.forEach((entityAsync) => {
            if (!entityAsync.done && entityAsync.key.date.isBetween(start, end, 'day', inclusivity)) {
                this.allEntitiesAreLoaded(entityAsync);
            }
        });
    }

    private readonly _isPastRangeCovered = (date: Moment) => {
        return date.isBefore(this._range.start);
    }

    private readonly _isFutureRangeCovered = (date: Moment) => {
        return date.isAfter(this._range.end);
    }
}

export abstract class ParentRangedListItemLoader<TEntity extends Entity<TState>, TState, TKey extends IRangedListItemLoaderKey, TAsyncData extends AsyncData<TEntity, TKey>>
    extends RangedListItemLoader<TEntity, TState, TKey, TEntity, TAsyncData> {

    constructor(
        initialPastPagePromiseFn: () => Promise<IPagedListDataStream<TEntity>>,
        initialFuturePagePromiseFn: () => Promise<IPagedListDataStream<TEntity>>,
        cadenceGeneratorFn: CadenceGeneratorFn<TAsyncData, TKey>
    ) {
        super(initialPastPagePromiseFn, initialFuturePagePromiseFn, cadenceGeneratorFn);
    }

    public loadEntitiesInRange(start: Moment, end: Moment): TAsyncData[] {
        const entitiesAsync = super.loadEntitiesInRange(start, end);
        this.loadChildEntitiesInRange(start, end);
        return entitiesAsync;
    }

    protected abstract loadChildEntitiesInRange(start: Moment, end: Moment): void;
}

export abstract class ChildRangedListItemLoader<TEntity extends Entity<TState>, TState, TKey extends IRangedListItemLoaderKey, TAsyncData extends AsyncData<TEntity[], TKey>, TParentEntity>
    extends RangedListItemLoader<TEntity, TState, TKey, TEntity[], TAsyncData> {

    private _parentEntitiesById = new Map<number, TParentEntity>();

    constructor(
        initialPastPagePromiseFn: () => Promise<IPagedListDataStream<TEntity>>,
        initialFuturePagePromiseFn: () => Promise<IPagedListDataStream<TEntity>>,
        cadenceGeneratorFn: CadenceGeneratorFn<TAsyncData, TKey>
    ) {
        super(initialPastPagePromiseFn, initialFuturePagePromiseFn, cadenceGeneratorFn);
    }

    public get parentEntitiesById(): Map<number, TParentEntity> {
        return this._parentEntitiesById;
    }

    public setParentEntityLookup(parentEntitiesById: Map<number, TParentEntity>) {
        this._parentEntitiesById = parentEntitiesById;
    }
}