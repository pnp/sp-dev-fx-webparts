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
    DataSetTitle: string;
    IncorrectFit: string;
    Defective: string;
    WrongItem: string;
    Disliked: string;
    WrongSize: string;
  },
  CurrentInventory: {
    DataSetTitle: string;
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
  },
  ReturnVolumes: {
    Returns: string;
    Inventory: string;
    Months: {
      January: string;
      February: string;
      March: string;
      April: string;
      May: string;
      June: string;
      July: string;
      August: string;
      September: string;
      October: string;
      November: string;
      December: string;
    },
    MaxReturns: string;
    MaxInventory: string;
    MonthOfMaxReturns: string;
    MonthOfMaxInventory: string;
    CurrentReturnCount: string;
    CurrentInventoryCount: string;
  }
}

declare module 'RetailHomeWebPartStrings' {
  const strings: IRetailHomeWebPartStrings;
  export = strings;
}
