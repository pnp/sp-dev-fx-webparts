import * as localforage from 'localforage';

const demoUrl: string = "https://api.github.com/orgs/SharePoint/repos";
const demoRequest: RequestInfo = {
    url: demoUrl
} as RequestInfo;


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

        window.addEventListener("online",this.syncChangesToServer.bind(this));
        window.addEventListener("offline",this.handleOfflineEvent.bind(this));
    }
    
    /**
     * Gets should retrieve from local storage,
     * before attempting any HTTP requests.
     * @returns {Promise<any>} 
     * @memberof GitHubService
     */
    public getDemo(): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            this.getDemoLocal("demoRequestKey")
            .then((demoItem: any) => {
                let demoXhrPromise = this.getDemoXHR(demoRequest, null);
                resolve({"offlineItem": demoItem, "onlineItem": demoXhrPromise});
            })
            .catch((error: Error|any) => {
                this.getDemoXHR(demoRequest, null)
                .then((demoItem) => {
                    resolve(demoItem);
                })
                .catch((error: Error| any) => {
                    reject(error);
                });
            });
        });
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
    public postDemoXHR(demoPost: RequestInfo, demoPostInit: RequestInit): Promise<any> {
        return new Promise<any>( (resolve, reject) => {
            fetch(demoPost, demoPostInit)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    this.addRequestToQueue({"key" : "demoPost", "value": {"requestInfo" : demoRequest, "requestInit": demoPostInit}});
                    reject({"key" : "demoPost", "value": {"requestInfo" : demoRequest, "requestInit": demoPostInit}});
                }
            })
            .catch(() => {
                reject({"key" : "demoPost", "value": {"requestInfo" : demoRequest, "requestInit": demoPostInit}});
                this.addRequestToQueue({"key" : "demoPost", "value": {"requestInfo" : demoRequest, "requestInit": demoPostInit}});
            });
        });
    }


    /**
     * HTTP requests store offline before returning,
     * Errors should return a reference to the HTTP request for re-attempts. 
     * @returns {Promise<any>} 
     * @memberof GitHubService
     */
    public getDemoXHR(demoRequest: RequestInfo, demoRequestInit: RequestInit): Promise<any> {

        return new Promise<any>( (resolve: any, reject: any) => {
            fetch(demoRequest, demoRequestInit)
            .then((response: Response) => {
                if(response.ok){
                    return response.json();
                } else {
                    this.addRequestToQueue({"key": "demoRequestKey", "value": {"requestInfo" : demoRequest, "requestInit": demoRequestInit}});
                    reject({"key": "demoRequestKey", "value": {"requestInfo" : demoRequest, "requestInit": demoRequestInit}});
                }
            })
            .then( (json: any) => {
                this.setDemoLocal("demoRequestKey", json)
                .then(() => {
                    console.log("Stored Demo JSON Offline.");
                })
                .catch(() => {
                    console.log("Failed to store Demo JSON Offline");
                });
                resolve(json);
            })
            .catch((error: Error|any) => {
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
    public getDemoLocal(itemKey: string): Promise<any> {
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
    public setDemoLocal(itemKey: string, itemToStoreOffline: any): Promise<any> {
        return new Promise<any>( (resolve: any, reject: any) => {
            this._LiveLocalForage.ready()
            .then(() => {
                return this._LiveLocalForage.setItem(itemKey, itemToStoreOffline);
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
            return this._QueueLocalForage.iterate((value: {requestInfo: RequestInfo, requestInit: RequestInit}, key: string, iterationNumber: number) => {
                if (value.requestInit === null || value.requestInit.method === "GET") {
                    this.syncGetsFromServer(value, key);
                } else {
                    this.syncPostsToServer(value, key);
                }
            });
        })
        .then(() => {
            console.log("Successfully synced with server");
        })
        .catch(() => {
            console.log("Did not sync with server, will retry when online.");
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
    private syncPostsToServer(value: { requestInfo: RequestInfo; requestInit: RequestInit; }, key: string): void {
        this.postDemoXHR(value.requestInfo, value.requestInit)
            .then((response: Response) => {
                if (response.ok) {
                    return response.json();
                }
                return;
            })
            .then(() => {
                return this._QueueLocalForage.removeItem(key);
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
    private syncGetsFromServer(value: { requestInfo: RequestInfo; requestInit: RequestInit; }, key: string): void {
        this.getDemoXHR(value.requestInfo, value.requestInit)
        .then((response: Response) => {
            if (response.ok) {
                return response.json();
            }
            return;
        })
        .then((json: any) => {
            return this._LiveLocalForage.setItem(key, json);
        })
        .then(() => {
            return this._QueueLocalForage.removeItem(key);
        })
        .catch((error: Error | any) => {
            console.log("Failed to sync " + value);
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
    private addRequestToQueue(failedRequest: any): void {
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