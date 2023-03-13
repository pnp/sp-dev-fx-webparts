# Quick Links

## Summary

A demonstration of building a web part with a dynamic property pane, drag n' drop edit capabilities - I've built the Tiles feature of the default Quick Links web part, but made room for the option to implement the other 5 layouts.

![Sample gif](./assets/Demo.gif)

## Compatibility

| :warning: Important                                                                                                                                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node. |
| Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.                                                                                                                                                                                                             |

This sample is optimally compatible with the following environment configuration:


![SPFx 1.15.2](https://img.shields.io/badge/SPFx-1.15.2-green.svg)
![Node.js v16 | v14 | v12](https://img.shields.io/badge/Node.js-v16%20%7C%20v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Not%20Tested-yellow.svg)

For more information about SPFx compatibility, please refer to https://aka.ms/spfx-matrix

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/m365devprogram)

## Contributors

* Dan Toft ([@Tanddant](https://dan-toft.dk/)) |

## Version history

| Version | Date           | Comments        |
| ------- | -------------- | --------------- |
| 1.0     | March 05, 2023 | Initial release |



## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-quick-links) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-quick-links`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This web part demonstrates a couple of nice skillsets for an SPFx developer, the idea was spawned after I heard someone suggest that the default quick links would be open sources - as it doesn't look like that's going to happen I decided to build part of it myself.

This demonstrates:

* Dynamic property pane that changes based on user input in the web part
* Fluent Drag 'n drop using 'react-sortable-hoc'
* Using PnP Reusable Controls (Icon picker and WebPartTitle)
* Styling Fluent UI components (please don't look at the actual CSS, but the principals of how to do it)
* Grouping of property pane properties


There are still loads of ideas that I would love to see implemented, but right now I don't have the time, so feel free to add contribute with the features as needed

| Feature                                                                                                                               | Done |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| Drag 'n drop                                                                                                                          | ✅    |
| Dynamic property pane                                                                                                                 | ✅    |
| Demonstrate PnP reusable controls                                                                                                     | ✅    |
| Styling Fluent UI                                                                                                                     | ✅    |
| Audience targeting                                                                                                                    | ❌    |
| Several layouts                                                                                                                       | ❌    |
| SPFx 1.16/1.17 [Top Action](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/release-1.16#web-part-top-actions) to choose layout | ❌    |


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-quick-links%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-quick-links) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-quick-links&template=bug-report.yml&sample=react-quick-links&authors=@Tanddant&title=react-quick-links%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-quick-links&template=question.yml&sample=react-quick-links&authors=@Tanddant&title=react-quick-links%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-quick-links&template=suggestion.yml&sample=react-quick-links&authors=@Tanddant&title=react-quick-links%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-quick-links" />