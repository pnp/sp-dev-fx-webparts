declare interface ISitecontentsWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  FilterSiteContentLabel: string;
  ShowModifiedDateFieldLabel:string;
  ShowCreateDateFieldLabel:string;
  ShowItemsCountFieldLabel: string;
  ShowOrderByFieldLabel: string;
}

declare module 'SitecontentsWebPartStrings' {
  const strings: ISitecontentsWebPartStrings;
  export = strings;
}
