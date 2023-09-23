import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { SPHttpClient, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IOffer } from "../model/IOffer";
import GraphService from "./GraphService";

export interface ISPService {
  createOffer(offer: IOffer, siteUrl: string, siteDomain: string): Promise<string>;
}

interface IFile {
  data: ArrayBuffer,
  name: string;
  size: number;
}

interface IFileItem {
  id: string;
  type: string;
}

export class SPService implements ISPService {
  public static readonly serviceKey: ServiceKey<SPService> =
    ServiceKey.create<SPService>('react-office-create-offer', SPService);

  private _spHttpClient: SPHttpClient;
  private graphServiceInstance: GraphService;
  private teamSiteUrl: string;
  private teamSiteDomain: string;
  private teamSiteRelativeUrl: string;

  constructor(serviceScope: ServiceScope) {  
    serviceScope.whenFinished(() => {
      this._spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
      this.graphServiceInstance = serviceScope.consume(GraphService.serviceKey);
    });
  }

  public async createOffer(offer: IOffer, siteDomain: string, siteUrl: string): Promise<string> {
    if (siteUrl !== '') { // Run and configured in SharePoint
      this.teamSiteUrl = siteUrl;
    }
    else { // Running in M365 (Teams, Office, Outlook)
      const personalSiteUrl = await this.graphServiceInstance.getPersonalSiteUrl();
      if (personalSiteUrl !== '') { // Configured personally
        this.teamSiteUrl = personalSiteUrl;
      }
      else { // Configured tenant-wide
        this.teamSiteUrl = await this.getSiteUrl(`https://${siteDomain}`);
      }
    }
    if (this.teamSiteUrl !== '') {
      this.teamSiteDomain = siteDomain;
      this.teamSiteRelativeUrl = this.teamSiteUrl.split(this.teamSiteDomain)[1];
      const tmplFile = await this.loadTemplate(offer);
      const newFileRelativeUrl: string = await this.createOfferFile(tmplFile);
      const newFileUrl = `https://${this.teamSiteDomain}${newFileRelativeUrl}`;
      const fileListItemInfo = await this.getFileListItem(tmplFile.name);    
      await this.updateFileListItem(fileListItemInfo.id, fileListItemInfo.type, offer);
      return Promise.resolve(newFileUrl);
    }
    return Promise.reject();
  }

  private async getSiteUrl(tenantUrl: string): Promise<string> {
    const requestUrl: string = `${tenantUrl}/_api/SP_TenantSettings_Current`;
    const response = await this._spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
    const jsonResp = await response.json();
    const appCatalogUrl: string = jsonResp.CorporateCatalogUrl;
    if (appCatalogUrl && appCatalogUrl.length > 8) {
      const apprequestUrl: string = `${appCatalogUrl}/_api/web/GetStorageEntity('CreateOfferSiteUrl')`;
      const appResponse = await this._spHttpClient.get(apprequestUrl, SPHttpClient.configurations.v1);
      const jsonAppResp = await appResponse.json();
      const siteUrl: string = jsonAppResp.Value;
      return siteUrl;
    }
    return "";
  }

  private async loadTemplate (offer: IOffer): Promise<IFile> {
    const requestUrl: string = `${this.teamSiteUrl}/_api/web/GetFileByServerRelativeUrl('${this.teamSiteRelativeUrl}/_cts/Offering/Offering.dotx')/OpenBinaryStream()`;
    const response = await this._spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
    const fileBlob = await response.arrayBuffer();
    const respFile = { data: fileBlob, name: `${offer.title}.docx`, size: fileBlob.byteLength };
    return respFile;
  }

  private async createOfferFile(tmplFile: IFile): Promise<string> {
    const uploadUrl = `${this.teamSiteUrl}/_api/web/GetFolderByServerRelativeUrl('${this.teamSiteRelativeUrl}/Shared Documents')/files/add(overwrite=true,url='${tmplFile.name}')` ;

    const spOpts : ISPHttpClientOptions  = {
      headers: {
        "Accept": "application/json",
        "Content-Length": tmplFile.size.toString(),
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      },
      body: tmplFile.data        
    };
    const response = await this._spHttpClient.post(uploadUrl, SPHttpClient.configurations.v1, spOpts);
    const jsonResp = await response.json();
    return jsonResp.ServerRelativeUrl;
  }

  private async getFileListItem(fileName: string): Promise<IFileItem> {
    const requestUrl = `${this.teamSiteUrl}/_api/web/GetFileByServerRelativeUrl('${this.teamSiteRelativeUrl}/Shared Documents/${fileName}')/ListItemAllFields`;
    const response = await this._spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
    const jsonResp = await response.json();
    const itemID = jsonResp.ID;
    return { id: itemID, type: jsonResp["@odata.type"].replace('#', '') }; 
  }

  private async updateFileListItem(itemID: string, itemType: string, offer: IOffer): Promise<void> {
    const requestUrl = `${this.teamSiteUrl}/_api/web/lists/GetByTitle('Documents')/items(${itemID})`;
    const spOpts : ISPHttpClientOptions  = {
      headers: {
        "Content-Type": "application/json;odata=verbose",
        "Accept": "application/json;odata=verbose",
        "odata-version": "3.0",
        "If-Match": "*",
        "X-HTTP-Method": "MERGE"
      },
      body: JSON.stringify({
        "__metadata": {
            "type": itemType
        },
        "Title": offer.title,
        "OfferingDescription": offer.description,
        "OfferingVAT": offer.vat,
        "OfferingNetPrice": offer.price,
        "OfferingDate": offer.date
      })
    };
    const response = await this._spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, spOpts);
    if (response.status === 204) {
      return Promise.resolve();
    }
    else {
      return Promise.reject();
    }
  }
}


