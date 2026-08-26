
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { MSGraphClient } from '@microsoft/sp-http';

export interface ICarouselImageItem {
  Title: string;
  Description?: string;
  File_x0020_Type: string;
  FileSystemObjectType: number;
  File: {
    Name: string;
    ServerRelativeUrl: string;
    Title: string;
    Id: string;
    TimeLastModified: string;
  };
}

export default class spservices {

  private graphClient: MSGraphClient = null;
  private sp: SPFI;

  constructor(private context: WebPartContext) {
    // Setup Context to PnPjs
    this.sp = spfi().using(SPFx(this.context));
    // Init
    this.onInit();
  }
  // OnInit Function
  private async onInit() {
  }

  public async getSiteLists(siteUrl: string) {

    let results: { Title: string; Id: string }[] = [];

    if (!siteUrl) {
      return [];
    }

    try {
      results = await this.sp.web.lists
        .select("Title", "Id")
        .filter('BaseTemplate eq 101')();

    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  public async getImages(siteUrl: string, listId: string, numberImages: number): Promise<ICarouselImageItem[]> {
    let results: ICarouselImageItem[] = [];
    try {
      results = await this.sp.web.lists
        .getById(listId).items
        .select('Title','File_x0020_Type', 'FileSystemObjectType','File/Name', 'File/ServerRelativeUrl', 'File/Title', 'File/Id', 'File/TimeLastModified')
        .top(numberImages)
        .expand('File')
        .filter((`File_x0020_Type eq  'jpg' or File_x0020_Type eq  'png' or  File_x0020_Type eq  'jpeg'  or  File_x0020_Type eq  'gif' or  File_x0020_Type eq  'mp4'`))
        .orderBy('Id')();
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }
}
