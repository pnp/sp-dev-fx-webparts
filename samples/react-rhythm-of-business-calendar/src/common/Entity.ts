import { isEqual, isEqualWith, includes, remove, PropertyName, isEmpty, intersection, difference, cloneDeepWith } from 'lodash';
import { isMoment, isDuration } from 'moment-timezone';
import { Guid } from '@microsoft/sp-core-library';
import { User } from "./User";
import { IUserListChanges } from "./IUserListChanges";
import { ValidationRule } from "./ValidationRules";
import { reverseComparer, Comparer, PropsOfType, inverseFilter } from './Utils';

const Version: unique symbol = Symbol("Version");
const Current: unique symbol = Symbol("Current");
const Previous: unique symbol = Symbol("Previous");
const Snapshot: unique symbol = Symbol("Snapshot");
const LiveUpdateTemp: unique symbol = Symbol("Live Update");

export const stateIsEqualCustomizer = (value: any, other: any, indexOrKey: PropertyName | undefined, parent: any, otherParent: any, stack: any): boolean | undefined => {
    if (indexOrKey === Version) {
        return true;
    } else if (isMoment(value) && isMoment(other)) {
        if (!value.isValid() && !other.isValid())
            return true;
        else
            return value.isSame(other);
    } else if (isDuration(value) && isDuration(other)) {
        if (!value.isValid() && !other.isValid())
            return true;
        else
            return value.asMilliseconds() === other.asMilliseconds();
    } else if (value instanceof Map && other instanceof Map) {
        return isEqual(value, other);
    } else if (value instanceof Set && other instanceof Set) {
        return isEqual(value, other);
    } else if (Array.isArray(value) && Array.isArray(other) && indexOrKey) {
        return isEqualWith(value, other, stateIsEqualCustomizer);
    } else if (value instanceof User && other instanceof User) {
        return User.equal(value, other);
    } else if (value instanceof Guid && other instanceof Guid) {
        return value.equals(other);
    }
}

interface ISnapshot {
    readonly hasSnapshot: boolean;
    snapshot(): void;
    revert(): void;
    immortalize(): void;
}

interface ILiveUpdate {
    readonly hasPrevious: boolean;
    readonly inLiveUpdate: boolean;
    beginLiveUpdate(): void;
    endLiveUpdate(): void;
}

type ExtractEntityStateType<E> = E extends Entity<infer S, any> ? S : never;

type IEntityState<S, ID extends string | number = number> = S & {
    id: ID;
    deleted: boolean;
    [Version]: number;
};
type States<S, ID extends string | number = number> = {
    [Current]: IEntityState<S, ID>;
    [Previous]?: IEntityState<S, ID>;
    [Snapshot]?: IEntityState<S, ID>;
    [LiveUpdateTemp]?: IEntityState<S, ID>;
};

export interface IEntity<ID extends string | number = number> extends ISnapshot, ILiveUpdate {
    readonly id: ID;
    readonly displayName: string;
    readonly isNew: boolean;
    readonly isDeleted: boolean;
    readonly softDeleteSupported: boolean;
    hasChanges(): boolean;
    valid(): boolean;
    delete(): void;
    snapshotValue(property: string | number | symbol): any;
    previousValue(property: string | number | symbol): any;
    isSearchMatch(text: string, matchAllWords?: boolean): boolean;
}

export abstract class Entity<S, ID extends string | number = number> implements IEntity<ID> {
    public static readonly DisplayNameAscComparer = <S>(a: Entity<S>, b: Entity<S>) => a.displayName.localeCompare(b.displayName);
    public static readonly DisplayNameDescComparer = reverseComparer(Entity.DisplayNameAscComparer);

    public static readonly NotDeletedFilter = <S>({ isDeleted }: Entity<S>): boolean => !isDeleted;
    public static readonly NewAndDeletedFilter = <S>({ isNew, isDeleted }: Entity<S>): boolean => isNew && isDeleted;
    public static readonly NewAndGhostableFilter = <S>({ isNew, allowGhosting }: Entity<S>): boolean => isNew && allowGhosting;

    public static search<E extends Entity<S>, S>(entities: E[], text: string, matchAllWords?: boolean): E[];
    public static search<E extends Entity<S>, S>(entities: readonly E[], text: string, matchAllWords?: boolean): readonly E[];
    public static search<E extends Entity<S>, S>(entities: E[] | readonly E[], text: string, matchAllWords: boolean = true): E[] | readonly E[] {
        if (text) {
            const words = Entity._buildSearchWords(text);
            return entities.filter(entity => entity._isSearchMatchCore(words, matchAllWords));
        } else {
            return entities;
        }
    }

