declare interface IAppInsightsDasboardWebPartStrings {

  PropertyPaneDescription:string
  DevGroupName:string;
  IsDevModeLabel:string;
  IsDevModeOnText:string;
  IsDevModeOffText:string;

  GroupNameAppInsights: string;
  GroupNameKustoQuery: string;

  AppIdLabel: string;
  AppKeyLabel: string;
  KustoQueryLabel: string;
  KustoQueryDocs: string;
  KustoQueryRef: string;
  AIAnalyticsDemo:string;

  Config_IconText: string;

  CacheDurationLabel: string;

  HelpAppInsightsAppId: string;
  HelpAppInsightsAppKey: string;

  Msg_AuthWarning:string;
}

declare module 'AppInsightsDasboardWebPartStrings' {
  const strings: IAppInsightsDasboardWebPartStrings;
  export = strings;
}
