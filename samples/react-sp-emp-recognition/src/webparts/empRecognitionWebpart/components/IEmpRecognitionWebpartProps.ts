import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEmpRecognitionWebpartProps {
  list: string;
  webpartTitle: string;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext
}
