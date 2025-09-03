import { ServiceScope } from "@microsoft/sp-core-library";

export interface IPnpCopilotPromptsProps {
  sampleDataFileUrl: string;
  serviceScope: ServiceScope;
}
