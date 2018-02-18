import * as localforage from 'localforage';
import { IOfflineStorageRequest } from './IOfflineStorageRequest';
import { IOfflineStorageItem } from './IOffllineStorageItem';

/*
    Fetch and Promise.
    Comes from https://www.npmjs.com/package/@microsoft/sp-polyfills
*/

/**
 * Tries to wrap HTTP Requests so that they can be retrieved from
 * offline storage first, and making the HTTP Request at the same time.
 * Stores failed HTTP Requests in a Queue for when device is online again.
 * 
 * NB: Not all browsers support Offline/Online, fallback is HTTP failures.
 * @export
 * @class OfflineFirstHTTPService
 */
export class OfflineFirstHTTPService {
    private _IsOnline: boolean;
    private _LiveLocalForage: LocalForage;
    private _QueueLocalForage: LocalForage;

    /**
     * Creates an instance of GitHubService.
     * Registers Offline, Online listeners to get the
     * HTTP post/update/delete request queue
     * @memberof GitHubService
     */
    public constructor() {
        // only initially works on older Firefox
        this._IsOnline = window.navigator.onLine || !(window['mozInnerScreenX'] == null);

        this._LiveLocalForage = localforage.createInstance({name: "live"});
        this._QueueLocalForage = localforage.createInstance({name: "queue"});

        window.addEventListener("online",this.syncChangesToServer);
        window.addEventListener("offline",this.handleOfflineEvent);
    }


