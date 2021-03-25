# Questionnaire Teams Meeting App

## Summary

SPFx v1.12 support for Microsoft Teams meeting apps development. Questionnaire meeting app provides Pre-meeting app experience for MS Teams meeting attendees to ask the questions related to meeting before the meeting starts.  

![WebPart Preview](./assets/web-part-preview.gif)

The Questionnaire meeting app displays the questions from attendees as pre-meeting app experience.
![Questionnaire Preview](./assets/questionnaire-preview.png)


### NPM Packages Used

Below NPM package(s) are used to develop this sample:

1. @pnp/sp (https://pnp.github.io/pnpjs/sp/)
2. moment (https://www.npmjs.com/package/moment)

### Project setup and important files

```txt
spfx-react-teams-meeting-app-questionnaire
    ├── teams                                                     <-- MS Teams manifest
    │   └── manifest.json
    └── src
        └── models
            ├── IQuestionnaireItem.ts
        └── services
            ├── SPOService.ts                                     <-- Extensible Service
        └── webparts
            └── questionnaireMeetingApp
                ├── QuestionnaireMeetingAppWebPart.manifest.json  <-- Configurable web part properties
                ├── QuestionnaireMeetingAppWebPart.ts
                ├── components
                │   └── QuestionnaireMeetingApp
                │   │   ├── QuestionnaireMeetingApp.tsx           <-- Questionnaire Component
                │   │   ├── QuestionnaireMeetingApp.module.scss
                │   │   ├── IQuestionnaireMeetingAppProps.ts
                │   │   ├── IQuestionnaireMeetingAppState.ts
                │   └── Popup                                     <-- New Question Creation Component
                |   │   ├── AskQuestion.tsx
                |   │   ├── IAskQuestionProps.ts
                |   │   ├── IAskQuestionState.ts
                └── loc
                    ├── en-us.js
                    └── mystrings.d.ts
```

## Compatibility

![SPFx 1.12](https://img.shields.io/badge/SPFx-1.12.0-green.svg)
![Node.js LTS 10.x | LTS 12.x](https://img.shields.io/badge/Node.js-LTS%2010%20%7C%20LTS%20.12.x-green.svg)
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

- [Microsoft Teams](https://aka.ms/microsoftteams)
- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Administrative access to MS Teams to deploy the package

### Web Part Properties

The properties should be pre-configured inside `QuestionnaireMeetingAppWebPart.manifest.json` as when the web part is added as MS Teams meeting experience, we do not get any settings to configure.

Property|Type|Required|Default value|Comments
--------|----|--------|-------------|--------
siteUrl|Text|Yes|/|Provide the relative URL of the site where below list exists.
listName|Text|Yes|Teams Meeting Questionnaire|Title of the list storing meeting questionnaires.

### SharePoint Asset

A SharePoint list (named `Teams Meeting Questionnaire`) should be manually created to store the meeting questionnaires. The schema of the list is as below.

Display Name|Internal Name|Type|Required|Comments
------------|-------------|----|--------|--------
Title|Title|Single line of text|Y|OOB Title column
Description|Description|Multiple lines of text|N|
MeetingID|MeetingID|Single line of text|N|

## Minimal Path to Awesome

### SharePoint deployment

- Clone this repo
- Navigate to the folder with current sample
- Restore dependencies: `$ npm i`
- Bundle the solution: `$ gulp bundle --ship`
- Package the solution: `$ gulp package-solution --ship`
- Locate the solution at `./sharepoint/solution/spfx-ms-teams-questionnaire-meeting-app.sppkg` and upload it to SharePoint tenant app catalog

![Deploy SPFx solution](./assets/deploy-spfx-solution.png)

- Select `Make this solution available to all sites in the organization`.
- Click `Deploy`.

### MS Teams deployment

- Navigate to `teams` folder and zip the content (2 png files and manifest.json).
- Open MS Teams.
- Click `Apps`.
- Click `Upload a custom app` > `Upload for <tenant>`.

![Deploy to MS Teams](./assets/deploy-to-ms-teams.png)


## Solution

Solution|Author(s)
--------|---------
spfx-react-teams-meeting-app-questionnaire|[Nanddeep Nachan](https://www.linkedin.com/in/nanddeepnachan/) (SharePoint Consultant, [@NanddeepNachan](https://twitter.com/NanddeepNachan))
spfx-react-teams-meeting-app-questionnaire|[Ravi Kulkarni](https://www.linkedin.com/in/ravi-kulkarni-a5381723/) (SharePoint Consultant, [@RaviKul16a87](https://twitter.com/RaviKul16a87))
spfx-react-teams-meeting-app-questionnaire|[Smita Nachan](https://www.linkedin.com/in/smitanachan/) (SharePoint Consultant, [@SmitaNachan](https://twitter.com/SmitaNachan))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|March 22, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Features

This project contains sample client-side web part built on the SharePoint Framework illustrating possibilities to surface SPFx web part as Microsoft Teams meeting app.

This sample illustrates the following concepts on top of the SharePoint Framework:

- Surface SPFx web part as Microsoft Teams meeting app
- Using PnP/PnPjs
- Creating extensible services
- Using Office UI Fabric controls for building SharePoint Framework client-side web parts

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Apps in Teams meetings](https://docs.microsoft.com/en-us/microsoftteams/platform/apps-in-teams-meetings/teams-apps-in-meetings)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [PnPjs Configuration](https://pnp.github.io/pnpjs/concepts/configuration/)
- [Support Microsoft Teams Themes in SharePoint Framework Solutions](https://blog.aterentiev.com/support-microsoft-teams-themes-in) by Alex Terentiev, [@alexaterentiev](https://twitter.com/alexaterentiev)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-teams-meeting-app-questionnaire" />
