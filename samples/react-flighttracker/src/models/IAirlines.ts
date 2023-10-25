export interface IAirlines {
  version: number;
  rows:IAirline[];
}

export interface IAirline {
  Name: string;
  Code: string;
  ICAO: string;
  Photo?: string;
}
