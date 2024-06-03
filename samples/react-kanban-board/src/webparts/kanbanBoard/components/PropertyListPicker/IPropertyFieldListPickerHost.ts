import { IPropertyFieldListPickerPropsInternal } from './IPropertyFieldListPicker';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

/**
 * PropertyFieldListPickerHost properties interface
 */
export interface IPropertyFieldListPickerHostProps extends IPropertyFieldListPickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldListPickerHost state interface
 */
export interface IPropertyFieldListPickerHostState {
  loadedLists: ISPLists;
  results: IDropdownOption[];
  selectedKey?: string;
  errorMessage?: string;
}

/**
 * Defines a collection of SharePoint lists
 */
export interface ISPLists {

  value: ISPList[];
}

/**
 * Defines a Content Type
 */
 export interface ISPContentType{
   StringId:string;
 }

/**
 * Defines a SharePoint list
 */
export interface ISPList {

  Title: string;
  Id: string;
  BaseTemplate: string;
  RootFolder: {
    ServerRelativeUrl: string;
  };
  ContentTypes: Array<ISPContentType>;
}
