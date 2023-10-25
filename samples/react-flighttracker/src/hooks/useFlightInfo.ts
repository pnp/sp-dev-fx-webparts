/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  useCallback,
  useEffect,
  useState,
} from 'react';

/* eslint-disable @typescript-eslint/no-empty-function */
import axios from 'axios';

import {
  RAPID_API_HOST_FLIGHT_RADAR,
  RAPID_API_KEY_FLIGHT_RADAR,
} from '../constants';
import { IFlightInfo } from '../models/IFlightInfo';

export  const useFlightInfo = (flightNumber?: string)  =>{
  const [flightInfo, setFlightInfo] = useState<IFlightInfo[]>([]);
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);

  const getFlightInfo = useCallback(async (flightNumber:string) => {
    setLoading(true);
    const axiosOptions = {
      method: 'GET',
      url: 'https://flight-radar1.p.rapidapi.com/flights/search',
      params: {query: `${flightNumber}`, limit: '1'},
      headers: {
        'X-RapidAPI-Key': RAPID_API_KEY_FLIGHT_RADAR,
        'X-RapidAPI-Host': RAPID_API_HOST_FLIGHT_RADAR
      }
    };
    try {
      const response = await axios.request(axiosOptions);
      const flightInfo:IFlightInfo[] = response?.data?.results as IFlightInfo[];
      return flightInfo;
    } catch (error) {
      if (DEBUG) {
        console.log("[useFlightSchedule-getFlightInfo] error", error);
      }
      setError(error);
    }finally {
      setLoading(false);
    }
   }, []);


  useEffect(() => {
     (async ()=> {
      setFlightInfo(await getFlightInfo(flightNumber));
     })();
  }, [flightNumber]);


  return  { flightInfo, errorFlightInfo:error, loadingFlightInfo:loading };

}
