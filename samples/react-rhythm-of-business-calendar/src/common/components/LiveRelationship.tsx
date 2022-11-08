import { difference, includes } from "lodash";
import React, { ReactNode } from "react";
import { Comparer, Entity } from "common";
import { ListItemEntity } from "common/sharepoint";
import { IOneToManyRelationship, OneToManyRelationship } from "../Entity";

enum Status {
    added,
    deleted,
    movedIn,
    movedOut,
    reordered,
    unchanged
}

type Context<E> = {
    entity: E;
    index: number;
    status: Status;
    isAdded: boolean;
    isDeleted: boolean;
    isMovedIn: boolean;
    isMovedOut: boolean;
    isReordered: boolean;
    isUnchanged: boolean;
};

const parentRelationship = (relationship: IOneToManyRelationship<any>, child: ListItemEntity<any>) => {
    return (relationship as OneToManyRelationship<any, any>)._parentRelationship(child);
};

interface IProps<E extends ListItemEntity<any>> {
    relationship: IOneToManyRelationship<E>;
    excludeRemoved?: boolean;
    comparer?: Comparer<E>;
    separator?: ReactNode;
    children: (context: Context<E>) => ReactNode;
}

const LiveRelationship = <E extends ListItemEntity<any>>({
    relationship,
    excludeRemoved = false,
    comparer,
    separator = <></>,
    children
}: IProps<E>) => {
    const output: [E, Status][] = [];

    const current: E[] = relationship.filter(Entity.NotDeletedFilter);
    if (comparer) current.sort(comparer);

    const snapshot: E[] = (() => {
        if (!relationship.hasSnapshot) return current;
        const items = relationship.snapshotValue();
        items.filter(item => item.hasSnapshot).forEach(item => item.peekSnapshot());
        const filteredItems = items.filter(Entity.NotDeletedFilter);
        if (comparer) filteredItems.sort(comparer);
        items.forEach(item => item.endPeek());
        return filteredItems;
    })();

    const previous: E[] = (() => {
        if (!relationship.hasPrevious) return snapshot;
        const items = relationship.previousValue();
        items.filter(item => item.hasPrevious).forEach(item => item.peekPrevious());
        const filteredItems = items.filter(Entity.NotDeletedFilter);
        if (comparer) filteredItems.sort(comparer);
        items.forEach(item => item.endPeek());
        return filteredItems;
    })();

    const added = difference(current, previous);
    const removed = difference(previous, current);

    const stableCurrent = difference(current, added);
    const stablePrevious = difference(previous, removed);

    const length = stableCurrent.length + added.length + removed.length;
    let i_current = 0;
    let i_previous = 0;
    let i_stable = 0;

    for (let i = 0; i < length; i++) {
        const current_item = current[i_current];
        const previous_item = previous[i_previous];

        if (current_item && includes(added, current_item)) { // added/moved-in locally or remotely
            if (includes(snapshot, current_item)) { // added/moved-in remotely
                const parent = parentRelationship(relationship, current_item);
                if (parent.hasPrevious && parent.getPrevious()) { // moved-in remotely
                    output.push([current_item, Status.movedIn]);
                } else { // added remotely
                    output.push([current_item, Status.added]);
                }
            } else { // added/moved-in locally
                output.push([current_item, Status.unchanged]);
            }

            i_current++;
        } else if (previous_item && includes(removed, previous_item)) { // deleted/moved-out locally or remotely
            if (!excludeRemoved) {
                if (previous_item.isDeleted) { // deleted locally/remotely
                    if (!previous_item.hasSnapshot || previous_item.snapshotValue<boolean>('isDeleted') === true) { // deleted remotely
                        output.push([previous_item, Status.deleted]);
                    } else { // deleted locally
                        // do not output
                    }
                } else { // moved-out locally or remotely
                    if (includes(snapshot, previous_item)) { // moved-out locally
                        // do not output
                    } else { // moved-out remotely
                        output.push([previous_item, Status.movedOut]);
                    }
                }
            }

            i_previous++;
        } else {
            if (stableCurrent[i_stable] !== stablePrevious[i_stable]) {
                output.push([current_item, Status.reordered]);
            } else {
                output.push([current_item, Status.unchanged]);
            }

            i_stable++;
            i_current++;
            i_previous++;
        }
    }

    return <>{output.map(([entity, status], idx) => <>
        {idx > 0 && separator}
        {children({
            entity,
            index: current.indexOf(entity),
            status,
            isAdded: status === Status.added,
            isDeleted: status === Status.deleted,
            isMovedIn: status === Status.movedIn,
            isMovedOut: status === Status.movedOut,
            isReordered: status === Status.reordered,
            isUnchanged: status === Status.unchanged
        })}
    </>)}</>;
};

export default LiveRelationship;