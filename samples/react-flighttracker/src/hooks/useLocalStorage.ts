/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

interface IStorage {
  value: unknown;
  expires?: Date;
}

const  DEFAULT_EXPIRED_IN_SECONDS =  60 * 60 * 1000; // 1 hour

const  getStorageValue = (key:string, defaultValue:unknown):any  => {
  const  storage:IStorage = JSON.parse(sessionStorage.getItem(key) || '{}');
  // getting stored value
   const { value, expires } = storage || {} as IStorage;
  if (expires > new Date()   ) {
    return value || defaultValue;
  }
  return undefined ;
}

export const useLocalStorage = (key:string, defaultValue:unknown, expiredIn?: number):any => {
  const [value, setStorageValue] = React.useState(() => {
    return getStorageValue(key, defaultValue);
  });

  React.useEffect(() => {
    // save value
     const expiredInValue = expiredIn ? new Date(new Date().getTime() + expiredIn * 1000) :  DEFAULT_EXPIRED_IN_SECONDS;

      sessionStorage.setItem(key, JSON.stringify({ value, expires:expiredInValue }));

  }, [key, value, expiredIn]);

  return [value, setStorageValue];
};
