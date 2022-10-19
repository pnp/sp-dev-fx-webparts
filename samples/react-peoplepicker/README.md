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
  platforms:
  - react
  createdDate: 6/1/2017 12:00:00 AM
---
# People Picker (React)

## Summary
SharePoint Framework solution with the Office UI Fabric People Picker, the client web part across the SharePoint Rest API is able to retrieve people and groups.

![React-People-Picker-gif](./assets/Preview.gif)


## Compatibility

![SPFx 1.8.0](https://img.shields.io/badge/SPFx-1.8.0-green.svg)
![Node.js v8](https://img.shields.io/badge/Node.js-LTS%20v8-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://blogs.office.com/2017/02/23/sharepoint-framework-reaches-general-availability-build-and-deploy-engaging-web-parts-today/)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
spfx-react-peoplepicker | [Giuliano De Luca](https://github.com/giuleon) ([@giuleon](https://twitter.com/giuleon) , [www.delucagiuliano.com](http://www.delucagiuliano.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|May 21, 2017|Initial release
1.0.1|Sep 28, 2017|Updated to GA Version, New properties that allow to specify the number of items to display and which entities retrieve (User, SharePoint Groups, Distribution Lists, Security Groups).
1.0.2|Dec 06, 2017|Minor bug fixes, Add events on people picked can now be used as a standalone component (Thanks to [@MikeMyers](https://github.com/thespooler) for contributing.

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features
- Use [TypeScript](https://www.typescriptlang.org) to create the custom property pane control containing the taxonomy picker control.
- Use the SharePoint Search API to grab people.

#### Local Mode
A browser in local mode (localhost) will be opened.
https://localhost:4321/temp/workbench.html

#### SharePoint Mode
If you want to try on a real environment, open:
https://your-domain.sharepoint.com/_layouts/15/workbench.aspx

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-peoplepicker%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-peoplepicker) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-peoplepicker&template=bug-report.yml&sample=react-peoplepicker&authors=@giuleon&title=react-peoplepicker%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-peoplepicker&template=question.yml&sample=react-peoplepicker&authors=@giuleon&title=react-peoplepicker%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-peoplepicker&template=suggestion.yml&sample=react-peoplepicker&authors=@giuleon&title=react-peoplepicker%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-peoplepicker" />
