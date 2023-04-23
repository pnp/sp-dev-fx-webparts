import { SitePage, WebPart } from "./types";
import { GraphServiceInstance } from "./GraphService";
import { MSGraphClientV3 } from "@microsoft/sp-http";


export async function _getSiteWebParts(graphClient: MSGraphClientV3, siteId: string): Promise<WebPart[]> {
    try {
        let siteWebParts: any = [];
        const sitePages: SitePage[] = await GraphServiceInstance.GetSitePages(graphClient, siteId);
        for (let i: number = 0; i<sitePages.length-1; i++){
            let r: any = await GraphServiceInstance.GetWebParts(graphClient, siteId, sitePages[i].id);
            if (r !== null){
                siteWebParts.push(
                
                    r.value.flatMap((siteWebPart: any) => ([
                        {
                            siteId: siteId,
                            pageTitle: sitePages[i].title,
                            id: siteWebPart.id,
                            title: siteWebPart.data.title,
                        }
                    ]))
                );  
            }
         
        }
        return siteWebParts.flatMap((t: any)=>t);
        
        
    } catch (error) {
        console.error(error);
        return null;
    }
}