    /**
     * Posts/Updates/Delets should attempt to send HTTP Request
     * to server, on success is normal. On failure the request
     * should be queue for when online.
     * @param {RequestInfo} demoPost 
     * @param {RequestInit} demoPostInit 
     * @returns {Promise<any>} 
     * @memberof GitHubService
     */
    public post(offlineStorageRequest: IOfflineStorageRequest): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            fetch(offlineStorageRequest.value.requestInfo['url'], offlineStorageRequest.value.requestInit)
            .then((response: Response) => {
                if (response.ok) {
                    resolve(response.json());
                } else {
                    this.addRequestToQueue(offlineStorageRequest); 
                    reject(offlineStorageRequest);
                }
            })
            .catch(() => {
                reject(offlineStorageRequest);
                this.addRequestToQueue(offlineStorageRequest);
            });
        });
    }


    /**
     * HTTP requests store offline before returning,
     * Errors should return a reference to the HTTP request for re-attempts. 
     * @returns {Promise<any>} 
     * @memberof GitHubService
     */
    public getFromServer(offlineStorageRequest: IOfflineStorageRequest ): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any) => {
            fetch(offlineStorageRequest.value.requestInfo['url'], offlineStorageRequest.value.requestInit)
            .then( (json: Response) => {
                if (json.ok) {
                    return json.json();
                } else {
                    reject();
                }
            })
            .then( (json) => {
                this.setToLocal(offlineStorageRequest.key, json)
                .then(() => {
                    console.log("Stored Demo JSON Offline.");
                    resolve(json);
                })
                .catch(() => {
                    console.log("Failed to store Demo JSON Offline");
                    reject(json);
                });
            })
            .catch((error: Error|any) => {
                this.addRequestToQueue(offlineStorageRequest);
                console.error(error);
            });
        });
    }


    /**
     * Offline Storage getter, that waits for offline storage
     * to be initalized. 
     * @param {string} itemKey 
     * @returns {Promise<any>} 
     * @memberof GitHubService
     */
    public getFromLocal(itemKey: string): Promise<any> {
        return new Promise<any>((resolve: any, reject: any) => {
            this._LiveLocalForage.ready()
            .then(() => {
                return this._LiveLocalForage.getItem(itemKey);
            })
            .then((itemFromOffline: any) => {
                resolve(itemFromOffline);
            })
            .catch( (error: Error|any) => {
                reject();
            });
        });
    }


    /**
     * Offline Storage setter, that waits for offline storage
     * to be initalized. 
     * @param {string} itemKey 
     * @param {*} itemToStoreOffline 
     * @returns {Promise<any>} 
     * @memberof GitHubService
     */
    public setToLocal(key: string, value: string): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any) => {
            this._LiveLocalForage.ready()
            .then(() => {
                return this._LiveLocalForage.setItem(key, value);
            })
            .then( () => {
                resolve();
            })
            .catch((error: Error|any) => {
                reject(error);
            });
        });
    }


    /**
     * Iterates through the queue to sync changes to the server.
     * Decides what type of sync needs to be done. 
     * @private
     * @param {Event} e 
     * @memberof GitHubService
     */
    private syncChangesToServer(e: Event): void {
        this._IsOnline = true;
        this._QueueLocalForage.ready()
        .then(() => {
            return this._QueueLocalForage.keys();
        })
        .then( (keys) => {
            return Promise.all(keys.map(this.chooseSyncProcess));
        })
        .then(() => {
            console.log("Successfully synced with server");
        })
        .catch(() => {
            this._IsOnline = false;
            console.log("Did not sync with server, will retry when online.");
        });
    }

    private chooseSyncProcess(key: string): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any) => {
            this._QueueLocalForage.getItem(key)
            .then((offlineStorageItem: IOfflineStorageRequest) => {
                const requestInit = offlineStorageItem.value.requestInit;
                if (requestInit === null || requestInit === undefined || requestInit.method === "GET") {
                    return this.syncGetsFromServer(offlineStorageItem);
                }
                return this.syncPostsToServer(offlineStorageItem);
            })
            .catch(() => { 
                reject();
            });
        });
    }

    /**
     * Sends HTTP Posts/Updates/Deletes to the server that were in the queue.
     * Successfull HTTP Requests get removed from the Queue.
     * Unsuccessfull requests wait for the device to be online again. 
     * @private
     * @param {{ requestInfo: RequestInfo; requestInit: RequestInit; }} value 
     * @param {string} key 
     * @memberof GitHubService
     */
    private syncPostsToServer(offlineStorageRequest: IOfflineStorageRequest): void {
        this._QueueLocalForage.ready()
        .then(() => {
            return this.post(offlineStorageRequest);
        })
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            return;
        })
        .then(() => {
            return this._QueueLocalForage.removeItem(offlineStorageRequest.key);
        })
        .catch(() => {
            console.log("Failed to sync to server, will retry when online.");
        });
    }


    /**
     * Sends HTTP Gets to the server that were in the queue.
     * Sucessfull requests get removed from the queue and added to offline storage.
     * Unsucessfull requests remain in the queue and wait for device to be online again.
     * @private
     * @param {{ requestInfo: RequestInfo; requestInit: RequestInit; }} value 
     * @param {string} key 
     * @memberof GitHubService
     */
    private syncGetsFromServer(offlineStorageRequest: IOfflineStorageRequest): void {
        this._QueueLocalForage.ready()
        .then( () => {
            return this.getFromServer(offlineStorageRequest);
        })
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            return;
        })
        .then((json: any) => {
            return this._LiveLocalForage.setItem(offlineStorageRequest.key, json);
        })
        .then(() => {
            return this._QueueLocalForage.removeItem(offlineStorageRequest.key);
        })
        .catch((error: Error | any) => {
            console.log("Failed to sync " + offlineStorageRequest.key);
            console.error(error);
        });
    }


    /**
     * Offline/Online is not completly supported by all browsers yet.
     * This is here for future rather than present.
     * In future checks will be made before all requests.
     * Currently requests are attempted no matter status of Offline/Online.
     * @private
     * @param {Event} e 
     * @memberof GitHubService
     */
    private handleOfflineEvent(e: Event): void {
        this._IsOnline = false;
    }


    /**
     * Adds a HTTP Request to the Queue and will be called when
     * the device is online again.
     * @private
     * @param {*} failedRequest 
     * @memberof GitHubService
     */
    private addRequestToQueue(failedRequest: IOfflineStorageRequest): void {
        this._QueueLocalForage.ready()
        .then( () => {
            return this._QueueLocalForage.setItem(failedRequest.key, failedRequest.value);
        })
        .then(() => {
            console.log("Added failedRequest " + failedRequest + " to the queue for later.");
        })
        .catch(() => {
            console.log("Failed to add failedRequest " + failedRequest + " to the queue for later.");
        });
    }
}