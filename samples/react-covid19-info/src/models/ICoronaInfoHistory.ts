import { IDictionary } from "./IDictionary";

export interface ICoronaInfoHistory {
  countryregion: string;
  lastupdate: string;
  timeseries: IDictionary<TimeInfo>;
}

export interface TimeInfo {
  confirmed: number;
  deaths: number;
  recovered: number;
}
