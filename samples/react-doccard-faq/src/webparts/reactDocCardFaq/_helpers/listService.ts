import {
    SPHttpClient,
    SPHttpClientResponse
  } from '@microsoft/sp-http';
  
import { IFAQList } from './listModel';

const LIST_API_ENDPOINT: string = `/_api/web/lists/getbytitle('FAQ')`;
const SELECT_QUERY: string = '$select=Id,Title,Answer,Category,Featured';

export class listService {
    constructor(private siteAbsoluteUrl: string, private client: SPHttpClient) { }

    public getListItems(): Promise<IFAQList[]> {
        let promise: Promise<IFAQList[]> = new Promise<IFAQList[]>((resolve, reject) => {
            this.client.get(`${this.siteAbsoluteUrl}${LIST_API_ENDPOINT}/items?${SELECT_QUERY}`,
            SPHttpClient.configurations.v1
          ) // get response & parse body as JSON
            .then((response: SPHttpClientResponse): Promise<{ value: IFAQList[] }> => {
              return response.json();
            }) // get parsed response as array, and return
            .then((response: { value: IFAQList[] }) => {
              resolve(response.value);
            })
            .catch((error: any) => {
              reject(error);
            });
        });
        return promise;
      }

}

