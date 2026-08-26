import { IBookmark } from "../../../../services/models/IBookmark";
import { IBookmarkGroup } from "../../../../services/models/IBookmarkGroup";
import { IBookmarkLabel } from "../../../../services/models/IBookmarkLabel";

export interface IAddBookmarkManagerProps {
  availableLabels: IBookmarkLabel[];
  availableGroups: IBookmarkGroup[];
  onBookmarkAdded: (bookmark: IBookmark) => void;
}