export interface IEventData {
  Id?:number;
  ID?:number;
  title: string;
  Description?: any;
  location?:string;
  EventDate: Date;
  EndDate: Date;
  color?:string;
  ownerInitial?: string;
  ownerPhoto?:string;
  ownerEmail?:string;
  ownerName?:string;
  fAllDayEvent?: boolean;
  attendes?: number[];
  geolocation?: {Longitude:number,  Latitude: number};
  Category?: string;
  Duration?: number;
  RecurrenceData?:string;
  fRecurrence?:string | boolean;
  EventType?:string;
  UID?:string;
  RecurrenceID?: string;
  MasterSeriesItemID?: string;
}
