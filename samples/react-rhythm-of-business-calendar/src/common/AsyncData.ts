import { flatten } from "lodash";
import { IComponent } from "./IComponent";

export interface IAsyncData<T> {
    done: boolean;
    loaded: boolean;
    saving: boolean;
    error: any;
    data: T;
    promise: Promise<T>;
    registerComponentForUpdates(component: IComponent): void;
    unregisterComponentForUpdates(component: IComponent): void;
}

export abstract class AsyncDataBase<T> implements IAsyncData<T> {
    private readonly _registeredComponents: Set<IComponent>;

    constructor() {
        this._registeredComponents = new Set();
    }

    public abstract done: boolean;
    public abstract saving: boolean;
    public abstract error: any;
    public abstract data: T;
    public abstract promise: Promise<T>;

    public get loaded(): boolean {
        return this.done && !this.error;
    }

    public registerComponentForUpdates(component: IComponent) {
        this._registeredComponents.add(component);
    }

    public unregisterComponentForUpdates(component: IComponent) {
        this._registeredComponents.delete(component);
    }

    protected notifyHandlers() {
        this._registeredComponents.forEach(component => component.componentShouldRender());
    }
}

export class AsyncData<T, K = any> extends AsyncDataBase<T> {
    public static createWithData<T, K = any>(data?: T, key?: K) {
        const dataAsync = new AsyncData<T, K>(key);
        dataAsync.dataLoaded(data);
        return dataAsync;
    }

    public static createWithError<T, K = any>(error: any, key?: K) {
        const dataAsync = new AsyncData<T, K>(key);
        dataAsync.dataFailed(error);
        return dataAsync;
    }

    private _key: K;
    public get key(): K { return this._key; }

    public done: boolean;
    public saving: boolean;
    public error: any;
    public data: T;

    public readonly promise: Promise<T>;
    private _promiseResolveFn: (d: T) => void;
    private _promiseRejectFn: (e: any) => void;

    constructor(key?: K, promise?: Promise<T>) {
        super();
        this._key = key;
        this.done = false;
        this.error = null;
        this.saving = false;
        this.data = null;
        this.promise = new Promise<T>((resolve, reject) => { this._promiseResolveFn = resolve; this._promiseRejectFn = reject; });

        promise?.then(this.dataLoaded, this.saveFailed);
    }

    public readonly dataLoaded = (data?: T) => {
        if (!this.done) {
            this.data = data || this.data;
            this.done = true;
            this._promiseResolveFn(this.data);
            this.notifyHandlers();
        }
    }

    public readonly dataFailed = (error: any) => {
        console.error(error);
        this.error = error;
        this.done = true;
        this._promiseRejectFn(this.error);
        this.notifyHandlers();
    }

    public readonly savingStarted = () => {
        this.error = null;
        this.saving = true;
        this.notifyHandlers();
    }

    public readonly saveSuccessful = () => {
        this.error = null;
        this.saving = false;
        this.notifyHandlers();
    }

    public readonly saveFailed = (error: any) => {
        console.error(error);
        this.error = error;
        this.saving = false;
        this.notifyHandlers();
    }

    public readonly dataUpdated = () => {
        this.notifyHandlers();
    }

    public replaceKey(key: K) {
        this._key = key;
    }
}

export class AggregatedAsyncData<T> extends AsyncDataBase<T[]> {
    private readonly _dataAsync: IAsyncData<T | readonly T[]>[];

    public readonly promise: Promise<T[]>;

    constructor(dataAsync: IAsyncData<T | readonly T[]>[]) {
        super();

        this._dataAsync = [...dataAsync];

        this.promise = Promise.all(this._dataAsync.map(d => d.promise)).then(flatten);
    }

    public get done(): boolean {
        return this._dataAsync.every(async => async.done);
    }

    public get error() {
        return this._dataAsync.filter(async => async.error)[0]?.error;
    }

    public get loaded(): boolean {
        return this._dataAsync.every(async => async.loaded);
    }

    public get saving(): boolean {
        return this._dataAsync.some(async => async.saving);
    }

    public get data(): T[] {
        return flatten(this._dataAsync.map(async => async.data instanceof Array ? async.data : [async.data]));
    }

    public registerComponentForUpdates(component: IComponent) {
        this._dataAsync.forEach(async => async.registerComponentForUpdates(component));
    }

    public unregisterComponentForUpdates(component: IComponent) {
        this._dataAsync.forEach(async => async.unregisterComponentForUpdates(component));
    }
}

export class AsyncDataCache<T> {
    private _dataAsync: AsyncData<T>;

    constructor(
        private materialize: () => Promise<T>,
        private key?: string
    ) { }

    public get(): AsyncData<T> {
        return this._dataAsync = (this._dataAsync || new AsyncData<T>(this.key, this.materialize()));
    }
}