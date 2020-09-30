---
page_type: sample
products:
- office-sp
- office-365
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - jQuery
  createdDate: 5/1/2017 12:00:00 AM
---
## Bootstrap Slider Built with jQuery v1.x and Boostrap v3.x

## Summary
Sample bootstrap slider which pulls the slides from a list inside the SharePoint site. The list is automatically deployed once the app is installed in the SharePoint site.

![First Slider Image](./assets/slider_image_1.png)

![Second Slider Image](./assets/slider_image_2.png)

![Deployed List](./assets/List.png)

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Applies to

* [SharePoint Framework Developer GA](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
bootstrap-slider|David Hartman ([Slalom](https://slalom.com))

## Version History

Version|Date|Comments
-------|----|--------
1.0|April 25th, 2017|Initial Release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Configuration Bliss
- clone this repo
- in write-manifests.json
 - fill in the correct CDN path
- in the command line run:
 - `npm i`
 - `gulp bundle --ship`
 - `gulp package-solution --ship`
- in your SharePoint Online tenant app store install the app
- add your assets to the specified path in the write-manifests.json
 - the assets are found in the **temp/deploy** folder
- add the app to your SharePoint Online site
 - When the app is finished installing you should see a **SPFx List** in the **Site Contents** of the site
 ![Deployed List](./assets/List.png)
- Add items to the **SPFx List** in order for slides to display in the webpart

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/bootstrap-slider" />

