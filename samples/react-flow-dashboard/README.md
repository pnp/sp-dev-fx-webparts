# Flow Dashboard

## Summary

This web part demonstrates displaying the list of flows and perform some basic actions on the flow.

# Flow Dashboard

![](./assets/Dashboard.gif)

# Flow run history
![](./assets/Flowrunhistory.gif)

# Enabling stopped or suspended flows
![](./assets/Enablingflows.gif)


## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.17.4](https://img.shields.io/badge/SPFx-1.17.4-green.svg)
![Node.js v16 | v14](https://img.shields.io/badge/Node.js-v16%20%7C%20v14-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible (with permissions)](https://img.shields.io/badge/Hosted%20Workbench-Compatible-yellow.svg "Requires API permissions")
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Prerequisites

This web part uses *Microsoft Graph* API and *Microsoft Flow Service* API. You need to approve the API request after deploying the package.

- Microsoft Graph
  - `User.ReadBasic.All`
- Microsoft Flow Service
  - `Flows.Read.All`

If the problem still persists, 
- go to `App Registrations`
- find `SharePoint Online Client Extensibility Web Application Principal`
- make sure you have added the above permission levels
![](./assets/APIPermissions.png)


## Minimal Path to Awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-flow-dashboard) then unzip it)
- From your command line, change your current directory to the directory containing this sample (`react-flow-dashboard`, located under `samples`)
- in the command-line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Contributors

* [Nishkalank Bezawada](https://github.com/NishkalankBezawada)

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 3, 2023|Initial release

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-flow-dashboard%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-flow-dashboard) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-flow-dashboard&template=bug-report.yml&sample=react-flow-dashboard&authors=@NishkalankBezawada&title=react-flow-dashboard%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-flow-dashboard&template=question.yml&sample=react-flow-dashboard&authors=@NishkalankBezawada&title=react-flow-dashboard%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-flow-dashboard&template=suggestion.yml&sample=react-flow-dashboard&authors=@NishkalankBezawada&title=react-flow-dashboard%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-flow-dashboard" />
