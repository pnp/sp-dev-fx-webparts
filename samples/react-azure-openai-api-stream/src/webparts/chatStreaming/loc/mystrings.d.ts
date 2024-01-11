declare interface IChatStreamingWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  OpenAiApiEndpointFieldLabel: string;
  OpenAiApiKeyFieldLabel: string;
  OpenAiApiDeploymentFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
}

declare module 'ChatStreamingWebPartStrings' {
  const strings: IChatStreamingWebPartStrings;
  export = strings;
}
