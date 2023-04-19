declare interface IRetailDashboardWebPartStrings {
  Generic: {
    Loading: string;
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
  },
  Dashboard: {
    GlobalReturnVolumeWidgetTitle: string;
    GlobalCustomerSatisfactionWidgetTitle: string;
    ProductsSellsWidgetTitle: string;
    ReturnReasonsWidgetTitle: string;
  },
  CustomerSatisfaction: {
    DataSetTitle: string;
    CSTAT: string;
    NSTAT: string;
    TTS: string;
  }
}

declare module 'RetailDashboardWebPartStrings' {
  const strings: IRetailDashboardWebPartStrings;
  export = strings;
}
