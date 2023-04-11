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
    ReturnVolumeWidgetTitle: string;
    CurrentInventoryWidgetTitle: string;
    CustomerSatisfactionWidgetTitle: string;
    QuarterlyRevenuesWidgetTitle: string;
    TopSellerProductWidgetTitle: string;
    ProductsOnLaunchWidgetTitle: string;
    ReturnReasonsWidgetTitle: string;
  }
}

declare module 'RetailDashboardWebPartStrings' {
  const strings: IRetailDashboardWebPartStrings;
  export = strings;
}
