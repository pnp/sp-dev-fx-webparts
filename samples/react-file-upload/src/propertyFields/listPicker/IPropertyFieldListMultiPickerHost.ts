import { IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IPropertyFieldListPickerPropsInternal } from './IPropertyFieldListPicker';

/**
 * PropertyFieldListPickerHost properties interface
 */
export interface IPropertyFieldListMultiPickerHostProps extends IPropertyFieldListPickerPropsInternal {

  onChange: (targetProperty?: string, newValue?: any) => void;
}

/**
 * PropertyFieldSPListMultiplePickerHost state interface
 */
export interface IPropertyFieldListMultiPickerHostState {

  results: IChoiceGroupOption[];
  selectedKeys: string[];
  loaded: boolean;
  errorMessage?: string;
}
