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
    let urlExists = true;
    // .replace(/'|?|\|/| |&/g, "-") replaces any blanks and special characters (list is for sure not complete) with "-"
    // .replace(/--+/g, "-") replaces any additional - with only one -; e.g. --- get replaced with -, -- get replaced with - etc.
    let anchorUrl = `#${headingValue
      .replace(/\'|\?|\\|\/| |\&/g, "-")
      .replace(/--+/g, "-")}`.toLowerCase();
    let urlSuffix = 1;
    while (urlExists === true) {
      urlExists = (this.allUrls.indexOf(anchorUrl) === -1) ? false : true;
      if (urlExists) {
        anchorUrl = anchorUrl + `-${urlSuffix}`;
        urlSuffix++;
      }
    }
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
      let headingOrder = 0;
      let prevHeadingOrder = 0;

      /* Traverse through all the Text web parts in the page */
      canvasContent1JSON.map((webPart) => {
        if (webPart.innerHTML) {
          let HTMLString: string = webPart.innerHTML;

          while (HTMLString.search(/<h[1-4]>/g) !== -1) {
            /* The Header Text value */
            // .replace(/<.+?>/gi, "") replaces in the headingValue any html tags like <strong> </strong>
            // .replace(/&.+;/gi, "") replaces in the headingValue any &****; tags like &nbsp;
            const headingValue = HTMLString.substring(HTMLString.search(/<h[1-4]>/g) + 4, HTMLString.search(/<\/h[1-4]>/g))
              .replace(/<.+?>/gi, "")
              .replace(/\&.+\;/gi, "");

            headingOrder = parseInt(HTMLString.charAt(HTMLString.search(/<h[1-4]>/g) + 2));

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

            /* Replace the added header links from the string so they don't get processed again */
            HTMLString = HTMLString.replace(`<h${headingOrder}>`, '').replace(`</h${headingOrder}>`, '');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }

    console.log('anchorLinks', anchorLinks);
    return anchorLinks;
  }
}