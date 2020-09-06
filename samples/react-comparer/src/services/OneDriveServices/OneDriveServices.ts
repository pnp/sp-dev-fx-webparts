// PnP
import { sp, RenderListDataOptions } from "@pnp/sp";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { IGetListDataAsStreamResult, IRow } from './IGetListDataAsStreamResult';
import { GetAbsoluteDomainUrl } from "../../CommonUtils";

export class OneDriveServices {

  private _oneDriveUrl: string = undefined;
  private _oneDriveFullUrl: string = undefined;

  private _context: WebPartContext = undefined;
  private _absoluteUrl: string = undefined;
  private _serverRelativeFolderUrl: string = undefined;

  private _accepts: string = undefined;
  /**
   *
   */
  constructor(context: WebPartContext, accepts: string) {
    this._context = context;
    this._accepts = accepts;

    this._absoluteUrl = this._context.pageContext.web.absoluteUrl;

    sp.setup({
      sp: { baseUrl: this._absoluteUrl }
    });

  }

  private _getOneDriveRootFolder = (): Promise<string> => {
    return sp.profiles.userProfile.then((currentUser) => {
      // Get the current user's personal site URL
      this._oneDriveUrl = currentUser.FollowPersonalSiteUrl;

      // Get the list of ... uh.. lists on the user's personal site
      // BaseTemplate 700 and BaseType 1 means document library
      const apiUrl: string = `${this._absoluteUrl}/_api/SP.RemoteWeb(@a1)/Web/Lists?$filter=BaseTemplate eq 700 and BaseType eq 1&@a1='${encodeURIComponent(this._oneDriveUrl)}'`;

      return this._context.spHttpClient.get(apiUrl,
        SPHttpClient.configurations.v1)
        .then((response: SPHttpClientResponse) => {
          return response.json().then((responseJSON: any) => {

            // Get the first library
            const myDocumentsLibrary = responseJSON.value[0];

            // Get the parent url
            const parentWebUrl: string = myDocumentsLibrary.ParentWebUrl;

            // Get the first root folder. Assumed it is the same name as the library. Could be wrong.
            const serverRelativeRootFolder: string = `${myDocumentsLibrary.ParentWebUrl}/${myDocumentsLibrary.Title}`;

            // Build an absolute URL so that we can refer to it
            this._oneDriveFullUrl = this._buildOneDriveAbsoluteUrl(serverRelativeRootFolder);

            return serverRelativeRootFolder;
          });
        });
    });
  }

  public GetListDataAsStream(rootFolder?: string) {
    // If we don't know what the root OneDrive folder is
    if (this._serverRelativeFolderUrl === undefined) {
      // Get the user's OneDrive root folder
      return this._getOneDriveRootFolder().then((oneDriveRootFolder: string) => {
        // Call the OneDrive root folder or whatever we passed in as root folder
        return this._getListDataAsStream(rootFolder ? rootFolder : oneDriveRootFolder);
      });
    } else {
      return this._getListDataAsStream(rootFolder ? rootFolder : this._serverRelativeFolderUrl);
    }
  }

  private _getListDataAsStream = (rootFolder: string): Promise<IGetListDataAsStreamResult> => {
    const listFullUrl: string = this._oneDriveFullUrl;
    const encodedFullUrl: string = encodeURIComponent(`'${listFullUrl}'`);
    const encodedRootFolder: string = encodeURIComponent(rootFolder);
    const listItemUrl: string = `${this._absoluteUrl}/_api/SP.List.GetListDataAsStream?listFullUrl=${encodedFullUrl}&View=&RootFolder=${encodedRootFolder}`;

    const fileFilter: string = OneDriveServices.GetFileTypeFilter(this._accepts);
    const data: string = JSON.stringify({
      parameters: {
        RenderOptions: RenderListDataOptions.ContextInfo | RenderListDataOptions.ListData | RenderListDataOptions.ListSchema | RenderListDataOptions.ViewMetadata | RenderListDataOptions.EnableMediaTAUrls | RenderListDataOptions.ParentInfo,//4231, //4103, //4231, //192, //64
        AllowMultipleValueFilterForTaxonomyFields: true,
        ViewXml:
          `<View>
            <Query>
              <Where>
                <Or>
                  <And>
                    <Eq>
                      <FieldRef Name="FSObjType" />
                      <Value Type="Text">1</Value>
                    </Eq>
                    <Eq>
                      <FieldRef Name="SortBehavior" />
                      <Value Type="Text">1</Value>
                    </Eq>
                  </And>
                  <In>
                    <FieldRef Name="File_x0020_Type" />
                    ${fileFilter}
                  </In>
                </Or>
              </Where>
            </Query>
            <ViewFields>
              <FieldRef Name="DocIcon"/>
              <FieldRef Name="LinkFilename"/>
              <FieldRef Name="Modified"/>
              <FieldRef Name="Editor"/>
              <FieldRef Name="FileSizeDisplay"/>
              <FieldRef Name="SharedWith"/>
              <FieldRef Name="MediaServiceFastMetadata"/>
              <FieldRef Name="MediaServiceOCR"/>
              <FieldRef Name="_ip_UnifiedCompliancePolicyUIAction"/>
              <FieldRef Name="ItemChildCount"/>
              <FieldRef Name="FolderChildCount"/>
              <FieldRef Name="SMTotalFileCount"/>
              <FieldRef Name="SMTotalSize"/>
            </ViewFields>
            <RowLimit Paged="TRUE">100</RowLimit>
          </View>`

      }
    });

    const spOpts: ISPHttpClientOptions = {
      method: "POST",
      body: data
    };

    return this._context.spHttpClient.fetch(listItemUrl, SPHttpClient.configurations.v1, spOpts)
      .then((listResponse: SPHttpClientResponse) => listResponse.json().then((listResponseJSON: IGetListDataAsStreamResult) => listResponseJSON));
  }

  /**
 * Creates an absolute URL
 */
  private _buildOneDriveAbsoluteUrl = (relativeUrl: string) => {
    const siteUrl: string = GetAbsoluteDomainUrl(this._oneDriveUrl);
    return siteUrl + relativeUrl;
  }

  /**
   * Builds a file filter
   */
  public static GetFileTypeFilter(accepts: string) {
    let fileFilter: string = undefined;
    fileFilter = "<Values>";
    accepts.split(",").forEach((fileType: string, index: number) => {
      fileType = fileType.replace(".", "");
      if (index > 0) {
        fileFilter = fileFilter + `<Value Type="Text">${fileType}</Value>`;
      }
    });
    fileFilter = fileFilter + "</Values>";

    return fileFilter;
  }

}
