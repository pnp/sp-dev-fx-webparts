---
page_type: sample
products:
- office-sp
- sharepoint
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - React
  createdDate: 06/17/2016 12:00:00 AM
---

# Images and Videos in a Carousel

## Summary

This web part show images and videos in carousel

It uses Microsoft Graph API to get image/video url and use PnPjs to load files from Picture library the images/videos are loading in lazy mode, progressively.

![carousel](./assets/carousel.gif)

## Used SharePoint Framework Version

![1.11](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Site Url of library | Text| yes|
Picture Library| Choice/Dropdown | yes|  this is filled with all Picture Libraries (BaseTemplate : 109)
number images to load | number| yes | number between 1 and 200

### react-slick Props

For all available props, go [here](https://react-slick.neostack.com/docs/api/).

### react-slick Methods

For all available methods, go [here](https://react-slick.neostack.com/docs/api#methods)

## Solution

The web part Use PnPjs library, Microsoft Graph API, Office-ui-fabric-react components, react-slick Component

Solution|Author(s)
--------|---------
Carousel Image/Video  Web Part|João Mendes
Carousel Image/Video  Web Part|Rahul Suryawanshi ([@rahulsuryawansh](https://twitter.com/rahulsuryawansh))
Carousel Image/Video  Web Part|Don Kirkham ([@DonKirkham](https://twitter.com/DonKirkham))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 11, 2019|Initial release
2.0.0|June 17, 2020|Upgraded to SPFx v1.10.0 (Rahul Suryawanshi)
3.0.0|October 31, 2020|Upgraded to SPFx v1.11.0 (Don Kirkham)


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add to AppCatalog and deploy`
- Make sure you have at least one **Picture Library** on one of your site collections
- Add the web part to a page
- In the web part's property pane, enter the **Site Url** (if library is on a different site collect) and select a **Picture Library** from the **Library** drop-down.


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-carousel" />
