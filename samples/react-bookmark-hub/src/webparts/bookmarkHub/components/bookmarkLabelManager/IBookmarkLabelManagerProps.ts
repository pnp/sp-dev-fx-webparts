import { IBookmark } from '../../../../services/models/IBookmark';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';

export interface IBookmarkLabelManagerProps {
  labels: IBookmarkLabel[];
  bookmarks: IBookmark[];
  onLabelsChanged: (labels: IBookmarkLabel[]) => void;
}
