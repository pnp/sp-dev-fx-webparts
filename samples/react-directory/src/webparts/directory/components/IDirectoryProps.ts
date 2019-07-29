import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from '@microsoft/sp-core-library';
export interface IDirectoryProps {
  title: string;
  displayMode: DisplayMode;
  context: WebPartContext;
  updateProperty: (value: string) => void;
}
