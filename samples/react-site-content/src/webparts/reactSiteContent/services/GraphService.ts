/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drive } from "@microsoft/microsoft-graph-types";
import { MSGraphClientV3 } from "@microsoft/sp-http-msgraph";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export class GraphService {
  private readonly context: WebPartContext;

  //private token: string;
  constructor(context: WebPartContext) {
    this.context = context;
  }

  private readonly getClient = async (): Promise<MSGraphClientV3> => {
    return await this.context.msGraphClientFactory.getClient("3");
  };

  public getDriveDetails = async (docLibraryName: string): Promise<Drive> => {
    const client = await this.getClient();
    const request = client.api(`/sites/${this.context.pageContext.site.id}/lists/${docLibraryName}/drive`);
    const response = await request.get();
    return Promise.resolve(response);
  };
}
