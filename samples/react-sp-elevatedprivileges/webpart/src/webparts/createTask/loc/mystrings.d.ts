declare interface ICreateTaskStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'createTaskStrings' {
  const strings: ICreateTaskStrings;
  export = strings;
}
