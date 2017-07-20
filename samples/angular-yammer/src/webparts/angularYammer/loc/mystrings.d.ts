declare interface IAngularYammerStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  NetworkFieldLabel: string;
  FeedTypeFieldLabel: string;
  DefaultGroupIdFieldLabel: string;
  ShowOpenGraphPreviewFieldLabel: string;
  PromptTextFieldLabel: string;
  HeaderFieldLabel: string;
  FooterFieldLabel: string;
}

declare module 'angularYammerStrings' {
  const strings: IAngularYammerStrings;
  export = strings;
}
