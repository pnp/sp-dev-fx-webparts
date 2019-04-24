// João Mendes
// March 2019

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Fields, Web, SearchResults, } from '@pnp/sp';
import { graph, } from "@pnp/graph";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, HttpClient } from '@microsoft/sp-http';
import * as $ from 'jquery';
import  {IEventData}  from './IEventData';
import { registerDefaultFontFaces } from "@uifabric/styling";
import { EventArgs } from "@microsoft/sp-core-library";
import * as moment from 'moment';
import { SiteUser } from "@pnp/sp/src/siteusers";

const ADMIN_ROLETEMPLATE_ID = "62e90394-69f5-4237-9190-012177145e10"; // Global Admin TemplateRoleId
// Class Services
export default class spservices {
  private appCatalogUrl: string = '';
  constructor(private context: WebPartContext) {
    // Setuo Context to PnPjs and MSGraph
    sp.setup({
      spfxContext: this.context
    });

    graph.setup({
      spfxContext: this.context
    });

    this.onInit();
  }
  // OnInit Function
  private async onInit() {
    //this.appCatalogUrl = await this.getAppCatalogUrl();
  }



  /**
   *
   *
   * @param {IEventData} newEvent
   * @param {string} siteUrl
   * @param {string} listId
   * @returns
   * @memberof spservices
   */
  public async addEvent(newEvent: IEventData, siteUrl:string, listId:string) {
    let results = null;
    try {
      const web = new Web(siteUrl);
      //"Title","fRecurrence", "fAllDayEvent","EventDate", "EndDate", "Description","ID", "Location","Geolocation","ParticipantsPickerId"
        results = await web.lists.getById(listId).items.add({
        Title: newEvent.title,
        Description: newEvent.Description,
        Geolocation: newEvent.geolocation,
        ParticipantsPickerId: { results: newEvent.attendes },
        EventDate: newEvent.start,
        EndDate: newEvent.end,
        Location: newEvent.location
      });
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }
/**
 *
 * @param {IEventData} newEvent
 * @param {string} siteUrl
 * @param {string} listId
 * @returns
 * @memberof spservices
 */
public async updateEvent(newEvent: IEventData, siteUrl:string, listId:string){
  let results = null;
  try {
    const web = new Web(siteUrl);
    //"Title","fRecurrence", "fAllDayEvent","EventDate", "EndDate", "Description","ID", "Location","Geolocation","ParticipantsPickerId"
      results = await web.lists.getById(listId).items.getById(newEvent.id).update({
      Title: newEvent.title,
      Description: newEvent.Description,
      Geolocation: newEvent.geolocation,
      ParticipantsPickerId: { results: newEvent.attendes },
      EventDate: newEvent.start,
      EndDate: newEvent.end,
      Location: newEvent.location
    });
  } catch (error) {
    return Promise.reject(error);
  }
  return results;
}

/**
 *
 *
 * @param {IEventData} event
 * @param {string} siteUrl
 * @param {string} listId
 * @returns
 * @memberof spservices
 */
public async deleteEvent(event: IEventData, siteUrl:string, listId:string){
  let results = null;
  try {
    const web = new Web(siteUrl);
    //"Title","fRecurrence", "fAllDayEvent","EventDate", "EndDate", "Description","ID", "Location","Geolocation","ParticipantsPickerId"
      results = await web.lists.getById(listId).items.getById(event.id).delete();
  } catch (error) {
    return Promise.reject(error);
  }
  return results;
}
  /**
   *
   *
   * @param {number} userId
   * @param {string} siteUrl
   * @returns {Promise<SiteUser>}
   * @memberof spservices
   */
  public async getUserById(userId: number,siteUrl: string): Promise<SiteUser>{
    let results: SiteUser = null;

    if (!userId && !siteUrl) {
      return null ;
    }

    try {
      const web = new Web(siteUrl);
      results = await  web.siteUsers.getById(userId).get();
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }
  /**
   *
   *
   * @param {string} siteUrl
   * @returns
   * @memberof spservices
   */
  public async getSiteLists(siteUrl: string) {

    let results: any[] = [];

    if (!siteUrl) {
      return [];
    }

    try {
      const web = new Web(siteUrl);
      results = await web.lists.select("Title", "ID").filter('BaseTemplate eq 106').get();
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  /**
   *
   *
   * @private
   * @returns
   * @memberof spservices
   */
  private  async colorGenerate() {

    var hexValues = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e"];
    var newColor = "#";

    for ( var i = 0; i < 6; i++ ) {
      var x = Math.round( Math.random() * 14 );
      var y = hexValues[x];
      newColor += y;
    }

    return newColor;
  }

  /**
   *
   *
   * @param {string} siteUrl
   * @param {string} listId
   * @returns {Promise<any[]>}
   * @memberof spservices
   */
  public async getEvents(siteUrl: string, listId: string): Promise<IEventData[]> {
    let events:IEventData[] = [];

    if (!siteUrl) {
      return [];
    }
    try {
      const web = new Web(siteUrl);
      const results = await web.lists.getById(listId).items.select("Title","fRecurrence", "fAllDayEvent","EventDate", "EndDate", "Description","ID", "Location","Geolocation","ParticipantsPickerId","Author/EMail","Author/Title").expand('Author').orderBy('EventDate').getAll();
      if (results && results.length > 0){
          for (const event of results){
              events.push({
                id: event.ID,
                title: event.Title,
                Description: event.Description,
                start: new Date(moment(event.EventDate).toLocaleString()),
                end: new Date(moment(event.EndDate).toLocaleString()),
                location: event.Location,
                ownerEmail: event.Author.EMail,
                ownerPhoto: `/_layouts/15/userphoto.aspx?size=L&accountname=${event.Author.EMail}`,
                ownerInitial:  '',
                color : await this.colorGenerate(),
                ownerName: event.Author.Title,
                attendes: event.ParticipantsPickerId,
                allDayEvent: event.fAllDayEvent,
                geolocation: event.Geolocation

              });
          }

      }
    } catch (error) {
      return Promise.reject(error);
    }
    return events;
  }

  // Check if user is Global Admin
  /**
   *
   */
  public async checkUserIsGlobalAdmin() {
    const myDirRolesAndGroups: any[] = await graph.me.memberOf.get();
    for (const myDirRolesAndGroup of myDirRolesAndGroups) {
      if (myDirRolesAndGroup.roleTemplateId && myDirRolesAndGroup.roleTemplateId === ADMIN_ROLETEMPLATE_ID) { // roleTemplateId for glabal Admin
        return true;
      }
    }
    return false;
  }

  /**
  /**
   *
   *
   * @param {string} value
   * @returns
   * @memberof spservices
   */
  public async getSites(value: string) {
    let results: SearchResults = null;
    try {

      results = await sp.search(`${value} AND contentclass:STS_Site`);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  /**
   *
   *
   * @param {string} webUrl
   * @param {string} siteDesignId
   * @returns
   * @memberof spservices
   */
  public async getGeoLactionName(latitude: number, longitude: number) {
    try {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
      const results = await $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'accept': 'application/json;odata=nometadata',
        }
      });
      // const data: SPHttpClientResponse = await this.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1,spOpts);

      if (results) {
        console.log(results);
        return results;
      }
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }




  private async getRequestDigest() {
    try {

      const webAbsoluteUrl = this.context.pageContext.web.absoluteUrl;
      const spOpts: ISPHttpClientOptions = {
      };
      const apiUrl = `${webAbsoluteUrl}/_api/contextinfo`;

      const data: SPHttpClientResponse = await this.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, null);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results.FormDigestValue;
        }
      }
      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }

  }

}
