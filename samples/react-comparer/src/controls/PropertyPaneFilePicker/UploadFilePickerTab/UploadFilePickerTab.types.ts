import { IFilePickerTab } from "../IFilePickerTab.types";

export interface IUploadFilePickerTabProps extends IFilePickerTab {
  // inherited from the base interface
}

export interface IUploadFilePickerTabState {
  fileUrl?: string;
  fileName?: string;
}
