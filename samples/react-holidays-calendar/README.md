# Holiday calendar

## Summary

Holiday calendar solution contains SPFx web part and Adaptive card extension for Viva connections. SPFx web part provides below functionalities

1. Provides the functionality to add the holiday as an event in the calendar
2. Allows download all the holidays as CSV
3. Icon to show Fixed and optional holiday
4. Web part properties to set the web part title, hide/show download option, hide/show optional fixed holiday icons

ACE card extension provides below functionalities

1. Show the next Holiday
2. Allows to add holiday as an event in the calendar.

![Holiday Calendar list](./assets/209691123-03ac3c5d-cc8e-490e-8cb2-837539914db8.png)
![Web Part in action](./assets/209691198-4d0cbc31-f0d4-49c8-a1b5-ae8701406221.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.16.1](https://img.shields.io/badge/SPFx-1.16.1-green.svg)
![Node.js v16 | v14 | v12](https://img.shields.io/badge/Node.js-v16%20%7C%20v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

For more information about SPFx compatibility, please refer to <https://aka.ms/spfx-matrix>

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/m365devprogram)

## Prerequisites

- Run **\_applyTemplates.ps1** from the **PowerShell** folder to create the **Holidays** list
- **officelocation** property of user profile should have a valid value and holiday items for that location should be available in the **Holidays** list (created as part of previous step)

## Contributors

* [Harminder Singh](https://github.com/HarminderSethi)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | January 29, 2021 | Initial release |

## Minimal Path to Awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/REACT-HOLIDAYS-CALENDAR) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`REACT-HOLIDAYS-CALENDAR`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.


## Features

1. Provides the functionality to add the holiday as an event in the calendar
2. Allows download all the holidays as CSV
3. Icon to show Fixed and optional holiday

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20REACT-HOLIDAYS-CALENDAR%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=REACT-HOLIDAYS-CALENDAR) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20REACT-HOLIDAYS-CALENDAR&template=bug-report.yml&sample=REACT-HOLIDAYS-CALENDAR&authors=@HarminderSethi&title=REACT-HOLIDAYS-CALENDAR%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20REACT-HOLIDAYS-CALENDAR&template=question.yml&sample=REACT-HOLIDAYS-CALENDAR&authors=@HarminderSethi&title=REACT-HOLIDAYS-CALENDAR%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20REACT-HOLIDAYS-CALENDAR&template=suggestion.yml&sample=REACT-HOLIDAYS-CALENDAR&authors=@HarminderSethi&title=REACT-HOLIDAYS-CALENDAR%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/REACT-HOLIDAYS-CALENDAR" />

