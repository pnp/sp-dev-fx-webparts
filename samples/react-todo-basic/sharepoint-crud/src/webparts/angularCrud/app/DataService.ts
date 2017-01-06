export interface IListItem {
  Id: number;
  Title?: string;
  ETag?: string;
}

export interface IDataService {
  createItem(title: string, webUrl: string, listName: string): ng.IPromise<IListItem>;
  readItem(itemId: number, webUrl: string, listName: string): ng.IPromise<IListItem>;
  getLatestItemId(webUrl: string, listName: string): ng.IPromise<number>;
  readItems(webUrl: string, listName: string): ng.IPromise<IListItem[]>;
  updateItem(item: IListItem, webUrl: string, listName: string): ng.IPromise<{}>;
  deleteItem(item: IListItem, webUrl: string, listName: string): ng.IPromise<{}>;
}

export default class DataService implements IDataService {
  public static $inject: string[] = ['$q', '$http'];

  constructor(private $q: ng.IQService, private $http: ng.IHttpService) {
  }

  public createItem(title: string, webUrl: string, listName: string): ng.IPromise<IListItem> {
    const deferred: ng.IDeferred<IListItem> = this.$q.defer();

    let listItemEntityTypeName: string = undefined;
    this.getListItemEntityTypeName(webUrl, listName)
      .then((typeName: string): ng.IPromise<ng.IHttpPromiseCallbackArg<string>> => {
        listItemEntityTypeName = typeName;
        return this.getRequestDigest(webUrl);
      })
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<IListItem>> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': title
        });
        return this.$http({
          url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'X-RequestDigest': requestDigest
          },
          data: body
        });
      })
      .then((response: ng.IHttpPromiseCallbackArg<IListItem>): void => {
        deferred.resolve(response.data);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public readItem(itemId: number, webUrl: string, listName: string): ng.IPromise<IListItem> {
    const deferred: ng.IDeferred<IListItem> = this.$q.defer();

    this.$http({
      url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${itemId})`,
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((response: ng.IHttpPromiseCallbackArg<IListItem>): void => {
        const item: IListItem = response.data;
        item.ETag = response.headers('ETag');
        deferred.resolve(item);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public getLatestItemId(webUrl: string, listName: string): ng.IPromise<number> {
    const deferred: ng.IDeferred<number> = this.$q.defer();

    this.$http({
      url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items?$orderby=Id desc&$top=1&$select=Id`,
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    }).then((result: ng.IHttpPromiseCallbackArg<{ value: { Id: number }[] }>): void => {
      if (result.data.value.length === 0) {
        deferred.resolve(-1);
      }
      else {
        deferred.resolve(result.data.value[0].Id);
      }
    }, (error: any): void => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  public readItems(webUrl: string, listName: string): ng.IPromise<IListItem[]> {
    const deferred: ng.IDeferred<IListItem[]> = this.$q.defer();

    this.$http({
      url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items`,
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    }).then((result: ng.IHttpPromiseCallbackArg<{ value: IListItem[] }>): void => {
      deferred.resolve(result.data.value);
    }, (error: any): void => {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  public updateItem(item: IListItem, webUrl: string, listName: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<{}> = this.$q.defer();

    let listItemEntityTypeName: string = undefined;
    this.getListItemEntityTypeName(webUrl, listName)
      .then((typeName: string): ng.IPromise<ng.IHttpPromiseCallbackArg<string>> => {
        listItemEntityTypeName = typeName;
        return this.getRequestDigest(webUrl);
      })
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': item.Title
        });
        return this.$http({
          url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${item.Id})`,
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': item.ETag,
            'X-HTTP-Method': 'MERGE'
          },
          data: body
        });
      })
      .then((result: {}): void => {
        deferred.resolve();
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public deleteItem(item: IListItem, webUrl: string, listName: string): ng.IPromise<{}> {
    const deferred: ng.IDeferred<{}> = this.$q.defer();

    this.getRequestDigest(webUrl)
      .then((requestDigest: string): ng.IPromise<ng.IHttpPromiseCallbackArg<{}>> => {
        return this.$http({
          url: `${webUrl}/_api/web/lists/getbytitle('${listName}')/items(${item.Id})`,
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': item.ETag,
            'X-HTTP-Method': 'DELETE'
          }
        });
      })
      .then((result: {}): void => {
        deferred.resolve();
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

  private getListItemEntityTypeName(webUrl: string, listName: string): ng.IPromise<string> {
    const deferred: ng.IDeferred<string> = this.$q.defer();

    this.$http({
      url: `${webUrl}/_api/web/lists/getbytitle('${listName}')?$select=ListItemEntityTypeFullName`,
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((result: ng.IHttpPromiseCallbackArg<{ ListItemEntityTypeFullName: string }>): void => {
        deferred.resolve(result.data.ListItemEntityTypeFullName);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }
}