    private static _buildSearchWords(text: string): string[] {
        return text.toLocaleLowerCase().split(' ');
    }

    private readonly _validateRules: ValidationRule<Entity<S, any>>[];

    private _states: States<S, ID>;
    private _activeState: keyof States<S, ID>;
    private _peekPriorState: keyof States<S, ID>;
    private _searchHelpers: string[];
    private _boundedContextParticipants: Set<ISnapshot & ILiveUpdate>;

    constructor(id?: ID) {
        this._validateRules = this.validationRules() || [];

        this._states = {
            [Current]: {
                id,
                deleted: false,
                [Version]: 0
            } as IEntityState<S, ID>
        };
        this._activeState = Current;
        this._peekPriorState = null;

        this._searchHelpers = null;
        this._boundedContextParticipants = new Set();
    }

    public get id(): ID {
        return this._states[this._activeState].id;
    }

    private _key: Guid;
    public get key(): string {
        return (this.id || (this._key ||= Guid.newGuid())).toString();
    }

    public abstract get displayName(): string;

    public get isNew(): boolean {
        return !this.id;
    }

    public get isDeleted(): boolean {
        return this._states[this._activeState].deleted;
    }

    public setId(id: ID) {
        if (this.isNew) {
            this._states[this._activeState].id = id;
        }
    }

    public hasChanges(specificProperty?: string | number | symbol): boolean {
        if (this.isNew && !this.allowGhosting) {
            return true;
        } else if (this.hasSnapshot) {
            const current = specificProperty ? this.currentValue(specificProperty) : this._states[Current];
            const snapshot = specificProperty ? this.snapshotValue(specificProperty) : this._states[Snapshot];
            return !isEqualWith(current, snapshot, this.stateIsEqualCustomizer);
        } else {
            return false;
        }
    }

    public valid(): boolean {
        return this._validateRules.every(rule => rule.validate(this));
    }

    public delete() {
        this._states[this._activeState].deleted = true;
    }

    public undelete() {
        if (this.isDeleted) {
            const state = this._states[this._activeState];
            state.deleted = false;

            if (!this.softDeleteSupported) {
                if (this.hasPrevious && !this.previousValue<boolean>("isDeleted") &&
                    this.hasSnapshot && this.snapshotValue<boolean>("isDeleted")) {
                    state.id = undefined;
                }
            }
        }
    }

    public stateVersion(): number {
        return this._states[this._activeState][Version];
    }

    protected includeInBoundedContext(relationship: ISnapshot & ILiveUpdate) {
        this._boundedContextParticipants.add(relationship);
    }

    public isInBoundedContext(relationship: ISnapshot & ILiveUpdate): boolean {
        return this._boundedContextParticipants.has(relationship);
    }

    public get hasSnapshot(): boolean {
        return !!this._states[Snapshot];
    }

    public get hasPrevious(): boolean {
        return !!this._states[Previous];
    }

    public get inLiveUpdate(): boolean {
        return !!this._states[LiveUpdateTemp];
    }

    public snapshot() {
        if (!this.hasSnapshot) {
            this._states[Snapshot] = this._states[Current];
            this._states[Current] = this._copyState(this._states[Current]);
            this._boundedContextParticipants.forEach(participant => participant.snapshot());
        }
    }

    public revert() {
        if (this.hasSnapshot) {
            this._states[Current] = this._states[Snapshot];
            this._states[Snapshot] = null;
            this._boundedContextParticipants.forEach(participant => participant.revert());
        }
    }

    public immortalize() {
        if (this.hasSnapshot) {
            if (this.hasChanges()) {
                this._searchHelpers = null;
                this._states[Current][Version]++;
            } else
                this._states[Current] = this._states[Snapshot];

            this._states[Snapshot] = null;
            this._boundedContextParticipants.forEach(participant => participant.immortalize());
        }

        if (this.hasPrevious) {
            this._states[Previous] = null;
        }
    }

    public isSearchMatch(text: string, matchAllWords: boolean = true): boolean {
        return text ? this._isSearchMatchCore(Entity._buildSearchWords(text), matchAllWords) : true;
    }

    public get softDeleteSupported(): boolean {
        return false;
    }

