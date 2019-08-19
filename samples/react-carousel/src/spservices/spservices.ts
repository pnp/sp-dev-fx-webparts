// João Mendes
// March 2019

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Fields, Web, SearchResults, Field, PermissionKind, RegionalSettings, PagedItemCollection } from '@pnp/sp';
import { graph, } from "@pnp/graph";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, HttpClient, MSGraphClient } from '@microsoft/sp-http';
import * as $ from 'jquery';

import { registerDefaultFontFaces } from "@uifabric/styling";
import * as moment from 'moment';
import { SiteUser } from "@pnp/sp/src/siteusers";
import { dateAdd } from "@pnp/common";
import { escape, update } from '@microsoft/sp-lodash-subset';


// Class Services
export default class spservices {

  private graphClient: MSGraphClient = null;

  constructor(private context: WebPartContext) {
    // Setuo Context to PnPjs and MSGraph
    sp.setup({
      spfxContext: this.context
    });

    graph.setup({
      spfxContext: this.context
    });
    // Init
    this.onInit();
  }
  // OnInit Function
  private async onInit() {
  }

  public async getSiteLists(siteUrl: string) {

    let results: any[] = [];

    if (!siteUrl) {
      return [];
    }

    try {
      const web = new Web(siteUrl);
      results = await web.lists
        .select("Title", "ID")
        .filter('BaseTemplate eq 109')
        .usingCaching()
        .get();

    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  public async getImages(siteUrl: string, listId: string, numberImages: number): Promise<any[]> {
    let results: any[] = [];
    try {

      const web = new Web(siteUrl);
      results = await web.lists
        .getById(listId).items
        .select('Title','Description','File_x0020_Type', 'FileSystemObjectType','File/Name', 'File/ServerRelativeUrl', 'File/Title', 'File/Id', 'File/TimeLastModified')
        .top(numberImages)
        .expand('File')
        .filter((`File_x0020_Type eq  'jpg' or File_x0020_Type eq  'png' or  File_x0020_Type eq  'jpeg'  or  File_x0020_Type eq  'gif' or  File_x0020_Type eq  'mp4'`))
        .orderBy('Id')
        .usingCaching()
        .get();
    } catch (error) {
      return Promise.reject(error);
    }
    // sort by name

    return results;
  }
}
