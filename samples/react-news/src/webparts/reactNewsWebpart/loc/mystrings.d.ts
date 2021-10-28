declare interface IReactNewsWebpartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  StyleToggle: string;
  AuthorToggle: string;
  sites: IPropertyFieldSite[];
}

declare module 'ReactNewsWebpartStrings' {
  const strings: IReactNewsWebpartStrings;
  export = strings;
}
