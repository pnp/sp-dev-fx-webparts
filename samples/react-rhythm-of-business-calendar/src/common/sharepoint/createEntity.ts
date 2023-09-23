import { Moment } from "moment-timezone";
import { Guid } from "@microsoft/sp-core-library";
import { Entity } from "common";
import { ITimeZone } from "common/services";
import { User } from "../User";
import { IListItemResult } from "./query_";
import { ListItemEntity } from "./ListItemEntity";
import * as SPField from "./SPField";

export type ListItemEntityConstructor<E extends Entity<any>> = { new(author: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number): E };

export const createEntity = <E extends ListItemEntity<any>>(EntityType: ListItemEntityConstructor<E>, row: IListItemResult, siteTimeZone: ITimeZone, existing?: E) => {
    const etag = parseInt(row.owshiddenversion);
    const editor = SPField.toUser(row.Editor);
    const modified = SPField.fromDateTime(row, 'Modified', siteTimeZone);

    if (existing) {
        existing.setEditor(editor, modified, etag);
        return existing;
    } else {
        const id = parseInt(row.ID, 10);
        const uniqueId = Guid.parse(row.UniqueId);
        const author = SPField.toUser(row.Author);
        const created = SPField.fromDateTime(row, 'Created', siteTimeZone);

        return new EntityType(author, editor, created, modified, id, uniqueId, etag);
    }
};