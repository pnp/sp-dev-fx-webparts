import { SPHttpClient } from '@microsoft/sp-http';
import { ISearchRequestOptions, ISearchResponse } from '../models/ISearchModels';
import { buildSearchUrl, mapSearchResponse, SearchHttpError } from '../utils/searchUtils';

export class SearchService {
  public constructor(
    private readonly httpClient: SPHttpClient,
    private readonly siteUrl: string
  ) {}

  public async search(options: ISearchRequestOptions): Promise<ISearchResponse> {
    const response = await this.httpClient.get(
      buildSearchUrl(this.siteUrl, options),
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: 'application/json;odata=nometadata'
        }
      }
    );

    if (!response.ok) {
      throw new SearchHttpError(response.status, response.statusText);
    }

    return mapSearchResponse(await response.json(), options.pageSize);
  }
}
