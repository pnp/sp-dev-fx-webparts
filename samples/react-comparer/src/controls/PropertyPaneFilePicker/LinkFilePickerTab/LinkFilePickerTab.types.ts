import { IFilePickerTab } from "../IFilePickerTab.types";
//import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ILinkFilePickerTabProps extends IFilePickerTab {
  // context: WebPartContext;
  // accepts: string;
  allowExternalTenantLinks: boolean;
}

export interface ILinkFilePickerTabState {
  fileUrl?: string;
  isValid: boolean;
}
