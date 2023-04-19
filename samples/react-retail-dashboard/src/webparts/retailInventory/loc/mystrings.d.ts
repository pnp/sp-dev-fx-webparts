declare interface IRetailInventoryWebPartStrings {
  Generic: {
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
  Inventory: {
    CodeLabel: string;
    DescriptionLabel: string;
    PriceLabel: string;
    PictureLabel: string;
    LaunchDateLabel: string;
    SalesLabel: string;
  }
}

declare module 'RetailInventoryWebPartStrings' {
  const strings: IRetailInventoryWebPartStrings;
  export = strings;
}
