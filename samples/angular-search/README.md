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

The logic for querying the SharePoint Content Types in the properties of the web part was in part due to Chris O'Brien and this [blog post](http://www.sharepointnutsandbolts.com/2016/09/sharepoint-framework-spfx-web-part-properties-dynamic-dropdown.html?m=0)

> Note: In order to use the ngOfficeFabric code I use the ModuleLoader to load newer source files than the currently Office Fabric UI in SharePoint Online, which will cause many of the icons not to load properly on the SharePoint Page this web part is added to.

> Note: For the display template of the search results I'm currently using the Office Fabric UI List template. Ideally I was hoping to use the DocumentCard Component, however, that is not yet available through the ngOfficUIFabric.

> Note: The List display is not currently displaying correctly because there appears to be an issue when loading https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css which causes the dropdowns in the property pane not to work.

## Compatibility

![SPFx 0.9.0](https://img.shields.io/badge/SPFx-0.9.0-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-search|[David Hartman](https://github.com/davidhartman) ([Slalom](https://slalom.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 4th, 2017|Initial release


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

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20angular-search") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=angular-search) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20angular-search&template=bug-report.yml&sample=angular-search&authors=@davidhartman&title=angular-search%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20angular-search&template=question.yml&sample=angular-search&authors=@davidhartman&title=angular-search%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20angular-search&template=question.yml&sample=angular-search&authors=@davidhartman&title=angular-search%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular-search" />
