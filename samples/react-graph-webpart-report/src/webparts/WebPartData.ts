import { SitePage, WebPart } from "./types";
import { GraphServiceInstance } from "./GraphService";
import { MSGraphClientV3 } from "@microsoft/sp-http";


export async function _getSiteWebParts(graphClient: MSGraphClientV3, siteId: string): Promise<WebPart[]> {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const siteWebParts: any = [];
        const sitePages: SitePage[] = await GraphServiceInstance.GetSitePages(graphClient, siteId);
        for (let i: number = 0; i<sitePages.length-1; i++){
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const r: any = await GraphServiceInstance.GetWebParts(graphClient, siteId, sitePages[i].id);
            if (r !== null){
                siteWebParts.push(
                
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return siteWebParts.flatMap((t: any)=>t);
        
        
    } catch (error) {
        console.error(error);
        return null;
    }
}