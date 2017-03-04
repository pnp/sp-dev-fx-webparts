declare interface IPropertyBagDisplayStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
    PropertiesToDisplayFieldLabel:string;
    SiteTemplatesToIncludeFieldLabel:string;
}

declare module 'propertyBagDisplayStrings' {
  const strings: IPropertyBagDisplayStrings;
  export = strings;
}
