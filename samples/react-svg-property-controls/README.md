# Dynamic Scalable Vector Graphics (SVG) image using properties

## Summary

An SPFx web part that displays a Scalable Vector Graphics (SVG) image using properties to customize how it is rendered. The web part utilizes the PnP SPFx Property Controls package (specifically the SpinButton and ColorPicker) to set these properties.

![picture of the web part in action](./assets/ghost2022-05-12_11-05-49.gif)

![Static screenshot of the web part](./assets/Screenshot%202026-08-31%20113354.png)

## Compatibility

![SPFx 1.23.2](https://img.shields.io/badge/SPFx-1.23.2-green.svg)
![Node.js v22](https://img.shields.io/badge/Node.js-v22-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20\(Feature%20Pack%202\)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Which PnP SPFx controls are being used in this sample?

* [PropertyFieldSpinButton](https://github.com/pnp/sp-dev-fx-property-controls/wiki/PropertyFieldSpinButton)
* [PropertyFieldColorPicker](https://github.com/pnp/sp-dev-fx-property-controls/wiki/PropertyFieldColorPicker)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
* [sp-dev-fx-property-controls](https://github.com/pnp/sp-dev-fx-property-controls)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

| Solution                     | Author(s)                                                                                                                                                                      |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| react-svg-property-controls | Nader Hadjebi ([LinkedIn](https://www.linkedin.com/in/nader-hadjebi-6a677a87/), [naderhadjebi.com](https://www.naderhadjebi.com), [@nader2015](https://twitter.com/nader2015)) |

## Version history

| Version | Date               | Comments                                                                                                                               |
| ------- | ------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| 1.0     | September 28, 2022 | Initial release                                                                                                                        |
| 1.0.1   | August 31, 2026    | Minor changes                                                                                                                          |
| 2.0     | September 6, 2026  | Upgraded to SPFx 1.23.2; migrated build toolchain from Gulp/Webpack to Heft; fixed legacy naming/config bugs from prior project rename |

## Prerequisites

None specific — a standard SPFx development environment is all that's required. See [Set up your SharePoint Framework development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) if you're getting started.

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-svg-property-controls) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-svg-property-controls`, located under `samples`)
* In the command line, run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

Displays a Scalable Vector Graphics (SVG) image of the NH Ghost and allows users to customize the colors used and the size of the image through the use of PnP SPFx Property Controls (SpinButton & ColorPicker).

This web part illustrates the following concepts on top of the SharePoint Framework:

* Rendering an SVG image
* Using a PropertyFieldSpinButton control
* Using a PropertyFieldColorPicker control

The solution was also upgraded from SPFx 1.13 to SPFx 1.23.2 as part of this submission, including migrating the build toolchain from Gulp/Webpack to Heft, updating dependencies, and fixing legacy naming/configuration issues from a prior project rename. The complete changes can be reviewed in the repository's Git history.

![Screenshot](./assets/Screenshot%202026-08-31%20113354.gif)

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-svg-property-controls%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-svg-property-controls) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-svg-property-controls&template=bug-report.yml&sample=react-svg-property-controls&authors=@NaderHadjebi&title=react-svg-property-controls%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-svg-property-controls&template=question.yml&sample=react-svg-property-controls&authors=@NaderHadjebi&title=react-svg-property-controls%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-svg-property-controls&template=suggestion.yml&sample=react-svg-property-controls&authors=@NaderHadjebi&title=react-svg-property-controls%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-svg-property-controls" />