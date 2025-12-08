export interface ILearnAgentWebChatProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: unknown;
  title: string;
  agentId: string;
  agentName: string;
  isDirectLineSecret: boolean;
  directLineSecret: string;
  directLineEndpointURL: string;
  showCitation: boolean;
  isPolite: boolean;
  appClientId: string;
  tenantId: string;
  environmentId: string;
  agentIdentifier: string;
  userEmail: string;
}