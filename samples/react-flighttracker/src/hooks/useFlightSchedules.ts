import { useCallback } from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import axios from 'axios';

import {
  RAPID_API_HOST_AERODATABOX,
  RAPID_API_KEY_AERODATABOX,
} from '../constants';
import { IFlights } from '../models';
import { IFlightSchedulesInputParm } from '../models/IFlightSchedulesParm';

const ENDPOINT = "https://aerodatabox.p.rapidapi.com/flights/airports/icao/";

export interface IUseFlightSchedules {

  getFlightSchedule: (flightSchedulesParm: IFlightSchedulesInputParm) => Promise<IFlights>;
}

export const useFlightSchedule = ():IUseFlightSchedules => {

  const getFlightSchedule = useCallback(async (options: IFlightSchedulesInputParm):Promise<IFlights> => {
    const { fromDate, toDate, airportCode } = options || ({} as IFlightSchedulesInputParm);
    if (!fromDate || !toDate || !airportCode) {
      return undefined;
    }
    const axiosOptions = {
      method: "GET",
      url: `${ENDPOINT}${airportCode}/${fromDate}/${toDate}`,
      params: {
        withLeg: "true",
        direction: 'Both',
        withCancelled: "true",
        withCodeshared: "true",
        withCargo: "false",
        withPrivate: "false",
        withLocation: "true",
      },
      headers: {
        "X-RapidAPI-Key": `${RAPID_API_KEY_AERODATABOX}`,
        "X-RapidAPI-Host": `${RAPID_API_HOST_AERODATABOX}`,
      },
    };

    try {
      const response = await axios.request(axiosOptions);
      return   response?.data as IFlights || undefined;

    } catch (error) {
      if (DEBUG) {
        console.log("[useFlightSchedule] error", error);
        throw error;
      }
    }
  }, []);


  return {
    getFlightSchedule,
  };
};
