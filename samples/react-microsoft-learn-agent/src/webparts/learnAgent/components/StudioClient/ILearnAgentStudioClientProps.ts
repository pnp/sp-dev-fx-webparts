import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface ILearnAgentStudioClientProps {
  isDarkTheme: boolean;
  context: WebPartContext;
  userEmail: string;
  environmentId: string;
  agentIdentifier: string;
  tenantId: string;
  appClientId: string;
}
