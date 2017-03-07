export interface IPropertyPaneColorPickerProps {
  label: string;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedColor: string;
}