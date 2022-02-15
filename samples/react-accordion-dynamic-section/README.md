# Dynamic Accordion - FAQ Builder

## Summary

- This sample is based on [Erik Benke](https://github.com/ejbenke) and [Mike Zimmerman](https://github.com/mikezimm)'s [Accordion Section FAQ Builder web part](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-accordion-section). It adds extended support for single FAQs list based on Category and dynamic properties selection.
- Adds a collapsible accordion section to an Office 365 SharePoint page or Teams Tab.
- Ideal for displaying FAQs.
- When adding the web part, you'll be prompted to select a list from a property panel dropdown (target list must be created with FAQ type Question and Answer.).
- The web part expects a column called **Category** of type choice that will be used as the category.
- The web part will automatically load all the properties in two dropdowns. One for Accordion Title and One for Accordion Content that must be html type.
- This will generate an accordion with one section for each item in the list.
- Modifications/deletions/additions to the list items in the target list of an added web part are automatically reflected on the page.
- To deploy to a Teams tab see current [Microsoft documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-web-part-as-ms-teams-tab).

![Web Part in Action](./assets/react-accordion-section.gif)

### Usage

**1) Create or use a list for FAQs.  It can have the FAQ format e.g. Title and a Content columns. You can also used the attached STP file if needed.:**

- The value in the Accordion Title property for each item will appear in the heading bars of the Accordion.
- The value in the Accordion Content property for each item will appear in the collapsible content section of the Accordion
- When creating the columns, select "Multiple lines of text". Rich text is now supported within the Content column.

![Create list for use with the Accordion](./assets/FAQsList.png)
[FAQ list Template for use with the Accordion](./assets/FAQsList.stp)
[FAQ Site Script  use with the Accordion](./assets/FAQsList.json)

**2) Add the Dynamic Accordion Section web part to your page & select your list, category, title and content columns. Click Apply and Publish:**

![Select list and other properties from property panel for use with the Accordion](./assets/AccordionSettings4.png)
![Completed properties.](./assets/AccordionSettings3.png)

## Compatibility

![SPFx 1.10.0](https://img.shields.io/badge/SPFx-1.10.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to a hosted SharePoint list")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Prerequisites

Please create the list as described above

## Solution

| Solution                                   | Author(s)                                                                                            |
| ------------------------------------------ | -----------------------------------------------------------------------------------------------------|
| SPFx Collapsible Accordion Section         | [Erik Benke](https://github.com/ejbenke) ([@erikjbenke](https://twitter.com/erikjbenke))             |
| SPFx Collapsible Accordion Section         | [Mike Zimmerman](https://github.com/mikezimm)                                                        |
| Dynamic SPFx Collapsible Accordion Section | [Jerry Yasir](https://github.com/jyasir)                                                             |
| Dynamic SPFx Collapsible Accordion Section | [Ari Gunawan](https://github.com/AriGunawan) ([@AriGunawan3023](https://twitter.com/AriGunawan3023)) |

## Version history

| Version | Date               | Comments                                                                                            |
| ------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| 1.0     | September 20, 2020 | Reused [Erik Benke] and [Mike Zimmerman] web part                                                   |
| 1.1     | September 20, 2020 | Added Support for Dynamic Column selection for reuseability, Dynamic Property Selection for Columns |
| 1.8     | August 8, 2021     | Add configuration for sorting the items                                                             |



## Minimal Path to Awesome

- Clone or download this repository
- Run in command line:
  - `npm install` to install the npm dependencies
  - `gulp serve` to display in Developer Workbench (recommend using your tenant workbench so you can test with real lists within your site)
- To package and deploy:
  - Use `gulp bundle --ship` & `gulp package-solution --ship`
  - Add the `.sppkg` to your SharePoint App Catalog

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.


You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/labels/react-accordion-dynamic-section) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-accordion-dynamic-section) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-accordion-dynamic-section&template=bug-report.yml&sample=react-accordion-dynamic-section&authors=@mikezimm%20@jyasir%20@AriGunawan&title=react-accordion-dynamic-section%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-accordion-dynamic-section&template=question.yml&sample=react-accordion-dynamic-section&authors=@mikezimm%20@jyasir%20@AriGunawan&title=react-accordion-dynamic-section%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-accordion-dynamic-section&template=question.yml&sample=react-accordion-dynamic-section&authors=@mikezimm%20@jyasir%20@AriGunawan&title=react-accordion-dynamic-section%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-accordion-dynamic-section" />

