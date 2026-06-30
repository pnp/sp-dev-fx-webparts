import { IBookmark } from '../../../../services/models/IBookmark';
import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';

export interface ISavedBookmarkGroupsProps {
  savedBookmarks: IBookmark[];
  groups: IBookmarkGroup[];
  availableLabels: IBookmarkLabel[];
  onAssignGroup: (bookmark: IBookmark, group: IBookmarkGroup) => Promise<void>;
  onRemoveBookmark: (bookmark: IBookmark) => Promise<void>;
  onToggleGroupCollapse: (group: IBookmarkGroup) => Promise<void>;
  onAssignLabels: (bookmark: IBookmark, labels: IBookmarkLabel[]) => Promise<void>;
  onRemoveLabel: (bookmark: IBookmark, label: IBookmarkLabel) => Promise<void>;
  onReorderGroups: (groups: IBookmarkGroup[]) => Promise<void>;
  searchQuery: string;
  activeLabelFilters: string[];
}