    public get allowGhosting(): boolean {
        return false;
    }

    protected get state(): S {
        return this._states[this._activeState];
    }

    public beginLiveUpdate(isNew: boolean = false) {
        if (!this.inLiveUpdate) {
            if (this.hasSnapshot) {
                this._states[LiveUpdateTemp] = this._states[Snapshot];
                this._states[Snapshot] = this._copyState(this._states[Snapshot]);
                this._activeState = Snapshot;
            } else {
                this._states[LiveUpdateTemp] = this._states[Current];
                this._states[Current] = this._copyState(this._states[Current]);
            }

            if (isNew) {
                this._states[LiveUpdateTemp].id = undefined;
            }

            this._boundedContextParticipants.forEach(participant => participant.beginLiveUpdate());
        }
    }

    public endLiveUpdate() {
        if (this.inLiveUpdate) {
            this._states[Previous] = this._states[Previous] || this._states[LiveUpdateTemp];

            const isNew = !this._states[Previous].id;
            const liveUpdateMadeChanges = !isNew && !isEqualWith(this._states[Previous], this.hasSnapshot ? this._states[Snapshot] : this._states[Current], this.stateIsEqualCustomizer);

            this._activeState = Current;

            if (isNew) {
                this._states[Previous] = this._copyState(this._states[Current]);
            } else if (this.hasSnapshot) {
                if (liveUpdateMadeChanges) {
                    const copy = this._copyState(this._states[Snapshot]);

                    // eslint-disable-next-line guard-for-in
                    for (const prop in copy) {
                        const current_value = (this._states[Current] as any)[prop];
                        const prior_snapshot_value = (this._states[LiveUpdateTemp] as any)[prop];

                        const propValuesAreEqual = isEqualWith(current_value, prior_snapshot_value, this.stateIsEqualCustomizer);

                        if (propValuesAreEqual) {
                            (this._states[Current] as any)[prop] = (copy as any)[prop];
                        }
                    }
                } else {
                    this._states[Snapshot] = this._states[Previous];
                    this._states[Previous] = null;
                }
            } else if (!liveUpdateMadeChanges) {
                this._states[Current] = this._states[Previous];
                this._states[Previous] = null;
            }

            this._states[LiveUpdateTemp] = null;

            this._boundedContextParticipants.forEach(participant => participant.endLiveUpdate());
        }
    }

    public currentValue<T = any>(property: string | number | symbol): T {
        this.peekCurrent();
        const value = (this as any)[property];
        this.endPeek();
        return value as T;
    }

    public previousValue<T = any>(property: string | number | symbol): T {
        this.peekPrevious();
        const value = (this as any)[property];
        this.endPeek();
        return value as T;
    }

    public snapshotValue<T = any>(property: string | number | symbol): T {
        this.peekSnapshot();
        const value = (this as any)[property];
        this.endPeek();
        return value as T;
    }

    public peekCurrent() {
        this._peekPriorState = this._activeState;
        this._activeState = Current;
    }

    public peekSnapshot() {
        this._peekPriorState = this._activeState;
        this._activeState = Snapshot;
    }

    public peekPrevious() {
        this._peekPriorState = this._activeState;
        this._activeState = Previous;
    }

    public endPeek() {
        if (this._peekPriorState) {
            this._activeState = this._peekPriorState;
            this._peekPriorState = null;
        }
    }

    protected usersDifference(propertyName: PropsOfType<S, User[]>): IUserListChanges {
        if (this.hasSnapshot) {
            const current = this._states[Current][propertyName] as unknown as User[];
            const snapshot = this._states[Snapshot][propertyName] as unknown as User[];

            return {
                added: User.except(current, snapshot),
                removed: User.except(snapshot, current)
            };
        } else {
            return { added: [], removed: [] };
        }
    }

    protected stateIsEqualCustomizer(value: any, other: any, indexOrKey: PropertyName | undefined, parent: any, otherParent: any, stack: any): boolean | undefined {
        return stateIsEqualCustomizer(value, other, indexOrKey, parent, other, stack);
    }

    protected cloneStateCustomizer<T>(value: any, key: number | string | undefined | symbol, object: T | undefined, stack: any): any {
        if (key === Version)
            return value + 1;
        else if (value instanceof Entity)
            return value;
        else if (isMoment(value) || isDuration(value))
            return value.clone();
        else if (typeof value?.clone === "function")
            return value.clone();
    }

