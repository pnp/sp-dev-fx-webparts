---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - AngularJS
  createdDate: 2/4/2017 12:00:00 AM
---
# Search Client-Side Web Part Built with Angular v1.x

## Summary
This is a sample search web part that illustrates how you can use Angular within the new SharePoint Framework

![Sample of the search web part](./assets/angularSearch.png)
This app uses the SharePoint Search REST API endpoint to query listitems of a specific content type and displays the results to the end user.
Ideally instead of selecting a content type for the search you would want to select a Result Source, but currently Result Sources are not
available through SharePoint's REST API.

The logic for querying the SharePoint Content Types in the properties of the webpart was in part due to Chris O'Brien and this [blog post](http://www.sharepointnutsandbolts.com/2016/09/sharepoint-framework-spfx-web-part-properties-dynamic-dropdown.html?m=0)

> Note: In order to use the ngOfficeFabric code I use the ModuleLoader to load newer source files than the currently Office Fabric UI in SharePoint Online, which will cause many of the icons not to load properly on the SharePoint Page this webpart is added to.

> Note: For the display template of the search results I'm currently using the Office Fabric UI List template. Ideally I was hoping to use the DocumentCard Component, however, that is not yet available through the ngOfficUIFabric.

> Note: The List display is not currently displaying correctly because there appears to be an issue when loading https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css which causes the dropdowns in the property pane not to work.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-rc0-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-search|David Hartman ([Slalom](https://slalom.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 4th, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Configuration Bliss

- clone this repo
- in the command line run:
 - `npm i typings -g`
 - `npm i`
 - `gulp serve --nobrowser`
- Enable the following features in you site
 - Publishing features on site collection
 - Publishing features on site

> Note: The content types that are pulled by the search come from the publishing content type which are only
> available when the Publishing Features are enabled on the site. I'm also searching by content type name
> and not by id because then I would get everything that inherits from that content type. I only want the
> the results for a specific content type and not everything that inherits that content type as well

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-search" />
