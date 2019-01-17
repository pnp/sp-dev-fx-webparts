import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface IPropertyPaneChartPaletteSelectorProps {
  label: string;
  options: IDropdownOption[];
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedKey: string | number;
  disabled: boolean;
}
