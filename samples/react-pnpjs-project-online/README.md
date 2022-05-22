# React PnPjs Project Online

## Summary

This sample shows how to use SPFx to consume data from the Project Online REST API using a custom module for PnPjs.
The web part is currently logging the data returned from the API to the browser console as a simple proof of concept.

Custom PnPjs module: [pnpjs-project-online-package](https://www.npmjs.com/package/pnpjs-project-online-package)

![Demo](./assets/Preview.gif)


## Compatibility

![SPFx 1.8.2](https://img.shields.io/badge/SPFx-1.8.2-green.svg)
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Needs access to user's context")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
- [Project Online](<https://docs.microsoft.com/en-us/previous-versions/office/project-javascript-api/jj712612(v%3Doffice.15)>)

## Prerequisites

- Office 365 subscription with SharePoint Online and Project Online licence
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.
- Project site with sample data available.

## Solution

| Solution                   | Author(s)      |
| -------------------------- | -------------- |
| react-pnpjs-project-online | [Joel Rodrigues](https://github.com/joelfmrodrigues) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | December 4, 2019 | Initial release |

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

-Using PnPjs with a custom package to interact with Project Online REST API


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-pnpjs-project-online") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-pnpjs-project-online) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-pnpjs-project-online&template=bug-report.yml&sample=react-pnpjs-project-online&authors=@joelfmrodrigues&title=react-pnpjs-project-online%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-pnpjs-project-online&template=question.yml&sample=react-pnpjs-project-online&authors=@joelfmrodrigues&title=react-pnpjs-project-online%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-pnpjs-project-online&template=question.yml&sample=react-pnpjs-project-online&authors=@joelfmrodrigues&title=react-pnpjs-project-online%20-%20).


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-pnpjs-project-online" />
