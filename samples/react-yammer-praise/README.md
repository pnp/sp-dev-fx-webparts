# Yammer Praise using aadTokenProvider

## Summary
This sample shows how to post a praise to Yammer using aadTokenProvider (without Yammer JavaScript SDK).

![Post Praise to Yammer](./assets/screenshot.gif)

It also can be added to Microsoft Teams as Personal or Team Tabs.

![Post Praise to Yammer from Microsoft Teams](./assets/screenshot2.gif)


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js LTS 10 | LTS 8](https://img.shields.io/badge/Node.js-LTS%2010%20%7C%20LTS%208-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "Requires access to the user's context")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-yammer-praise|[Ramin Ahmadi](https://github.com/AhmadiRamin)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Mar 23, 2020|Initial release

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* Using AadTokenProvide to consume Yammer API.
* How to get User/Group information from Yammer.
* How to post a praise to Yammer.
* React Hooks
* Using async / await for the async calls
* Office UI fabric components
* Can be installed on Microsoft Teams as Personal app or a team tab

## Configuration

To get access to Yammer API, we need to add the required permission to **SharePoint Online Client Extensibility Web Application Principal** application:

* Navigate to Azure portal.
* Search for App Registration at top search box.
* Select **SharePoint Online Client Extensibility Web Application Principal**
* Select **API permissions** from left navigation.
* Click **Add a permission**.
* Select **Yammer**.
* Select **User_Impersonation** from delegated permissions.
* Click **Add permissions**.
* Click **Grant admin consent** button.
* Select **Yes, add other granted permissions to configured permissions**
* Click **Save and continue**.
* Click **Grant admin consent**.
* Select **Yes**.

Bundle and package the solution, deploy it to app catalog, then add the web part to any pages in SharePoint or add to your Teams.

Read my blog post for more information from [here](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-yammer-api).

## Video

[![Introduction to React Yammer Praise sample for Microsoft Teams and SharePoint](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=fYDqjOEuTKY "Introduction to React Yammer Praise sample for Microsoft Teams and SharePoint")

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-yammer-praise") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-yammer-praise) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-yammer-praise&template=bug-report.yml&sample=react-yammer-praise&authors=@AhmadiRamin&title=react-yammer-praise%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-yammer-praise&template=question.yml&sample=react-yammer-praise&authors=@AhmadiRamin&title=react-yammer-praise%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-yammer-praise&template=question.yml&sample=react-yammer-praise&authors=@AhmadiRamin&title=react-yammer-praise%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-yammer-praise" />
