export interface ILocalStorageKey {
  /*
  The object used to create the key, could be anything. If Object, will be strigified. If not string, converted to string
  */
  keyName: any;

  /*
  a possible key prefix, added to hash key value
  */
  keyPrefix?: string;

  /*
  a possible value for this particular key, used in "set"
  */
  keyValue?: any;

  /*
  timeout in minutes, used in "get"
  */
  timeOutInMinutes?: number;
}

export interface ILocalStorageObject {
  /*
  A string or object of the data we want to store
  */
  keyValue: any;

  /*
  The date / time the data was stored
  */
  keyDate: Date;
}

export interface ILocalStorageService {
  get(keyToken: ILocalStorageKey): Promise<any>;
  set(keyToken: ILocalStorageKey): Promise<boolean>;
}

