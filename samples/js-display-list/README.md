---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  createdDate: 5/15/2017 12:00:00 AM
---
# Display List

## Summary

This simplistic sample web part demonstrates the use of JavaScript in a SharePoint Framework web part. The properties pane for this web part display a drop down list of lists in the current web. Once the user selects one of the lists, the web part display the contents of the list.

![Screenshot of the Display List web part](./assets/display-list-preview.png).

> Does only show data when hosted in SharePoint. No mock data at this point for local testing the rendering.


## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") ![Local Workbench (Partially)](https://img.shields.io/badge/Local%20Workbench-Partially-yellow.svg "Only basic functionality works on local workbench") ![Hosted Workbench](https://img.shields.io/badge/Hosted%20Workbench-Fully-green.svg "Hosted workbench fully supported")
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Solution

Solution|Author(s)
--------|---------
js-display-list| Naamat Al-Aswad, P.Eng.
js-display-list| Velin Georgiev ([@VelinGeorgiev](https://twitter.com/velingeorgiev)) (Updated to GA Version)
js-display-list| Ryan Schouten ([@ShrPntKnight](https://twitter.com/ShrPntKnight)) (Upgraded to SPFx 1.11.0)



## Version history

Version|Date|Comments
-------|----|--------
1.0|September 22, 2016|Initial release
1.1|May 15, 2017|Updated to GA Version
2.0|August 29, 2020|Upgraded to SPFx 1.11.0

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve`
  - Open the *workbench* on your Office 365 Developer tenant
      - Basic functionality can be tested locally, data is only shown when used in context of SharePoint

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

The js-display-list web part displays the content of the list specified in the web part properties pane.

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using a dynamic drop down box in the web part properties pane to display the titles of the lists in the current web
* The use of a Loading Indicator
* Logging
* Rendering error messages.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-display-list&template=bug-report.yml&sample=js-display-list&authors=@VelinGeorgiev%20@sharepointknight&title=js-display-list%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-display-list&template=question.yml&sample=js-display-list&authors=@VelinGeorgiev%20@sharepointknight&title=js-display-list%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-display-list&template=question.yml&sample=js-display-list&authors=@VelinGeorgiev%20@sharepointknight&title=js-display-list%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-display-list" />
