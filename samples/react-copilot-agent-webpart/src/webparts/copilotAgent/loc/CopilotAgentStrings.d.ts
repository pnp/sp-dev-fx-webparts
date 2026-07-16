declare interface ICopilotAgentStrings {
  PropertyPaneDescription: string;
  AgentConfigurationGroupName: string;
  WebPartTitleFieldLabel: string;
  AgentNameFieldLabel: string;
  AgentEndpointFieldLabel: string;
}

declare module 'CopilotAgentStrings' {
  const strings: ICopilotAgentStrings;
  export = strings;
}
