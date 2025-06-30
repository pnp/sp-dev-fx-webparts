/* eslint-disable @typescript-eslint/no-explicit-any */

import addSeconds from 'date-fns/addSeconds';
import isAfter from 'date-fns/isAfter';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
interface IStorage {
  value: unknown;
  expires?: Date;
}

const DEFAULT_EXPIRED_IN_SECONDS = 60 * 30; // 30 min

export const useCache = (cacheType: "local" | "session") => {
  const setCacheValue = (key: string, newValue: unknown, expiredInSeconds?: number) => {
    const expires = addSeconds(new Date(), expiredInSeconds ?? DEFAULT_EXPIRED_IN_SECONDS);
    if (cacheType === "session") {
      sessionStorage.setItem(key, JSON.stringify({ value: newValue, expires }));
    } else {
      localStorage.setItem(key, JSON.stringify({ value: newValue, expires }));
    }
  };
  const getCacheValue = (key: string): any => {
    let storage: IStorage = {} as IStorage;
    if (cacheType === "session") {
      storage = JSON.parse(sessionStorage.getItem(key) || "{}");
    } else {
      storage = JSON.parse(localStorage.getItem(key) || "{}");
    }

    // getting stored value
    const { value, expires } = storage || ({} as IStorage);
    if (isAfter(new Date(expires), new Date())) {
      return value;
    }
    return undefined;
  };

  return { getCacheValue, setCacheValue };
};
