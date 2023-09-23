export interface IFlights {
  departures: Departures[];
  arrivals: Arrivals[];
}

export interface Arrivals {
  departure: Departure;
  arrival: Arrival;
  number: string;
  status: string;
  codeshareStatus: string;
  isCargo: boolean;
  aircraft?: Aircraft;
  airline: Airline;
  callSign?: string;
}


export interface Departures{
  departure: Departure;
  arrival: Arrival;
  number: string;
  status: string;
  codeshareStatus: string;
  isCargo: boolean;
  airline: Airline;
  aircraft?: Aircraft;
}

export interface Aircraft {
  model: string;
  reg?: string;
  modeS?: string;
}

export interface Airline {
  name: string;
  logo?: string;
}

export interface Arrival {
  airport: Airport;
  quality: string[];
  scheduledTimeLocal?: string;
  scheduledTimeUtc?: string;
  actualTimeLocal?: string;
  runwayTimeLocal?: string;
  actualTimeUtc?: string;
  runwayTimeUtc?: string;
  terminal?: string;
}

export interface Airport {
  name: string;
  icao?: string;
  iata?: string;
}

export interface Departure {
  airport: Airport;
  scheduledTimeLocal: string;
  actualTimeLocal: string;
  scheduledTimeUtc: string;
  actualTimeUtc: string;
  quality: string[];
  terminal?: string;
  checkInDesk?: string;
  gate?: string;
}
