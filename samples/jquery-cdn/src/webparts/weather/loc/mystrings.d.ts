declare interface IWeatherStrings {
  PropertyPaneDescription: string;
  DataGroupName: string;
  LocationFieldLabel: string;
}

declare module 'weatherStrings' {
  const strings: IWeatherStrings;
  export = strings;
}