    private _copyState(state: IEntityState<S, ID>): IEntityState<S, ID> {
        return cloneDeepWith(state, this.cloneStateCustomizer);
    }

    private _createSearchHelpers() {
        this._searchHelpers = [
            this.displayName,
            ...this.buildSearchHelperStrings()
        ].filter(Boolean).map(str => str.toLocaleLowerCase());
    }

    private _searchHelpersContain(text: string) {
        if (!this._searchHelpers) {
            this._createSearchHelpers();
        }

        return this._searchHelpers.some(helper => helper.includes(text));
    }

    private _isSearchMatchCore(words: string[], matchAllWords: boolean = true): boolean {
        if (matchAllWords)
            return words.every(word => this._searchHelpersContain(word));
        else
            return words.some(word => this._searchHelpersContain(word));
    }

    protected buildSearchHelperStrings(): string[] { return []; }
    protected validationRules(): ValidationRule<Entity<S, any>>[] { return []; }
}


export enum EntityRelationshipSortOption {
    OnImmortalize = 0,
    OnAdd = 1,
    OnAddAndInsert = 2
}

export interface IRelationshipSortingParameters<T> {
    comparer: Comparer<T>;
    option?: EntityRelationshipSortOption;
}


export interface IManyToOneRelationship<TParent> extends ISnapshot, ILiveUpdate {
    get(): TParent;
    getSnapshot(): TParent;
    getPrevious(): TParent;
    set(val: TParent): void;
}

interface IToManyRelationshipBase<TRelated> extends ISnapshot, ILiveUpdate {
    get(): ReadonlyArray<TRelated>;
    readonly hasItems: boolean;
    hasChanges(): boolean;
    add(entity: TRelated): void;
    insert(entity: TRelated, index?: number): void;
    remove(entity: TRelated): void;
    removeAll(): void;
    forEach(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => void, thisArg?: any): void;
    map<U>(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => U): U[];
    filter(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => unknown): TRelated[];
    find(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => boolean): TRelated | undefined;
    addNotificationHandler(handler: () => void): void;
    removeNotificationHandler(handler: () => void): void;
    snapshotValue(): readonly TRelated[];
    previousValue(): readonly TRelated[];
    sorting?: Readonly<IRelationshipSortingParameters<TRelated>>;
}

type ToManyRelationshipState<TRelated extends Entity<any, any>> = {
    [Current]: TRelated[];
    [Previous]?: TRelated[];
    [Snapshot]?: TRelated[];
    [LiveUpdateTemp]?: TRelated[];
};

export abstract class ToManyRelationshipBase<TEntity extends Entity<any, any>, TRelated extends Entity<any, any>> implements IToManyRelationshipBase<TRelated> {
    private _states: ToManyRelationshipState<TRelated>;
    private _activeState: keyof ToManyRelationshipState<TRelated>;
    private _handlers: Set<() => void> = new Set();

    protected constructor(
        protected readonly _parent: TEntity,
        public readonly sorting?: Readonly<IRelationshipSortingParameters<TRelated>>
    ) {
        this._states = {
            [Current]: []
        };
        this._activeState = Current;
    }

    public addNotificationHandler(handler: () => void) {
        this._handlers.add(handler);
    }

    public removeNotificationHandler(handler: () => void) {
        this._handlers.delete(handler);
    }

    protected get state(): TRelated[] {
        return this._states[this._activeState];
    }

    public get(): ReadonlyArray<TRelated> {
        return this.state;
    }

    public get hasItems(): boolean {
        return !isEmpty(this.state);
    }

    public hasChanges(): boolean {
        let hasChanges: boolean = false;

        const currentItems = this._states[Current].filter(ToManyRelationshipBase.NotNewAndDeletedFilter);

        if (this.hasSnapshot) {
            const snapshotItems = this._states[Snapshot];
            const currentNonGhostableItems = currentItems.filter(ToManyRelationshipBase.NotNewAndGhostableFilter);
            hasChanges = !isEqual(currentNonGhostableItems, snapshotItems);
            hasChanges ||= currentItems.some(bc => bc.hasChanges());
        }

        return hasChanges;
    }
    private static readonly NotNewAndDeletedFilter = inverseFilter(Entity.NewAndDeletedFilter);
    private static readonly NotNewAndGhostableFilter = inverseFilter(Entity.NewAndGhostableFilter);

