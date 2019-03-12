// João Mendes
// March 2019

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web,  } from '@pnp/sp';
import { graph,  } from "@pnp/graph";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { ITenantProperty } from './ITenantProperty';

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

  // Add Tenant Property
  public async checkTenantProperty(newPropertyKey: string) {
    let returnValue: boolean = false;
    try {
      const webAppCatalog: Web = new Web(this.appCatalogUrl);
      const tenantProperty: any = await webAppCatalog.getStorageEntity(newPropertyKey);
      console.log(tenantProperty);
      if (tenantProperty && !tenantProperty['odata.null']) {
        returnValue = true;
      }
    } catch (error) {
      console.log(error);

      return Promise.reject(error.message);
    }
    return returnValue;
  }
  // Add or updateTenant Property
  public async setTenantProperty(newProperty: ITenantProperty) {
    try {
      const webAppCatalog: Web = new Web(this.appCatalogUrl);
      await webAppCatalog.setStorageEntity(newProperty.key, newProperty.Value, newProperty.Description, newProperty.Comment);
      return true;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
  // Add Tenant Property
  public async removeTenantProperty(newProperty: ITenantProperty) {
    try {
      const webAppCatalog: Web = new Web(this.appCatalogUrl);
      await webAppCatalog.removeStorageEntity(newProperty.key);
      return true;
    } catch (error) {
      return Promise.reject(error.message);
    }
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
  public async checkUserIsGlobalAdmin() {
    const myDirRolesAndGroups: any[] = await graph.me.memberOf.get();
    for (const myDirRolesAndGroup of myDirRolesAndGroups) {
      if (myDirRolesAndGroup.roleTemplateId && myDirRolesAndGroup.roleTemplateId === ADMIN_ROLETEMPLATE_ID) { // roleTemplateId for glabal Admin

        return true;
      }
    }
    return false;
  }
  // get Tenant Properties
  public async getTenantProperties() {
    try {
      const appCatalogUrl = await this.getAppCatalogUrl();
      const apiUrl = `${appCatalogUrl}/_api/web/AllProperties?$select=storageentitiesindex`;
      const data: SPHttpClientResponse = await this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.storageentitiesindex) {
          const properties: { [key: string]: ITenantProperty } = JSON.parse(results.storageentitiesindex);
          return properties;
        }
      }
      return null;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
}
