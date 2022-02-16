# Word Game
## Summary

A fun game where you unscramble the words before the time runs out. It stores everyone's high scores in a SharePoint List on the Site.

![Word Game Preview](./assets/preview.gif)


## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Prerequisites

- SharePoint Online Tenant or SharePoint 2019 On Prem

## Solution

Solution|Author(s)
--------|---------
react-word-game | Neil Barkhina ([www.neilb.net](https://www.neilb.net/))
react-word-game | Don Kirkham ([@DonKirkham](https://twitter.com/DonKirkham/))

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 27, 2020|Initial release
2.0|Nov 4, 2020|Upgrade to SPFx v1.11.0 (Don Kirkham)


## Minimal Path to Awesome

* Clone this repository
* In the command line run:
  * `npm install`
  * `gulp serve`
  * If you haven't trusted your dev cert yet run
    * `gulp trust-dev-cert`
* To Deploy it in your SharePoint Environment
  * `gulp --ship`
  * `gulp package-solution --ship`
  * Upload the `.sppkg` file from the `sharepoint\solution` folder into your App Catalog

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This demonstrates how you can create a fun game to play with your SharePoint peers. It was built using React and also uses jQuery to help load the Word List. It demonstrates these features:

- SharePoint REST API's
  - Creating List and List Items API
  - Creating columns in a SharePoint List
- Web Part Property Pane Settings
- CSS Styling and Animations
- Fun and engaging UX
- Responsive Design


If you want to disable the high scores feature you can edit the Web Part Settings. The Web Part stores the high scores in a SharePoint List that it creates called WordGameList. You can also change the Game Title in the settings:

![Settings](./assets/settings.PNG)

It also uses responsive design which works great on the SharePoint Mobile App:

![Mobile](./assets/wordgame_mobile.png)


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-word-game" />
