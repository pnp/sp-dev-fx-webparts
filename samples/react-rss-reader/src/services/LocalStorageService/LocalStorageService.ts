import { Logger, LogLevel, ConsoleListener } from          '@pnp/logging';

import {
  ILocalStorageService,
  ILocalStorageKey,
  ILocalStorageObject
} from                                                     './ILocalStorageService';

import {Md5} from                                          'ts-md5/dist/md5';

class LocalStorageService implements ILocalStorageService {
    public constructor() {
        // Setup the Logger
        const consoleListener = new ConsoleListener();
        Logger.subscribe(consoleListener);


    }

    /**
     * Attempt to get local storage value based on key
     * @param keyToken the key value used to retrive and verify local storage
     * @return any - the found and validated local storage value
     */
    public async get(keyToken: ILocalStorageKey): Promise<any> {

      var p = new Promise<any>(async (resolve, reject) => {
        try {

          var returnValue: any;

          //get the hash of the local storage token based on value
          //var keyHash: string = md5(keyToken.keyName);
          //var keyHash: string = ObjectHash.MD5(keyToken.keyName);
          var keyHash: string | Int32Array = Md5.hashStr(JSON.stringify(keyToken.keyName));
          console.log("LS get: keyhash - " + keyHash);


          //create the corrrect storage key based on keyHash and possible prefix
          const storageKey: string = (keyToken.keyPrefix ? keyToken.keyPrefix + "_" : "") + keyHash;
          console.log("LS get: storagekey - " + storageKey);

          //attempt to get the key/value from local storage based on storageKey
          const keyValue: ILocalStorageObject = JSON.parse(localStorage.getItem(storageKey)) as ILocalStorageObject;

          //with a valid response, we can continue
          if (keyValue) {

            //check timeout if one provided
            if (keyToken.timeOutInMinutes > 0) {

              //have to get proper date object
              const keyDate: Date = new Date(keyValue.keyDate.toString());

              //determine the local time at which this key/value should expire
              const timeout: Date = new Date(keyDate.getTime() + keyToken.timeOutInMinutes*60000);

              //console.log("LS get: now " + new Date(Date.now()).toString());
              //console.log("LS get: timeout " + timeout.toString());

              //check to see if the local storage is stale or not
              if (timeout.getTime() > Date.now()) {

                //still valid, thus return whatever was found in local storage
                returnValue = keyValue.keyValue;
              }
              else {

                //attempt to remove from local storage for garbage collection
                localStorage.removeItem(storageKey);
              }
            }
            else {

              //no timeout was provided, thus simply return
              returnValue = keyValue.keyValue;
            }
          }
          else {

            //key was not found in local storage, simply continue
          }

          //resolve the promise with whatever was found, a valid, or null
          resolve(returnValue);

        } catch (error) {
          Logger.write('[LocalStorageService.get()]: Error: ' + error, LogLevel.Error);

          reject(null);
        }

        return;
      });

      return p;
    }

    /**
     * Attempt to set local storage value based on key
     * @param keyToken the key value used to store to local storage
     * @return boolean - true upon success
     */
    public async set(keyToken: ILocalStorageKey): Promise<boolean> {

      var p = new Promise<any>(async (resolve, reject) => {
        try {

          //get the hash of the local storage token based on value
          //var keyHash: string = md5(keyToken.keyName);
          //var keyHash: string = ObjectHash.MD5(keyToken.keyName);
          var keyHash: string | Int32Array = Md5.hashStr(JSON.stringify(keyToken.keyName));
          console.log("LS set: keyhash - " + keyHash);

          //create the corrrect storage key based on keyHash and possible prefix
          const storageKey: string = (keyToken.keyPrefix ? keyToken.keyPrefix + "_" : "") + keyHash;
          console.log("LS set: storagekey - " + storageKey);

          //create a storage object to hold the value and storage date/time "now"
          const keyValue: ILocalStorageObject = {
            keyValue: keyToken.keyValue,
            keyDate: new Date(Date.now())
          } as ILocalStorageObject;

          //attempt to store to local storage
          localStorage.setItem(storageKey, JSON.stringify(keyValue));

          resolve(true);
        } catch (error) {
          Logger.write('[LocalStorageService.set()]: Error: ' + error, LogLevel.Error);

          reject(false);
        }

        return;
      });

      return p;
    }
}

export default LocalStorageService;
