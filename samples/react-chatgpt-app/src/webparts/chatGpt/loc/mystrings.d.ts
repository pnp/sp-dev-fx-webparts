declare interface IChatGptWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  CgatGPTAppOpenAILabel: string;
  ChatGPTAppNotificationMessage: string;
  ChatGPTAppNotificationTitle: string;
  ChatGPTAppPoweredByLabel: string;
  ChatGPTAppPreviewChatInfoMessage: string;
}

declare module "ChatGptWebPartStrings" {
  const strings: IChatGptWebPartStrings;
  export = strings;
}
