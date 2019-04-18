declare interface IBotFrameworkChatStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'BotFrameworkChatWebPartStrings' {
  const strings: IBotFrameworkChatStrings;
  export = strings;
}
