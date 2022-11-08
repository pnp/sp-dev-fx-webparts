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
  createdDate: 10/10/2022 12:00:00 AM
---
# @pnp/js and ReactJS Functional Components

## Summary

This solution builds off of the solution [react-async-await-sp-pnp-js](./react-async-await-sp-pnp-js) submitted by Jose Quinto ([@jquintozamora](https://twitter.com/jquintozamora) , [blog.josequinto.com](https://blog.josequinto.com)) and re-work of the existing class based [react-pnp-js-sample](./react-pnp-js-sample) by [Julie Turner](https://twitter.com/jfj1997)

This implementation refactors to take aspects out and utilize and showcase PnPjs Version 3 using React Functional Components and Hooks.

![React-pnp-js-sample](./assets/react-pnp-js-sample.png)

## Compatibility

This sample is optimally compatible with the following environment configuration:

![SPFx 1.15.2](https://img.shields.io/badge/SPFx-1.15.2-green.svg)
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

## Solution

Solution|Author(s)
--------|---------
react-pnp-js-hooks | [Beau Cameron](https://github.com/bcameron1231) ([@beau__cameron](https://twitter.com/Beau__Cameron))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Oct 09, 2022|Initial release
1.1|Oct 18, 2022|Clean up in hook variables

## Minimal Path to Awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-pnp-js-hooks) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-pnp-js-hooks`, located under `samples`)
* in the command line run:
  * `npm install`
  * Update online workbench URL in the `initialPage` property of the `config/serve.json` file.
  * `gulp serve`

## Features

* Establishing context for the SharePoint Factory Interface
* Creating a project config file to centralize defining the PnPjs imports and SharePoint Queryable object for reuse.
* Demo using PnPjs with React Functional Components & Hooks
* Demo extending the SharePoint Queryables instance with the PnPLogging behavior.
* Demo extending the SharePoint Queryable instance with the Caching behavior
* Demo loading list items from a SharePoint library
* Demo creating a batched instance of the SharePoint Queryable object.
* Demo updating list items by modifying the Title property.
* Demo executing a batch and working with the results.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-pnp-js-hooks%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-pnp-js-hooks) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-pnp-js-hooks&template=bug-report.yml&sample=react-pnp-js-hooks&authors=@bcameron1231&title=react-pnp-js-hooks%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-pnp-js-hooks&template=question.yml&sample=react-pnp-js-hooks&authors=@bcameron1231&title=react-pnp-js-hooks%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-pnp-js-hooks&template=suggestion.yml&sample=react-pnp-js-hooks&authors=@bcameron1231&title=react-pnp-js-hooks%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-pnp-js-hooks" />
