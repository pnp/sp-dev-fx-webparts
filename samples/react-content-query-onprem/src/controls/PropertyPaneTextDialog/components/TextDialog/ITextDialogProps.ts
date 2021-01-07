import { ITextDialogStrings } from "./ITextDialogStrings";

export interface ITextDialogProps {
  dialogTextFieldValue?: string;
  onChanged?: (text: string) => void;
  disabled?: boolean;
  strings: ITextDialogStrings;
  stateKey?: string;
}