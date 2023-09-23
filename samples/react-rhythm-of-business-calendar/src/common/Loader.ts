import { includes, remove, noop } from 'lodash';
import { Entity } from "./Entity";

export abstract class Loader<E extends Entity<any>> {
    protected readonly _trackedEntities: E[] = [];
    protected readonly _entities: E[] = [];
    protected readonly _entitiesById: Map<number, E> = new Map<number, E>();

    public abstract entitiesById(): Promise<ReadonlyMap<number, E>>;

    public get entitiesWithChanges(): readonly E[] {
        return [
            ...this._trackedEntities,
            ...this._entities.filter(e => e.hasChanges())
        ];
    }

    public track(entity: E): void {
        if (!includes(this._trackedEntities, entity) && !includes(this._entities, entity)) {
            this._trackedEntities.push(entity);
        }
    }

    protected untrack(entity: E): void {
        remove(this._trackedEntities, entry => entry === entity);
    }

    public async persist(singleEntity?: E): Promise<void> {
        const previous = this._previousPersistPromise;
        await (this._previousPersistPromise = (async () => {
            await previous.catch(noop);
            await this.persistCore(singleEntity);
        })());
    }
    protected _previousPersistPromise: Promise<any> = Promise.resolve();

    protected abstract persistCore(singleEntity?: E): Promise<void>;

    protected readonly refreshEntityCollections = (): void => {
        remove(this._entities, entity => !entity.softDeleteSupported && entity.isDeleted);

        const committed = remove(this._trackedEntities, e => !e.isNew);
        this._entities.push(...committed);

        this._entitiesById.clear();
        this._entities.forEach(entity => {
            this._entitiesById.set(entity.id, entity);
        });
    }
}