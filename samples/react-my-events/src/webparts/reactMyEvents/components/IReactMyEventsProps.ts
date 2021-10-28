import { MSGraphClient } from "@microsoft/sp-http";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { IReadonlyTheme } from '@microsoft/sp-component-base';


export interface IReactMyEventsProps {
  webpartTitle: string;
  layout: number;
  context: WebPartContext;
  dateRange: any;
  displayMode: DisplayMode;
  clientWidth: number;
  graphClient: MSGraphClient;
  themeVariant: IReadonlyTheme;
  maxEvents: number;
  updateProperty: (value: string) => void;
}
