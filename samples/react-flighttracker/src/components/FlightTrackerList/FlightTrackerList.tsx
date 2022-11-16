/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';

import {
  addHours,
  getHours,
  getMinutes,
  set,
} from 'date-fns';
import { useAtom } from 'jotai';
import { MessageBarType } from 'office-ui-fabric-react';

import { isEmpty } from '@microsoft/sp-lodash-subset';

import { useAirlines } from '../../hooks/useAirlines';
import { useFlightSchedule } from '../../hooks/useFlightSchedules';
import {
  useMappingFlightSchedules,
} from '../../hooks/useMappingFlightShedules';
import { globalState } from '../../jotai/atoms';
import { airlineState } from '../../jotai/atoms/airlineState';
import {
  IFlights,
  IFlightTrackerListItem,
  IGlobalState,
} from '../../models';
import { ShowList } from '../ShowList';
import { ShowMessage } from '../ShowMessage/ShowMessage';
import { ShowSpinner } from '../ShowSpinner';

const DEFAULT_ITEMS_TO_LOAD = 7;

export interface IFlightTrackerListProps {}

export const FlightTrackerList: React.FunctionComponent<IFlightTrackerListProps> = () => {
  const [appState, setGlobalState] = useAtom(globalState);
  const [airlineList, setAirlineList] = useAtom(airlineState);
  const { mapFlightSchedules } = useMappingFlightSchedules();
  const { selectedAirPort, selectedInformationType, selectedDate, numberItemsPerPage, selectedTime } = appState;
  const [isLoadingItems, setIsLoadingItems] = React.useState<boolean>(true);
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [listItems, setListItems] = React.useState<IFlightTrackerListItem[]>([]);
  const [flights, setFlights] = React.useState<IFlights>({} as IFlights);
  const [errorFlightSchedules, setErrorFlightSchedules] = React.useState<Error>();
  const [isLoadingFlightSchedules, setIsLoadingFlightSchedules] = React.useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const { getFlightSchedule } = useFlightSchedule();
  const { airlines, errorLoadingAirlines, loadingAirlines } = useAirlines();
  const [hasMore, setHasMore] = React.useState<boolean>(true);
  const pageIndex = React.useRef<number>(0);
  const currentInformationType = React.useRef(selectedInformationType);

  const checkTypeInformationToScroll = React.useCallback(() => {
    if (selectedInformationType !== currentInformationType.current) {
      pageIndex.current = 0;
      currentInformationType.current = selectedInformationType;
    }
  }, [selectedInformationType]);

  const onRefresh = React.useCallback(async () => {
    pageIndex.current = 0;
    const currentDateTime = new Date();
    setGlobalState(
      (prevState) =>
        ({
          ...prevState,
          selectedDate: currentDateTime,
          selectedTime: currentDateTime,
        } as IGlobalState)
    );
    setIsRefreshing(true);
  }, [appState]);

  React.useEffect(() => {
    if (!isEmpty(airlines)) {
      setAirlineList(airlines);
    }
  }, [airlines]);

  React.useEffect(() => {
    (async () => {
      setIsLoadingFlightSchedules(true);
      if (airlineList) {
        try {
          const searchDate: Date = set(selectedDate, {
            hours: getHours(selectedTime),
            minutes: getMinutes(selectedTime),
            seconds: 0,
            milliseconds: 0,
          });
          const flightSchedule = await getFlightSchedule({
            fromDate: searchDate.toISOString(),
            toDate: addHours(searchDate, 12).toISOString(), // maximuum 12 hours interval is supported by the API
            airportCode: selectedAirPort?.gps_code,
          });
          setFlights(flightSchedule ?? ({} as IFlights));
        } catch (error) {
          setErrorFlightSchedules(error);
        } finally {
          setIsLoadingFlightSchedules(false);
        }
      }
    })();
  }, [airlineList, selectedAirPort, selectedDate, selectedTime, selectedInformationType, isRefreshing]);

  const loadItems = React.useCallback(
    async (pageIndex: number): Promise<IFlightTrackerListItem[]> => {
      if (isEmpty(flights)) {
        return [];
      }
      const numberItemsToLoad = numberItemsPerPage ? numberItemsPerPage + 1 : DEFAULT_ITEMS_TO_LOAD;
      const mappedFlightSchedules = await mapFlightSchedules(
        selectedInformationType,
        flights,
        pageIndex,
        numberItemsToLoad
      );
      return mappedFlightSchedules;
    },
    [flights, mapFlightSchedules, numberItemsPerPage, selectedInformationType]
  );

  React.useEffect(() => {
    (async () => {
      setIsLoadingItems(true);
      if (!isEmpty(flights)) {
        const mappedFlightSchedules = await loadItems(0);
        setListItems(mappedFlightSchedules);
        setHasMore((prevHasMore) => (mappedFlightSchedules?.length > 0 ? true : false));
      }
      setIsRefreshing((prevState) => (prevState === true ? false : prevState));
      setIsLoadingItems(false);
    })();
  }, [flights, loadItems, isRefreshing, setIsLoadingItems, setListItems, setHasMore]);

  const onScroll = React.useCallback(async () => {
    if (hasMore) {
      checkTypeInformationToScroll();
      pageIndex.current = pageIndex.current + 1;
      const mappedFlightSchedules = (await loadItems(pageIndex.current)) ?? [];
      setListItems((prevListItems) => [...prevListItems, ...mappedFlightSchedules]);
      setHasMore((prevHasMore) => (mappedFlightSchedules?.length > 0 ? true : false));
    }
  }, [hasMore, loadItems, checkTypeInformationToScroll, setListItems, setHasMore]);

  const showMessage = React.useMemo((): boolean => {
    setIsLoadingItems(false);
    setErrorMessage(errorFlightSchedules?.message);
    return !!errorFlightSchedules;
  }, [errorFlightSchedules, setErrorMessage]);

  const showSpinner = React.useMemo((): boolean => {
    return (isLoadingFlightSchedules || loadingAirlines || isLoadingItems) && !showMessage;
  }, [isLoadingFlightSchedules, showMessage, loadingAirlines, isLoadingItems]);

  if (!selectedAirPort || !selectedInformationType) {
    return null;
  }

  return (
    <>
      <ShowMessage isShow={showMessage} message={errorMessage} messageBarType={MessageBarType.error} />
      <ShowSpinner isShow={showSpinner} />

      <ShowList
        showList={!showSpinner && !showMessage}
        listItems={listItems}
        onScroll={onScroll}
        onRefresh={onRefresh}
      />
    </>
  );
};
