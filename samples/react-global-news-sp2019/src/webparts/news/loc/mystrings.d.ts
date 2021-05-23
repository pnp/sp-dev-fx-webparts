declare interface INewsWebPartStrings {
  ConfigureWebPartButtonLabel: string;
  configureWebPartTextMessage: string;
  ConfigureWebPartMessage: string;
  AuthorNotAvailableMessage: string;
  CanNotShowArticleTextMessage: string;
  APILabelText: string;
  PageSizeLabel: string;
  ViewOption: string;
  ViewSettings: string;
  Title: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  NewsUrlFieldLabel: string;
  ApiKey: string;
}

declare module 'NewsWebPartStrings' {
  const strings: INewsWebPartStrings;
  export = strings;
}
