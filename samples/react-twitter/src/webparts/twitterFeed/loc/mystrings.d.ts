declare interface ITwitterFeedWebPartStrings {
  PropertyPaneDescription: string;
  SourceGroupName: string;
  SourceType: string;
  SourceTypeProfile:string;
  SourceTypeList: string;
  SourceTypeCollection: string;
  SourceTypeLikes: string;
  SourceTypeUrl: string;
  ScreenName: string;
  OwnerScreenName: string;
  Slug: string;
  CollectionId: string;
  Url: string;
  LayoutGroupName: string;
  Theme: string;
  ThemeDark: string;
  ThemeLight: string;
  AutoHeight: string;
  Height: string;
  Width: string;
  NoBorders: string;
  NoHeader: string;
  NoFooter: string;
  NoScrollbar: string;
  TweetLimit: string;
  BorderColor: string;
  Yes: string;
  No: string;
  Configure: string;
  ConfigureDescription: string;
  ConfigureButton: string;
}

declare module 'TwitterFeedWebPartStrings' {
  const strings: ITwitterFeedWebPartStrings;
  export = strings;
}
