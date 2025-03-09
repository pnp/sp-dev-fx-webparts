# Birthdays

## Summary

The Web Part Birthdays shows the upcoming birthdays in the company, the web part reads birthdays from a list located on the tenant's root site with title "Birthdays."

Now is possible to the user select an image for the background in the properties of the web part.


There is an Azure function available that get AAD user birthdays, this function creates a list on the tenant root site, if it does not exist.
See the `local.settings.json` for details on the required application variable located in SyncUsersBirthdaysFunction folder.

But you can synchronize the Birthdays list with other applications HR Systems, or other sources

![Birthdays Web Part](./assets/birthdays.gif)

![Birthdays Web Part](./assets/birthdays.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.20.0](https://img.shields.io/badge/SPFx-1.20.0-green.svg)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)


## Prerequisites
 
Existing list in tenant root site, with the Title "Birthdays"  and columns:

Column Internal Name|Type|Required| comments
--------------------|----|--------|----------
JobTitle | Text| no
Birthday | DateTime | true
userAADGUID | Text | no | required if used Azure Function to get Birthdays from AAD
Title | Text | true
email | Text | true

> **IMPORTANT:** Create index on column "Birthday".

## Contributors

* [João Mendes](https://github.com/joaojmendes)
* [Sajal Maity](https://github.com/smaity)
* [Valeras Narbutas](https://github.com/ValerasNarbutas)
* [Gretchun Kim](https://github.com/gretchunkim)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|November 6, 2018|Initial release
1.1.0|July 23, 2019 | new version
2.0.0|June 16, 2021 | Upgraded to SPFx 1.12.1
3.0.0|April 7, 2022 | Upgraded to SPFx 1.14.0
4.0.0|March 6, 2023 | Upgraded to SPFx 1.16.1
5.0.0|October 2, 2024 | Upgraded to SPFx 1.20.0
5.1.0|January 13,2025 | Edited SPService to ensure current year is used to pull upcoming birthdays

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - Add and Deploy Package to AppCatalog
  - Go to API Management - from SharePoint Admin Center new experience,  and Approve the Permission Require to Use Graph API SCOPES

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


## Features

This project contains sample Birthday web parts built on the SharePoint Framework using React
and an Azure Function to get user Birthdays from AAD.
This sample illustrates the following concepts on top of the SharePoint Framework:

- using React for building SharePoint Framework client-side web parts
- using React components for building Birthday web part
- using MSGraph API to get data from SharePoint Lists 
- using MSGraph API to read users from AAD
- using @PnP/PnPjs to create a List, add, update, delete Items.


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-birthdays&template=bug-report.yml&sample=react-birthdays&authors=@smaity%20@joaojmendes&title=react-birthdays%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-birthdays&template=question.yml&sample=react-birthdays&authors=@smaity%20@joaojmendes&title=react-birthdays%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-birthdays&template=question.yml&sample=react-birthdays&authors=@smaity%20@joaojmendes&title=react-birthdays%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-birthdays" />

