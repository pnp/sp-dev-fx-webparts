declare interface IPollStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  ViewGroupName: string;
  ListNameFieldLabel: string;
  PollTitleFieldLabel: string;
  PollDescriptionFieldLabel: string;
}

declare module 'pollStrings' {
  const strings: IPollStrings;
  export = strings;
}
