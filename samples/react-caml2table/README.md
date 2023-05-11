# CAML to Table

## Summary

Let's the user test CAML queries at ease.

![Sample gif](./assets/Demo.gif)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

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

*[Dan Toft](https://github.com/Tanddant)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | November 26, 2022 | Initial release |


## Prerequisites

This is a tool designed to help people who already know CAML to get going faster, not to help you build queries.

I highly recommend checking out [the docs](https://learn.microsoft.com/sharepoint/dev/schema/collaborative-application-markup-language-caml-schemas) for more info


## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-caml2table) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-caml2table`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This is a simple Web part that allows the user to input a [CAML Query](https://learn.microsoft.com/sharepoint/dev/schema/collaborative-application-markup-language-caml-schemas), select a list and run the query.

I've been using PnP PowerShell to do this for a while, when you need to test a query real quick, but PowerShell can be dreading to some users, and is a whole new tool to learn, so in order to best help people whom are learning I made this __VERY__ simple Web part.

It also demonstrates several useful skill that a new SPFx Developer might find handy

- PnPJs - To make the request.
- @pnp/spfx-controls-react - Are used both as the ListView and the ListPicker.
- React functional components which are yet to be the default in SPFx.
- React Context to avoid passing things that are needed globally as props.  

## For more info on CAML:
- [Collaborative Application Markup Language (CAML) schemas](https://learn.microsoft.com/en-us/sharepoint/dev/schema/collaborative-application-markup-language-caml-schemas)
- [camljs](https://github.com/andrei-markeev/camljs)
- [Camlex.Net](https://github.com/sadomovalex/camlex)


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-caml2table%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-caml2table) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-caml2table&template=bug-report.yml&sample=react-caml2table&authors=@Tanddant&title=react-caml2table%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-caml2table&template=question.yml&sample=react-caml2table&authors=@Tanddant&title=react-caml2table%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-caml2table&template=suggestion.yml&sample=react-caml2table&authors=@Tanddant&title=react-caml2table%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-caml2table" />