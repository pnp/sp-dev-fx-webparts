import * as angular from 'angular';

export interface IVoteOption {
  id: number;
  label: string;
}

export interface IVoteResult extends IVoteOption {
  numVotes: number;
}

interface IVoteOptionItem {
  Id: number;
  Title: string;
  NumVotes?: number;
}

export interface IPollService {
  getVoteOptions: (listName: string, sharePointApiUrl: string) => angular.IPromise<IVoteOption[]>;
  vote: (voteOptionId: number, listName: string, sharePointApiUrl: string) => angular.IPromise<void>;
  getResults: (listName: string, sharePointApiUrl: string) => angular.IPromise<IVoteResult[]>;
}

export class PollService implements IPollService {
  public static $inject: string[] = ['$http', '$q'];

  constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
  }

  public getVoteOptions(listName: string, sharePointApiUrl: string): angular.IPromise<IVoteOption[]> {
    const deferred: angular.IDeferred<IVoteOption[]> = this.$q.defer<IVoteOption[]>();

    this.$http({
      method: 'GET',
      url: sharePointApiUrl + `/web/lists/getByTitle('${listName}')/items?$select=Id,Title`,
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((result: angular.IHttpPromiseCallbackArg<{ value: IVoteOptionItem[] }>): void => {
        const voteOptions: IVoteOption[] = [];
        for (let i: number = 0; i < result.data.value.length; i++) {
          const item: IVoteOptionItem = result.data.value[i];
          voteOptions.push({
            id: item.Id,
            label: item.Title
          });
        }
        deferred.resolve(voteOptions);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public vote(voteOptionId: number, listName: string, sharePointApiUrl: string): angular.IPromise<void> {
    const deferred: angular.IDeferred<void> = this.$q.defer<void>();

    let requestDigest: string = undefined;
    let listItemEntityTypeName: string = undefined;

    this.getRequestDigest(sharePointApiUrl)
      .then((digest: string): angular.IPromise<string> => {
        requestDigest = digest;

        return this.getListItemEntityTypeName(listName, sharePointApiUrl);
      })
      .then((itemEntityTypeName: string): angular.IPromise<IVoteOptionItem> => {
        listItemEntityTypeName = itemEntityTypeName;

        return this.$http({
          method: 'GET',
          url: sharePointApiUrl + `/web/lists/getByTitle('${listName}')/items('${voteOptionId}')?$select=NumVotes`,
          headers: {
            'Accept': 'application/json;odata=nometadata'
          }
        });
      })
      .then((result: angular.IHttpPromiseCallbackArg<IVoteOptionItem>): angular.IPromise<{}> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'NumVotes': result.data.NumVotes && !isNaN(result.data.NumVotes) ? result.data.NumVotes+1 : 1
        });

        return this.$http({
          url: `${sharePointApiUrl}/web/lists/getByTitle('${listName}')/items(${voteOptionId})`,
          method: 'POST',
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'X-RequestDigest': requestDigest,
            'IF-MATCH': result.headers('ETag'),
            'X-HTTP-Method': 'MERGE'
          },
          data: body
        });
      })
      .then((): void => {
        deferred.resolve();
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  public getResults(listName: string, sharePointApiUrl: string): angular.IPromise<IVoteResult[]> {
    const deferred: angular.IDeferred<IVoteResult[]> = this.$q.defer<IVoteResult[]>();

    this.$http({
      method: 'GET',
      url: sharePointApiUrl + `/web/lists/getByTitle('${listName}')/items?$select=Id,Title,NumVotes`,
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((result: angular.IHttpPromiseCallbackArg<{ value: IVoteOptionItem[] }>): void => {
        const voteResults: IVoteResult[] = [];
        for (let i: number = 0; i < result.data.value.length; i++) {
          const item: IVoteOptionItem = result.data.value[i];
          voteResults.push({
            id: item.Id,
            label: item.Title,
            numVotes: item.NumVotes || 0
          });
        }
        deferred.resolve(voteResults);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  private getRequestDigest(sharePointApiUrl: string): angular.IPromise<string> {
    const deferred: angular.IDeferred<string> = this.$q.defer<string>();

    this.$http({
      method: 'POST',
      url: sharePointApiUrl + '/contextinfo',
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((result: angular.IHttpPromiseCallbackArg<{ FormDigestValue: string }>): void => {
        deferred.resolve(result.data.FormDigestValue);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }

  private getListItemEntityTypeName(listName: string, sharePointApiUrl: string): angular.IPromise<string> {
    const deferred: angular.IDeferred<string> = this.$q.defer();

    this.$http({
      url: `${sharePointApiUrl}/web/lists/getByTitle('${listName}')?$select=ListItemEntityTypeFullName`,
      method: 'GET',
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((result: angular.IHttpPromiseCallbackArg<{ ListItemEntityTypeFullName: string }>): void => {
        deferred.resolve(result.data.ListItemEntityTypeFullName);
      }, (error: any): void => {
        deferred.reject(error);
      });

    return deferred.promise;
  }
}