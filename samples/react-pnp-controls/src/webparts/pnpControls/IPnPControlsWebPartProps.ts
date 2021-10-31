import { IPickerTerms  } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";

export interface IPnPControlsWebPartProps {
  lists: string | string[]; // Stores the list ID(s)
  terms: IPickerTerms; // Keeps hold of the selected terms
  description: string;
}
