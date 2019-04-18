import * as strings from                                   'RssReaderWebPartStrings';

import {
  IRssHttpClientComponentService,
  RssHttpClientDirectService,
  RssHttpClientFeed2JsonService,
  RssHttpClientRss2JsonService } from                                          '../RssHttpClientService';
import { IRssReaderResponse, IRssReaderRequest, FeedServiceOption } from       '../../models';
import {
  ILocalStorageKey,
  ILocalStorageService,
  LocalStorageService} from                                                    '../../services/LocalStorageService';

export interface IRssReaderService {
	getFeed(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse>;
}

export class RssReaderService implements IRssReaderService {
  private static storageKeyPrefix: string = 'rssFeed';

	constructor() {
  }

  /*
  given a feedRequest, determine the specific local storage keyname
  */
  public static getFeedStorageKeyName(feedRequest: IRssReaderRequest) : string {
    const keyName:string = feedRequest.url + "_" + feedRequest.maxCount;

    return keyName;
  }

  /*
  given a feedRequest, determine the specific local storage key prefix to be added to the keyname hash
  */
  public static getFeedStorageKeyPrefix(feedRequest: IRssReaderRequest) : string {
    const keyPrefix:string = ((feedRequest.useLocalStorageKeyPrefix && feedRequest.useLocalStorageKeyPrefix.length > 0) ? feedRequest.useLocalStorageKeyPrefix + "_" : "") + RssReaderService.storageKeyPrefix;

    return keyPrefix;
  }

  /*
  given a feedRequest, go and get the particular feed
  return a resolved IRssReaderResponse or reject message
  */
  public async getFeed(feedRequest: IRssReaderRequest): Promise<IRssReaderResponse> {
    var p = new Promise<IRssReaderResponse>(async (resolve, reject) => {

      let localStorageService: ILocalStorageService = new LocalStorageService();

      //attempt to get local storage if needed
      if (feedRequest.useLocalStorage && feedRequest.useLocalStorageTimeout >= 0) {

        //set up the local storage key to search in local storage for valid stored results
        let localStorageKey:ILocalStorageKey = {
          keyName: RssReaderService.getFeedStorageKeyName(feedRequest),
          keyPrefix: RssReaderService.getFeedStorageKeyPrefix(feedRequest),
          timeOutInMinutes: feedRequest.useLocalStorageTimeout
        } as ILocalStorageKey;

        try {

          //try and get cached results from local storage
          let cachedResults: IRssReaderResponse = await localStorageService.get(localStorageKey);

          if (cachedResults) {

            //appear to have valid cached results, resolve these
            try {

              resolve(cachedResults);
              return;

            }
            catch (err) {
              //we are going to ignore error as we will simply pull feed again
              console.log("rssReaderService: an error occurred attempting to convert cached results");
              console.log(err);
            }
          }
        }
        catch (err) {
          //we are going to ignore error as we will simply pull feed again
          console.log("rssReaderService: an error occurred attempting to retrieve cached results");
          console.log(err);
        }
      }


      //if we are here, we need to retrieve from feed service
      let response: IRssReaderResponse = null;

      try {
        //set up the base rssHttpClient object
        var rssHttpClient: IRssHttpClientComponentService;

        //set up the http client service for each particular feed service
        if (feedRequest.feedService == FeedServiceOption.Default) {
          rssHttpClient = new RssHttpClientDirectService();
        }
        else if (feedRequest.feedService == FeedServiceOption.Feed2Json) {
          rssHttpClient = new RssHttpClientFeed2JsonService();
        }
        else if (feedRequest.feedService == FeedServiceOption.Rss2Json) {
          rssHttpClient = new RssHttpClientRss2JsonService();
        }

        //if we have a valid feed service, and initialized the proper service, attempt to get the feed
        if (rssHttpClient) {

          response = await rssHttpClient.get(feedRequest);

        }

      }
      catch (err) {
        console.log("rssReaderService: error retrieving feed from service " + feedRequest.feedService);
        console.log(err);

        reject(err);
        return;
      }

      //if we have a valid response, we can attempt to set to local storage as well as return
      if (response) {

        if (feedRequest.useLocalStorage && feedRequest.useLocalStorageTimeout >= 0) {

          let localStorageKeyValue: ILocalStorageKey = {
            keyName: RssReaderService.getFeedStorageKeyName(feedRequest),
            keyPrefix: RssReaderService.getFeedStorageKeyPrefix(feedRequest),
            keyValue: response
          } as ILocalStorageKey;

          let storedResult: any = await localStorageService.set(localStorageKeyValue);

        }

        resolve(response);
      }
      else {
        console.log("rssReaderService getFeed: Feed returned no results");
        reject(strings.ErrorNoResults);
      }
    });

    return p;
  }
}
