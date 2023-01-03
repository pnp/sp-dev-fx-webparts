# holidays-calendar

## Summary

Holiday calendar solution contains SPFx webpart and Adaptive card extenstion for Viva connections. SPFx webpart provides below functionalities

1.  Provides the functionality to add the holiday as an event in the calendar
2.  Allows download all the holidays as CSV
3.  Icon to show Fixed and optional holiday
4.  Webpart properties to set the webpart title, hide/show download option, hide/show optional fixed holiday icons

ACE card extension provides below functionalities

1. Show the next Holiday
2. Allows to add holiday as an event in the calendar.

![image](https://user-images.githubusercontent.com/17841313/209691123-03ac3c5d-cc8e-490e-8cb2-837539914db8.png)
![image](https://user-images.githubusercontent.com/17841313/209691198-4d0cbc31-f0d4-49c8-a1b5-ae8701406221.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.16.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Run \_applyTemplates powershell to create the Holidays list officelocation property of user profile should have a valid value and holiday item for that
> location should be avilable in the Holidays list(created as part of previous step)

## Solution

| Solution                | Author(s)                                                           |
| ----------------------- | ------------------------------------------------------------------- |
| react-holidays-calendar | [Harminder Singh](https://www.linkedin.com/in/harmindersinghsethi/) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

1.  Provides the functionality to add the holiday as an event in the calendar
2.  Allows download all the holidays as CSV
3.  Icon to show Fixed and optional holiday

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
