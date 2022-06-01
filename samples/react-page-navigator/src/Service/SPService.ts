import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

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
      .trim()
      .replace(/[{}|\[\]\<\>#@"'^%`?;:/=~\\]/g, " ")
      .replace( /^\-*|\-*$/g , "")
      .trim()
      .replace(/\'|\?|\\|\/| |\&/g, "-")
      .replace(/--+/g, "-")}`;

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
    const anchorLinks: INavLink[] = [];

    try {
      /* Page ID on which the web part is added */
      const pageId = context.pageContext.listItem.id;

      /* Get the canvasContent1 data for the page which consists of all the HTML */
      const data = await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/sitepages/pages(${pageId})`, SPHttpClient.configurations.v1);
      const jsonData = await data.json();
      const canvasContent1 = jsonData.CanvasContent1;
      const canvasContent1JSON: any[] = JSON.parse(canvasContent1);

      /* Initialize variables to be used for sorting and adding the Navigation links */
      let headingIndex = 0;
      let subHeadingIndex = -1;
      let prevHeadingOrder = 0;

      this.allUrls = [];

      /* Traverse through all the Text web parts in the page */
      canvasContent1JSON.map((webPart) => {
        if (webPart.innerHTML) {
          const HTMLString: string = webPart.innerHTML;

          const htmlObject = document.createElement('div');
          htmlObject.innerHTML = HTMLString;

          const headers = htmlObject.querySelectorAll('h1, h2, h3, h4');

          headers.forEach(header => {
            const headingValue = header.textContent;
            const headingOrder = parseInt(header.tagName.substring(1));

            const anchorUrl = this.GetAnchorUrl(headingValue);
            this.allUrls.push(anchorUrl);

            /* Add links to Nav element */
            if (anchorLinks.length === 0) {
              anchorLinks.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
            } else {
              if (headingOrder <= prevHeadingOrder) {
                /* Adding or Promoting links */
                switch (headingOrder) {
                  case 2:
                    anchorLinks.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                    headingIndex++;
                    subHeadingIndex = -1;
                    break;
                  case 4:
                    if (subHeadingIndex > -1) {
                      anchorLinks[headingIndex].links[subHeadingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                    } else {
                      anchorLinks[headingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                    }
                    break;
                  default:
                    anchorLinks[headingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                    subHeadingIndex = anchorLinks[headingIndex].links.length - 1;
                    break;
                }
              } else {
                /* Making sub links */
                if (headingOrder === 3) {
                  anchorLinks[headingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                  subHeadingIndex = anchorLinks[headingIndex].links.length - 1;
                } else {
                  if (subHeadingIndex > -1) {
                    anchorLinks[headingIndex].links[subHeadingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                  } else {
                    anchorLinks[headingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                  }
                }
              }
            }
            prevHeadingOrder = headingOrder;
          });
        }
      });
    } catch (error) {
      console.log(error);
    }

    return anchorLinks;
  }
}