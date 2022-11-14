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
  - PnPjs
  - Fluent UI React Controls
  platforms:
  - React
  createdDate: 19/7/2022 12:00:00 AM
---

# Room Chat

## Summary

This web part shows how to use Azure Communications Services and React UI component to create a Room Chat.
This is a sample and the architecture is very simple for demo only.

![roomchat](./assets/roomchat.gif)

![roomchat](./assets/roomchat.png)


## Requirements

This sample needs the Azure communications services configured on the Azure, Please documentation how to configure.


## Compatibility

![SPFx 1.15](https://img.shields.io/badge/SPFx-1.15.0-green.svg)
![Node.js v16](https://img.shields.io/badge/Node.js-v16-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access lists and sites")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-roomchat|[João Mendes](https://github.com/joaojmendes)


## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 19, 2022|Initial release

## Minimal Path to Awesome

Please follow all the steps:

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add and deploy package to your tenant's App Catalog

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-roomchat&template=bug-report.yml&sample=react-roomchat&authors=@joaojmendes&title=react-roomchat%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-roomchat&template=question.yml&sample=react-roomchat&authors=@joaojmendes&title=react-roomchat%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-roomchat&template=question.yml&sample=react-roomchat&authors=@joaojmendes&title=react-roomchat%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-roomchat" />
