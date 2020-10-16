# React Image Gallery

## Summary

This web part show images and videos in responsive grid, on click it show images and videos in a carousel view.

It uses Microsoft Graph API to get thumbnails and image/video url and use PnPjs to load files from library the images/videos are loading in lazy mode, progressively.


##  
![callendar](/samples/react-multimedia-gallery/assets/MultimediaGallery.gif) 

 
##  Web Part  - Screenshots

![gallery](/samples/react-multimedia-gallery/assets/Annotation2.jpg)

![gallery](/samples/react-multimedia-gallery/assets/Annotation0.jpg)

![gallery](/samples/react-multimedia-gallery/assets/Annotation1.jpg)


![gallery](/samples/react-multimedia-gallery/assets/Screenshot1.png)


![gallery](/samples/react-multimedia-gallery/assets/Screenshot2.png)






## Used SharePoint Framework Version 
![SPFx 1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## WebPart Properties
 
| Property              | Type            | Required | comments                          |
| --------------------- | --------------- | -------- | --------------------------------- |
| Site Url of library   | Text            | yes      |
| Library               | Choice/Dropdown | yes      | this is filled with all libraries |
| number images to load | number          | yes      | number between 1 and 200          |

 

## Solution
The web part Use PnPjs library, Microsoft Graph API, Office-ui-fabric-react components, react-slick Component

| Solution                     | Author(s)   |
| ---------------------------- | ----------- |
| Multimedia Gallery  Web Part | João Mendes |

## Version history

| Version | Date          | Comments                                                | Author(s)                                                          |
| ------- | ------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| 1.0.0   | June 24, 2019 | Initial release                                         | João Mendes                                                        |
| 1.1.0   | July 10, 2020 | Version Conflict with websocket-driver | Peter Paul Kirschner ([@petkir_at](https://twitter.com/petkir_at)) |


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




<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-multimedia-gallery" />

