import { IPropertyPaneCustomFieldProps, WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPropertyPaneFilePickerProps {
  key: string;
  label?: string;
  buttonLabel: string;
  value: string;
  disabled?: boolean;
  webPartContext: WebPartContext;
  disableLocalUpload?: boolean;
  disableWebSearchTab?: boolean;
  disableCentralAssetRepo?: boolean; // not supported yet
  hasMySiteTab?: boolean;
  accepts?: string;
  itemType: ItemType;
  required?: boolean;
  onSave:(value:string)=>void;
}

export interface IPropertyPaneFilePickerPropsInternal extends IPropertyPaneCustomFieldProps, IPropertyPaneFilePickerProps {}

export enum ItemType {
  Documents,
  Images
}
