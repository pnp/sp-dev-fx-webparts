declare interface ITreeOrgChartWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TitleFieldLabel: string;
  MaxLevels: string;
  ViewType: string;
  TreeOrgChartTypeMyTeam: string;
  TreeOrgChartTypeCompany: string;
  TreeOrgChartTypeShowOtherTeam: string;
  FilterGroupName:string;
  ExcludeFilter: string;
  ExcludeFilterOnText: string;
  ExcludeFilterOffText: string;
  FilterLabel: string;
  FilterDescription: string;

  TeamLeaderHeadline:string;
  ContactInfoTitle:string;

  DetailBehavoir:string;
  LivePersonaCard:string;
  DelveLink:string;
}

declare module 'TreeOrgChartWebPartStrings' {
  const strings: ITreeOrgChartWebPartStrings;
  export = strings;
}
