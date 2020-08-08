declare interface IAppInsightsDashboardWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  AppIdLabel: string;
  AppKeyLabel: string;

  Config_IconText: string;
  Config_Desc: string;
  Config_Desc_ReadMode: string;
  Config_ButtonText: string;

  Menu_TimeSpan: string;
  Menu_TimeInterval: string;

  SecTitle_PageViews: string;
  SecTitle_UserStats: string;
  SecTitle_PerfStats: string;

  Msg_NoData: string;
  Msg_NoUrl: string;
  Msg_NoUser: string;
  Msg_LoadList: string;
  Msg_LoadChart: string;
  Msg_InvalidDate: string;
  Msg_NoDate: string;
}

declare module 'AppInsightsDashboardWebPartStrings' {
  const strings: IAppInsightsDashboardWebPartStrings;
  export = strings;
}
