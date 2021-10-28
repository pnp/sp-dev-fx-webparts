import { Guid } from '@microsoft/sp-core-library';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IPropertyFieldList } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';

export interface IDetailsListItem {
  key: number;
  name: string;
  id: Guid;
}

export interface ITeamsMembershipUpdaterProps {
  title: string;
  loglist: IPropertyFieldList;
  items: IDropdownOption[];
  context: WebPartContext;
}
