import { IBookmark } from '../../../../services/models/IBookmark';
import { IBookmarkGroup } from '../../../../services/models/IBookmarkGroup';
import { IBookmarkLabel } from '../../../../services/models/IBookmarkLabel';

export interface IBookmarkListProps {
  bookmarks: IBookmark[];
  savedBookmarks: IBookmark[];
  groups: IBookmarkGroup[];
  availableLabels: IBookmarkLabel[];
  onAssignGroup: (bookmark: IBookmark, group: IBookmarkGroup) => Promise<void>;
  onOrganizeWithCopilot: () => Promise<void>;
  hasCopilotSuggestions: boolean;
  onCopilotApprove: () => Promise<void>;
  onCopilotDecline: () => Promise<void>;
  onCopilotRetry: () => Promise<void>;
  onAssignLabels: (bookmark: IBookmark, labels: IBookmarkLabel[]) => Promise<void>;
  onRemoveLabel: (bookmark: IBookmark, label: IBookmarkLabel) => Promise<void>;
  searchQuery: string;
  activeLabelFilters: string[];
}
