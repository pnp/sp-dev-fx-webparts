import { IFilePickerTab } from "../IFilePickerTab.types";
import { SearchResult } from "@pnp/sp";

export interface IRecentFilesTabProps extends IFilePickerTab {

}

export interface IRecentFilesTabState {
  results: SearchResult[];
  isLoading: boolean;
  fileUrl?: string;
}
