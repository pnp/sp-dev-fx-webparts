import { Moment } from "moment-timezone";
import { Guid } from "@microsoft/sp-core-library";
import { Entity, IEntity } from "../Entity";
import { User } from "../User";
import { momentAscComparer, now, reverseComparer } from "../Utils";

export interface IListItemEntity extends IEntity {
    readonly title: string;
    readonly created: Moment;
    readonly modified: Moment;
    readonly author: User;
    readonly editor: User;
}

interface IState {
    title: string;
    created: Moment;
    modified: Moment;
    author: User;
    editor: User;
}

export abstract class ListItemEntity<S> extends Entity<S & IState, number> implements IListItemEntity {
    public static readonly TitleAscComparer = <S>(a: ListItemEntity<S>, b: ListItemEntity<S>) => a.title.localeCompare(b.title);
    public static readonly TitleDescComparer = reverseComparer(ListItemEntity.TitleAscComparer);

    public static readonly ModifiedAscComparer = <S>(a: ListItemEntity<S>, b: ListItemEntity<S>) => momentAscComparer(a.modified, b.modified);
    public static readonly ModifiedDescComparer = reverseComparer(ListItemEntity.ModifiedAscComparer);

    private _uniqueId: Guid;
    private _etag: number;

    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id: number = 0, uniqueId: Guid = Guid.empty, etag: number = 0) {
        super(id);
        this.state.title = "";
        this.state.created = created || now();
        this.state.modified = modified || this.state.created;
        this.state.author = author;
        this.state.editor = editor || this.state.author;
        this._uniqueId = uniqueId;
        this._etag = etag;
    }

    public get title(): string { return this.state.title; }
    public set title(val: string) {
        const oldTitle = this.state.title;
        this.state.title = val;
        if (oldTitle !== val) this.onTitleChanged(oldTitle, val);
    }

    public get created(): Moment { return this.state.created; }
    public get modified(): Moment { return this.state.modified; }
    public get author(): User { return this.state.author; }
    public get editor(): User { return this.state.editor; }
    public get uniqueId(): Guid { return this._uniqueId; }
    public get etag(): number { return this._etag; }

    public get displayName(): string {
        return this.title;
    }

    public delete() {
        super.delete();

        if (!this.softDeleteSupported) {
            this.state.modified = now();
            this.state.editor = undefined;
        }
    }

    public undelete() {
        if (this.isDeleted) {
            super.undelete();

            if (!this.softDeleteSupported) {
                if (this.hasPrevious && !this.previousValue<boolean>("isDeleted") &&
                    this.hasSnapshot && this.snapshotValue<boolean>("isDeleted")) {
                    const state = this.state;
                    state.created = state.modified = now();
                    state.author = undefined;
                    state.editor = undefined;
                    this._uniqueId = Guid.empty;
                    this._etag = 0;
                }
            }
        }
    }

    public setId(id: number, uniqueId?: Guid) {
        if (this.isNew) {
            this.state.modified = this.state.created = now();
        }
        this._uniqueId = uniqueId || this._uniqueId;
        super.setId(id);
    }

    public setEditor(editor: User, modified?: Moment, etag?: number) {
        if (this.isNew) {
            this.state.author = editor;
            if (modified) this.state.created = modified;
        }
        this.state.editor = editor;
        if (modified) this.state.modified = modified;
        if (etag) this._etag = etag;
    }

    protected onTitleChanged(oldTitle: string, newTitle: string) {
    }
}