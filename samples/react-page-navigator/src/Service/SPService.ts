import { INavLink } from 'office-ui-fabric-react/lib/Nav';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';

export class SPService {
  public static async GetAnchorLinks(context: WebPartContext) {
    let anchorLinks: INavLink[] = [];

    try {
      /* Page ID on which the web part is added */
      let pageId = context.pageContext.listItem.id;

      /* Get the canvasContent1 data for the page which consists of all the HTML */
      let data = await context.spHttpClient.get(`${context.pageContext.web.absoluteUrl}/_api/sitepages/pages(${pageId})`, SPHttpClient.configurations.v1);
      let jsonData = await data.json();
      let canvasContent1 = jsonData.CanvasContent1;
      let canvasContent1JSON: any[] = JSON.parse(canvasContent1);

      /* Initialize variables to be used for sorting and adding the Navigation links */
      let depth = 0;
      let headingIndex = 0;
      let subHeadingIndex = -1;
      let headingOrder = 0;
      let prevHeadingOrder = 0;

      /* Array to store all unique anchor URLs */
      let allUrls: string[] = [];

      /* Traverse through all the Text web parts in the page */
      canvasContent1JSON.map((webPart) => {
        if (webPart.innerHTML) {
          let HTMLString: string = webPart.innerHTML;

          while (HTMLString.search(/<h[1-4]>/g) !== -1) {
            /* The Header Text value */
            let headingValue = HTMLString.substring(HTMLString.search(/<h[1-4]>/g) + 4, HTMLString.search(/<\/h[1-4]>/g));
            console.log(headingValue);
            headingOrder = parseInt(HTMLString.charAt(HTMLString.search(/<h[1-4]>/g) + 2));

            /* Check if same anchorUrl already exists */
            let urlExists = true;
            let anchorUrl = `#${headingValue.replace(/ /g, '-')}`.toLowerCase();
            let urlSuffix = 1;
            while (urlExists === true) {
              urlExists = (allUrls.indexOf(anchorUrl) === -1) ? false : true;
              if (urlExists) {
                anchorUrl = anchorUrl + `-${urlSuffix}`;
                urlSuffix++;
              }
            }
            allUrls.push(anchorUrl);

            /* Add links to Nav element */
            if (anchorLinks.length === 0) {
              anchorLinks.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
              prevHeadingOrder = headingOrder;
            } else {
              if (headingOrder <= prevHeadingOrder) {
                /* Adding or Promoting links */
                if (depth === 0) {
                  anchorLinks.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                  headingIndex++;
                  subHeadingIndex = -1;
                } else {
                  if ((depth === 2) && (headingOrder === prevHeadingOrder)) {
                    anchorLinks[headingIndex].links[subHeadingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                  } else {
                    anchorLinks[headingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                    subHeadingIndex++;
                  }
                  prevHeadingOrder = headingOrder;
                }
              } else {
                /* Making sub links */
                if (depth === 0) {
                  anchorLinks[headingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                  subHeadingIndex++;
                } else {
                  anchorLinks[headingIndex].links[subHeadingIndex].links.push({ name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: true });
                }
                depth++;
                prevHeadingOrder = headingOrder;
              }
            }

            /* Replace the added header links from the string so they don't get processed again */
            HTMLString = HTMLString.replace(`<h${headingOrder}>`, '');
            HTMLString = HTMLString.replace(`</h${headingOrder}>`, '');
          }
        }
      });
    } catch (error) {
      console.log(error);
    }

    console.log(anchorLinks);
    return anchorLinks;
  }
}