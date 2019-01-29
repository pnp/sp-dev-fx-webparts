import { IFilePickerTab } from "../IFilePickerTab.types";
import { SearchResult } from "@pnp/sp";

export interface IRecentFilesTabProps extends IFilePickerTab {

}

export interface IRecentFilesTabState {
  results: IRecentFile[];
  isLoading: boolean;
  fileUrl?: string;
}
export interface IRecentFile {
  fileUrl: string;
  key: string;
  name: string;
  editedBy: string;
}
