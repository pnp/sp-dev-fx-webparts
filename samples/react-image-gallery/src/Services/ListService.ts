import { SPHttpClient } from "@microsoft/sp-http";
import { IListService } from "../Interfaces";

export class ListService implements IListService {
  private spHttpClient: SPHttpClient;

  constructor(spHttpClient?: SPHttpClient) {
    this.spHttpClient = spHttpClient;
  }

  public async readItems(url: string): Promise<any> {
    try {
      const response = await this.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "odata-version": "",
          },
        }
      );

      const items: any = await response.json();
      let result = {};
      if (items.value.length) {
        result = {
          items: items.value,
          nextLink: items["odata.nextLink"],
        };
      } else {
        result = null;
      }
      return result;
    } catch (error) {
      return error;
    }

    // return new Promise<any>(async (resolve) => {

    //     this.spHttpClient.get(url, SPHttpClient.configurations.v1,
    //         {
    //           headers: {
    //             'Accept': 'application/json;odata=nometadata',
    //             'odata-version': ''
    //           }
    //         }).then((response: SPHttpClientResponse): Promise<{ value: number }> => {
    //           return response.json();
    //         }).then((response: { value: number }): void => {

    //             resolve(response.value);
    //         });

    //     });
  }

  public async getListItemsCount(url: string): Promise<any> {
    try {
      const response = await this.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "odata-version": "",
          },
        }
      );

      const result: any = await response.json();

      return result.value;
    } catch (error) {
      return error;
    }

    // return new Promise<any>(async (resolve) => {

    //     this.spHttpClient.get(url, SPHttpClient.configurations.v1,
    //         {
    //           headers: {
    //             'Accept': 'application/json;odata=nometadata',
    //             'odata-version': ''
    //           }
    //         }).then((response: SPHttpClientResponse): Promise<{ value: number }> => {
    //           return response.json();
    //         }).then((response: { value: number }): void => {

    //             resolve(response.value);
    //         });

    //     });
  }
}
