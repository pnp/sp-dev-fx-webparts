import { IError } from "../../interfaces/IError";
import * as angular from 'angular';


export class BaseService {
  public static $inject: string[] = ["$http", "$q"];
  public baseUrl: string;

  constructor(private $http: ng.IHttpService, private $q: ng.IQService) {

      this.baseUrl = (<any>window)._spPageContextInfo.webAbsoluteUrl;

  }

  public getRequest(query?: string, endPoint?: string): ng.IPromise<any> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.$http({
      url: endPoint || this.baseUrl + query,
      method: "GET",
      headers: {
        "accept": "application/json;odata=verbose",
        "content-Type": "application/json;odata=verbose"
      }
    }).then((response: any): void => {
      if (response.data.d.results) {
        deferred.resolve(response.data.d.results);
      } else {
        deferred.resolve(response.data.d);
      }
    }, (error: any) => {
      const iError: IError = {
        code: error.data.error.code,
        message: error.data.error.message.value,
        status: error.status,
        statusText: error.statusText
      };
      deferred.reject(iError);
    });
    return deferred.promise;
  }

  public postRequest(url: string, requestBody: any, endPoint?: string): ng.IPromise<any> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: endPoint || this.baseUrl + url,
          method: "POST",
          headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
            "content-Type": "application/json;odata=verbose"
          },
          data: JSON.stringify(requestBody)
        });
      }).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        deferred.resolve(response.data);
      }, (error: any): void => {
        const iError: IError = {
          code: error.data.error.code,
          message: error.data.error.message.value,
          status: error.status,
          statusText: error.statusText
        };
        deferred.reject(iError);
      });
    return deferred.promise;
  }

  public updateRequest(url: string, requestBody: any, eTag: string, endPoint?: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: endPoint || this.baseUrl + url,
          method: "POST",
          headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
            "content-Type": "application/json;odata=verbose",
            'IF-MATCH': eTag,
            'X-HTTP-Method': 'MERGE'
          },
          data: JSON.stringify(requestBody)
        });
      }).then((response: {}): void => {
        deferred.resolve();
      }, (error: any): void => {
        const iError: IError = {
          code: error.data.error.code,
          message: error.data.error.message.value,
          status: error.status,
          statusText: error.statusText
        };
        deferred.reject(iError);
      });
    return deferred.promise;
  }

  public deleteRequest(url: string, eTag: string, endPoint?: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: endPoint || this.baseUrl + url,
          method: "POST",
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': eTag,
            'X-HTTP-Method': 'DELETE'
          }
        });
      }).then((response: {}): void => {
        deferred.resolve();
      }, (error: any): void => {
        const iError: IError = {
          code: error.data.error.code,
          message: error.data.error.message.value,
          status: error.status,
          statusText: error.statusText
        };
        deferred.reject(iError);
      });
    return deferred.promise;
  }

  public fileUploadRequest(url: string, file: ArrayBuffer, endPoint?: string): ng.IPromise<any> {
    const deferred: ng.IDeferred<any> = this.$q.defer();
    this.getFormDigestValue(this.baseUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<any>> => {
        return this.$http({
          url: endPoint || this.baseUrl + url,
          method: "POST",
          transformRequest: angular.identity,
          headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": requestDigest,
            "content-Type": undefined
          },
          data: ArrayBuffer
        });
      }).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        deferred.resolve(response.data);
      }, (error: any): void => {
        const iError: IError = {
          code: error.data.error.code,
          message: error.data.error.message.value,
          status: error.status,
          statusText: error.statusText
        };
        deferred.reject(iError);
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
        const iError: IError = {
          code: error.data.error.code,
          message: error.data.error.message.value,
          status: error.status,
          statusText: error.statusText
        };
        deferred.reject(iError);
      });

    return deferred.promise;
  }
}
