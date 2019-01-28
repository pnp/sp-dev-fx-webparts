import { IPropertyPaneCustomFieldProps, WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPropertyPaneFilePickerProps {
  key: string;
  label?: string;
  buttonLabel: string;
  value: string;
  disabled?: boolean;
  panelHeader?: string;
  webPartContext: WebPartContext;
  disableLocalUpload?: boolean;
  disableWebSearchTab?: boolean;
  //disableCentralAssetRepo?: boolean;
  //hasMySiteTab?: boolean;
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
