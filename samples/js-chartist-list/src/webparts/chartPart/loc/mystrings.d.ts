declare interface IChartPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'chartPartStrings' {
  const strings: IChartPartStrings;
  export = strings;
}
