/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IPropertyPaneContinentSelectorProps {
  label: string;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedKey: string | number;
  disabled: boolean;
}
