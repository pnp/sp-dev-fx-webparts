export interface ISearchAirports {
  airportsByCities: IAirportsByCity[];
  cities: ICity[];
}

interface ICity {
  GMT: string;
  codeIataCity: string;
  codeIso2Country: string;
  latitudeCity: number;
  longitudeCity: number;
  nameCity: string;
  timezone: string;
}

interface IAirportsByCity {
  GMT: string;
  codeIataAirport: string;
  codeIataCity: string;
  codeIcaoAirport: string;
  codeIso2Country: string;
  latitudeAirport: number;
  longitudeAirport: number;
  nameAirport: string;
  nameCountry: string;
  phone: string;
  timezone: string;
}

