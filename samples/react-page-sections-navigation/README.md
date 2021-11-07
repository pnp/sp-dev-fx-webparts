# Page Sections Navigation

Sample web parts allowing to add sections navigation to the SharePoint page.

![Navigation configuration](./assets/page-nav.gif)


# Compatibility

![SPFx 1.8](https://img.shields.io/badge/SPFx-1.8.0-green.svg) 
![Node.js v8](https://img.shields.io/badge/Node.js-v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
page-sections-navigation|Alex Terentiev (MVP, [Sharepointalist Inc.](http://www.sharepointalist.com), [AJIXuMuK](https://github.com/AJIXuMuK), [@alexaterentiev](https://twitter.com/alexaterentiev))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 27, 2019|Initial release
1.1|March 22, 2019| Update to SPFx 1.8, additional theme, comments

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* clone this repo
* move to right folder
* in the command line run:
  * `npm install`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* from the _sharepoint/solution_ folder, deploy the .sppkg file to the App catalog in your tenant
* in the site where you want to test this solution
  * add the app named _page-sections-navigation-client-side-solution_
  * edit a page
  * add _Page Sections Navigation_ web part
  * add as much _Page Sections Navigation Anchor_ web parts as you want - each anchor adds an item to the navigation
  * configure web parts

## Features

This sample illustrates how to use SharePoint Framework Dynamic Data features to connect web parts on the page.
It also can be used as ready-to-go solution to add page sections navigation to SharePoint pages.

## Custom CSS
The web parts in the sample allow to use custom CSS to override the styles. You can set _Custom CSS URL_ property of *Page Sections Navigation* web part and include css classes for both Navigation and Anchor in referenced file.
Please, refer [custom css sample](./assets/psn-custom.css) for the CSS sample.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-page-sections-navigation" />
