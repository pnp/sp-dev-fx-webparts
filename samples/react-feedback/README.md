# Feedback

## Summary

This is an application that supports Feedback through a web part that can be used directly on a Modern SharePoint Site page. This web part can be added to any site page or article. This allows users to send categorized feedback via email to users in the "Feedback Owners" group.

![Feedback](./assets/feedbackwebpart.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to SharePoint resources")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

* Office 365 subscription with SharePoint Online
* SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) set up
* **Feedback Owners** SharePoint group (see below)

## Solution

Solution|Author(s)
--------|---------
react-feedback | [Perry Kankam](https://github.com/perr124)
react-feedback | [Abderahman Moujahid](https://github.com/Abderahman88)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|December 15, 2020|Initial release
1.0.1|March 3, 2021|Fix undefined listItem

## Minimal Path to Awesome

*To really get the full experience go to the workbench on a SharePoint Site [Your site url]/_layouts/15/workbench.aspx and that's where the magic will happen but this requires that you deploy and activate features to provision the required SharePoint assets*

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`
* Add **Feedback Owners** SharePoint group. This is where you'll add all users who should receive this feedback.
* Run one of the following custom commands to clean, build, bundle and package the solution.
    * If you want to be able to debug using your local code using gulp serve
    `gulp package`
* Navigate to the output `feedback-webpart.sppkg` (found in the `/sharepoint/solution` folder)
* Upload it to an application catalog (either a tenant or site collection one)
* In your site collection go to **Site Contents** and click **New** > **App**
* Find and add the **Feedback Application** App
    * wait for it to finish installing and activating features on the **Site Contents** page
* Go to a site page like home, edit the page and find and add the **Feedback** web part
    * If you deployed a shippable (SharePoint Online) version you don't need to do anything else
    * If you deployed a debug (http://localhost:4321) version you'll need to ensure gulp serve is running

## Features

This sample illustrates the following concepts:
- Used [@pnp/polyfill-ie11](https://pnp.github.io/pnpjs/concepts/polyfill/)
- Used [PnP](https://pnp.github.io/pnpjs/) for communication with SharePoint.
- Used [@pnp/logging](https://pnp.github.io/pnpjs/logging/)


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-feedback&template=bug-report.yml&sample=react-feedback&authors=@perr124%20@Abderahman88&title=react-feedback%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-feedback&template=question.yml&sample=react-feedback&authors=@perr124%20@Abderahman88&title=react-feedback%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-feedback&template=question.yml&sample=react-feedback&authors=@perr124%20@Abderahman88&title=react-feedback%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-feedback" />
