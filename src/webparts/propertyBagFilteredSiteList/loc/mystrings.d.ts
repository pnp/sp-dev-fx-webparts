declare interface IPropertyBagFilteredSiteListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SiteTemplatesToIncludeFieldLabel: string;
  FiltersFieldLabel: string
}

declare module 'propertyBagFilteredSiteListStrings' {
  const strings: IPropertyBagFilteredSiteListStrings;
  export = strings;
}
