import { IFilePickerTab } from "../IFilePickerTab.types";

export interface ILinkFilePickerTabProps extends IFilePickerTab {
  allowExternalTenantLinks: boolean;
}

export interface ILinkFilePickerTabState {
  fileUrl?: string;
  isValid: boolean;
}
