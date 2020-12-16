import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/user-custom-actions";
import { ISearchQuery } from "@pnp/sp/search";
import { Web } from "@pnp/sp/webs";


export default class ApplicationCustomizersService {

    /**
     * fetchAllApplictionCustomizers
     */
    public fetchAllApplictionCustomizers = async (webURL: string) => {
        let web = Web(webURL);
        let response;
        try {
            response = await web.userCustomActions();
            console.log(response);
            //let temp = await sp.site.userCustomActions();
            //console.log(temp);
        } catch (error) {
            console.log(error);
            response = error;
        }
        return response;
    }

    /**
     * getAllSiteCollection
     */
    public getAllSiteCollection = async () => {
        let response;
        try {
            response = await sp.search(<ISearchQuery>{
                Querytext: "contentclass:STS_Site",
                SelectProperties: ["Title", "SPSiteUrl", "WebTemplate"],
                RowLimit: 1000,
                TrimDuplicates: true
            });
            console.log(response.PrimarySearchResults);
        } catch (error) {
            console.log(error);
            response = error;
        }
        return response;
    }

    /**
     * updateApplicationCustomizer
     */
    public updateApplicationCustomizer = async (webURL: string | number, selectedID: string, updateJSON: any) => {
        let web = Web(webURL as string);
        let response;
        try {
            response = await web.userCustomActions.getById(selectedID).update(updateJSON);
        } catch (error) {
            console.log(error);
        }
    }

}