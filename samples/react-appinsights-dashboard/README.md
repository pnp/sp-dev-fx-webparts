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
  createdDate: 5/10/2020 12:00:00 AM
---
# Azure Application Insights Dashboard

## Summary

This web part displays different statistics data captured in the **Azure Application Insights** in a graphical representation. Filters are provided to search for certain period of days. There are few **Application Customizer** which can be activated in **SharePoint Online** to track page view, performance etc., to **Azure Application Insights**, but the data can be viewed only by the administrator who is in-charge of **Azure portal**. Not all the users will have access to this data, this web gupart will provide access to those data that can be used by the portal administrators and developers to keep track of the page performance and hits. Fetched insights data using **[Application Insights API](https://dev.applicationinsights.io/)**.


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires API access")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Pre-requisites

**Azure Application Insights** has to be configured. If you want to track the **SharePoint Online** web parts and pages, please use either of the following **Application Customizer** or you can use your own extensions to track the pages and other components. 
* [Injecting JavaScript with SharePoint Framework Extensions - Azure Application Insights](https://github.com/pnp/sp-dev-fx-extensions/tree/main/samples/js-application-appinsights)
* [JS Application AppInsights Advanced](https://github.com/pnp/sp-dev-fx-extensions/tree/main/samples/js-application-appinsights-advanced)

Following are required to access the data using **[App Insights API](https://dev.applicationinsights.io/)**. The API has been provided in a very simple way with **[API Explorer](https://dev.applicationinsights.io/apiexplorer)** for the developers to play around the API to understand the schema and the methods that can used.
* **Application ID** of the Application Insights
* **API Key** for the data access

![AppInsights API Application ID](./assets/AppInsights_APIAccess.png)
![AppInsights API Key](./assets/AppInsights_APIKey.png)

## Properties

* **_Application ID_**: Application ID of the Azure Application Insights API Access.
* **_Application Key_**: Application Key of the Azure Application Insights API Access.

## Preview

#### AppInsights Dashboard

![AppInsights Dashboard](./assets/AppInsights_Dashboard.gif)

#### Page Statistics

![AppInsights Dashboard - Page Statistics](./assets/PageStatistics.png)

#### User Statistics

![AppInsights Dashboard - User Statistics](./assets/UserStatistics.png)

#### Performance Statistics

![AppInsights Dashboard - Performance Statistics](./assets/PerformanceStatistics.png)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-appinsights-dashboard | [Sudharsan K.](https://github.com/sudharsank)([@sudharsank](https://twitter.com/sudharsank), [Know More](http://windowssharepointserver.blogspot.com/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.0|May 10, 2020|Initial release
1.0.0.1|June 16, 2020|Initial release

## Minimal Path to Awesome

- Clone this repository
- From your command line, change your current directory to the directory containing this sample (`react-appinsights-dashboard`, located under `samples`)
- in the command line run:
  - `npm install`
  - `gulp bundle --ship && gulp package-solution --ship`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

#### Local Mode

This solution doesn't work on local mode.

## Video

[![App Insights Dashboard with React based web parts](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=ynwGKrvIimo "App Insights Dashboard with React based web parts")

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-appinsights-dashboard") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-appinsights-dashboard) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-appinsights-dashboard&template=bug-report.yml&sample=react-appinsights-dashboard&authors=@sudharsank&title=react-appinsights-dashboard%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-appinsights-dashboard&template=question.yml&sample=react-appinsights-dashboard&authors=@sudharsank&title=react-appinsights-dashboard%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-appinsights-dashboard&template=question.yml&sample=react-appinsights-dashboard&authors=@sudharsank&title=react-appinsights-dashboard%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-appinsights-dashboard" />
