export interface IEventData {
  id?:number;
  title: string;
  Description?: any;
  location?:string;
  start: Date;
  end: Date;
  color?:string;
  ownerInitial?: string;
  ownerPhoto?:string;
  ownerEmail?:string;
  ownerName?:string;
  allDayEvent?: boolean;
  attendes?: number[];
  geolocation?: {Longitude:number,  Latitude: number};
  Category?: string;
}
