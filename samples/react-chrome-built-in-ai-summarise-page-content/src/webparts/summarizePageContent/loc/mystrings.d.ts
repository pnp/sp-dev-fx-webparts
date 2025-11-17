declare interface ISummarizePageContentWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppLocalEnvironmentOffice: string;
  AppLocalEnvironmentOutlook: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
  AppOfficeEnvironment: string;
  AppOutlookEnvironment: string;
  UnknownEnvironment: string;
  
  // UI Labels
  SummarizeButtonText: string;
  StopGeneratingText: string;
  DownloadingModelText: string;
  SummaryTitle: string;
  DisclaimerText: string;
  HideText: string;
  ShowSummaryText: string;
  RegenerateSummaryText: string;
  ApiNotSupportedWarning: string;
  WaitForEditorText: string;
  SummarizerContext: string;
}

declare module 'SummarizePageContentWebPartStrings' {
  const strings: ISummarizePageContentWebPartStrings;
  export = strings;
}
