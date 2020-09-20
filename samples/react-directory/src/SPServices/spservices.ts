import { WebPartContext } from "@microsoft/sp-webpart-base";
import { graph } from "@pnp/graph";
import { sp, PeoplePickerEntity, ClientPeoplePickerQueryParameters, SearchQuery, SearchResults, SearchProperty, SortDirection } from '@pnp/sp';
import { PrincipalType } from "@pnp/sp/src/sitegroups";
import { isRelativeUrl } from "office-ui-fabric-react";
import { ISPServices } from "./ISPServices";


export class spservices implements ISPServices {
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async searchUsers(searchString: string, searchFirstName: boolean): Promise<SearchResults> {
        const _search = !searchFirstName ? `LastName:${searchString}*` : `FirstName:${searchString}*`;
        const searchProperties: string[] = ["FirstName", "LastName", "PreferredName", "WorkEmail", "OfficeNumber", "PictureURL", "WorkPhone", "MobilePhone", "JobTitle", "Department", "Skills", "PastProjects", "BaseOfficeLocation", "SPS-UserType", "GroupId"];
        try {
            if (!searchString) return undefined;
            let users = await sp.searchWithCaching(<SearchQuery>{
                Querytext: _search,
                RowLimit: 500,
                EnableInterleaving: true,
                SelectProperties: searchProperties,
                SourceId: 'b09a7990-05ea-4af9-81ef-edfab16c4e31',
                SortList: [{ "Property": "LastName", "Direction": SortDirection.Ascending }],
            });
            return users;
        } catch (error) {
            Promise.reject(error);
        }
    }

    public async _getImageBase64 (pictureUrl: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.addEventListener("load", () => {
                let tempCanvas = document.createElement("canvas");
                tempCanvas.width = image.width,
                    tempCanvas.height = image.height,
                    tempCanvas.getContext("2d").drawImage(image, 0, 0);
                let base64Str;
                try {
                    base64Str = tempCanvas.toDataURL("image/png");
                } catch (e) {
                    return "";
                }
                resolve(base64Str);
            });
            image.src = pictureUrl;
        });
    }

    public async searchUsersNew(searchString: string, srchQry: string, isInitialSearch: boolean, pageNumber?: number): Promise<SearchResults> {
        let qrytext: string = '';
        if (isInitialSearch) qrytext = `FirstName:${searchString}* OR LastName:${searchString}*`;
        else {
            if (srchQry) qrytext = srchQry;
            else {
                if (searchString) qrytext = searchString;
            }
            if (qrytext.length <= 0) qrytext = `*`;
        }
        const searchProperties: string[] = ["FirstName", "LastName", "PreferredName", "WorkEmail", "OfficeNumber", "PictureURL", "WorkPhone", "MobilePhone", "JobTitle", "Department", "Skills", "PastProjects", "BaseOfficeLocation", "SPS-UserType", "GroupId"];
        try {
            let users = await sp.search(<SearchQuery>{
                Querytext: qrytext,
                RowLimit: 500,
                EnableInterleaving: true,
                SelectProperties: searchProperties,
                SourceId: 'b09a7990-05ea-4af9-81ef-edfab16c4e31',
                SortList: [{ "Property": "LastName", "Direction": SortDirection.Ascending }],
            });
            if (users && users.PrimarySearchResults.length > 0) {
                for (let index = 0; index < users.PrimarySearchResults.length; index++) {
                    let user: any = users.PrimarySearchResults[index];
                    if (user.PictureURL) {
                        user = { ...user, PictureURL: `/_layouts/15/userphoto.aspx?size=M&accountname=${user.WorkEmail}` };
                        users.PrimarySearchResults[index] = user;
                    }
                }
            }
            return users;
        } catch (error) {
            Promise.reject(error);
        }
    }
}
