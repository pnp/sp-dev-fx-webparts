import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IMyTeamsProps {
  context: WebPartContext;
  webparttitle: string;
  showdescription:boolean;
  openpopuponselectingchannel:boolean;
}
