# Public teams I'm not a member of

## Summary
This web part lists all the public teams the current user is not yet a member of. They can then join any of those teams by clicking the button right next to the team name. This web part can also be added to Teams as a tab (built with the 1.7.1 plusbeta/preview version).

![picture of the web part in action](./assets/js-public-unjoined-teams.gif)


## Compatibility

![SPFx 1.7.1](https://img.shields.io/badge/SPFx-1.7.1-green.svg) 
![Node.js v8](https://img.shields.io/badge/Node.js-v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

To be able to pin this web part as a Teams tab, your tenant currently needs to be in the targeted release mode. If your tenant is not in targeted release, you can still use the web part in SharePoint as usual.

## Solution

Solution|Author(s)
--------|---------
js-public-unjoined-teams | [Laura Kokkarinen](https://github.com/LauraKokkarinen) ([laurakokkarinen.com](https://laurakokkarinen.com), [@LauraKokkarinen](https://twitter.com/LauraKokkarinen))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 5, 2019|Initial release

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp bundle --ship`
  - `gulp package solution --ship`
- Deploy the solution package under \sharepoint\solution to the SharePoint app catalog
- Approve the required Microsoft Graph permissions in the SharePoint admin center (Preview, API management)

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This web part lists all the public teams the current user is not yet a member of. They can then join any of those teams by clicking the button right next to the team name. The Teams client does not present this kind of a complete list by default, so the web part is particularly handy to all end users who might not even be aware of all the public teams that are available. This web part can also be added to Teams as a tab. The web part colors are based on the site color theme.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-public-unjoined-teams%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-public-unjoined-teams) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-public-unjoined-teams&template=bug-report.yml&sample=js-public-unjoined-teams&authors=@LauraKokkarinen&title=js-public-unjoined-teams%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-public-unjoined-teams&template=question.yml&sample=js-public-unjoined-teams&authors=@LauraKokkarinen&title=js-public-unjoined-teams%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-public-unjoined-teams&template=suggestion.yml&sample=js-public-unjoined-teams&authors=@LauraKokkarinen&title=js-public-unjoined-teams%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-public-unjoined-teams" />
