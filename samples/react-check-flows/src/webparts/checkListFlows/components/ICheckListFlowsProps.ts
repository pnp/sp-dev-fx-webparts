import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ICheckListFlowsProps {
  description: string;
  context: WebPartContext;
  listOptions: IDropdownOption[];
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
