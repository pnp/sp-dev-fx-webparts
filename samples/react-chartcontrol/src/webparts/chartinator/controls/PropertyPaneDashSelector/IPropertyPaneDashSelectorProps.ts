import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

export interface IPropertyPaneDashSelectorProps {
  disabled: boolean;
  label: string;
  options: IDropdownOption[]; // we pass the list of options in to make easier to define your own dashes
  selectedKey: string | number;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
}
