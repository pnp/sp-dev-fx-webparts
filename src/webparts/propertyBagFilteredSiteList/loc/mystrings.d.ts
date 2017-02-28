declare interface IPropertyBagFilteredSiteListStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  SiteTemplatesToIncludeFieldLabel: string;
  SiteTemplatesToIncludeFieldDescription: string;
  FiltersFieldLabel: string;
  FiltersFieldDescription: string;
  LinkTargetFieldLabel: string;
  ShowSiteDescriptionsFieldLabel: string;
  UserFiltersFieldLabel: string;
  UserFiltersFieldDescription: string;
  ShowQueryTextFieldLabel: string;
  TargetBlankDescription: string;
  TargetSelfDescription: string;
  TargetParentDescription: string;
  TargetTopDescription: string;
}

declare module 'propertyBagFilteredSiteListStrings' {
  const strings: IPropertyBagFilteredSiteListStrings;
  export = strings;
}
