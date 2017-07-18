import { IDropdownOption } from 'office-ui-fabric-react';

export interface IPropertyPaneAsyncDropdownProps {
  key: string;
  label: string;
  loadOptions: () => Promise<IDropdownOption[]>;
  onPropertyChange: (propertyPath: string, oldValue: any, newValue: any) => void;
  selectedKey: string | number;
  disabled?: boolean;
}