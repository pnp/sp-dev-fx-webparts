# Site Designs Manager 

## Summary
This web part allows tenant administrators to manage site designs through a graphical interface.  
We can create, edit, delete work with site scripts associated to a site design, manage permissions and apply site design to one or more sites.

Only users with Tenant Admin Role are allowed to managed tenant properties. 

##  Site Designs List

![site design list](./assets/screen1.jpg)

## Add, Edit and Delete site designs

![tenant properties](./assets/screen2.jpg)  



![tenant properties](./assets/screen3.jpg)  



![tenant properties](./assets/screen3.1.jpg) 



![tenant properties](./assets/screen4.jpg)  


## Site Designs Rights

![tenant properties](./assets/screen5.jpg)  



![tenant properties](./assets/screen6.jpg)  



![tenant properties](./assets/screen7.jpg)  



![tenant properties](./assets/screen8.jpg)  



## Site Design Site Scripts

![tenant properties](./assets/screen9.jpg)  



![tenant properties](./assets/screen10.jpg)  



![tenant properties](./assets/screen11.jpg)  



![tenant properties](./assets/screen12.jpg)  



![tenant properties](./assets/screen13.jpg)  



## Apply Site Design


![tenant properties](./assets/screen14.jpg)  



![tenant properties](./assets/screen15.jpg)  



![tenant properties](./assets/screen16.jpg)  



![tenant properties](./assets/screen17.jpg)  


## Compatibility

![SPFx 1.8](https://img.shields.io/badge/SPFx-1.8.0-green.svg) 
![Node.js v8](https://img.shields.io/badge/Node.js-v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Web Part Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
WebPart Title| Text| no|
 

## Solution
The Web Part Use PnPjs library, Office-ui-fabric-react components.

Solution|Author(s)
--------|---------
Site Design Manager Web Part|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 08, 2019|Initial release

## Minimal Path to Awesome

- Clone this repository
- Move to sample folder
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - Add to AppCatalog and deploy

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-manage-sitedesigns" />
