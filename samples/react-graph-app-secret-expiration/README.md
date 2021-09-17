# Applications secrets expiration

## Summary

This sample web part shows the list of your applications registered in Azure AD along with their associated client secret/certificate expiration date.
I got the idea from this great article [Use Power Automate to Notify of Upcoming Azure AD App Client Secrets and Certificate Expirations](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/use-power-automate-to-notify-of-upcoming-azure-ad-app-client/ba-p/2406145) and thought it would be nice to have a SPFx web part version of it.

![Animated sample](./assets/react-graph-app-secret-expiration-animated.gif)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.12.1-green.svg)

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

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- In the command-line run:
  - **npm install**
  - **gulp bundle**
  - **gulp package-solution**
- Deploy the package to your app catalog
- Approve the API permission request from the SharePoint admin
- Add the web part to a page
- In the command-line run:
  - **gulp serve --nobrowser**

## Features

This sample illustrates the following concepts:

- Consume the Microsoft Graph API from SPFx web part
- Use [ListView control](https://pnp.github.io/sp-dev-fx-controls-react/controls/ListView/)



<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-graph-app-secret-expiration" />

