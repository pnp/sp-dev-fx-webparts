import { WebPartContext } from "@microsoft/sp-webpart-base";
import { LogHelper } from "../helpers/LogHelper";
import { MSGraphClientV3 } from "@microsoft/sp-http";

class GraphService {
  private static _context: WebPartContext;

  public static async Init(context: WebPartContext): Promise<void> {
    this._context = context;
    LogHelper.info("GraphService", "Init", "Context initialized");
  }

  public static async GetExtension(extensionName: string): Promise<any> {
    try {
      const result = await this.GET(`/me/extensions/${extensionName}`);
      return result;
    } catch (error) {
      console.log("Error in GetExtension:", error);
      return null;
    }
  }

  public static async GetPreferences(extensionName: string): Promise<any> {
    try {      
      const result = await this.GET(`/me/extensions/${extensionName}`);
      return result;
    } catch (error) {
      LogHelper.error("GraphService", "GetPreferences", `${error}`);
      return null;
    }
  }

  /**
   * Saves preferences
   * @param userSettings
   * @returns preferences
   */
  public static async SavePreferences(userSettings: any): Promise<any> {
    try {
      const result = await this.POST(
        `/me/extensions`,
        JSON.stringify(userSettings)
      );
      return result;
    } catch (error) {
      LogHelper.error("GraphService", "SavePreferences", `${error}`);
      return null;
    }
  }

  /**
   * Updates preferences
   * @param userSettings
   * @returns preferences
   */
  public static async UpdatePreferences(
    userSettings: any,
    extensionName: string
  ): Promise<any> {
    try {
      const result = await this.PATCH(
        `/me/extensions/${extensionName}`,
        JSON.stringify(userSettings)
      );
      return result;
    } catch (error) {
      LogHelper.error("GraphService", "UpdatePreferences", `${error}`);
      return null;
    }
  }

  private static GET(query: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this._context.msGraphClientFactory
        .getClient("3")
        .then((client: MSGraphClientV3): void => {
          client.api(query).get((error, response) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
    });
  }
  private static POST(query: string, content: string) {
    return new Promise<any>((resolve, reject) => {
      this._context.msGraphClientFactory
        .getClient("3")
        .then((client: MSGraphClientV3): void => {
          client.api(query).post(content, (error, response) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(response);
          });
        });
    });
  }
  private static PATCH(query: string, content: string) {
    return new Promise<any>((resolve, reject) => {
      this._context.msGraphClientFactory
        .getClient("3")
        .then((client: MSGraphClientV3): void => {
          client.api(query).patch(content, (error, response, rawResponse) => {
            if (error) {
              reject(error);
              return;
            }
            resolve(rawResponse);
          });
        });
    });
  }
  //   private static DELETE(query: string) {
  //     return new Promise<any>((resolve, reject) => {
  //       this._context.msGraphClientFactory
  //         .getClient("3")
  //         .then((client: MSGraphClientV3): void => {
  //           client.api(query).delete((error, response, rawResponse) => {
  //             if (error) {
  //               reject(error);
  //             }
  //             resolve(rawResponse);
  //           });
  //         });
  //     });
  //   }
}
export default GraphService;
