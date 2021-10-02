declare interface IBannerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  ListIdLabel: string;
  MessageErrorDefault: string;
  PlaceHolderButtonDescription: string;
  PlaceHolderDescription: string;
  PlaceholderIconText: string;
  TitleFieldLabel: string;
}

declare module 'BannerWebPartStrings' {
  const strings: IBannerWebPartStrings;
  export = strings;
}
