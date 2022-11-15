/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import {
  format,
  isSameDay,
  parseISO,
} from 'date-fns';
import { useAtomValue } from 'jotai';

import { airlineState } from '../jotai/atoms/airlineState';
import { globalState } from '../jotai/atoms/globalState';
import { IAirline } from '../models/IAirlines';

const PHOTO_AIRLINE_URL = "https://r-xx.bstatic.com/data/airlines_logo/";

export const useUtils = () => {
  const appState = useAtomValue(globalState);

  const airlinesList = useAtomValue(airlineState);
  const { currentTheme } = appState;

  const statusColors = new Map<string, string>([
    ["Unknown", currentTheme?.semanticColors?.bodyText],
    ["Expected", currentTheme?.semanticColors?.bodyText],
    ["EnRoute", currentTheme?.semanticColors?.bodyText],
    ["CheckIn", currentTheme?.palette?.themePrimary],
    ["Boarding", currentTheme?.palette?.themePrimary],
    ["GateClosed", currentTheme?.semanticColors?.bodyText],
    ["Departed", currentTheme?.palette?.themePrimary],
    ["Delayed", currentTheme?.palette?.yellowDark],
    ["Approaching", currentTheme?.semanticColors?.bodyText],
    ["Arrived", currentTheme?.palette?.themePrimary],
    ["Canceled", currentTheme?.semanticColors?.errorText],
    ["Diverted", currentTheme?.semanticColors?.errorText],
    ["CanceledUncertain", currentTheme?.semanticColors?.bodyText],
  ]);

  const getFlightStatusColor = React.useCallback(
    (status: string): string => {
      return statusColors.get(status) || currentTheme?.semanticColors?.bodyText;
    },
    [currentTheme, statusColors]
  );

  const getTimeFromDate = React.useCallback((date: string): string => {
    const { selectedDate } = appState;
    try {
      if (date) {
        if (isSameDay(parseISO(date), selectedDate)) {
          return format(parseISO(date), "p");
        } else {
          return format(parseISO(date), "dd MMM, p");
        }
      } else {
        return "";
      }
    } catch (error) {
      if (DEBUG) {
        console.log(["getTimeFromDate"], error);
      }
      return "";
    }
  }, []);

  const getAirlineByName = React.useCallback(
    async (name: string): Promise<IAirline> => {
      try {
        if (name && airlinesList && airlinesList?.rows?.length > 0) {
          const airline = airlinesList.rows.find((airline: IAirline) =>
            airline.Name.toLowerCase().includes(name.toLowerCase())
          );
          let photo = "";
          if (airline?.Code) {
            photo = `${PHOTO_AIRLINE_URL}${airline.Code}.png`;
          }
          return { ...airline, Photo: photo };
        } else {
          return null;
        }
      } catch (error) {
        if (DEBUG) {
          console.log(["getAirlineByName"], error);
        }
        return null;
      }
    },
    [airlinesList]
  );

  const getAirlineLogo = React.useCallback(
    async (airlineName: string): Promise<string> => {
      try {
        if (airlineName) {
          const airline = await getAirlineByName(airlineName);

          if (airline) {
            return airline.Photo ?? undefined;
          }
        } else {
          return undefined;
        }
      } catch (error) {
        if (DEBUG) {
          console.log(["getAirlineLogo"], error);
        }
        return undefined;
      }
    },
    [airlinesList]
  );

  return { getFlightStatusColor, getTimeFromDate, getAirlineLogo, getAirlineByName };
};
