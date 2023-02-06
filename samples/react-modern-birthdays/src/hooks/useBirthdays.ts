/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-octal */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  useCallback,
  useRef,
} from 'react';

import {
  addDays,
  format,
} from 'date-fns';

import { BaseComponentContext } from '@microsoft/sp-component-base';

import { birthdayListTitle } from '../constants';
import { useLocalStorage } from './useLocalStorage';

export const useBirthdays = (context: BaseComponentContext, upcomingDays?: number, pageSize?:number) => {

  const { instanceId, msGraphClientFactory,  } = context;
  const upcomingDaysRef =  useRef(upcomingDays);
  const [getStorageValue, setStorageValue] = useLocalStorage();
  const pageSizeRef = useRef(pageSize);
  const getDataChached = useCallback( async  () => {
    const cachedData = getStorageValue(`__birthdays_users_${context.instanceId}`);
    if (cachedData && upcomingDaysRef.current === upcomingDays  && pageSizeRef.current === pageSize  ) {
        return JSON.parse(cachedData)
    }
    return false;
  }, [context.instanceId, upcomingDays, pageSize]);

  const getBirthDays = useCallback(async () => {
    try {
       const dataChached = await getDataChached();
        if (dataChached) {
          return dataChached;
        }
      const today = format(new Date(), "2000-MM-dd");
      const todayMonth = format(new Date(), "MM");
      const upcomingDate = addDays(new Date(), upcomingDays);
      const upcomingMonth = format(upcomingDate, "MM");
      const newYear = "2000-01-01";
      let filter = "";
      if (Number(upcomingMonth) < Number(todayMonth)) {
        filter = `fields/Birthday ge '${today}' or (fields/Birthday ge '${newYear}' and fields/Birthday le '${format(
          upcomingDate,
          "2000-MM-dd"
        )}')`;
      } else {
        filter = `fields/Birthday ge '${today}' and fields/Birthday le '${format(upcomingDate, "2000-MM-dd")}'`;
      }

      const graphClient = await  msGraphClientFactory.getClient("3");
      const results = await graphClient
        .api(`sites/root/lists('${birthdayListTitle}')/items?orderby=Fields/Birthday`)
        .version("v1.0")
        .expand("fields")
        .filter(filter)
        .get();

      setStorageValue(`__birthdays_users_${instanceId}`, JSON.stringify(results.value));

      return results.value;
    } catch (error) {
        console.log(error)

    }
  }, [upcomingDays, pageSize,  instanceId,  msGraphClientFactory, getDataChached, setStorageValue]);
  return {
    getBirthDays
  };
};
