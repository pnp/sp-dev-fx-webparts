import { ISharingResult } from "./ISharingResult";
import { IContextualMenuProps } from '@fluentui/react';

export interface ISharingViewState {
  files: ISharingResult[];
  fileIds: string[];
  searchItems: Record<string, any>;
  groups: any[];
  isOpen: boolean;
  selectedDocument: ISharingResult;
  hideSharingSettingsDialog: boolean;
  frameUrlSharingSettings: string;
  contextualMenuProps?: IContextualMenuProps;
  showResetFilters?: boolean;
  currentPage: number,
  totalPages: number,
  pageLimit: number,
  selectedFilter?: string,
  loadingComplete: boolean,
  statusMessage: string,
  
}

export default ISharingViewState;