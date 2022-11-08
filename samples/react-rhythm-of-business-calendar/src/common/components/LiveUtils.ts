import { IManyToManyRelationship, IManyToOneRelationship, IOneToManyRelationship, ManyToManyRelationship, ManyToOneRelationship, OneToManyRelationship } from "common"
import { ListItemEntity } from "common/sharepoint";

const isOneToManyRelationship = <T>(obj: any): obj is IOneToManyRelationship<T> =>
    obj instanceof OneToManyRelationship

const isManyToManyRelationship = <T>(obj: any): obj is IManyToManyRelationship<T> =>
    obj instanceof ManyToManyRelationship

const isManyToOneRelationship = <T>(obj: any): obj is IManyToOneRelationship<T> =>
    obj instanceof ManyToOneRelationship

export type LiveType<E extends ListItemEntity<any>, P extends keyof E> =
    E[P] extends IManyToManyRelationship<infer T>
    ? T[]
    : (E[P] extends IManyToOneRelationship<infer T>
        ? T
        : (E[P] extends IOneToManyRelationship<any>
            ? never
            : E[P]
        )
    );

export type RelType<E extends ListItemEntity<any>, P extends keyof E> =
    E[P] extends (IOneToManyRelationship<infer T> | IManyToManyRelationship<infer T> | IManyToOneRelationship<infer T>) ? T : (E[P] extends Array<infer T> ? T : E[P]);

export const getCurrentValue = <E extends ListItemEntity<any>, P extends keyof E>(entity: E, propertyName: P): LiveType<E, P> => {
    const raw: E[P] = entity[propertyName];
    if (isManyToOneRelationship<RelType<E, P>>(raw)) {
        return raw.get() as LiveType<E, P>;
    } else if (isManyToManyRelationship<RelType<E, P>>(raw)) {
        return raw.get() as LiveType<E, P>;
    } else if (isOneToManyRelationship<RelType<E, P>>(raw)) {
        throw new Error('One-to-many relationships are not supported by the LiveUpdate component. Use LiveRelationship instead');
    } else {
        return raw as LiveType<E, P>;
    }
};

export const getHasSnapshotValue = <E extends ListItemEntity<any>, P extends keyof E>(entity: E, propertyName: P): boolean => {
    const raw: E[P] = entity[propertyName];
    if (isManyToOneRelationship<RelType<E, P>>(raw)) {
        return raw.hasSnapshot;
    } else if (isManyToManyRelationship<RelType<E, P>>(raw)) {
        return raw.hasSnapshot;
    } else if (isOneToManyRelationship<RelType<E, P>>(raw)) {
        throw new Error('One-to-many relationships are not supported by the LiveUpdate component. Use LiveRelationship instead');
    } else {
        return entity.hasSnapshot;
    }
};

export const getSnapshotValue = <E extends ListItemEntity<any>, P extends keyof E>(entity: E, propertyName: P): LiveType<E, P> => {
    const raw: E[P] = entity[propertyName];
    if (isManyToOneRelationship<RelType<E, P>>(raw)) {
        return raw.getSnapshot() as LiveType<E, P>;
    } else if (isManyToManyRelationship<RelType<E, P>>(raw)) {
        return raw.snapshotValue() as LiveType<E, P>;
    } else if (isOneToManyRelationship<RelType<E, P>>(raw)) {
        throw new Error('One-to-many relationships are not supported by the LiveUpdate component. Use LiveRelationship instead');
    } else {
        return entity.snapshotValue(propertyName) as LiveType<E, P>;
    }
};

export const getHasPreviousValue = <E extends ListItemEntity<any>, P extends keyof E>(entity: E, propertyName: P): boolean => {
    const raw: E[P] = entity[propertyName];
    if (isManyToOneRelationship<RelType<E, P>>(raw)) {
        return raw.hasPrevious;
    } else if (isManyToManyRelationship<RelType<E, P>>(raw)) {
        return raw.hasPrevious;
    } else if (isOneToManyRelationship<RelType<E, P>>(raw)) {
        throw new Error('One-to-many relationships are not supported by the LiveUpdate component. Use LiveRelationship instead');
    } else {
        return entity.hasPrevious;
    }
};

export const getPreviousValue = <E extends ListItemEntity<any>, P extends keyof E>(entity: E, propertyName: P): LiveType<E, P> => {
    const raw: E[P] = entity[propertyName];
    if (isManyToOneRelationship<RelType<E, P>>(raw)) {
        return raw.getPrevious() as LiveType<E, P>;
    } else if (isManyToManyRelationship<RelType<E, P>>(raw)) {
        return raw.previousValue() as LiveType<E, P>;
    } else if (isOneToManyRelationship<RelType<E, P>>(raw)) {
        throw new Error('One-to-many relationships are not supported by the LiveUpdate component. Use LiveRelationship instead');
    } else {
        return entity.previousValue(propertyName) as LiveType<E, P>;
    }
};

export const setValue = <E extends ListItemEntity<any>, P extends keyof E>(entity: E, propertyName: P, val: LiveType<E, P>) => {
    const raw: E[P] = entity[propertyName];
    if (isManyToOneRelationship<RelType<E, P>>(raw)) {
        raw.set(val as RelType<E, P>);
    } else if (isManyToManyRelationship<RelType<E, P>>(raw)) {
        raw.set(val as RelType<E, P>[]);
    } else if (isOneToManyRelationship<RelType<E, P>>(raw)) {
        throw new Error('One-to-many relationships are not supported by the LiveUpdate component. Use LiveRelationship instead');
    } else {
        entity[propertyName] = val as E[P];
    }
};