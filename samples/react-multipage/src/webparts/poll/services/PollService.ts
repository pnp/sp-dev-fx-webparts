import { IPollService, IVoteOption, IVoteResult, IVoteOptionItem } from '../services';
import { HttpClient } from '@microsoft/sp-client-base';

export class PollService implements IPollService {

  constructor(private httpClient: HttpClient, private serverRelativeSiteUrl: string) {
  }

  public getVoteOptions(listName: string): Promise<IVoteOption[]> {
    return new Promise<IVoteOption[]>((resolve: (voteOptions: IVoteOption[]) => void, reject: (error: any) => void): void => {
      this.httpClient.get(this.serverRelativeSiteUrl + `/_api/web/lists/getByTitle('${listName}')/items?$select=Id,Title`, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: Response): Promise<{ value: IVoteOptionItem[] }> => {
          return response.json();
        })
        .then((voteOptionItems: { value: IVoteOptionItem[] }): void => {
          const voteOptions: IVoteOption[] = [];
          for (let i: number = 0; i < voteOptionItems.value.length; i++) {
            voteOptions.push({
              id: voteOptionItems.value[i].Id,
              label: voteOptionItems.value[i].Title
            });
          }
          resolve(voteOptions);
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  public vote(voteOptionId: number, listName: string): Promise<{}> {
    return new Promise<{}>((resolve: () => void, reject: (error: any) => void): void => {
      let listItemEntityTypeName: string = undefined;
      let etag: string = undefined;

      this.getListItemEntityTypeName(listName)
        .then((itemEntityTypeName: string): Promise<Response> => {
          listItemEntityTypeName = itemEntityTypeName;

          return this.httpClient.get(this.serverRelativeSiteUrl + `/_api/web/lists/getByTitle('${listName}')/items('${voteOptionId}')?$select=Id,NumVotes`, {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'odata-version': ''
            }
          });
        })
        .then((response: Response): Promise<IVoteOptionItem> => {
          etag = response.headers.get('ETag');
          return response.json();
        })
        .then((voteOptionItem: IVoteOptionItem): Promise<Response> => {
          const body: string = JSON.stringify({
            '__metadata': {
              'type': listItemEntityTypeName
            },
            'NumVotes': voteOptionItem.NumVotes && !isNaN(voteOptionItem.NumVotes) ? voteOptionItem.NumVotes+1 : 1
          });
          return this.httpClient.post(this.serverRelativeSiteUrl + `/_api/web/lists/getbytitle('${listName}')/items(${voteOptionItem.Id})`, {
            headers: {
              'Accept': 'application/json;odata=nometadata',
              'Content-type': 'application/json;odata=verbose',
              'odata-version': '',
              'IF-MATCH': etag,
              'X-HTTP-Method': 'MERGE'
            },
            body: body
          });
        })
        .then((response: Response): void => {
          if (response.ok) {
            resolve();
          }
          else {
            reject(response.statusText);
          }
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  public getResults(listName: string): Promise<IVoteResult[]> {
    return new Promise<IVoteResult[]>((resolve: (results: IVoteResult[]) => void, reject: (error: any) => void): void => {
      this.httpClient.get(this.serverRelativeSiteUrl + `/_api/web/lists/getByTitle('${listName}')/items?$select=Id,Title,NumVotes`, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: Response): Promise<{ value: IVoteOptionItem[] }> => {
          return response.json();
        })
        .then((voteResultItems: { value: IVoteOptionItem[] }): void => {
          const voteResults: IVoteResult[] = [];
          for (let i: number = 0; i < voteResultItems.value.length; i++) {
            voteResults.push({
              id: voteResultItems.value[i].Id,
              label: voteResultItems.value[i].Title,
              numVotes: voteResultItems.value[i].NumVotes
            });
          }
          resolve(voteResults);
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  private getListItemEntityTypeName(listName: string): Promise<string> {
    return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
      this.httpClient.post(this.serverRelativeSiteUrl + `/_api/web/lists/getByTitle('${listName}')?$select=ListItemEntityTypeFullName`, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: Response): Promise<{ ListItemEntityTypeFullName: string }> => {
          return response.json();
        })
        .then((response: { ListItemEntityTypeFullName: string }): void => {
          resolve(response.ListItemEntityTypeFullName);
        }, (error: any): void => {
          reject(error);
        });
    });
  }
}