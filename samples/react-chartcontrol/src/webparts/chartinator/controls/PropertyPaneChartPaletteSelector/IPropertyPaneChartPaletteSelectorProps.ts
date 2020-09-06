import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface IPropertyPaneChartPaletteSelectorProps {
  disabled: boolean;
  label: string;
  options: IDropdownOption[];
  selectedKey: string | number;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
}
