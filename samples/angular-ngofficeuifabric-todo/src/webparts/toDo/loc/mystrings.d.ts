declare interface IStrings {
  PropertyPaneDescription: string;
  ViewGroupName: string;
  HideFinishedTasksFieldLabel: string;
}

declare module 'mystrings' {
  const strings: IStrings;
  export = strings;
}
