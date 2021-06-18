
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { IPropertyFieldGroupOrPerson } from '@pnp/spfx-property-controls/lib/PropertyFieldPeoplePicker';
export interface IOrgChartProps {
  title: string;
  defaultUser: string;
  context: WebPartContext;
  startFromUser: IPropertyFieldGroupOrPerson[];
  showAllManagers: boolean;
  showActionsBar:boolean;
}
