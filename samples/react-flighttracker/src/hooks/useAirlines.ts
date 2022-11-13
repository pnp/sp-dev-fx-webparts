/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-unused-expressions */
import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { IAirlines } from '../models/IAirlines';
import { useLocalStorage } from './useLocalStorage';

const airlinesData = require("../mockData/airlines.json");
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */
export const useAirlines = () => {
  const [error, setError] = useState<Error>(null);
  const [loading, setLoading] = useState(false);
  const [airlines, setAirlines] = useState<IAirlines>({} as IAirlines);

  const [getAirLinesFromSessionStorage, setAirLinesToSessionStorage] = useLocalStorage();

  const fetchAirlines = useCallback(async () => {
    try {
      setAirLinesToSessionStorage("__airlines__",airlinesData);
    } catch (error) {
      if (DEBUG) {
        console.log("[useAirLines] error", error);
      }
      setLoading(false);
      setError(error);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const airlinesFromSessionStorage = getAirLinesFromSessionStorage("__airlines__");
      if (!airlinesFromSessionStorage?.rows?.length) {
        await fetchAirlines();
        setAirlines(airlinesData);
        setError(undefined);
      } else {
        setAirlines(airlinesFromSessionStorage);
      }

      setLoading(false);
    })();
  }, []);
  return {
    airlines,
    errorLoadingAirlines: error,
    loadingAirlines: loading,
  };
};
