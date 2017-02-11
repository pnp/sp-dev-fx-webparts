import { ISiteCollections } from './../models/ISiteCollections';
import { IListCollection } from './../models/IListCollection';
import { IGenericAnnouncementItem } from './../models/IGenericAnnouncementItem';
import { IAnnouncements } from './../models/IAnnouncements';
import { IGenericCreateItem } from './../models/IGenericCreateItem';

export interface IGraphHelper {
  login(): void;
  logout(): void;
  me(): ng.IPromise<Object>;
  getSites(): ng.IPromise<Array<ISiteCollections>>;
  getLists(siteId: string): ng.IPromise<Array<IListCollection>>;
  getListItems(siteId: string, listId: string): ng.IPromise<Array<IAnnouncements>>;
  createItem(siteId: string, listId: string): ng.IPromise<IGenericCreateItem>;
  updateItem(siteId: string, listId: string, item: IGenericCreateItem, title: string): ng.IPromise<Object>;
  deleteItem(siteId: string, listId: string, item: IGenericCreateItem): ng.IPromise<Object>;
}

export default class GraphHelper implements IGraphHelper {
  public static $inject: string[] = ['$q', '$http', '$log'];
  public hello: any = require('hellojs');

  constructor(private $q: ng.IQService, private $http: ng.IHttpService, private $log: ng.ILogService) {
    this.hello.init({
      aad: '119906a0-9ad3-45d9-90c4-4263450f7ca3'
    }, {
        redirect_uri: 'https://localhost:4321/temp/workbench.html',
        scope: 'user.read sites.read.all sites.readwrite.all'
      });
  }

  public login(): void {
    this.hello('aad').login({
      display: 'page',
      response_type: 'token'
    });
  }

  public logout(): void {
    this.hello('aad').logout();
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  }

  public me(): ng.IPromise<Object> {
    return this.$http.get('https://graph.microsoft.com/v1.0/me');
  }

  public getSites(): ng.IPromise<Array<ISiteCollections>> {
    const deferred: ng.IDeferred<Array<ISiteCollections>> = this.$q.defer();

    this.$http.get('https://graph.microsoft.com/beta/sharePoint/sites')
      .then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        if (response != null && response.data != null) {
          const result: Array<ISiteCollections> = response.data.value;
          deferred.resolve(result);
        }
        else {
          deferred.reject("problem getting Root Site Collection");
        }
      }, (error: any): void => {
        this.$log.error(error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public getLists(siteId: string): ng.IPromise<Array<IListCollection>> {
    const deferred: ng.IDeferred<Array<IListCollection>> = this.$q.defer();

    this.$http.get(`https://graph.microsoft.com/beta/sharePoint/sites/${siteId}/lists?filter=list/hidden eq false`)
      .then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        if (response != null && response.data != null) {
          const result: Array<IListCollection> = response.data.value;
          deferred.resolve(result);
        }
        else {
          deferred.reject("problem getting site lists");
        }
      }, (error: any): void => {
        this.$log.error(error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public getListItems(siteId: string, listId: string): ng.IPromise<Array<IAnnouncements>> {
    const deferred: ng.IDeferred<Array<IAnnouncements>> = this.$q.defer();

    this.$http.get(`https://graph.microsoft.com/beta/sharePoint/sites/${siteId}/lists/${listId}/items?expand=columnSet`)
      .then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        if (response != null && response.data != null) {
          const result: Array<IGenericAnnouncementItem> = response.data.value;
          let itemCollection: Array<IAnnouncements> = new Array<IAnnouncements>();

          result.forEach((item: IGenericAnnouncementItem) => {
            itemCollection.push(item.columnSet);
          });
          deferred.resolve(itemCollection);
        }
        else {
          deferred.reject("problem getting list items");
        }
      }, (error: any): void => {
        this.$log.error(error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public createItem(siteId: string, listId: string): ng.IPromise<IGenericCreateItem> {
    const deferred: ng.IDeferred<IGenericCreateItem> = this.$q.defer();
    const config: ng.IRequestShortcutConfig = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    this.$http.post(
      `https://graph.microsoft.com/beta/sharePoint/sites/${siteId}/lists/${listId}/items`, '{}', config)
      .then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        if (response != null && response.data != null) {
          const result: IGenericCreateItem = response.data;
          this.$log.debug(result);
          deferred.resolve(result);
        }
        else {
          deferred.reject("problem creating the item");
        }
      }, (error: any): void => {
        this.$log.error(error);
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public updateItem(siteId: string, listId: string, item: IGenericCreateItem, title:string): ng.IPromise<Object> {
    const deferred: ng.IDeferred<Object> = this.$q.defer();
    const config: ng.IRequestShortcutConfig = {
      headers: {
        "Content-Type": "application/json",
        "if-match": item.eTag
      }
    };
    const data: IAnnouncements = {
      id: item.listItemId,
      Title: title
    };

    this.$http.patch(
     `https://graph.microsoft.com/beta/sharePoint/sites/${siteId}/lists/${listId}/items/${item.id}/columnSet`,
     data, config).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
       if (response != null && response.status == 200) {
         deferred.resolve("OK");
       }
     }, (error: any): void => {
       this.$log.error(error);
       deferred.reject(error);
     });

     return deferred.promise;
  }

  public deleteItem(siteId: string, listId: string, item: IGenericCreateItem): ng.IPromise<Object> {
    const deferred: ng.IDeferred<Object> = this.$q.defer();
    const config: ng.IRequestShortcutConfig = {
      headers: {
        "Content-Type": "application/json",
        "if-match": item.eTag
      }
    };

    this.$http.delete(
      `https://graph.microsoft.com/beta/sharePoint/sites/${siteId}/lists/${listId}/items/${item.id}`,
      config).then((response: ng.IHttpPromiseCallbackArg<any>): void => {
        if (response != null && response.status == 204){
          deferred.resolve("OK");
        }
      }, (error: any): void => {
        this.$log.error(error);
        deferred.reject(error);
      });

      return deferred.promise;
  }
}