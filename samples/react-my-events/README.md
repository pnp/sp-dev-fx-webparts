# My Events

## Summary

This web part provides loggedin user's outlook events with some advanced features. 

## Features

- It shows outlook events of loggedin users.
- Date range selection of events like this week, this month, next two weeks, this quarter, all upcoming and so on.
- Compact/Flimstarp layout selection
- Show number of events configuartion in compact layout
- Redirect to teams link if there is a teams meeting
- Look and feel is same as OOTB events web part

![Preview](assets/preview.png)

![Preview](assets/preview.gif)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js LTS v14 | LTS v12 | LTS v10](https://img.shields.io/badge/Node.js-LTS%20v14%20%7C%20LTS%20v12%20%7C%20LTS%20v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%202019-Not%20compatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%202016%20(Feature%20Pack%202)-Not%20compatible-red.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to user's Outlook events")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

* SharePoint Online tenant
* Approve below permissions from SharePoint Admin.

```
 "webApiPermissionRequests": [
      {
        "resource": "Microsoft Graph",
        "scope": "Calendars.Read"
      },
      {
        "resource": "Microsoft Graph",
        "scope": "Calendars.ReadWrite"
      }
    ]
```

## Solution

Solution|Author(s)
--------|---------
react-my-events | [Chandani Prajapati](https://github.com/chandaniprajapati) ([@Chandani_SPD](https://twitter.com/Chandani_SPD))

## Version history

Version|Date|Comments
-------|----|--------
1.0 | August 18, 2021 | Initial release
1.1 | October 4, 2021 | Fixed date issue as start and end date are rendering incorrect in event card.

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Drive Graph END Point](https://docs.microsoft.com/en-us/graph/api/resources/driveitem?view=graph-rest-1.0)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-my-events&authors=@Chandani_SPD&title=react-my-events%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-my-events&authors=@Chandani_SPD&title=react-my-events%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-my-events&authors=@Chandani_SPD&title=react-my-events%20-%20).


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-my-events" />
