declare interface IBotFrameworkChatStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'botFrameworkChatStrings' {
  const strings: IBotFrameworkChatStrings;
  export = strings;
}
