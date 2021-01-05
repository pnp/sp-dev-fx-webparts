declare interface IWorldClockWebPartWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  BasicViewGroupName: string;
  DescriptionFieldLabel: string;
  ListNameFieldLabel: String;
  IsShowTimeFieldLabel: string;
  ShowActiveOnlyFieldLabel: string;
  showTitleFieldLabel: string;
}

declare module "WorldClockWebPartWebPartStrings" {
  const strings: IWorldClockWebPartWebPartStrings;
  export = strings;
}
