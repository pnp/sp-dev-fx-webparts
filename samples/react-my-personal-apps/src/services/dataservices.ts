import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
  MSGraphClient,
} from "@microsoft/sp-http";

import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { IListItem } from "../webparts/personalApps/components/ManageApps/IListItem";

export default class dataservices {
  private static _MSGraphClient: MSGraphClient;
  private static _hasExtension: boolean = false;

  /*
  initialize the static class
  */
  public static async init(context: WebPartContext) {
    //obtain the httpClient from the webpart context
    this._MSGraphClient = await context.msGraphClientFactory.getClient();

  }

  // Get Sources
  public static async getUserApps(): Promise<IListItem[]> {
    try {
      let _myApps = await this._MSGraphClient
        .api(`/me/extensions/MyApps`)
        .get();
      this._hasExtension = true;
      return _myApps ? _myApps.Apps : [];
    } catch (error) {
      console.log (error);
      return [];
    }
  }

  public static async createOrUpdateUserApps(
    listApps: IListItem[]
  ): Promise<microsoftgraph.OpenTypeExtension> {
    try {
      let _extensionResult: any;
      let extentionData: Object = {};

      // User has extention created ?
      if (this._hasExtension) {
        extentionData = {
          Apps: listApps
        };
        // Call the REST API
        _extensionResult = await this._MSGraphClient
          .api(`/me/extensions/MyApps`)
          .patch(extentionData);
      } else {
        // Create Extention with Data
        extentionData = {
          "@odata.type": "#microsoft.graph.openTypeExtension",
          extensionName: "MyApps",
          Apps: listApps
        };
        // Call the Rest API
        _extensionResult = await this._MSGraphClient
          .api(`/me/extensions`)
          .post(extentionData);
        // Flag user has extension created
          this._hasExtension = true;
      }

      return _extensionResult;
    } catch (error) {
      console.log(error);
      throw new Error("Error creating or updating extension");
    }
    return;
  }
}
