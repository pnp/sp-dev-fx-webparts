# Applications Secrets Expiration

## Summary

This sample web part shows the list of your applications registered in Azure AD along with their associated client secret/certificate expiration date.
I got the idea from this great article [Use Power Automate to Notify of Upcoming Azure AD App Client Secrets and Certificate Expirations](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/use-power-automate-to-notify-of-upcoming-azure-ad-app-client/ba-p/2406145) and thought it would be nice to have a SPFx web part version of it.

![Animated sample](./assets/react-graph-app-secret-expiration-animated.gif)

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

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-graph-app-secret-expiration | [Aimery Thomas](https://github.com/a1mery) ([@aimery_thomas](https://twitter.com/aimery_thomas))

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 17, 2021|Initial release
1.1|October 10, 2021|Add pagination
1.2|November 04, 2021|Add group views
1.3|March 14, 2022|Upgrade to SPFx v1.14.0


## Minimal path to awesome

- Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-graph-app-secret-expiration) then unzip it)
- From your command line, change your current directory to the directory containing this sample (`react-graph-app-secret-expiration`, located under `samples`)
- In the command-line run:
  - `npm install`
  - `gulp bundle`
  - `gulp package-solution`
- Deploy the package to your app catalog
- Approve the API permission request from the SharePoint admin
- Add the web part to a page
- In the command-line run:
  - `gulp serve --nobrowser`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample illustrates the following concepts:

- Consume the Microsoft Graph API from SPFx web part
- Use [ListView control](https://pnp.github.io/sp-dev-fx-controls-react/controls/ListView/)

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-graph-app-secret-expiration%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-graph-app-secret-expiration) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-graph-app-secret-expiration&template=bug-report.yml&sample=react-graph-app-secret-expiration&authors=@a1mery&title=react-graph-app-secret-expiration%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-graph-app-secret-expiration&template=question.yml&sample=react-graph-app-secret-expiration&authors=@a1mery&title=react-graph-app-secret-expiration%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-graph-app-secret-expiration&template=suggestion.yml&sample=react-graph-app-secret-expiration&authors=@a1mery&title=react-graph-app-secret-expiration%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-graph-app-secret-expiration" />
