import { IChoiceGroupOption } from '@fluentui/react/lib/ChoiceGroup';
import { IPropertyFieldListPickerPropsInternal } from './IPropertyFieldListPicker';
import { ISPLists } from './IPropertyFieldListPickerHost';

/**
 * PropertyFieldListPickerHost properties interface
 */
export interface IPropertyFieldListMultiPickerHostProps extends IPropertyFieldListPickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}

/**
 * PropertyFieldSPListMultiplePickerHost state interface
 */
export interface IPropertyFieldListMultiPickerHostState {
  loadedLists: ISPLists;
  results: IChoiceGroupOption[];
  selectedKeys: string[];
  loaded: boolean;
  errorMessage?: string;
}
