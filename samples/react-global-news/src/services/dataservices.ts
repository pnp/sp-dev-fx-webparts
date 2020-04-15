import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  HttpClient,
  HttpClientResponse,
  IHttpClientOptions
} from "@microsoft/sp-http";
import { INewsResults } from "./INewsResults";
import { ISourcesResults } from "./ISourcesResults";

export default class dataservices {
  private static _httpClient: HttpClient;

  /*
  initialize the static class
  */
  public static async init(context: WebPartContext) {
    //obtain the httpClient from the webpart context
    this._httpClient = context.httpClient;
  }


  // Get Sources
  public static async getSources(apiKey:string):Promise<ISourcesResults>{

    let requestHeaders = new Headers();
    let sourceUrl = `https://newsapi.org/v2/sources`;
    let _corsUrl = `https://cors-anywhere.herokuapp.com/${sourceUrl}`;

    if (!sourceUrl || !apiKey) return;
    try {
      let _url = new URL(sourceUrl);
      let _count = 0;
      _url.searchParams.forEach((v,k,p) =>{
        _count ++;
      });
      if (_count !== 0 ) { // test if has parameters
        _corsUrl = _corsUrl + `&apiKey=${apiKey}`; // has parameters addpikey to last one
      } else {
        _corsUrl = _corsUrl.replace('?','') + `?apiKey=${apiKey}`; // add parameter apikey
      }

    } catch (error) {
      return; // not valid Url
    }

    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("content-type", "application/json");

    try {
      //set up get options
      const requestGetOptions: IHttpClientOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: "cors"
      };

      let query: HttpClientResponse = await this._httpClient.fetch(
        _corsUrl,
        HttpClient.configurations.v1,
        requestGetOptions
      );

     return await query.json();

    } catch (error) {
      console.log(error);
      throw new Error('Is not possible to read news at this moment, please try later.');
    }
  }


  // Get News
  public static async getNews(
    newsUrl: string,
    apiKey: string,
    page?:number,

  ): Promise<INewsResults> {
    let requestHeaders = new Headers();
    const defaultPageSize = 12;
    let _page:number =  page ? page : 1;
    let _corsUrl = `https://cors-anywhere.herokuapp.com/${newsUrl}&page=${_page}`;
    if (!newsUrl || !apiKey) return;
    try {
      let _url = new URL(newsUrl);
      let _count = 0;
      _url.searchParams.forEach((v,k,p) =>{
        _count ++;
      });
      if (_count !== 0 ) { // test if has parameters
        _corsUrl = _corsUrl + `&apiKey=${apiKey}`; // has parameters addpikey to last one
      } else {
        _corsUrl = _corsUrl.replace('?','') + `?apiKey=${apiKey}`; // add parameter apikey
      }
        // teste if has pagesize parameter must be equal to default parameter value of web part
        if ( !_url.searchParams.has('pagesize')){
          _corsUrl = _corsUrl + `&pageSize=${defaultPageSize}`; //
        }
    } catch (error) {
      return; // not valid Url
    }

    requestHeaders.append("Accept", "application/json");
    requestHeaders.append("content-type", "application/json");

    try {
      //set up get options
      const requestGetOptions: IHttpClientOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: "cors"
      };

      let query: HttpClientResponse = await this._httpClient.fetch(
        _corsUrl,
        HttpClient.configurations.v1,
        requestGetOptions
      );

     return await query.json();

    } catch (error) {
      console.log(error);
      throw new Error('Is not possible to read news at this moment, please try later.');
    }
  }
}
