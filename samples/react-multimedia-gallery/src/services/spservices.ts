/* eslint-disable @typescript-eslint/no-explicit-any */
// João Mendes
// March 2019

import { WebPartContext } from "@microsoft/sp-webpart-base";

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Web } from "@pnp/sp/webs";
import {  SPFx as spSPFx } from "@pnp/sp";


// Class Services
export default class spservices {

  private wpContext : WebPartContext = null;

  constructor(private wPcontext: WebPartContext) {
    this.wpContext = wPcontext;
  }
  // OnInit Function
 

  public async getSiteLists(siteUrl: string): Promise<any[]> {

    let results: any[] = [];

    if (!siteUrl) {
      return [];
    }

    try {
      const web = Web(siteUrl).using(spSPFx(this.wpContext));
      results = await web.lists
        .select("Title", "ID")
        .filter('BaseTemplate eq 101 or BaseTemplate eq 109')();
  //      .usingCaching()
       // .get();

    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  public async getImages(siteUrl: string, listId: string, numberImages: number): Promise<any[]> {
    let results: any[] = [];
    try {
      const web = Web(siteUrl).using(spSPFx(this.wpContext));
      results = await web.lists
        .getById(listId).items
        
        .select('Title', 'File_x0020_Type', 'FileSystemObjectType', 'File/Name', 'File/ServerRelativeUrl', 'File/Title', 'File/Id', 'File/TimeLastModified')
        .top(numberImages)
        .expand('File')
        .filter(`File_x0020_Type eq 'jpg' or File_x0020_Type eq 'png' or File_x0020_Type eq 'jpeg' or File_x0020_Type eq 'gif' or File_x0020_Type eq 'mp4'`)
        .orderBy('Modified', false)();
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  
}




