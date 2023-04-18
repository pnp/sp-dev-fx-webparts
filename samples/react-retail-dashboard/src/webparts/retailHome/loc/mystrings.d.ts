declare interface IRetailHomeWebPartStrings {
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
  Home: {
    ReturnVolumeWidgetTitle: string;
    CurrentInventoryWidgetTitle: string;
    CustomerSatisfactionWidgetTitle: string;
    QuarterlyRevenuesWidgetTitle: string;
    TopSellerProductWidgetTitle: string;
    ProductsOnLaunchWidgetTitle: string;
    ReturnReasonsWidgetTitle: string;
  },
  ReturnReasons: {
    IncorrectFit: string;
    Defective: string;
    WrongItem: string;
    Disliked: string;
    WrongSize: string;
  },
  CurrentInventory: {
    Womens: string;
    Mens: string;
    Accessories: string;
    Handbags: string;
    Sales: string;
  },
  CustomerSatisfaction: {
    CSTAT: string;
    NSTAT: string;
    TTS: string;
  },
  QuarterlyRevenues: {
    RevenueAmount: string;
  }
}

declare module 'RetailHomeWebPartStrings' {
  const strings: IRetailHomeWebPartStrings;
  export = strings;
}
