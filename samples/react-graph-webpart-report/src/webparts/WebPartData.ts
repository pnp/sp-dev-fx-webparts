import { GraphWebPartCollection, WebPart } from "./types";
import { IGraphService } from "./GraphService";
import {SitePage} from "@microsoft/microsoft-graph-types-beta"


export async function _getSiteWebParts(service: IGraphService, siteId: string): Promise<WebPart[]> {
    try {
        const siteWebParts: WebPart[] = [];
        const sitePages: SitePage[] = await service.GetSitePages(siteId);
        for (let i: number = 0; i <= sitePages.length - 1; i++) {
            const graphWebParts: GraphWebPartCollection | null = await service.GetWebParts(siteId, sitePages[i].id);
            if (graphWebParts !== null) {
                graphWebParts.value.forEach(siteWebPart => {
                    siteWebParts.push(
                        {
                            siteId: siteId,
                            pageTitle: sitePages[i].title,
                            id: siteWebPart.id,
                            title: siteWebPart.innerHtml !== undefined ? "Text" : siteWebPart.data.title,
                        }
                    )
                });
            }
        }
        return siteWebParts;
    } catch (error) {
        console.error(error);
        return null;
    }
}