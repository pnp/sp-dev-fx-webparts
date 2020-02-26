import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { sp, Web, RenderListDataOptions } from "@pnp/sp";


let _documentResults: string = "";
let _searchResults: string = "";

export default class ThumbnailWebPart extends BaseClientSideWebPart<void> {

    public async onInit(): Promise<void> {
        let web: Web = new Web(this.context.pageContext.web.absoluteUrl);

        const noRedirect = "?preferNoRedirect=true"; // undocumented, to avoid a redirect to CDN
        //const noRedirect = "";

        const libraryPath = "Shared Documents";
        // const libraryPath = "SitePages";

        // Using renderListDataAsStream for ease of use to also get the List ID on one call
        let options : RenderListDataOptions = RenderListDataOptions.ListData | RenderListDataOptions.ContextInfo;        
        let fileData = await web.getList(`${this.context.pageContext.web.serverRelativeUrl}/${libraryPath}`).renderListDataAsStream({
            RenderOptions: options ,
            ViewXml: "<View Scope='Recursive'><ViewFields><FieldRef Name='FileLeafRef' /><FieldRef Name='UniqueId' /></ViewFields><RowLimit Paged='TRUE'>10</RowLimit></View>"            
        });
        let searchResults = await sp.search({
            Querytext: `path:"${this.context.pageContext.web.absoluteUrl}/${libraryPath}" IsDocument:1`,
            RowLimit: 10,
            SelectProperties: ["FileName", "DocumentLink", "NormSiteID", "ParentLink", "SPWebUrl", "NormListID", "NormUniqueID"]
        });

        // Thumbnail URL docs
        // https://docs.microsoft.com/en-us/graph/api/driveitem-list-thumbnails

        // When using custom thumbnails:
        // The thumbnail returned may not exactly match the pixel dimensions that was requested,
        // but will match the aspect ratio. In some cases, a larger thumbnail may be returned than was requested,
        // if the thumbnail already exists and can easily be scaled to match the requested resolution.
        // Often it's better to request one of the default sizes

        const maxHeight = "c99999x150";
        //const maxWidth = "c150x99999";
        let listId = fileData["listName"].replace(/[{}]/g, "");
        fileData.ListData.Row.forEach(fileInfo => {
            
            let itemUniqueId = fileInfo["UniqueId"].replace(/[{}]/g, "");
            let fileName = fileInfo["FileLeafRef"];

            let thumbnailUrl = `/_api/v2.0/sites/${this.context.pageContext.site.id}/lists/${listId}/items/${itemUniqueId}/driveItem/thumbnails/0/${maxHeight}/content${noRedirect}`;
            _documentResults += (`<li>${fileName}<br/><img height="150" border="1" src="${thumbnailUrl}" onerror="this.src=''"></li>`);

        });

        searchResults.PrimarySearchResults.forEach(item => {
            let thumbnailUrl = `/_api/v2.0/sites/${item["NormSiteID"]}/lists/${item["NormListID"]}/items/${item["NormUniqueID"]}/driveItem/thumbnails/0/${maxHeight}/content${noRedirect}`;
            _searchResults += (`<li>${item["FileName"]}<br/><img height="150" border="1" src="${thumbnailUrl}" onerror="this.src=''"></li>`);
        });

    }

    public render(): void {
        this.domElement.innerHTML = `
        <div>
            <h3>REST loaded</h3>
            <ul>
                ${_documentResults}
            </ul>

            <h3>Search loaded</h3>
            <ul>
                ${_searchResults}
            </ul>
        </div>`;
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }
}