    public add(entity: TRelated) {
        if (this._insertCore(entity)) {
            if (this._shouldSortOnAdd)
                this._sort();
        }
    }

    public insert(entity: TRelated, index?: number) {
        if (this._insertCore(entity, index)) {
            if (this._shouldSortOnInsert)
                this._sort();
        }
    }

    private _insertCore(entity: TRelated, index?: number): boolean {
        if (entity && !includes(this.state, entity)) {
            if (this._parent.isInBoundedContext(this)) {
                if (entity.hasSnapshot) this.snapshot();
                else if (this.hasSnapshot) entity.snapshot();

                if (entity.inLiveUpdate) this.beginLiveUpdate();
                else if (this.inLiveUpdate) entity.beginLiveUpdate();
            }

            if (index === 0)
                this.state.unshift(entity);
            else if (index < this.state.length)
                this.state.splice(index, 0, entity);
            else
                this.state.push(entity);

            this.addInRelated(entity);

            this._notifyHandlers();

            return true;
        } else {
            return false;
        }
    }

    protected abstract addInRelated(entity: TRelated): void;

    public remove(entity: TRelated): void {
        if (!entity) return;

        remove(this.state, item => item === entity)
            .map(item => this.removeInRelated(item));

        this._notifyHandlers();
    }

    public removeAll(): void {
        this.state
            .splice(0, this.state.length)
            .map(item => this.removeInRelated(item));

        this._notifyHandlers();
    }

    protected abstract removeInRelated(entity: TRelated): void;

    public forEach(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => void): void {
        this.state.forEach(callbackfn);
    }

    public map<U>(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => U): U[] {
        return this.state.map(callbackfn);
    }

    public filter(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => unknown): TRelated[] {
        return this.state.filter(callbackfn);
    }

    public find(callbackfn: (value: TRelated, index: number, array: readonly TRelated[]) => value is TRelated): TRelated | undefined {
        return this.state.find(callbackfn);
    }

    public get hasSnapshot(): boolean {
        return !!this._states[Snapshot];
    }

    public get hasPrevious(): boolean {
        return !!this._states[Previous];
    }

    public get inLiveUpdate(): boolean {
        return !!this._states[LiveUpdateTemp];
    }

    public snapshot() {
        if (!this.hasSnapshot) {
            this._states[Snapshot] = this._states[Current].slice();
            this.forEach(item => item.snapshot());
        }
    }

    public revert() {
        if (this.hasSnapshot) {
            difference(this.snapshotValue(), this.get()).forEach(item => item.revert());
            this._states[Current] = this._states[Snapshot];
            this._states[Snapshot] = null;
            this.forEach(item => item.revert());
        }
    }

    public immortalize() {
        if (this.hasSnapshot) {
            if (this.hasChanges()) {
                difference(this.snapshotValue(), this.get()).forEach(item => item.immortalize());
                if (this._shouldSortOnImmortalize) this._sort();
            } else {
                this._states[Current] = this._states[Snapshot];
            }

            this._states[Snapshot] = null;
            this.forEach(item => item.immortalize());
            remove(this.state, Entity.NewAndDeletedFilter).map(item => this.removeInRelated(item));
            remove(this.state, Entity.NewAndGhostableFilter).map(item => this.removeInRelated(item));
        }

        if (this.hasPrevious) {
            this._states[Previous] = null;
        }
    }

    public previousValue(): readonly TRelated[] {
        return this._states[Previous];
    }

    public snapshotValue(): readonly TRelated[] {
        return this._states[Snapshot];
    }

    public beginLiveUpdate() {
        if (!this.inLiveUpdate) {
            if (this.hasSnapshot) {
                this._states[LiveUpdateTemp] = this._states[Snapshot];
                this._states[Snapshot] = this._states[Snapshot].slice();
                this._activeState = Snapshot;
            } else {
                this._states[LiveUpdateTemp] = this._states[Current];
                this._states[Current] = this._states[Current].slice();
            }

            this.forEach(item => item.beginLiveUpdate());
            this._parent.beginLiveUpdate();
        }
    }

