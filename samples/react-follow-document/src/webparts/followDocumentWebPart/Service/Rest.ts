import {
    SPHttpClient,
    SPHttpClientResponse,
    ISPHttpClientOptions,
  } from "@microsoft/sp-http";
  import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
  
export default class Rest {
    public async isfollowed(
      spHttpClient: SPHttpClient,
      fileUrl: string,
      siteUrl: string
    ): Promise<boolean> {
      const spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json;odata.metadata=minimal",
          "Content-type": "application/json;odata=verbose",
        },
        body: `{'actor': { 'ActorType':1, 'ContentUri':'${fileUrl}', 'Id':null}}`,
      };
  
      const value = spHttpClient
        .post(
          `${siteUrl}/_api/social.following/isfollowed`,
          SPHttpClient.configurations.v1,
          spOpts
        )
        .then((response: SPHttpClientResponse): Promise<{
          value: boolean;
        }> => {
          // Access properties of the response object.
          console.log(`Status code: ${response.status}`);
          console.log(`Status text: ${response.statusText}`);
  
          //response.json() returns a promise so you get access to the json in the resolve callback.
          return response.json();
          /* response.json().then((responseJSON: JSON) => {
              console.log(responseJSON);
            });*/
        })
        .then((item: { value: boolean }) => {
          return item.value;
        });
      return value;
    }
  
    public async follow(
      spHttpClient: SPHttpClient,
      fileUrl: string,
      siteUrl: string
    ): Promise<boolean> {
      const spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json;odata.metadata=minimal",
          "Content-type": "application/json;odata=verbose",
        },
        body: `{'actor': { 'ActorType':1, 'ContentUri':'${fileUrl}', 'Id':null}}`,
      };
      const value = await spHttpClient
        .post(
          `${siteUrl}/_api/social.following/follow`,
          SPHttpClient.configurations.v1,
          spOpts
        )
        .then((response: SPHttpClientResponse): Promise<number> => {
          // Access properties of the response object.
          console.log(`Status code: ${response.status}`);
          console.log(`Status text: ${response.statusText}`);
  
          return response.json();
        })
        .then((Item: any) => {
          return Item.value;
        });
      if (value === 0) {
        return true;
      } else {
        return false;
      }
    }
  
    public async stopfollowing(
      spHttpClient: SPHttpClient,
      fileUrl: string,
      siteUrl: string
    ): Promise<boolean> {
      const spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json;odata.metadata=minimal",
          "Content-type": "application/json;odata=verbose",
        },
        body: `{'actor': { 'ActorType':1, 'ContentUri':'${fileUrl}', 'Id':null}}`,
      };
      const value = await spHttpClient
        .post(
          `${siteUrl}/_api/social.following/stopfollowing`,
          SPHttpClient.configurations.v1,
          spOpts
        )
        .then((response: SPHttpClientResponse) => {
          // Access properties of the response object.
          console.log(`Status code: ${response.status}`);
          console.log(`Status text: ${response.statusText}`);
          return true;
        });
      return value;
    }
    public async followed(
      spHttpClient: SPHttpClient,
      siteUrl: string
    ): Promise<MicrosoftGraph.DriveItem[]> {
      const spOpts: ISPHttpClientOptions = {
        headers: {
          Accept: "application/json;odata.metadata=minimal",
          "Content-type": "application/json;odata=verbose",
        },
      };
      const values = spHttpClient
        .post(
          `${siteUrl}/_api/social.following/my/followed(types=2)`,
          SPHttpClient.configurations.v1,
          spOpts
        )
        .then((response: SPHttpClientResponse): Promise<
          MicrosoftGraph.DriveItem[]
        > => {
          // Access properties of the response object.
          console.log(`Status code: ${response.status}`);
          console.log(`Status text: ${response.statusText}`);
  
          //response.json() returns a promise so you get access to the json in the resolve callback.
          return response.json();
        })
        .then((Items:any) => {
          let Values: MicrosoftGraph.DriveItem[] = [];
          Items.value.forEach((element) => {
            Values.push({
              webUrl: decodeURIComponent(element.Uri),
              name: element.Name,
            });
          });
          return Values;
        });
      return values;
    }
  }