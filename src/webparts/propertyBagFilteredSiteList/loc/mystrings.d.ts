declare interface IPropertyBagFilteredSiteListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SiteTemplatesToIncludeFieldLabel: string;
    SiteTemplatesToIncludeFieldDescription: string;
  FiltersFieldLabel: string;
  OpenInNewWindowFieldLabel: string;
  ShowSiteDescriptionsFieldLabel: string;
  UserFiltersFieldLabel: string;
  openInNewWindow: boolean;
  showSiteDescriptions: boolean;
}

declare module 'propertyBagFilteredSiteListStrings' {
  const strings: IPropertyBagFilteredSiteListStrings;
  export = strings;
}
