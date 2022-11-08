import { ServiceScope } from "@microsoft/sp-core-library";

export interface IUploadFileAsPdfProps {
  serviceScope: ServiceScope;
  siteID: string;
  channelName: string;
}
