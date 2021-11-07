# Quote of the Day

## Summary

This web part displays a quote of the day by querying a third-party api or can display a quote entered manually into the web part property pane.

![picture of the web part in action](./assets/react-quotes-sample.png)


# Compatibility

![SPFx 1.9.1](https://img.shields.io/badge/SPFx-1.9.1-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

Solution|Author(s)
--------|---------
react-quotes | Zach Roberts

## Version history

Version|Date|Comments
-------|----|--------
1.0| November 11, 2019| Initial Release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`
* In the browser that opens add the web part to your page.
* After the web part has loaded it will load the quote automatically or you can edit the webparts properties to display a manual quote.

## Features

This web part loads a random quote from a third-party api (https://favqs.com/api). Additionally a quote can be entered manually and the text color of the quote and author can be adjusted through the web part properties.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/readme-template" />
