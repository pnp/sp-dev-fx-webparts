export interface ICoronaInfo {
  countryregion: string;
  countrycode: ICountryCode;
  lastupdate: string;
  location: ILocation;
  confirmed: number;
  deaths: number;
  recovered: number;
}
export interface ILocation {
  lat: number;
  lng: number;
}
export interface ICountryCode {
  iso2: string;
  iso3: string;
}
