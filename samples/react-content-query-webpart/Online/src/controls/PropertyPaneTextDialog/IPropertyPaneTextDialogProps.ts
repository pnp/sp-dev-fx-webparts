import { ITextDialogStrings } from "./components/TextDialog/ITextDialogStrings";

export interface IPropertyPaneTextDialogProps {
  dialogTextFieldValue?: string;
  onPropertyChange: (propertyPath: string, text: string) => void;
  disabled?: boolean;
  strings: ITextDialogStrings;
}