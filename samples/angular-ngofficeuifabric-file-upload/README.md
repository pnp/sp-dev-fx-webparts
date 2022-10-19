---
page_type: sample
products:
- office-sp
- office-365
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - AngularJS
  createdDate: 6/19/2017 12:00:00 AM
---
# SPFx Web part: File Upload using AngularJs

## Summary

File Update/Delete web part using AngularJs and ngOfficeUIFabric with the SharePoint Framework.

![File Upload using Angular](./assets/NG%20File%20Upload.png)

Edit web part properties to set Document library Name. Initially, It has been set to `Documents`.


## Compatibility

![SPFx 1.1.0](https://img.shields.io/badge/SPFx-1.1.0-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg )
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to SharePoint document libraries")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-ngofficeuifabric-file-upload | [Atish Kumar Dipongkor](https://github.com/dipongkor) (MVP, Office Development)
angular-ngofficeuifabric-file-upload | [Gautam Sheth](https://github.com/gautamdsheth) (SharePoint Consultant,RapidCircle,@gautamdsheth)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 24, 2016|Initial release
2.0|May 26, 2017|GA release
2.1|July 19, 2017|Bug fix

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve --nobrowser`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework & AngularJs:

- `BaseService`: By injecting this Angular Service, GET, POST, UPDATE & DELETE requests can be made easily. It's a resuable service.
- `CustomFileChange`: It's a custom Angular directive. It binds the file with model on file change event.
- `IsoToDateString`: It's a custom Angular filter. It formats ISO date string to `{0:yyyy}-{0:MM}-{0:dd}` format.

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20angular-ngofficeuifabric-file-upload") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=angular-ngofficeuifabric-file-upload) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20angular-ngofficeuifabric-file-upload&template=bug-report.yml&sample=angular-ngofficeuifabric-file-upload&authors=@@waldekmastykarz&title=angular-ngofficeuifabric-file-upload%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20angular-ngofficeuifabric-file-upload&template=question.yml&sample=angular-ngofficeuifabric-file-upload&authors=@@waldekmastykarz&title=angular-ngofficeuifabric-file-upload%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20angular-ngofficeuifabric-file-upload&template=question.yml&sample=angular-ngofficeuifabric-file-upload&authors=@@waldekmastykarz&title=angular-ngofficeuifabric-file-upload%20-%20).

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/angular-ngofficeuifabric-file-upload" />
