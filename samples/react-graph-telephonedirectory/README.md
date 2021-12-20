# Telephone Directory using React, Microsoft Graph and SPFx

## Summary

This is sample web part using SPFx and MSGraph to fetch the users information based on First Name, Last Name and Email Address.
The web part will fetch data from directory using Graph API and display in details list.

![Telephone Directory using SPFx and Graph](./assets/Preview.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to Microsoft Graph")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
* [Microsoft Graph API](https://docs.microsoft.com/en-us/graph/overview)
* [Fluent UI](https://developer.microsoft.com/en-us/fluentui#/)
* [PnP Controls](https://pnp.github.io/sp-dev-fx-controls-react/)

## Prerequisites

> Define Graph API scope to Package-solution.json

![Graph API Scope](./assets/Capture.PNG)

## Solution

Solution|Author(s)
--------|---------
react-graph-telephonedirectory | [Dipen Shah](https://github.com/Dips365) ([@Dips_365](https://twitter.com/Dips_365))
react-graph-telephonedirectory | [Aimery Thomas](https://github.com/a1mery) ([@aimery_thomas](https://twitter.com/aimery_thomas))
react-graph-telephonedirectory | [mrkhandev](https://github.com/mrkhandev) 


## Version history

Version|Date|Comments
-------|----|--------
1.0|July 14,2020 | Initial Release
1.1|November 7,2020 | Upgraded to SPFx 1.11
1.2|August 7, 2021|Adding the Title from the Property Pane into the Web Part


## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  
  * `npm install`
  * `gulp build`
  * `gulp bundle`
  * `gulp package-solution`
  * [Upload .sppkg to appcatalog](https://www.slideshare.net/Dipen038/upload-sp-solution)
  * `Go to SharePoint Admin to grant access on graph API ` https://<Tenant>-admin.sharepoint.com/_layouts/15/online/AdminHome.aspx?source=sitecollections#/webApiPermissionManagement
  * `gulp serve`

## Features 

Demonstrates integration of SPFx and Graph API to search the organizational users information.

Description of the web part with possible additional details than in short summary. 
This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Detail List control from Fluent UI
* Web part Title control from PnP React
* Microsoft Graph API
* External API Integration with SharePoint Framework

## Video

[![Building company Phone Directory solution with SPFx and Microsoft Graph](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=5ArJneWBy8s "Building company Phone Directory solution with SPFx and Microsoft Graph")

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-graph-telephonedirectory") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-graph-telephonedirectory) and see what the community is saying.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-graph-telephonedirectory&template=bug-report.yml&sample=react-graph-telephonedirectory&authors=@Dips365%20@a1mery%20@mrkhandev&title=react-graph-telephonedirectory%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-graph-telephonedirectory&template=question.yml&sample=react-graph-telephonedirectory&authors=@Dips365%20@a1mery%20@mrkhandev&title=react-graph-telephonedirectory%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-graph-telephonedirectory&template=question.yml&sample=react-graph-telephonedirectory&authors=@Dips365%20@a1mery%20@mrkhandev&title=react-graph-telephonedirectory%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-graph-telephonedirectory" />
