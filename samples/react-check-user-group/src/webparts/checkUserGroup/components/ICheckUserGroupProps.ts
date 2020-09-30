import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface ICheckUserGroupProps {
  description: string;
  context: WebPartContext;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
