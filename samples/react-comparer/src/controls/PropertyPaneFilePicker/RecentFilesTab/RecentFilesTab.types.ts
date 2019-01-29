import { IFilePickerTab } from "../IFilePickerTab.types";

export interface IRecentFilesTabProps extends IFilePickerTab {
  //inherited
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
