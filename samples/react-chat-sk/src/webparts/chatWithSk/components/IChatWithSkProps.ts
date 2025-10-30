import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IChatWithSkProps {
  azFunctionUrl: string;
  hasTeamsContext: boolean;
  wpcontext: WebPartContext;
}
