import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

interface IGetWebUrlFromPageUrlResponse {
  value?: string;
}

export class HtmlFileService {
  public constructor(private readonly spHttpClient: SPHttpClient) {}

  public async getHtml(
    webUrl: string,
    serverRelativeUrl: string
  ): Promise<string> {
    const escapedPath = serverRelativeUrl.replace(/'/g, "''");

    const requestUrl =
      `${webUrl}/_api/web/` +
      `GetFileByServerRelativePath(decodedUrl='${escapedPath}')/$value`;

    const response: SPHttpClientResponse = await this.spHttpClient.get(
      requestUrl,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: 'text/plain'
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `The HTML file could not be loaded: ` +
        `${response.status} ${response.statusText}`
      );
    }

    return response.text();
  }

  /**
   * Resolves the URL of the SharePoint web (site) that contains the given
   * file, using the SP.Web.GetWebUrlFromPageUrl static method — callable
   * from any site the caller can reach, not just the target site.
   */
  public async resolveWebUrl(
    anchorSiteUrl: string,
    fileAbsoluteUrl: string
  ): Promise<string> {
    const escapedFileUrl = fileAbsoluteUrl.replace(/'/g, "''");

    const requestUrl =
      `${anchorSiteUrl}/_api/sp.web.getweburlfrompageurl(@v)` +
      `?@v='${encodeURIComponent(escapedFileUrl)}'`;

    const response: SPHttpClientResponse = await this.spHttpClient.get(
      requestUrl,
      SPHttpClient.configurations.v1,
      {
        headers: {
          Accept: 'application/json;odata.metadata=none'
        }
      }
    );

    if (!response.ok) {
      throw new Error(
        `Could not resolve the site URL for the selected file: ` +
        `${response.status} ${response.statusText}`
      );
    }

    const json: IGetWebUrlFromPageUrlResponse = await response.json();

    if (!json.value) {
      throw new Error('Could not resolve the site URL for the selected file.');
    }

    return json.value;
  }
}
