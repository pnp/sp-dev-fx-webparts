import { useCallback } from 'react';

import { sortBy } from 'lodash';

import { EInformationType } from '../constants/EInformationType';
import {
  Arrivals,
  Departures,
  IFlights,
} from '../models/IFlights';
import { IFlightTrackerListItem } from '../models/IFlightTrackerListItem';
import { useUtils } from './useUtils';

const getPageIndex = (page: number, numberItemsPerPage: number): number => {
  return page * numberItemsPerPage;
};
export interface IUseMappingFlightShedules {


  mapFlightSchedules: (
    flightInformationType: EInformationType,
    flightSchedules: IFlights,
    page: number,
    numberItemsPerPage: number
  ) => Promise<IFlightTrackerListItem[]>;
}

export const useMappingFlightSchedules = (): IUseMappingFlightShedules => {
  const { getAirlineLogo, getTimeFromDate } = useUtils();

  const getMappedFlightScheduleDeparture = useCallback(async (flightSchedule: Departures): Promise<
    IFlightTrackerListItem
  > => {
    const logo = await getAirlineLogo(flightSchedule.airline.name);
    const mappedFlightSchedule = {
      flightCompanyImage: logo ?? "",
      flightNumber: flightSchedule.number,
      flightStatus: flightSchedule.status,
      flightTime: getTimeFromDate(flightSchedule.departure.scheduledTimeLocal),
      flightRealTime: getTimeFromDate(flightSchedule.departure.actualTimeLocal),
      flightTimeStatusText: flightSchedule.status,
      flightTerminal: flightSchedule.departure.terminal,
      FlightGate: flightSchedule.departure.gate,
      flightOrigin: flightSchedule.arrival.airport.name,
      flightCompany: flightSchedule.airline.name,
    };
    return mappedFlightSchedule;
  }, [getAirlineLogo]);

  const getMappedFlightScheduleArrival = useCallback(async (flightSchedule: Arrivals): Promise<
    IFlightTrackerListItem
  > => {
    const logo = await getAirlineLogo(flightSchedule.airline.name);
    const mappedFlightSchedule = {
      flightCompanyImage: logo ?? "",
      flightNumber: flightSchedule.number,
      flightStatus: flightSchedule.status,
      flightTime: getTimeFromDate(flightSchedule.arrival.scheduledTimeLocal),
      flightRealTime: getTimeFromDate(flightSchedule.arrival.actualTimeLocal),
      flightTimeStatusText: flightSchedule.status,
      flightTerminal: flightSchedule?.departure?.terminal ?? "",
      FlightGate: flightSchedule?.departure?.gate ?? "",
      flightOrigin: flightSchedule?.departure?.airport?.name,
      flightCompany: flightSchedule?.airline?.name,
    };
    return mappedFlightSchedule;
  }, [getAirlineLogo]);


  const getMappedFlightSchedules = useCallback(
    async (
      flightSchedules: IFlights,
      page: number,
      numberItemsPerPage: number,
      flightInformationType: EInformationType
    ): Promise<IFlightTrackerListItem[]> => {
      if (!flightSchedules) return undefined;
      const mappedFlightSchedules: IFlightTrackerListItem[] = [];
      const flightsInfoToMap =
        flightInformationType === EInformationType.DEPARTURES
          ? sortBy((flightSchedules.departures as Departures[]), ["departure.scheduledTimeLocal"])
          :  sortBy((flightSchedules.arrivals as Arrivals[]) , ["arrival.scheduledTimeLocal"]);
      const pageIndex = getPageIndex(page, numberItemsPerPage);
      const items = flightsInfoToMap.slice(pageIndex, pageIndex + numberItemsPerPage);

      for (const flightSchedule of items) {
        const mappedInfo =
          flightInformationType === EInformationType.DEPARTURES
            ? await getMappedFlightScheduleDeparture(flightSchedule)
            : await getMappedFlightScheduleArrival(flightSchedule);
        mappedFlightSchedules.push(mappedInfo);
      }
      return mappedFlightSchedules;
    },
    [getAirlineLogo]
  );

  const mapFlightSchedules = useCallback(
    async (
      flightInformationType: EInformationType,
      flightSchedules: IFlights,
      page: number,
      numberItemsPerPage: number
    ): Promise<IFlightTrackerListItem[]> => {
      let mappedFlights: IFlightTrackerListItem[] = [];
      mappedFlights = await getMappedFlightSchedules(flightSchedules, page, numberItemsPerPage, flightInformationType);
      return mappedFlights;
    },
    [getMappedFlightSchedules]
  );

  return {
    mapFlightSchedules,
  };
};
