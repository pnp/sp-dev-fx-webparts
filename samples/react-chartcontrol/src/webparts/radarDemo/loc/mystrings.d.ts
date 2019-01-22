declare interface IRadarDemoWebPartStrings {
  Loading: string;
  DataSet1Label: string;
  DataSet2Label: string;
  ChartLabels: string[];
  WebPartDescription: string;
  MoreInfoLinkUrl: string;
}

declare module 'RadarDemoWebPartStrings' {
  const strings: IRadarDemoWebPartStrings;
  export = strings;
}
