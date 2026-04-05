import { ServiceScope } from "@microsoft/sp-core-library";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPnpCopilotPromptsProps {
  sampleDataFileUrl: string;
  serviceScope: ServiceScope;
  context:WebPartContext;
}
