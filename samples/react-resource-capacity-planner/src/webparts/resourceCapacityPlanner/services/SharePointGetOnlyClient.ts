import { SPHttpClient } from '@microsoft/sp-http';

export interface IGetResponse {
  ok: boolean;
  status: number;
  headers: Headers;
  json(): Promise<any>;
}

export interface IGetOnlyClient {
  get(url: string): Promise<IGetResponse>;
}

/** The only network capability exposed to the planner is SharePoint REST GET. */
export class SharePointGetOnlyClient implements IGetOnlyClient {
  public constructor(private readonly client: SPHttpClient) {}

  public get(url: string): Promise<IGetResponse> {
    return this.client.get(url, SPHttpClient.configurations.v1, {
      headers: { Accept: 'application/json;odata=nometadata' }
    });
  }
}
