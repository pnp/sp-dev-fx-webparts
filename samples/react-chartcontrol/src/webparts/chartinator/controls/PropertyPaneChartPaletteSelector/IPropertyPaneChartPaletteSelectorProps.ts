import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

export interface IPropertyPaneChartPaletteSelectorProps {
  disabled: boolean;
  label: string;
  options: IDropdownOption[];
  selectedKey: string | number;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
}