    public endLiveUpdate() {
        if (this.inLiveUpdate) {
            this._states[Previous] = this._states[Previous] || this._states[LiveUpdateTemp];

            this._sort();

            // TODO: need a better way to access this information from the parent entity
            const isNew = this._parent.hasPrevious && isEqualWith((this._parent as any)._states[Current], (this._parent as any)._states[Previous], (this._parent as any).stateIsEqualCustomizer);

            const liveUpdateMadeChanges = !isNew && !isEqual(this._states[Previous], this.hasSnapshot ? this._states[Snapshot] : this._states[Current]);
            const noItemsHavePrevious = this.state.every(item => !item.hasPrevious);

            if (isNew) {
                this._states[Previous] = this._states[Current].slice();
            } if (this.hasSnapshot) {
                this._activeState = Current;

                if (liveUpdateMadeChanges) {
                    // if exists in both current and prior snapshot but not this snapshot, remove it from current
                    const inBothCurrentAndPriorSnapshot = intersection(this._states[Current], this._states[LiveUpdateTemp]);
                    const notInSnapshot = difference(inBothCurrentAndPriorSnapshot, this._states[Snapshot]);
                    remove(this._states[Current], item => notInSnapshot.includes(item));

                    // if exists in snapshot but does not exist in either current or prior snapshot, add it to current
                    const inSnapshotButNotOthers = difference(this._states[Snapshot], this._states[Current], this._states[LiveUpdateTemp]);
                    this._states[Current].push(...inSnapshotButNotOthers);
                } else if (noItemsHavePrevious) {
                    this._states[Snapshot] = this._states[Previous];
                    this._states[Previous] = null;
                }
            } else if (!liveUpdateMadeChanges && noItemsHavePrevious) {
                this._states[Current] = this._states[Previous];
                this._states[Previous] = null;
            }

            this._states[LiveUpdateTemp] = null;

            difference(this.previousValue(), this.get()).forEach(item => item.endLiveUpdate());
            this.forEach(item => item.endLiveUpdate());
            this._parent.endLiveUpdate();
        }
    }

    private get _shouldSortOnAdd(): boolean {
        if (!!this.sorting) {
            switch (this.sorting.option) {
                case EntityRelationshipSortOption.OnAdd:
                case EntityRelationshipSortOption.OnAddAndInsert:
                    return true;
                case EntityRelationshipSortOption.OnImmortalize:
                default:
                    return !this.hasSnapshot;
            }
        } else {
            return false;
        }
    }

    private get _shouldSortOnInsert(): boolean {
        if (!!this.sorting) {
            switch (this.sorting.option) {
                case EntityRelationshipSortOption.OnAddAndInsert:
                    return true;
                case EntityRelationshipSortOption.OnAdd:
                case EntityRelationshipSortOption.OnImmortalize:
                default:
                    return !this.hasSnapshot;
            }
        } else {
            return false;
        }
    }

    private get _shouldSortOnImmortalize(): boolean {
        if (!!this.sorting) {
            switch (this.sorting.option) {
                case EntityRelationshipSortOption.OnAdd:
                case EntityRelationshipSortOption.OnAddAndInsert:
                    return false;
                case EntityRelationshipSortOption.OnImmortalize:
                default:
                    return true;
            }
        } else {
            return false;
        }
    }

    private _sort() {
        if (!!this.sorting) {
            this.state.sort(this.sorting.comparer);
        }
    }

    private _notifyHandlers() {
        this._handlers.forEach(handler => handler());
    }
}

export interface IOneToManyRelationship<TChild> extends IToManyRelationshipBase<TChild> {
}

export class OneToManyRelationship<TParent extends Entity<any, any>, TChild extends Entity<any, any>> extends ToManyRelationshipBase<TParent, TChild> {
    public static create<TParent extends Entity<any, any>, TChild extends Entity<any, any>>(
        parent: TParent,
        property: PropsOfType<TChild, IManyToOneRelationship<TParent>>,
        sorting?: IRelationshipSortingParameters<TChild>
    ): IOneToManyRelationship<TChild> {
        return new OneToManyRelationship<TParent, TChild>(parent, property, sorting);
    }

    private constructor(
        parent: TParent,
        private readonly _property: PropsOfType<TChild, IManyToOneRelationship<TParent>>,
        sorting?: Readonly<IRelationshipSortingParameters<TChild>>
    ) {
        super(parent, sorting);
    }

    protected addInRelated(entity: TChild): void {
        this._parentRelationship(entity).set(this._parent);
    }

    protected removeInRelated(entity: TChild): void {
        this._parentRelationship(entity).set(null);
    }

    // @internal
    public readonly _parentRelationship = (entity: TChild): IManyToOneRelationship<TParent> => {
        return (entity as any)[this._property];
    }
}

