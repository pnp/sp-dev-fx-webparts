import { WebPartContext } from "@microsoft/sp-webpart-base";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IAppDetails } from "../models/IAppDetails";

export class SPService {
  private readonly context: WebPartContext;
  constructor(context: WebPartContext, debug: boolean = false) {
    this.context = context;
  }

  public readonly getAppTiles = async (): Promise<IAppDetails[]> => {
    try {
      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        `${this.context.pageContext.web.absoluteUrl}/_api/web/apptiles`,
        SPHttpClient.configurations.v1
      );
      const responseJSON = await response.json();
      return Promise.resolve(responseJSON.value);
    } catch (ex) {
      return Promise.reject(ex);
    }
  };
}
