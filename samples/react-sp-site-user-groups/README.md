# Site User and Group Information

## Summary

Looks up the SharePoint site user/group ids related to a user. Azure AD groups that the user belongs to, and which are known to the SharePoint site, are also displayed.

Note: Azure AD Groups are represented as Site Users in SharePoint.

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to a user's user and group ids")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

Access to a SharePoint online site with various tenant users granted access to various site resources directly, via AAD groups and via SharePoint groups.

## Solution

| Solution                  | Author(s)                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| react-sp-site-user-groups | [Daniel Watford](https://github.com/danwatford) (https://twitter.com/DanWatford), Watford Consulting Ltd (https://watfordconsulting.com) |

## Version history

| Version | Date              | Comments        |
| ------- | ----------------- | --------------- |
| 0.0.1   | September 8, 2020 | Initial release |

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp trust-dev-cert`
  - `gulp serve --nobrowser`
- Open the hosted workbench on a SharePoint site - i.e. https://_tenant_.sharepoint.com/site/_sitename_/_layouts/workbench.aspx
- Add the User and Group Info web part to the page.
- View the current user's information and the 'user' information for any Azure AD groups the user belongs to which are also known to the SharePoint site.

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This web part was created to better understand the relationship between AAD users, AAD groups, SP User and SP Groups. In particular I was interested in how SP site user/group ids are mapped to the 4 principal types so that I might match a user against values entered in a SP People column which also accepted group values.

Experiment by granting permissions directly to some users for a site, directly to an AAD group for a site, and to a SP group where the membership consists of the AAD user or nested AAD groups.

Pick a user to retrieve information for by either searching for the user in the tenant-wide People Picker, or by choosing from the site's current set of users.

For the principals found that relate to a user links are provided to the relevant site user/group view.

## Display user's membership of AAD and SP groups

When the web part is first loaded the current user is selected.

Details of the user's membership of SP and AAD groups are shown, along with corresponding SP site user/group ids (highlighted).
![MyTasks](./assets/screen1.png)

## Select User

The user can be selected from the tenant-wide People Picker control.
Click the X to clear the currently selected user and then start typing the name of the next user. The People Picker will search across all tenant users as you type.
![MyTasks](./assets/screen2.png)

You can also select a user from the current set of site users.
Click on the /Select site user/ button and choose a user from the list displayed on the panel.
![MyTasks](./assets/screen3.png)

## Related Solutions

See sample solution [react-check-user-group](../react-check-user-group) by [aakashbhardwaj619](https://github.com/aakashbhardwaj619) for a method of looking up a user's AAD groups and the membership list of an AAD group. This solution differs by looking at the mappings between an AAD group and a SharePoint site user.

## References

- [User profile synchronization](https://docs.microsoft.com/en-us/sharepoint/user-profile-sync)

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-sp-site-user-groups&template=bug-report.yml&sample=react-sp-site-user-groups&authors=@danwatford&title=react-sp-site-user-groups%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-sp-site-user-groups&template=question.yml&sample=react-sp-site-user-groups&authors=@danwatford&title=react-sp-site-user-groups%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-sp-site-user-groups&template=question.yml&sample=react-sp-site-user-groups&authors=@danwatford&title=react-sp-site-user-groups%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-sp-site-user-groups" />
