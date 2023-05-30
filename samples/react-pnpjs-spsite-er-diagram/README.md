# SP Site ER Diagram

## Summary

This web part loads all lists on a site and display it in a Entity Relationship Diagram (ERD) using [GoJS](https://www.npmjs.com/package/gojs).

![Best to create a AppPage with the webpart](assets/SPERasAppPage.png)
![ER Webpart in fullscreen](assets/SPERasAppPageFullScreen.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.15.2](https://img.shields.io/badge/SPFx-1.15.2-green.svg)
![Node.js v16 | v14 | v12](https://img.shields.io/badge/Node.js-v16%20%7C%20v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/m365devprogram)

## Contributors

* [Niklas Wilhelm](https://github.com/ICTNiklasWilhelm) ([@NiklasWilhelm4](https://twitter.com/@NiklasWilhelm4)), NetForce 365 GmbH ([HubSite 365](https://www.hubsite365.com/) [@Hubsite365](https://twitter.com/@Hubsite365))

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 07, 2022|Initial release
1.1|December 21, 2022|Added ID field to diagram

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-pnpjs-spsite-er-diagram) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-pnpjs-spsite-er-diagram`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This project can be used as a starting point for any visualization of SharePoint Data. Currently it's using GoJS as dependency for the ER Diagram (in productive environment you would need to get a license for it). The data layer is abstract so it's possible to use a different library (like three.js) as presentation layer.

* the Data gets cached, to see changes made to the lists/lookups a "refresh" is needed
* alerts/warnings for the lists are displayed as well (Versioning/ItemCount/Threshholdlimit/..)
* easy opt/in/out of alerts and fields
* easy switch between Internal-/DisplayName
* Download current canvas as image

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-pnpjs-spsite-er-diagram%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-pnpjs-spsite-er-diagram) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-pnpjs-spsite-er-diagram&template=bug-report.yml&sample=react-pnpjs-spsite-er-diagram&authors=@YOURGITHUBUSERNAME&title=react-pnpjs-spsite-er-diagram%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-pnpjs-spsite-er-diagram&template=question.yml&sample=react-pnpjs-spsite-er-diagram&authors=@YOURGITHUBUSERNAME&title=react-pnpjs-spsite-er-diagram%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-pnpjs-spsite-er-diagram&template=suggestion.yml&sample=react-pnpjs-spsite-er-diagram&authors=@YOURGITHUBUSERNAME&title=react-pnpjs-spsite-er-diagram%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-pnpjs-spsite-er-diagram" />