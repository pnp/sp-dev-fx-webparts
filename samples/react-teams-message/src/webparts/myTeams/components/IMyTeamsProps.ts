import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
export interface IMyTeamsProps {
  context: WebPartContext;
  webparttitle: string;
  showdescription:boolean;
  openpopuponselectingchannel:boolean;
  displayMode:DisplayMode;
  updateProperty:(value: string) => void;
}
