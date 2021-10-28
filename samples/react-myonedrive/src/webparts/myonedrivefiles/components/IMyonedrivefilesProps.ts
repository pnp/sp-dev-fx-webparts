import { DisplayMode } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient } from '@microsoft/sp-http';

export interface IMyonedrivefilesProps {
  context: WebPartContext;
  graphClient: MSGraphClient;
  title: string;
  displayMode: DisplayMode;
  fields: string[];
  titleLink: boolean;
  updateProperty: (value: string) => void;
}
