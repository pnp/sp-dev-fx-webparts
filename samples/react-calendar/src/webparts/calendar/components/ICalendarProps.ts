import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface ICalendarProps {
  title: string;
  siteUrl: string;
  list: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  context: WebPartContext;
}
