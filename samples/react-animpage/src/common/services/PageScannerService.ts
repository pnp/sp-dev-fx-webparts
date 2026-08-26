// Import the main PnP SP interface
import {SPFI} from "@pnp/sp";
// Import PnP SP modules for webs, files, and client-side pages
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/files/web";
import "@pnp/sp/clientside-pages";

// Import interface describing the web part info we want to return
import { IPageWebPart } from "../models/IPageWebPart"
// Import helper to load a client-side page from a file
import { ClientsidePageFromFile} from "@pnp/sp/clientside-pages";

// Service responsible for scanning a modern SharePoint page
// and returning a list of all web parts on that page
export class PageScannerService{
    // Inject the PnP SP instance via constructor
    constructor(private sp:SPFI){}

    // Scan a page by its server-relative URL and return web parts found on it
    public async scanPage(pageUrl:string):Promise<IPageWebPart[]>{
        
        try {
        // Log the file path we're attempting to load
        console.log(`Attempting to load the file from path: ${pageUrl}`);
        // Get the file representing the page
        const file=await this.sp.web.getFileByServerRelativePath(pageUrl);
        // Load the client-side page from the file
        const page=await ClientsidePageFromFile(file);
        // Log how many sections have been found on the page
        console.log(`Loaded page with sections: ${page.sections.length}`);
             const result:IPageWebPart []=[];

        // Iterate through each section of the page
        page.sections.forEach((section, sectionIndex) => { /* eslint-disable-line */
            console.log(`Section ${sectionIndex} with columns: ${section.columns.length}`);
        // For each section, iterate through its columns
        section.columns.forEach((column,columnIndex )=> { /* eslint-disable-line */
              console.log(`Column ${columnIndex} with controls: ${column.controls.length}`);
              
          // For each column, iterate through its controls (web parts, text, etc.)
          column.controls.forEach((control) => { /* eslint-disable-line */

            // Unique identifier of the control (web part instance id)
            const webPartId = control.id;
            // If there is no ID, skip this control
            if (!webPartId){return;}

            // Try to get the web part's display name from different locations
            const webpartName=control?.data?.webPartData?.title ?? 
            control?.data?.webPartData?.serverProcessedContent?.searchablePlainTexts?.title 
            ?? "";

            // Push a simplified representation of the web part into the result array
            result.push({
                id:control.id,
                title:webpartName,
                sectionIndex,
                columnIndex,
            });
         
          });
        });
      });
    // Return the list of discovered web parts
    return result;
    }
             catch (error) {
            // If anything fails (file not found, parsing error, etc.), log and return an empty list
            console.error("Error loading page file or scanning:", error);
            return [];
            }

    }


}
