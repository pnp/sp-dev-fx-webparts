/* eslint-disable @typescript-eslint/no-explicit-any */

import addSeconds from 'date-fns/addSeconds';
import isAfter from 'date-fns/isAfter';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
interface IStorage {
  value: unknown;
  expires?: Date;
}

const DEFAULT_EXPIRED_IN_SECONDS = 60 * 5; // 5 min

export const useLocalStorage = (): any => {
  const setStorageValue = (key: string, newValue: unknown, expiredInSeconds?: number) => {
    const expires = addSeconds(new Date(), expiredInSeconds ?? DEFAULT_EXPIRED_IN_SECONDS);
    sessionStorage.setItem(key, JSON.stringify({ value: newValue, expires }));
  };
  const getStorageValue = (key: string): any => {
    const storage: IStorage = JSON.parse(sessionStorage.getItem(key) || "{}");
    // getting stored value
    const { value, expires } = storage || ({} as IStorage);
    if (isAfter(new Date(expires), new Date())) {
      return value;
    }
    return undefined;
  };

  return [getStorageValue, setStorageValue];
};
