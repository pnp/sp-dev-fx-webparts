# Applications Secrets Expiration

## Summary

This sample web part shows the list of your applications registered in Azure AD along with their associated client secret/certificate expiration date.
I got the idea from this great article [Use Power Automate to Notify of Upcoming Azure AD App Client Secrets and Certificate Expirations](https://techcommunity.microsoft.com/t5/core-infrastructure-and-security/use-power-automate-to-notify-of-upcoming-azure-ad-app-client/ba-p/2406145) and thought it would be nice to have a SPFx web part version of it.

![Animated sample](./assets/react-graph-app-secret-expiration-animated.gif)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js LTS v14 | LTS v12 | LTS v10](https://img.shields.io/badge/Node.js-LTS%20v14%20%7C%20LTS%20v12%20%7C%20LTS%20v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")


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

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-graph-app-secret-expiration&authors=@a1mery&title=react-graph-app-secret-expiration%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-graph-app-secret-expiration&authors=@a1mery&title=react-graph-app-secret-expiration%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-graph-app-secret-expiration&authors=@a1mery&title=react-graph-app-secret-expiration%20-%20).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-graph-app-secret-expiration" />
