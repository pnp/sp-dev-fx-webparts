import { IDropdownOption } from '@fluentui/react';

export interface IPropertyPaneAsyncDropdownProps {
  label: string;
  loadingLabel: string;
  errorLabelFormat: string;
  loadOptions: () => Promise<IDropdownOption[]>;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedKey?: string | number;
  disabled?: boolean;
}
