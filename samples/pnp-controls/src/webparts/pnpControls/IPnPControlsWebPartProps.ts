import { ICheckedTerms } from "@pnp/spfx-property-controls/lib/PropertyFieldTermPicker";

export interface IPnPControlsWebPartProps {
  lists: string | string[]; // Stores the list ID(s)
  terms: ICheckedTerms; // Keeps hold of the selected terms
  description: string;
}
