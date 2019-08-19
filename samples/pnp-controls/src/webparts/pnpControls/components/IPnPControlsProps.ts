import { ICheckedTerms } from '@pnp/spfx-property-controls/lib/PropertyFieldTermPicker';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnPControlsProps {
  context: WebPartContext;
  description: string;
  list: string | string[];
  terms: ICheckedTerms;
}

export interface IPnpControlsState {
  items?: any[];
  loading?: boolean;
  showPlaceholder?: boolean;
}
