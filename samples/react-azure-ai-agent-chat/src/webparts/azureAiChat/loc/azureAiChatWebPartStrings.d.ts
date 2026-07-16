declare interface IAzureAiChatStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ConnectionStringFieldLabel: string;
  AgentNameFieldLabel: string;
  WebPartTitleFieldLabel: string;
  ChatTitle: string;
  ConnectButton: string;
  ConnectedLabel: string;
  ConnectingLabel: string;
  SendButton: string;
  SendingLabel: string;
  MessageInputLabel: string;
  MessageInputPlaceholder: string;
  ConfigureAgentLabel: string;
}

declare module 'AzureAiChatStrings' {
  const strings: IAzureAiChatStrings;
  export = strings;
}
