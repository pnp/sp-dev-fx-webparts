# Accordion Section -- FAQ Builder

## Summary

* Adds a collapsible accordion section to an Office 365 SharePoint page or Teams Tab.
* Ideal for creating FAQs.
* When adding the web part, you'll be prompted to select a list from a property panel dropdown (target list must have a Title column and Content column).  This will generate an accordion with one section for each item in the list.
* Modifications/deletions/additions to the list items in the target list of an added web part are automatically reflected on the page.
* To deploy to a Teams tab see current [Microsoft documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab).

![Web Part in Action](./assets/react-accordion-section.gif)

### Usage

**1) Create or use a list with a Title and a Content column:**

* The value in the Title column for each item will appear in the heading bars of the Accordion.  
* The value in the Content column for each item will appear in the collapsible content section of the Accordion
* When creating the columns, select "Multiple lines of text".  Rich text is now supported within the Content column.

![Create list for use with the Accordion](./assets/ListForAccordion.png)

**2) Add the Accordion Section web part to your page & select your list:**  


![Select list from property panel for use with the Accordion](./assets/AccordionSettings.png)


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/spfx-1.10.0-green.svg)

![Node.js LTS 8.x | LTS 10.x](https://img.shields.io/badge/Node.js-LTS%208.x%20%7C%20LTS%2010.x-green.svg)

![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-red.svg)

![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)

![Workbench Local (Partially) | Hosted](https://img.shields.io/badge/Workbench-Local%20(Partial)%20%7C%20Hosted-yellow.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

Please create the list as described above


## Solution

Solution|Author(s)
--------|---------
SPFx Collapsible Accordion Section|[Erik Benke](https://github.com/ejbenke) ([@erikjbenke](https://twitter.com/erikjbenke))
SPFx Collapsible Accordion Section|[Mike Zimmerman](https://github.com/mikezimm)
SPFx Collapsible Accordion Section|[Ravi Chandra](https://github.com/Ravikadri)
SPFx Collapsible Accordion Section|[Jack Vinitsky](https://github.com/jack-vinitsky)

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 14, 2019|Initial release
1.1|September 19, 2019|Minor updates, adding to GitHub
1.2|April 15, 2020|Added Polyfills for IE11 compatibility
1.3|July 10, 2020|Adding Rich Text support for Content panels
1.4|July 10, 2020|Upgraded to SPFx 1.10.
1.5|September 1, 2020|Adds ability to click on expanded section headers to collapse accordions
1.6|September 2, 2020|Added Web Part Title, and ability to expand multiple sections
1.7|January 5, 2021|Fixed web part title style to be consistent with first-party web parts; updated other dependencies

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone or download this repository
- Run in command line:
  - `npm install` to install the npm dependencies
  - `gulp serve` to display in Developer Workbench (recommend using your tenant workbench so you can test with real lists within your site)
- To package and deploy:
  - Use `gulp bundle --ship` & `gulp package-solution --ship`
  - Add the `.sppkg` to your SharePoint App Catalog


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-accordion-section" />
