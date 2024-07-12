# react-site-secure-function-call

## Summary

This combined SharpPoint Framework and Azure Function solution is to provide the potentially most secure access from SharePoint Famework to any kind of third party API, in fact here Microsoft Graph. It shows that AadHttpClient should be preferred over MSGraphClient.

|Update site descreption|
:-------------------------:
![Update site descreption](assets/SetSiteDescreption.png)

For further details see the author's [blog post](https://mmsharepoint.wordpress.com/2024/06/18/calling-microsoft-graph-in-spfx-the-secure-way/SS)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.19.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [AzureFunctions .Net8 *LTS](https://learn.microsoft.com/en-us/azure/azure-functions/functions-overview?pivots=programming-language-csharp?WT.mc_id=M365-MVP-5004617)


## Version history

Version|Date|Author|Comments
-------|----|--------|--------
1.0|July 12, 2024|[Markus Moeller](http://www.twitter.com/moeller2_0)|Initial release


## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
    ```bash
    git clone https://github.com/pnp/sp-dev-fx-webparts.git
    ```
- You will need to register an app in Entra ID 
  - with client secret
  - with **delegated** Graph permission Sites.FullControl.All
  - With exposed Api "access_as_user" and App ID Uri api://[Your-Desired-Func-Url]/[Your-ClienID]
- Azure Function:
  - Rename local.sample.settings.json to local.settings.json and fill out tenantId, clientId, clientSecret and domain [Your-Desired-Func-Url]
  - Run F5
- SPFx web part
  - Move to wep part folder
  ```bash
  cd samples\react-site-secure-function-call
  ```
  - Rename azFunct.sample.json to azFunct.json and fill out appIdUri api://[Your-Desired-Func-Url]/[Your-ClienID] 
  - Ensure that you are at the solution folder
  - in the command-line run:
    - **npm install**
    - **gulp serve**

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- [Consume multi-tenant enterprise APIs secured with Azure AD in SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient-enterpriseapi-multitenant?WT.mc_id=M365-MVP-5004617)


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis?WT.mc_id=M365-MVP-5004617)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
