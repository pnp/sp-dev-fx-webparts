declare interface ITelemetryEventSenderSampleWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;

  DescriptionFieldLabel: string;

  // New fields for telemetry properties
  ScenarioNameFieldLabel: string;
  ScenarioNameFieldDescription: string;

  ImportanceFieldLabel: string;
  ImportanceLowLabel: string;
  ImportanceNormalLabel: string;
  ImportanceHighLabel: string;

  EnableTelemetryFieldLabel: string;
  EnableTelemetryOnText: string;
  EnableTelemetryOffText: string;

  // Default SPFx environment strings
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

declare module 'TelemetryEventSenderSampleWebPartStrings' {
  const strings: ITelemetryEventSenderSampleWebPartStrings;
  export = strings;
}
