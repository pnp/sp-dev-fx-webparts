declare interface IWorkingWithStrings {
  PropertyPaneDescription: string;
  ViewGroupName: string;
  NumberOfPeopleFieldLabel: string;
  TitleFieldLabel: string;
}

declare module 'workingWithStrings' {
  const strings: IWorkingWithStrings;
  export = strings;
}
