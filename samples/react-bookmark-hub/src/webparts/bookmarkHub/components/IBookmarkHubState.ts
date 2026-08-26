import { IAppData } from '../../../services/models/IAppData';
import { IBookmark } from '../../../services/models/IBookmark';

export interface IBookmarkHubState {
  bookmarks: IBookmark[];
  appData: IAppData;
  isLoading: boolean;
  hasCopilotSuggestions: boolean;
  searchQuery: string;
  activeLabelFilters: string[];
}
