/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import { useCallback } from 'react';

import axios from 'axios';

import {
  RAPID_API_HOST_COUNTRY_FLAGS,
  RAPID_API_KEY_COUNTRY_FLAGS,
} from '../constants';

export interface ICountryFlags {
  countryFlags: any;
  error:Error;
}

export const useContryFlags = () => {

  const getCountryFlag = useCallback(async (country: string): Promise<ICountryFlags> => {
    if (!country) return undefined;
    const axiosOptions = {
      method: "GET",
      url: `https://country-flags.p.rapidapi.com/png/${country}`,
      headers: {
        "X-RapidAPI-Key":  RAPID_API_KEY_COUNTRY_FLAGS,
        "X-RapidAPI-Host": RAPID_API_HOST_COUNTRY_FLAGS,
      },
    };
    try {
      const response = await axios.request(axiosOptions);

      return  {countryFlags: response.data, error: null};
    } catch (error) {
      if (DEBUG) {
        console.log("[useContryFlags-getCountryFlag] error", error);
      }
      return  { countryFlags: undefined, error: error };
    }
  }, []);

  return {
    getCountryFlag,
  };
};
