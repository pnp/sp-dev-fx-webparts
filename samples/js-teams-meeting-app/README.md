# SPFx WebPart in Teams Meetings App

Demo SPFx web part project that demonstrates using as a Microsoft Teams meetings app. This is associated with the SPFx docs tutorial: [Tutorial: Build meeting apps for Microsoft Teams with SPFx](https://docs.microsoft.com/sharepoint/dev//spfx/build-for-teams-meeting-app)

## Summary

This project demonstrates a SPFx web part used as a Microsoft Teams meetings app with minimal functionality.

![picture of the web part in action](assets/preview.png)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg) 
![Node.js LTS 14.x](https://img.shields.io/badge/Node.js-LTS%2014.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

- [Microsoft Teams](https://aka.ms/microsoftteams)
- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

- Administrative access to MS Teams to deploy the package

## Solution

Solution|Author(s)
--------|---------
js-teams-meeting-app | [Andrew Connell](/andrewconnell) ([@andrewconnell](https://twitter.com/andrewconnell)), [Voitanos, LLC](https://www.voitanos.io)

## Version history

Version |      Date      |    Comments
------- | -------------- | ---------------
1.0     | April 27, 2021 | Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS- WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

Refer to the above mentioned SPFx tutorial for full repro instructions.

- Clone this repository
- ZIP the contents of the **./teams** folder, *but not the folder itself*
  - rename the ZIP to **TeamsSPFxApp.zip**
- From the command line install all dependencies and create the package:

    ```console
    npm install
    gulp bundle -p
    gulp package-solution -p
    ```

- Upload the **.sppkg** to your SPO tenant's app catalog & deploy it
  - select the uploaded package, then select the **Sync to Teams** button in the **Files** tab in the ribbon
- In Microsoft Teams, create a new meeting using the **Calendar** app in the leftmost navigation bar
  - After creating the meeting, edit it, and select the **+** in the tab bar
  - Select the app you deployed to install the app

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-teams-meeting-app" />
