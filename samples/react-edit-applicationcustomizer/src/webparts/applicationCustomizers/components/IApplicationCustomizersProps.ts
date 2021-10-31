import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IApplicationCustomizersProps {
  description: string;
  context: WebPartContext;
  designType: string;
}
