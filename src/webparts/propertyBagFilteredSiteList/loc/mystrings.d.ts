declare interface IPropertyBagFilteredSiteListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SiteTemplatesToIncludeFieldLabel: string;
  SiteTemplatesToIncludeFieldDescription: string;
  FiltersFieldLabel: string;
  FiltersFieldDescription: string;
  OpenInNewWindowFieldLabel: string;
  ShowSiteDescriptionsFieldLabel: string;
  UserFiltersFieldLabel: string;
  UserFiltersFieldDescription: string;
  openInNewWindow: boolean;
  showSiteDescriptions: boolean;
}

declare module 'propertyBagFilteredSiteListStrings' {
  const strings: IPropertyBagFilteredSiteListStrings;
  export = strings;
}
