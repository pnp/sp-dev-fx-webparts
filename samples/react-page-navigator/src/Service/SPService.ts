import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { navLinkBuilder } from './NavLinkBuilder';

export class SPService {
  /* Array to store all unique anchor URLs */
  private static allUrls: string[] = [];

  /**
   * Returns the unique Anchor URL for a heading
   * @param headingValue The text value of the heading
   * @returns anchorUrl
   */
  private static GetAnchorUrl(headingValue: string): string {
    let anchorUrl = `#${headingValue
      .toLowerCase()
      .replace(/[{}|\[\]\<\>#@"'^%`?;:\/=~\\\s\s]/g, " ")
      .replace(/^(-|\s)*|(-|\s)*$/g, "")
      .replace(/\'|\?|\\|\/| |\&/g, "-")
      .replace(/-+/g, "-")
      .replace(/[+]/g, "%2B") // https://github.com/pnp/sp-dev-fx-webparts/issues/3686
      .substring(0, 128)}`;

    let counter = 1;
    this.allUrls.forEach(url => {
      if (url === anchorUrl) {
        if (counter != 1) {
          anchorUrl = anchorUrl.slice(0, -((counter - 1).toString().length + 1)) + '-' + counter;

        } else {
          anchorUrl += '-1';
        }

        counter++;
      }
    });

    return anchorUrl;
  }

  /**
   * Returns the Anchor Links for Nav element
   * @param context Web part context
   * @returns anchorLinks
   */
  public static async GetAnchorLinks(context: WebPartContext) {
    let anchorLinks: INavLink[] = [];

    try {
      /* Page ID on which the web part is added */
      const pageId = context.pageContext.listItem.id;

      /* Get the canvasContent1 data for the page which consists of all the HTML */
      const data = await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/sitepages/pages(${pageId})`, SPHttpClient.configurations.v1);
      const jsonData = await data.json();
      const canvasContent1 = jsonData.CanvasContent1;
      const canvasContent1JSON: any[] = JSON.parse(canvasContent1);

      this.allUrls = [];

      /* Traverse through all the Text web parts in the page */
      canvasContent1JSON.map((webPart) => {
        if (webPart.zoneGroupMetadata && webPart.zoneGroupMetadata.type === 1) {
          const headingIsEmpty: boolean = !webPart.zoneGroupMetadata.displayName;
          const headingValue: string = headingIsEmpty ? 'Empty Heading' : webPart.zoneGroupMetadata.displayName ;
          const anchorUrl: string = this.GetAnchorUrl(headingValue);
          this.allUrls.push(anchorUrl);

          // Limitation! This will break with headings containing the same name
          if (anchorLinks.filter(x => x.name === headingValue).length === 0) {
            // Add link to nav element
            anchorLinks.push({ name: headingValue, key: anchorUrl, url: !headingIsEmpty && anchorUrl, links: [], isExpanded: webPart.zoneGroupMetadata.isExpanded });
          }
        }

        if (webPart.innerHTML) {
          const HTMLString: string = webPart.innerHTML;
          const hasCollapsableHeader: boolean = webPart.zoneGroupMetadata && 
            webPart.zoneGroupMetadata.type === 1 && 
            ( anchorLinks.filter(x => x.name === webPart.zoneGroupMetadata.displayName).length === 1 || 
            !webPart.zoneGroupMetadata.displayName );

          const htmlObject: HTMLDivElement = document.createElement('div');
          htmlObject.innerHTML = HTMLString;

          const headers: NodeListOf<Element> = htmlObject.querySelectorAll('h1, h2, h3, h4');

          headers.forEach(header => {
            const headingValue: string = header.textContent;
            let headingOrder: number = parseInt(header.tagName.substring(1));
            // -2 because the text webpart heading 1 uses a h2 element
            headingOrder -= 2;

            if (hasCollapsableHeader) {
              headingOrder++;
            }

            const anchorUrl: string = this.GetAnchorUrl(headingValue);
            this.allUrls.push(anchorUrl);

            // Add link to nav element
            const newNavLink: INavLink = { name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true };
            navLinkBuilder.build<INavLink>(anchorLinks, newNavLink, headingOrder);
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    return anchorLinks;
  }
}
