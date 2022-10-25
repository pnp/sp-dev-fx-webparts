http://aka.ms/m365devprogramhttp://aka.ms/m365devprogramhttp://aka.ms/m365devprogramhttp://aka.ms/m365devprogram# My Awards

## Summary

This web part is using the beta MS Graph Profile endpoint to list user's profile awards. At the time of writing this sample (May 2022), this is a Beta endpoint, so it could change in the future. You can select the user you want to get their profile awards. It allows to configure different options. You can the user selecting it from a People picker, or from a Page environment variable (using Dynamic field), or just selecting the current logged user. It also allows two different layout options, so it can render the awards using cards, or in a list format.

A future version of this web part could include the ability to add new awards to your profile.

In the meantime, you can add a new award using this request: [https://learn.microsoft.com/graph/api/profile-post-awards?view=graph-rest-beta&tabs=http](https://learn.microsoft.com/graph/api/profile-post-awards?view=graph-rest-beta&tabs=http) (You can use [Graph Explorer](https://developer.microsoft.com/en-us/graph/graph-explorer) tool to do so.)

__Note__: when adding a new award, ensure you set the field __allowedAudiences__ to a proper value (organization / everyone). Otherwise, the award is only visible for the user who owns it.

![Awards](./assets/react-graph-profile-awards.gif)

## Compatibility

![SPFx 1.15.0](https://img.shields.io/badge/SPFx-1.15.0-green.svg)
![Node.js v16 | v14](https://img.shields.io/badge/Node.js-v16%20%7C%20v14-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

You need to grant these permissions to MS Graph API (from least to most privileged): _User.Read, User.Read.All_

Suggest you to use the [Microsoft 365 CLI](https://blog.mastykarz.nl/grant-api-permissions-office-365-cli/)

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-graph-profile-awards | Luis Mañez (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | May 23, 2022 | Initial release |
| 1.1     | Aug 06, 2022 | User selector from different origins (People picker, Page environment variable). Also has 2 different layouts for rendering the awards |


## Minimal Path to Awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-graph-profile-awards) then unzip it)
- Configure SharePoint permissions to Graph API (see Prerequisites). Suggest you to use the [Microsoft 365 CLI](https://blog.mastykarz.nl/grant-api-permissions-office-365-cli/)
- From your command line, change your current directory to the directory containing this sample (`react-graph-profile-awards`, located under `samples`)
- in the command-line run:
  - `npm install`
  - `gulp serve`

## Features

This extension illustrates the following concepts:

- Using the MS Graph Profile Awards endpoint to list the awards of the current user
- Using ServiceScope and DI concept to get a _MSGraphClientFactory_

## References

- [Getting started with SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://learn.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://learn.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Help


We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-graph-profile-awards%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-graph-profile-awards) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-graph-profile-awards&template=bug-report.yml&sample=react-graph-profile-awards&authors=@luismanez&title=react-graph-profile-awards%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-graph-profile-awards&template=question.yml&sample=react-graph-profile-awards&authors=@luismanez&title=react-graph-profile-awards%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-graph-profile-awards&template=suggestion.yml&sample=react-graph-profile-awards&authors=@luismanez&title=react-graph-profile-awards%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-graph-profile-awards" />

