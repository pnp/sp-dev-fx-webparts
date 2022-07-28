# Page Navigator

## Summary

This web part fetches all the automatically added Header anchor tags in a SharePoint page and displays them in a Navigation component.

When added to a Vertical Section it can be used as a Contents table for the page

![Page Navigator](./assets/PageNavigator.gif)

## Compatibility

![SPFx 1.14.0](https://img.shields.io/badge/SPFx-1.14.0-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to the page structure")
![Hosted Workbench Partially](https://img.shields.io/badge/Hosted%20Workbench-Partially-yellow.svg "The solution needs to run on a hosted page to work as intended")
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 5, 2019|Initial release
1.1|October 20, 2021|SPFx Upgraded to 1.12.1 and code refactored
1.2|May, 2022|SPFx Upgraded to 1.14.0
1.3|June 9, 2022|Updated React package from `^16.14.0` to `16.13.1`
1.4|June 29, 2022|Adds the capability to find collapsible section headers and insert them into the navigation
1.5|July 19, 2022|Bug fixes


## Minimal Path to Awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-page-navigator) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-page-navigator`, located under `samples`)
* in the command line run:
  * `npm i`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* Add the app package to Site Collection App Catalog and Install the App
* Add the web part to a page in the Site Collection

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Solution

Solution|Author(s)
--------|---------
react-page-navigator|[Aakash Bhardwaj](https://github.com/aakashbhardwaj619)
react-page-navigator|[Jasey Waegebaert](https://github.com/Jwaegebaert)

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-page-navigator&template=bug-report.yml&sample=react-page-navigator&authors=@aakashbhardwaj619&title=react-page-navigator%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-page-navigator&template=question.yml&sample=react-page-navigator&authors=@aakashbhardwaj619&title=react-page-navigator%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-page-navigator&template=question.yml&sample=react-page-navigator&authors=@aakashbhardwaj619&title=react-page-navigator%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-page-navigator" />
