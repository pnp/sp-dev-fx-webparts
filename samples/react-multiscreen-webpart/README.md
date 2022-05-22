# Multi Screen using React Router

## Summary

This sample uses the popular [React Router](https://github.com/ReactTraining/react-router#readme) library to create tab, multi-screen or single page app (spa) experience in React SPFx web part. This is useful when the web part is more complex and to simplify the user experience multiple screens or tabs are needed. The same approach can be taken when a single page app (SPA) has to be migrated to modern SharePoint sites.

![SharePoint Framework multi screen web part](./assets/multi-screen-webpart.gif)


## Make use of browser history and url hashes to navigate between different tabs/screens of the web part

![SharePoint Framework multi screen web part navigation](./assets/multi-screen-webpart-history.gif)

The web part utilizes the usage of hashes in the URL so different screen will be displayed based on hash in the URL. That way the browser history is also used so it could provide similar experience as in a single page application.

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js v14 | v12 | v10](https://img.shields.io/badge/Node.js-v14%20%7C%20v12%20%7C%20v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-multiscreen-webpart | [Velin Georgiev](https://github.com/VelinGeorgiev) ([@VelinGeorgiev](https://twitter.com/velingeorgiev)), Stefan Bauer ([@StfBauer](https://twitter.com/stfbauer))
react-multiscreen-webpart | [Ari Gunawan](https://github.com/AriGunawan) ([@arigunawan3023](https://twitter.com/arigunawan3023))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 3, 2019 | Initial commit
1.1.0|October 3, 2021 | Update SPFx version to 1.12.1

## Prerequisites

- Office 365 subscription with SharePoint Online.
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Minimal Path to Awesome

- Clone this repository.
- Open the command line, navigate to the web part folder and execute:
    - `npm i`
    - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Usefull links

- [React Router](https://github.com/ReactTraining/react-router#readme)

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-multiscreen&template=bug-report.yml&sample=react-multiscreen&authors=@VelinGeorgiev%20@StfBauer%20@AriGunawan&title=react-multiscreen%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-multiscreen&template=question.yml&sample=react-multiscreen&authors=@VelinGeorgiev%20@StfBauer%20@AriGunawan&title=react-multiscreen%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-multiscreen&template=question.yml&sample=react-multiscreen&authors=@VelinGeorgiev%20@StfBauer%20@AriGunawan&title=react-multiscreen%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-multiscreen-webpart" />
