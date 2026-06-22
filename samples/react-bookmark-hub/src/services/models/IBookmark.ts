import { IBookmarkGroup } from "./IBookmarkGroup";
import { IBookmarkLabel } from "./IBookmarkLabel";

export enum BookmarkType {
    Site = 'site',
    Email = 'email',
    File = 'file'
}

export interface IBookmark {
    index?: number;
    id: string;
    title: string;
    description?: string;
    url: string;
    date: string;
    type: BookmarkType;
    labels?: IBookmarkLabel[];
    groups?: IBookmarkGroup[];
    metadata?: {
        from?: string;
        author?: string;
    };
    /** True when this entry was suggested by Copilot and has not yet been approved. */
    suggestion?: boolean;
    isCustom?: boolean;
    removedFromBackend?: boolean;
}
