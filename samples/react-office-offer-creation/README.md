# Offer Creation (SPFx) - Microsoft Teams App

## Summary

This sample is a Teams personal Tab to act as a Microsoft 365 across application (Teams, Outlook, Office) to generate docuemnts. It is realized with SharePoint Framework (SPFx).

App live in action inside Teams

![App live in action inside Teams](assets/16OfferCreationDemo_SPFx.gif)

Create Offer form with FluentUI controls

![Create Offer form with FluentUI controls](assets/15CreateOfferForm_FluentUI_SPFx.png)

Create Offer form with FluentUI controls opened in Microsoft 365

![Create Offer form with FluentUI controls opened in Microsoft 365](assets/22CreateOfferForm_FluentUI_SPFx_InM365.png)

Created Offer with filled metadata opened 1in Word

![Created Offer with filled metadata opened 1in Word](assets/23OfferInWord.png)

Configuration settings form to set Site Url (Offer location)

![Configuration settings form to set Site Url](assets/19TeamsSPFxConfigForm.png)

For further details see the author's [blog series](https://mmsharepoint.wordpress.com/2022/12/28/a-sharepoint-document-generator-as-microsoft-365-app-ii-spfx/)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.16.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)


## Version history

Version|Date|Author|Comments
-------|----|----|--------
1.0|Dec 28, 2022|[Markus Moeller](https://twitter.com/moeller2_0)|Initial release

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

- Create the content-type for your offers in a site / default document library of your choice
    - With PnP-PowerShell for instance call the deploy script with your site url as parameter
        ```bash
        .\templates\deploy.ps1 -siteUrl <YourFullSiteUrl>
    
    - This should put the same site url to your tenant-property named 'CreateOfferSiteUrl'
- Now you can run the webpart inside SharePoint. 
- To use it as a Teams, Outlook, Microsoft 365 App as well:
  - Bundle and Package the solution:
    - **gulp bundle --ship**
    - **gulp package-solution --ship**
  - Upload the solution to your tenant's app catalog and "install" it tenant-wide
  - Package the icons and your manifest from the solution's \teams folder in a ZIP
  - Upload this ZIP as a custom solution or to your org's Teams' app catalog


## Features

* Using SharePoint Rest API to copy files and edit it's metadata
* [Extend Teams SPFx apps across Microsoft 365](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/office/overview?WT.mc_id=M365-MVP-5004617)
* [Use FluentUI Label, DatePicker, Dropdown, IDropdownOption, Spinner, TextField](https://developer.microsoft.com/en-us/fluentui#/?WT.mc_id=M365-MVP-5004617)
* [Use SharePoint tenant properties for org-wide SPFx app configurations](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/tenant-properties?tabs=sprest#getread-tenant-properties?WT.mc_id=M365-MVP-5004617)
* [Configure Microsoft Teams personal apps built using SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-configure-in-teams#configure-microsoft-teams-personal-apps-built-using-sharepoint-framework?WT.mc_id=M365-MVP-5004617)

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-office-offer-creation" />
