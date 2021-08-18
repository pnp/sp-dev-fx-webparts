# react-my-events

## Summary

This webpart provides loggedin user's outlook events with some advanced features. 

## Features

- It shows outlook events of loggedin users.
- Date range selection of events like this week, this month, next two weeks, this quarter, all upcoming and so on.
- Compact/Flimstarp layout selection
- Show number of events configuartion in compact layout
- Redirect to teams link if there is a teams meeting
- Look and feel is same as OOTB events webpart

![Preview](assets/preview.png)

![Preview](assets/preview.gif)

## Used SharePoint Framework Version

![version](https://img.shields.io/npm/v/@microsoft/sp-component-base/latest?color=green)

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
react-my-events | Chandani Prajapati ([@Chandani_SPD](https://twitter.com/Chandani_SPD))

## Version history

Version|Date|Comments
-------|----|--------

1.0 | August 18, 2021 | Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-my-events" />
