import { IPropertyFieldListPickerPropsInternal } from './IPropertyFieldListPicker';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * PropertyFieldListPickerHost properties interface
 */
export interface IPropertyFieldListPickerHostProps extends IPropertyFieldListPickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * PropertyFieldListPickerHost state interface
 */
export interface IPropertyFieldListPickerHostState {

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
 * Defines a SharePoint list
 */
export interface ISPList {

  Title: string;
  Id: string;
  BaseTemplate: string;
}
