import { MSGraphService } from "../../../Services/MSGraphService";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient } from "@microsoft/sp-http";
import { DisplayMode } from '@microsoft/sp-core-library';
export interface ITelephoneDirectoryProps {
  description: string;
  MSGraphServiceInstance:MSGraphService;
  context:WebPartContext;
  MsGraphClient:MSGraphClient;
  DisplayMode:DisplayMode;
  WebpartTitle:string;
  updateProperty: (value: string) => void;
}
