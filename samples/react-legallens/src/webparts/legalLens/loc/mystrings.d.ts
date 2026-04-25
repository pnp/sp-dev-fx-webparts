declare interface ILegalLensWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  ContractLibraryUrlFieldLabel: string;
  AIFoundryEndpointFieldLabel: string;
  AIFoundryApiKeyFieldLabel: string;
  AIFoundryDeploymentFieldLabel: string;
  DocumentIntelligenceEndpointFieldLabel: string;
  DocumentIntelligenceKeyFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'LegalLensWebPartStrings' {
  const strings: ILegalLensWebPartStrings;
  export = strings;
}