export interface IManyToManyRelationship<TRelated> extends IToManyRelationshipBase<TRelated> {
    set(entities: TRelated[]): void;
}

export class ManyToManyRelationship<TEntity extends Entity<any, any>, TRelated extends Entity<any, any>> extends ToManyRelationshipBase<TEntity, TRelated> {
    public static create<TEntity extends Entity<any, any>, TRelated extends Entity<any, any>>(
        entity: TEntity,
        relatedCollectionProperty: PropsOfType<TRelated, IManyToManyRelationship<TEntity>>,
        sorting?: IRelationshipSortingParameters<TRelated>
    ): IManyToManyRelationship<TRelated> {
        return new ManyToManyRelationship<TEntity, TRelated>(entity, relatedCollectionProperty, sorting);
    }

    constructor(
        parent: TEntity,
        private readonly _property: PropsOfType<TRelated, IManyToManyRelationship<TEntity>>,
        sorting?: IRelationshipSortingParameters<TRelated>
    ) {
        super(parent, sorting);
    }

    public set(entities: TRelated[]): void {
        this.removeAll();
        entities.forEach(entity => this.add(entity));
    }

    protected addInRelated(entity: TRelated): void {
        this._parentRelationship(entity).add(this._parent);
    }

    protected removeInRelated(entity: TRelated): void {
        this._parentRelationship(entity).remove(this._parent);
    }

    private _parentRelationship = (entity: TRelated): IManyToManyRelationship<TEntity> => {
        return (entity as any)[this._property];
    }
}

export class ManyToOneRelationship<TChild extends Entity<any, any>, TParent extends Entity<any, any>> implements IManyToOneRelationship<TParent> {
    public static create<TChild extends Entity<any, any>, TParent extends Entity<any, any>>(
        entity: TChild,
        childCollectionProperty: PropsOfType<TParent, IOneToManyRelationship<TChild>>,
        stateProperty: keyof ExtractEntityStateType<TChild>
    ): IManyToOneRelationship<TParent> {
        return new ManyToOneRelationship<TChild, TParent>(entity, childCollectionProperty, stateProperty);
    }

    private constructor(
        private readonly _entity: TChild,
        private readonly _childCollectionProperty: PropsOfType<TParent, IOneToManyRelationship<TChild>>,
        private readonly _stateProperty: keyof ExtractEntityStateType<TChild>
    ) { }

    public get(): TParent {
        // eslint-disable-next-line dot-notation
        return this._entity['state'][this._stateProperty] as TParent;
    }

    public getSnapshot(): TParent {
        return this._entity.hasSnapshot ? this._entity['_states'][Snapshot][this._stateProperty] as TParent : undefined;
    }

    public getPrevious(): TParent {
        return this._entity.hasPrevious ? this._entity['_states'][Previous][this._stateProperty] as TParent : undefined;
    }

    public set(newParent: TParent) {
        const current = this.get();

        if (current !== newParent) {
            // eslint-disable-next-line dot-notation
            this._entity['state'][this._stateProperty] = newParent;

            if (!!current) {
                this._childRelationship(current).remove(this._entity);
            }

            if (newParent) {
                this._childRelationship(newParent).add(this._entity);
            }
        }
    }

    public get hasSnapshot(): boolean {
        return this.get()?.hasSnapshot;
    }

    public get hasPrevious(): boolean {
        return this.get()?.hasPrevious;
    }

    public get inLiveUpdate(): boolean {
        return this.get().inLiveUpdate;
    }

    public snapshot() {
        this.get()?.snapshot();
    }

    public revert() {
        if (this.hasSnapshot) {
            const snapshot = this.getSnapshot();
            const current = this.get();

            if (snapshot !== current) snapshot?.revert();
            current?.revert();
        }
    }

    public immortalize() {
        if (this.hasSnapshot) {
            const snapshot = this.getSnapshot();
            const current = this.get();

            if (snapshot !== current) snapshot?.immortalize();
            current?.immortalize();
        }
    }

    public beginLiveUpdate() {
        this.get()?.beginLiveUpdate();
    }

    public endLiveUpdate() {
        const previous = this.getPrevious();
        const current = this.get();

        if (previous !== current) previous?.endLiveUpdate();
        current?.endLiveUpdate();
    }

    private _childRelationship = (entity: TParent): IOneToManyRelationship<TChild> => {
        return (entity as any)[this._childCollectionProperty];
    }
}