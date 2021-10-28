# Sites Selected Admin client-side web part

## Summary

This is a sample SharePoint Framework client-side web part built using react.

The web part lets you manage your Azure AD applications that have the Sites Selected Api permission. With this web part you'll get an UI for managing what app can connect to which site.

The web part uses the built in MSGraphClient and needs to be approved in API management. The app asks for Microsoft Graph `Application.Read.All` and `Sites.FullControl.All`. Users of the web part will need to have Site Collection Administrator privileges to the sites being added to an app.

## Web part usage

![alt text][Webpart in action]

[Webpart in action]: ./assets/sites-manager-demo.gif "Sites Selected Manager in action"

## Using the web part to grant an app access to a site, start to finish

![alt text][Webpart in action - Visual Studio]

[Webpart in action - Visual Studio]: ./assets/vsDemo.gif "Sites Selected Manager Demo"

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> One (or more) Azure AD app with Sites.Selected and the possibility to approve requests in API management (SharePoint Administrator). Site collection administrator is needed for the site(s) you want to give app access to.

## Solution

Solution|Author(s)
--------|---------
react-sites-selected-admin | Fredrik Thorild [@fthorild](https://twitter.com/fthorild)

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 19, 2021|Initial release
1.1|March 8, 2021|Switch to functional components. Re-factor

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Add an app in Azure AD, or for an existing app add the Sites.Selected Microsoft Graph api permission

![alt text](./assets/aad-appreg.png "AAD app reg")

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **gulp bundle --ship**
  - **gulp package-solution --ship**
- Add the `.sppkg` package to your app catalog
- Approve the api access requests

![alt text](./assets/api-access-page.png "API Management")

- Install web part on a site of your choice
- Add permissions to your app
- Try out the AAD app by sending a request using your favorite method  



## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
  
  <img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-content-query-online" />
