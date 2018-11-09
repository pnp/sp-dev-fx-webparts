declare interface IMapWebPartStrings {
  AddressFieldLabel: string;
  BingMapsApiKeyFieldLabel: string;
  BingMapsGroupName: string;
  CityFieldLabel: string;
  ConnectionGroupName: string;
  DataGroupName: string;
  ErrorText: string;
  GetBingMapsApiKeyLinkText: string;
  PropertyIdFieldLabel: string;
  PropertyPaneDescription: string;
  SourceIdFieldLabel: string;
}

declare module 'MapWebPartStrings' {
  const strings: IMapWebPartStrings;
  export = strings;
}
