import "./msflowsdk-1.1.js";
import {
  SPHttpClient,
  SPHttpClientResponse,
  ISPHttpClientOptions
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

/**
 * Services
 */
export default class services {
  private _context: WebPartContext;
  constructor(private context: WebPartContext) {
    this._context = this.context;
  }

  /**
   * Gets access token
   * @returns access token
   */
  public async getAccessToken():Promise<string> {
    const body: ISPHttpClientOptions = {
      body: JSON.stringify({
        resource: "https://service.flow.microsoft.com/"
      })
    };

    let token: SPHttpClientResponse = await this._context.spHttpClient.post(
      `${this._context.pageContext.web.absoluteUrl}/_api/SP.OAuth.Token/Acquire`,
      SPHttpClient.configurations.v1,
      body
    );
    let tokenJson = await token.json();
    return tokenJson.access_token;
  }


}
