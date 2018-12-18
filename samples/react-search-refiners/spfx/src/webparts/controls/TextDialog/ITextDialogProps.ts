import { ITextDialogStrings } from "./ITextDialogStrings";
import { PropertyFieldCodeEditorLanguages } from "@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor";

export interface ITextDialogProps {
  dialogTextFieldValue?: string;
  onChanged?: (text: string) => void;
  disabled?: boolean;
  strings: ITextDialogStrings;
  stateKey?: string;
  language?: PropertyFieldCodeEditorLanguages;
}