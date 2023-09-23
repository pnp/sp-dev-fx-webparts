/* eslint-disable @typescript-eslint/no-var-requires */

import { useCallback } from 'react';

import { includes } from 'lodash';

import { IAirport } from '../models/IAirport';

const  airports =  require("../mockData/airports.json").airports;

interface IUseAirports {
  searchAirportsByText: (text: string) => Promise<IAirport[]>;
}

export const useAirports = ():IUseAirports => {


  const searchAirportsByText = useCallback(async (text: string): Promise<IAirport[]> => {
    if (!text) return [];
    const airportsFound: IAirport[] = [];

    for (const airport of  airports) {
      if (!airport.iata_code) continue;
      if (
        includes(airport?.municipality?.toLowerCase(), text.toLowerCase()) ||
        includes(airport?.name?.toLowerCase(), text.toLowerCase())
      ) {
        airportsFound.push(airport);
      }
    }
    return airportsFound;
  }, []);

  return {
    searchAirportsByText,
  };
};
