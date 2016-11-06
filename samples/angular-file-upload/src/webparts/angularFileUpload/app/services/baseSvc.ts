import { PageContext, ServiceScope } from "@microsoft/sp-client-base";

export class BaseService {
  public static $inject: string[] = ["$http", "$q"];
  public baseUrl: string;

  constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
    this.baseUrl = (<any>window)._spPageContextInfo.webAbsoluteUrl;
  }

  public getRequest(query?: string, endPoint?: string): ng.IPromise<any> {
    var deferred = this.$q.defer();
    this.$http({
      url: endPoint || this.baseUrl + query,
      method: "GET"
    }).success(function (response: any) {
      if (response.value) {
        deferred.resolve(response.value);
      }else{
        deferred.resolve(response);
      }
    }).error(function (response, status) {
      deferred.reject({ error: response, status: status });
    });
    return deferred.promise;
  }

  public postRequest(url: string, requestBody: any): ng.IPromise<any> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: this.baseUrl + url,
          method: "POST",
          headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
            "content-Type": "application/json;odata=verbose"
          },
          data: JSON.stringify(requestBody)
        })
      }).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        deferred.resolve(response.data)
      }, (error: any): void => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  public updateRequest(url: string, requestBody: any, eTag: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: this.baseUrl + url,
          method: "POST",
          headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
            "content-Type": "application/json;odata=verbose",
            'IF-MATCH': eTag,
            'X-HTTP-Method': 'MERGE'
          },
          data: JSON.stringify(requestBody)
        })
      }).then((response: {}): void => {
        deferred.resolve();
      }, (error: any): void => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  public deleteRequest(url: string, eTag: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: this.baseUrl + url,
          method: "POST",
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': eTag,
            'X-HTTP-Method': 'DELETE'
          }
        })
      }).then((response: {}): void => {
        deferred.resolve();
      }, (error: any): void => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  public fileUploadRequest(url: string, file: ArrayBuffer): ng.IPromise<any> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: this.baseUrl + url,
          method: "POST",
          transformRequest: angular.identity,
          headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
            "content-Type": undefined
          },
          data: ArrayBuffer
        })
      }).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        deferred.resolve(response.data)
      }, (error: any): void => {
        deferred.reject(error);
      });
    return deferred.promise;
  }

  private getFormDigestValue(webUrl: string): ng.IPromise<string> {
    const deferred: ng.IDeferred<string> = this.$q.defer();

    this.$http({
      url: webUrl + '/_api/contextinfo',
      method: 'POST',
      headers: {
        'Accept': 'application/json;odata=nometadata'
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