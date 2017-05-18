export interface IWebAPIServce {
  getItem(): ng.IPromise<Object>;
  getMe(): ng.IPromise<Object>;
}

export class WebAPIService implements IWebAPIServce {
  public static $inject: string[] = ['$q', '$http', '$log'];

  constructor(private $q: ng.IQService, private $http: ng.IHttpService, private $log: ng.ILogService){
  }

  public getItem(): ng.IPromise<Object> {
    return this.$http.get('https://pnpwebappsecure.azurewebsites.net/api/item');
  }

  public getMe(): ng.IPromise<Object> {
    return this.$http.get('https://graph.microsoft.com/v1.0/me');
  }
}