# Page Sections Navigation

Sample web parts allowing to add sections navigation to the SharePoint page.

![Navigation configuration](./assets/page-nav.gif)

## Compatibility

![SPFx 1.14](https://img.shields.io/badge/SPFx-1.14-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
page-sections-navigation|[Alex Terentiev](https://github.com/AJIXuMuK) (MVP, [Sharepointalist Inc.](http://www.sharepointalist.com), [@alexaterentiev](https://twitter.com/alexaterentiev))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 27, 2019|Initial release
1.1|March 22, 2019| Update to SPFx 1.8, additional theme, comments
1.2|April 25, 2022 | Update to SPFx 1.14.0

## Minimal Path to Awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-page-sections-navigation) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-page-sections-navigation`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* from the `sharepoint/solution` folder, deploy the `.sppkg` file to the App catalog in your tenant
* in the site where you want to test this solution
  * add the app named `page-sections-navigation-client-side-solution`
  * edit a page
  * add **Page Sections Navigation** web part
  * add as much **Page Sections Navigation Anchor** web parts as you want - each anchor adds an item to the navigation
  * configure web parts

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This sample illustrates how to use SharePoint Framework Dynamic Data features to connect web parts on the page.
It also can be used as ready-to-go solution to add page sections navigation to SharePoint pages.

## Custom CSS

The web parts in the sample allow to use custom CSS to override the styles. You can set **Custom CSS URL** property of **Page Sections Navigation** web part and include css classes for both Navigation and Anchor in referenced file.
Please, refer [custom css sample](./assets/psn-custom.css) for the CSS sample.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-page-sections-navigation%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-page-sections-navigation) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-page-sections-navigation&template=bug-report.yml&sample=react-page-sections-navigation&authors=@AJIXuMuK&title=react-page-sections-navigation%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-page-sections-navigation&template=question.yml&sample=react-page-sections-navigation&authors=@AJIXuMuK&title=react-page-sections-navigation%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-page-sections-navigation&template=suggestion.yml&sample=react-page-sections-navigation&authors=@AJIXuMuK&title=react-page-sections-navigation%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-page-sections-navigation" />
