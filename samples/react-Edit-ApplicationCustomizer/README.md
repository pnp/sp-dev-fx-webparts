# Edit Application Customizers

## Summary

This web part will allow users to view/update application customizers properties across any web where the current user has access to. This web part can be helpful when we require to update the properties for application customizer without using any PowerShell script or cli tool.

![Web part in action](assets/react-all-applicationcustomizers.gif?raw=true "Webpart in action")

## Idea behind this web part

- SPFx Application customizer can be used to add scripts, and add custom html to well known placeholder(header and footer)
- We can use properties to pass data to Application customizers to make solution customizable.
- To update properties of application customizer there is no UI based solution.
- To update the title, details and other information of application customizer we use either PowerShell script or cli tool.
- This web part can be used at a central location where all the users have access and if they require to update title, description and properties.

## Features

- Web part to view/update Application Customizers registered for a selected web
- Provides two different UI Accordion or List based(configurable)
- Provides a dropdown to select the web from where we would require to fetch application customizers
- Allows to update application customizer properties which makes it easy to make re-useable application customizers


## Used SharePoint Framework Version

![SPFx 1.11](https://img.shields.io/badge/version-1.11-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

Solution|Author(s)
--------|---------
react-edit-applicationcustomizers | [Kunj Sangani](https://www.linkedin.com/in/kunj-sangani/) and [Siddharth Vaghasia](https://www.linkedin.com/in/siddharthvaghasia) 

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 16, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**


For any issue or help, Buzz us on twitter:([sanganikunj](https://twitter.com/sanganikunj)) or ([siddh_me](https://twitter.com/siddh_me/))

> Sharing is caring!

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-edit-applicationcustomizers" />
