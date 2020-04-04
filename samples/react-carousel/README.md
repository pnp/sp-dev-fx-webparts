# React Carousel Web Part

## Summary

This web part show images and videos in carousel 

It uses Microsoft Graph API to get image/video url and use PnPjs to load files from Picture library the images/videos are loading in lazy mode, progressively.


##  
![calendar](/samples/react-carousel/assets/carousel.gif) 



## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.8.2-green.svg)

## Applies to

* [SharePoint Online](https:/dev.office.com/sharepoint)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Site Url of library | Text| yes|
Picture Library| Choice/Dropdown | yes|  this is filled with all Picture Libraries (BaseTemplate : 109)
number images to load | number| yes | number between 1 and 200

 

## Solution
The web part Use PnPjs library, Microsoft Graph API, Office-ui-fabric-react components, react-slick Compoment

Solution|Author(s)
--------|---------
Carousel Image/Video  Web Part|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 11, 2019|Initial release


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




<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-carousel" />

