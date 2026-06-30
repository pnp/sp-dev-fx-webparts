import { IBookmark } from "./IBookmark";
import { IBookmarkGroup } from "./IBookmarkGroup";
import { IBookmarkLabel } from "./IBookmarkLabel";

export interface IAppData {
    bookmarks: IBookmark[];
    groups: IBookmarkGroup[];
    labels: IBookmarkLabel[];
}