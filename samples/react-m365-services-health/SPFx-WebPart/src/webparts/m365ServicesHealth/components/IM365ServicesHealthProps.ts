import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IM365ServicesHealthProps {
  title: string;
  context: WebPartContext;
  apiBaseUrl: string;
  audience: string;
}
