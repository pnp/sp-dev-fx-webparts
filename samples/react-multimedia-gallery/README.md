# Image Gallery

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


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to the Microsoft Graph")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft Teams](https://products.office.com/en-US/microsoft-teams/group-chat-software)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Web Part Properties
 
| Property              | Type            | Required | comments                          |
| --------------------- | --------------- | -------- | --------------------------------- |
| Site Url of library   | Text            | yes      |
| Library               | Choice/Dropdown | yes      | this is filled with all libraries |
| number images to load | number          | yes      | number between 1 and 200          |

 

## Solution
The web part Use PnPjs library, Microsoft Graph API, Office-ui-fabric-react components, react-slick Component

| Solution                     | Author(s)   |
| ---------------------------- | ----------- |
| Multimedia Gallery  Web Part | [João Mendes](https://github.com/joaojmendes) |

## Version history

| Version | Date          | Comments                                                | Author(s)                                                          |
| ------- | ------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| 1.0.0   | June 24, 2019 | Initial release                                         | João Mendes                                                        |
| 1.1.0   | July 10, 2020 | Version Conflict with websocket-driver | [Peter Paul Kirschner](https://github.com/petkir) ([@petkir_at](https://twitter.com/petkir_at)) |

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - Add to AppCatalog and deploy

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-multimedia-gallery") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-multimedia-gallery) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-multimedia-gallery&template=bug-report.yml&sample=react-multimedia-gallery&authors=@joaojmendes%20@petkir&title=react-multimedia-gallery%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-multimedia-gallery&template=question.yml&sample=react-multimedia-gallery&authors=@joaojmendes%20@petkir&title=react-multimedia-gallery%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-multimedia-gallery&template=question.yml&sample=react-multimedia-gallery&authors=@joaojmendes%20@petkir&title=react-multimedia-gallery%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-multimedia-gallery" />

