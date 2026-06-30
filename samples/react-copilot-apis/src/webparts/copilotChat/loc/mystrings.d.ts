declare interface ICopilotChatWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  AdditionalInstructionsFieldLabel: string;
  EnablePublicWebContentFieldLabel: string;
  FilesFieldLabel: string;
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

declare module 'CopilotChatWebPartStrings' {
  const strings: ICopilotChatWebPartStrings;
  export = strings;
}
