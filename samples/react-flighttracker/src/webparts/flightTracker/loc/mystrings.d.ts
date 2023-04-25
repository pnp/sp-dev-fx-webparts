declare interface IFlightTrackerWebPartStrings {
  AirLineLabel: string;
  AirportLabel: string;
  AirPortPlaceholder: string;
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DateLabel: string;
  DescriptionFieldLabel: string;
  FlightLabel: string;
  InformationTypeLabel: string;
  NoDataAvailableForAirport: string;
  NumberItemsPerPageLabel:string;
  RefreshIntervalLabel:string;
  EnablerRefreshIntervalLabel:string;
  RefreshIntervalOffText:string;
  RefreshIntervalOnText:string;
Remove: string;
SelectDate: string;
SelecteAirport: string;
SelectInformationType: string;
selectTime: string;
StartTimeLabel: string;
TerminalLabel: string;
TimeLabel: string;
}

declare module 'FlightTrackerWebPartStrings' {
  const strings: IFlightTrackerWebPartStrings;
  export = strings;
}
