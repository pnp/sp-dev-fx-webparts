import { ISearchResults } from './../models/ISearchResults';

export interface IDataService {
  getSearchResults(webUrl: string, contentType: string): ng.IPromise<ISearchResults>;
}

export default class DataService implements IDataService {
  public static $inject: string[] = ['$q', '$http'];

  constructor(private $q: ng.IQService, private $http: ng.IHttpService) { }

  public getSearchResults(webUrl: string, contentType: string): ng.IPromise<ISearchResults> {
    const deferred: ng.IDeferred<ISearchResults> = this.$q.defer();

    this.$http({
          url: `${webUrl}/_api/search/query?queryText='ContentType:"${contentType}"
            Path:${webUrl}'&selectproperties='Title,Author,HitHighlightedSummary,PublishingImage,Url'`,
          method: 'GET',
          headers: {
            'Accept': 'application/json;odata=verbose'
          }
        }).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
          if (response != null && response.data != null) {
            const result: ISearchResults = response.data.d.query;
          if (typeof result.PrimaryQueryResult !== 'undefined' &&
            typeof result.PrimaryQueryResult.RelevantResults !== 'undefined' &&
            typeof result.PrimaryQueryResult.RelevantResults.Table !== 'undefined' &&
            typeof result.PrimaryQueryResult.RelevantResults.Table.Rows !== 'undefined') {
              deferred.resolve(result);
            }
            else {
              deferred.reject("problem getting search results");
            }
          }
          else {
            deferred.reject("problem getting search results");
          }
        }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  private getRequestDigest(webUrl: string): ng.IPromise<string> {
    const deferred: ng.IDeferred<string> = this.$q.defer();

    this.$http({
      url: webUrl + '/_api/contextinfo',
      method: 'POST',
      headers: {
        'Accept': 'application/json;odata=nometedata'
      }
    })
      .then((digestResult: ng.IHttpPromiseCallbackArg<{ FormDigestValue: string }>): void => {
        deferred.resolve(digestResult.data.FormDigestValue);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }
}