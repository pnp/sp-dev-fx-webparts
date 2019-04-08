// João Mendes
// March 2019

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web, SiteDesignInfo, SiteScriptInfo, SiteScripts, SiteDesignCreationInfo, SiteDesignUpdateInfo, SiteDesignPrincipals, SiteScriptUpdateInfo, SearchResults, } from '@pnp/sp';
import { graph, } from "@pnp/graph";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, HttpClient } from '@microsoft/sp-http';
import { ISiteScript } from '../types/ISiteScript';
import SiteDesignRights from "../controls/SiteDesignRights/SiteDesignRights";
import { IAddSiteDesignTaskToCurrentWebResult } from './IAddSiteDesignTaskToCurrentWebResult';
import { ISiteDesignTaskResult } from './ISiteDesignTaskResult';
import * as $ from 'jquery';

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
    this.appCatalogUrl = await this.getAppCatalogUrl();
  }

  // Get App Catalog
  private async getAppCatalogUrl() {
    try {
      const webAbsoluteUrl = this.context.pageContext.web.absoluteUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/SP_TenantSettings_Current`;

      const data: SPHttpClientResponse = await this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results.CorporateCatalogUrl;
        }
      }
      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error.message);
    }
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
   *   Get List of Site Designs
   *
   * @returns results[]
   * @memberof spservices
   */
  public async getSiteDesigns() {
    let result: SiteDesignInfo[] = [];
    try {
      result = await sp.siteDesigns.getSiteDesigns();
    } catch (error) {
      return Promise.reject(error);
    }
    return result;
  }
  /**
   * Return Site Scripts
   *
   * @returns array os siteScripts
   * @memberof spservices
   */
  public async getSiteScripts() {
    let results: SiteScriptInfo[] = [];
    try {
      results = await sp.siteScripts.getSiteScripts();

    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  /**
   * Get Site Script by Id
   *
   * @param {string} id
   * @returns  {SiteScriptInfo}
   * @memberof spservices
   */
  public async getSiteScriptMetadata(id: string) {
    let results: SiteScriptInfo = null;
    try {
      results = await sp.siteScripts.getSiteScriptMetadata(id);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  /**
   *  GetSiteDesignMetaData
   *
   * @param {string} id
   * @returns
   * @memberof spservices
   */
  public async getSiteDesignMetadata(id: string) {
    let results: SiteDesignInfo = null;
    try {
      results = await sp.siteDesigns.getSiteDesignMetadata(id);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  /**
   * Create a SiteScript
   *
   * @param {string} title
   * @param {*} description
   * @param {string} sitescript
   * @returns
   * @memberof spservices
   */
  public async createSiteScript(title: string, description, siteScript: ISiteScript) {
    let results: SiteScriptInfo = null;
    try {
      results = await sp.siteScripts.createSiteScript(title, description, siteScript);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  /**
   *
   *
   * @private
   * @param {SiteDesignInfo} siteDesignInfo
   * @returns
   * @memberof spservices
   */
  public async createSiteDesign(siteDesignInfo: SiteDesignCreationInfo) {
    let results: SiteDesignCreationInfo = null;
    try {
      results = await sp.siteDesigns.createSiteDesign(siteDesignInfo);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  /**
   *
   *
   * @param {SiteDesignUpdateInfo} siteDesignInfo
   * @returns
   * @memberof spservices
   */
  public async updateSiteDesign(siteDesignInfo: SiteDesignUpdateInfo) {
    let results: SiteDesignInfo = null;
    try {
      results = await sp.siteDesigns.updateSiteDesign(siteDesignInfo);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  /**
   *
   *
   * @param {SiteDesignUpdateInfo} siteDesignInfo
   * @returns
   * @memberof spservices
   */
  public async deleteSiteDesign(siteDesignInfo: SiteDesignUpdateInfo) {
    try {
      await sp.siteDesigns.deleteSiteDesign(siteDesignInfo.Id);
    } catch (error) {
      return Promise.reject(error);
    }
    return;
  }


  /**
   *
   *
   * @private
   * @param {string} siteDesignId
   * @returns
   * @memberof spservices
   */
  public async getSiteDesignRights(siteDesignId: string) {
    let results: SiteDesignPrincipals[] = null;
    try {
      results = await sp.siteDesigns.getSiteDesignRights(siteDesignId);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }


  public async updateSiteScript(siteScriptInfo: SiteScriptUpdateInfo) {
    let results: SiteScriptInfo = null;
    try {
      results = await sp.siteScripts.updateSiteScript(siteScriptInfo);
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }
  /**
   *
   *
   * @param {string} siteDesignId
   * @param {string[]} principals
   * @returns
   * @memberof spservices
   */
  public async grantSiteDesignRights(siteDesignId: string, principals: string[]) {

    try {
      await sp.siteDesigns.grantSiteDesignRights(siteDesignId, principals);
    } catch (error) {
      return Promise.reject(error);
    }
    return;
  }


  /**
   *
   *
   * @param {string} siteDesignId
   * @param {string[]} principals
   * @returns
   * @memberof spservices
   */
  public async revokeSiteDesignRights(siteDesignId: string, principals: string[]) {
    try {
      await sp.siteDesigns.revokeSiteDesignRights(siteDesignId, principals);
    } catch (error) {
      return Promise.reject(error);
    }
    return;
  }

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
  public async AddSiteDesignTask(webUrl: string, siteDesignId: string) {
    const webAbsoluteUrl = this.context.pageContext.web.absoluteUrl;

    try {
      const spOpts: ISPHttpClientOptions = {
        body: `{"siteDesignId":"${siteDesignId}","webUrl":${webUrl}}`
      };

      const formDigest = await this.getRequestDigest();
      const apiUrl = `${webAbsoluteUrl}/_api/microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.AddSiteDesignTask`;

      const results = await $.ajax({
        url: apiUrl,
        type: 'POST',
        dataType: 'json',
        data: `{"siteDesignId":"${siteDesignId}","webUrl":"${webUrl}"}`,
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'accept': 'application/json;odata=nometadata',
          'X-RequestDigest': formDigest
        }
      });
      // const data: SPHttpClientResponse = await this.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1,spOpts);

      if (results && results) {
        return results;
      }
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   *
   * @param {string} webUrl
   * @param {string} taskId
   * @returns
   * @memberof spservices
   */
  public async getSiteDesignTask(webUrl: string, runTaskId: string): Promise<ISiteDesignTaskResult> {
    try {

      const spOpts: ISPHttpClientOptions = {
        body: `{ "taskId": "${runTaskId}"}`
      };

      const apiUrl =  `${webUrl}/_api/microsoft.Sharepoint.Utilities.WebTemplateExtensions.SiteScriptUtility.GetSiteDesignTask`;

      const data: SPHttpClientResponse = await this.context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts);
      if (data.ok) { // Testar sucesso diferente 200  e lançar erro
        const results: ISiteDesignTaskResult = await data.json();
        if (results) {
          return results;
        }
      }
      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error.message);
    }
  }


  private async getRequestDigest(){
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
