/* based on MSGraph class by Mikael Svenson:
https://www.techmikael.com/2018/09/example-of-wrapper-to-ease-usage-of.html
*/

import { WebPartContext } from                             '@microsoft/sp-webpart-base';
import {
  HttpClient,
  HttpClientResponse,
  IHttpClientOptions
} from                                                     '@microsoft/sp-http';

export class RssHttpClientService {

  private static _httpClient: HttpClient;

  /*
  initialize the static class
  */
  public static async init(context: WebPartContext) {

    //obtain the httpClient from the webpart context
    this._httpClient = await context.httpClient;

  }

  /*
  given a url, make a get request to a given url, expecting json in response
  Will assume response is only text and will be returned as such
  */

  public static async getRssJson(url: string, corsProxyUrl: string, disableCors: boolean): Promise<any> {

    var p = new Promise<string>(async (resolve, reject) => {

      let requestHeaders = new Headers();

      //if Cors is disabled, then we must send a simple Accept type
      if (!disableCors) {
        requestHeaders.append('Accept', 'application/json');
      }
      else {
        requestHeaders.append('Accept', 'text/plain');
      }

      //set up get options
      const requestGetOptions: IHttpClientOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: !disableCors ? "cors" : "no-cors"
      };

      let query = this._httpClient.fetch(
        corsProxyUrl ? RssHttpClientService.processCorsProxyUrl(url, corsProxyUrl) : url,
        HttpClient.configurations.v1,
        requestGetOptions)
          .then((response: HttpClientResponse) : Promise<any> => {

            //get the response based on expected type
            if (!disableCors) {
              return response.json();
            }
            else {
              return response.text();
            }

          })
          .then((data: any) : void => {

            if (!disableCors) {

              resolve(data);

            }
            else {

              //expected response is actually json, thus attempt to parse response into json
              resolve(JSON.parse(data));

            }
          })
          .catch(error => {
            console.error(error);
            reject(error);
          });
    });

    return p;
  }

  /*
  given a url, make a get request to a given url
  Will assume response is only text and will be returned as such
  */
  public static async getRssXml(url: string, corsProxyUrl: string, disableCors: boolean): Promise<any> {

    var p = new Promise<string>(async (resolve, reject) => {

      let requestHeaders = new Headers();
      requestHeaders.append('Accept', 'text/xml; application/xml');

      //set up get options
      const requestGetOptions: IHttpClientOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: !disableCors ? "cors" : "no-cors"
      };

      let query = this._httpClient.fetch(
        corsProxyUrl ? RssHttpClientService.processCorsProxyUrl(url, corsProxyUrl) : url,
        HttpClient.configurations.v1,
        requestGetOptions)
          .then((response: HttpClientResponse) : Promise<any> => {

            return response.text();

          })
          .then((data: any) : void => {

            resolve(data);

          })
          .catch(error => {
            reject(error);
          });
    });
    return p;
  }

  /*
  given a feed url and the proxy url, replace proxy url token(s)
  {0} will be replaced with url
  */
  private static processCorsProxyUrl(url: string, corsProxyUrl: string) : string {
    if (!url || !corsProxyUrl) {
      return "";
    }

    //replace {0} with the feed Url
    return corsProxyUrl.replace(/\{0\}/ig, url);
  }
}
