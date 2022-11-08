import { IPickerTerms  } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnPControlsProps {
  context: WebPartContext;
  description: string;
  list: string | string[];
  terms: IPickerTerms;
}

export interface IPnpControlsState {
  items?: any[];
  loading?: boolean;
  showPlaceholder?: boolean;
}
