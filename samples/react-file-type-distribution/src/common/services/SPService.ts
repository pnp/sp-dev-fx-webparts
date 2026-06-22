/* eslint-disable @typescript-eslint/no-explicit-any */
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ILibraryItem } from "../models/ILibraryItem";
import { IRefinerEntry } from "../models/IRefinerEntry";

export default class SPService {
  private readonly context: WebPartContext;
  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async getLibraries(): Promise<ILibraryItem[]> {
    const url = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=BaseTemplate eq 101 and Hidden eq false&$select=Id,Title,RootFolder/ServerRelativeUrl&$expand=RootFolder`;
    const res: SPHttpClientResponse = await this.context.spHttpClient.get(url, SPHttpClient.configurations.v1);
    const json = await res.json();
    return (json?.value || []).map((l: any) => ({ id: l.Id, title: l.Title, serverRelativeUrl: l.RootFolder?.ServerRelativeUrl }));
  }

  public async getFileTypeRefiners(serverRelativeUrl: string): Promise<IRefinerEntry[]> {
    // host = https://tenant.sharepoint.com
    const host = this.context.pageContext.web.absoluteUrl.replace(this.context.pageContext.web.serverRelativeUrl, "");

    const libAbsUrl = `${host}${serverRelativeUrl}`;

    const querytext = encodeURIComponent(`* Path:"${libAbsUrl}"`);
    const refinersQ = encodeURIComponent("filetype");
    const searchUrl = `${this.context.pageContext.web.absoluteUrl}/_api/search/query?querytext='${querytext}'&rowlimit=0&refiners='${refinersQ}'`;
    const res = await this.context.spHttpClient.get(searchUrl, SPHttpClient.configurations.v1);
    const json = await res.json();
    const entries = json?.PrimaryQueryResult?.RefinementResults?.Refiners?.find((r: any) => r?.Name?.toLowerCase() === "filetype")?.Entries || [];
    return entries
      .map((e: any) => ({ name: e.RefinementName, count: Number(e.RefinementCount) }))
      .sort((a: IRefinerEntry, b: IRefinerEntry) => b.count - a.count);
  }
}
