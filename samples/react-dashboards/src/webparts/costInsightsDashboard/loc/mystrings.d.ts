declare interface ICostInsightsWebPartStrings {
  GroupNameCostInsights: string;
  GroupNameCostQuery: string;

  ScopeLabel: string;
  SubIdLabel: string;
  ResourceGroupLabel: string;
  ManagementGroupLabel: string;
  CostQueryLabel: string;
  CostQueryDocs: string;

  Config_IconText: string;
}

declare module 'CostInsightsWebPartStrings' {
  const strings: ICostInsightsWebPartStrings;
  export = strings;
}
