import { IFilePickerTab } from "../IFilePickerTab.types";

export interface IUploadFilePickerTabProps extends IFilePickerTab {
  //accepts: string;
}

export interface IUploadFilePickerTabState {
  fileUrl?: string;
  fileName?: string;
}
