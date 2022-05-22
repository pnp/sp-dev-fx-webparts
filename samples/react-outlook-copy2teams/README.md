# Outlook to SharePoint


## Summary
This SPFx Outlook Add-In lets you browse your OneDrive, joined Teams or Groups and select a folder to save your complete mail in there.
This sample shows you working with the current Office context and receive information on currently selected mail from there.
Furthermore it shows you how to retrieve a complete mail as a mimestream via Microsoft Graph and finally two file operations with Microsoft Graph as well:
* Writing normal files smaller 4MB
* Writing big files with an UploadSession when bigger than 4MB

## outlook-2-sp-spfx in action
![WebPartInAction](https://mmsharepoint.files.wordpress.com/2020/01/addin_overall.png)

A detailed functionality and technical description can be found in the [author's blog series](https://mmsharepoint.wordpress.com/2020/01/11/an-outlook-add-in-with-sharepoint-framework-spfx-introduction/)

#
## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [Tutorial for creating Outlook Web Access extension using SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/office-addins-tutorial)

## Solution

Solution|Author(s)
--------|---------
outlook-2-sp-spfx| Markus Moeller ([@moeller2_0](http://www.twitter.com/moeller2_0))

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 29, 2020|Initial release
1.1|April 06, 2020|Open extensions to store metadata added

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * restore dependencies: `npm install`
  From here you can also follow the deployment steps from the official [Microsoft Tutorial](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/office-addins-tutorial#packaging-and-deploying-your-solution-to-sharepoint)
  * build solution `gulp build --ship`
  * bundle solution: `gulp bundle --ship`
  * package solution: `gulp package-solution --ship`
  * locate solution at `.\sharepoint\solution\outlook-2-sp-spfx.sppkg`
  * upload it to your tenant app catalog
  * Go to your Outlook Web Access then double-click an e-mail to open it in a window
  * Choose **...** and **Get Add-ins**
  * Choose **My Add-ins** from left menu
  * Under **Custom add-ins**, choose **+ Add a custom add-in**, then **Add from file...**
  * Upload the manifest xml file from `\officeAddin` folder
  * Click **Install** on the warning message to get your add-in available on the tenant
  * Close the add-in window by clicking **X** on the top-right corner
  * Activate again the context menu from **...** and choose **Copy to SharePoint** to activate the add-in in your inbox

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This Outlook Add-In shows the following capabilities on top of the SharePoint Framework:

* Select Office context and attributes of currently selected mail
* Use Microsoft Graph to retrieve joined Groups and Teams
* Use Microsoft Graph to retrieve folders and subfolders for OneDrive or Teams/Group drives
* Use Microsoft Graph to retrieve complete mail mimestream by given ID
* Use Microsoft Graph to save normal or big files (in size bigger 4MB) with different concepts
* Optionally store metadata of save operation to copied mail with open extension (configure line 15 Outlook2SharePoint.tsx)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-outlook-copy2teams" />
