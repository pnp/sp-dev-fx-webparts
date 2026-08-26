# Microsoft 365 Copilot API Explorer (SPFx)

## Summary

This sample demonstrates how to build a SharePoint Framework 1.22.1 web part that explores Microsoft 365 Copilot APIs through Microsoft Graph.

The web part provides a tabbed experience for four API areas:

- **Copilot Chat** (beta)
- **Copilot Search** (beta)
- **Meeting Insights** (v1.0)
- **Usage Reports** (beta)

It is intended as a practical learning sample for developers who want to understand request/response handling, permissions, and UX patterns for Copilot-related Graph APIs in SPFx.

## Screenshots

### Chat

![Chat API](./assets/copilot-chat-api.png)

### Search

![Search API](./assets/copilot-search-api.png)

### Meeting Insight

![Meeting Insight API](./assets/copilot-insight-api.png)

### Usage API

![Usage API](./assets/copilot-usage-api.png)

## Compatibility

| :warning: Important |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. Ensure that your local Node.js version matches the supported range for this sample. See <https://aka.ms/spfx-matrix> for details. |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.22.1](https://img.shields.io/badge/SPFx-1.22.1-green.svg)
![Node.js v22.x](https://img.shields.io/badge/Node.js-v22.x-green.svg)
![Toolchain: Heft](https://img.shields.io/badge/Toolchain-Heft-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Microsoft Graph](https://learn.microsoft.com/graph/overview)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Contributors

- [Ejaz Hussain](https://github.com/ejazhussain)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 2.0     | February 21, 2026 | README refresh and setup guidance updates |
| 1.0     | February 2026 | Initial release |

## Features

This sample illustrates the following concepts:

- SPFx 1.22.1 web part using the **Heft** build pipeline
- Centralized service layer for Microsoft Graph API calls
- Handling both **beta** and **v1.0** Graph endpoints in one solution
- Tabbed Fluent UI UX for multi-scenario API exploration
- API information panels per tab showing endpoint details, required permissions, licensing, and limitations
- Markdown rendering for chat responses and formatted API output

### API Coverage

| Area | Endpoint | Graph Version | Typical Permission(s) |
| ---- | -------- | ------------- | --------------------- |
| Chat | `/copilot/conversations`, `/copilot/conversations/{conversationId}/chat` | beta | `Chat.Read`, `ChannelMessage.Read.All` |
| Search | `/copilot/search` | beta | `ExternalItem.Read.All`, `Files.Read.All`, `Sites.Read.All` |
| Meeting Insights | `/copilot/users/{userId}/onlineMeetings/{meetingId}/aiInsights` | v1.0 | `OnlineMeetingAiInsight.Read.All`, `OnlineMeetingTranscript.Read.All` |
| Usage Reports | `/reports/getMicrosoft365CopilotUsageUserDetail(period='{period}')` | beta | `Reports.Read.All` |

> API availability and required permissions can vary by tenant configuration, licensing, and Graph updates.

## Prerequisites

- Node.js **22.x** (project engine: `>=22.14.0 <23.0.0`)
- SharePoint Online tenant with app catalog access
- Microsoft 365 Copilot licensing for scenarios you want to test
- Tenant admin approval for requested Microsoft Graph scopes in the package


## Minimal Path to Awesome

1. Clone this repository

  ```bash
  git clone https://github.com/pnp/sp-dev-fx-webparts.git
  cd sp-dev-fx-webparts/samples/react-copilot-apis-explorer
  ```

2. Install dependencies

  ```bash
  npm install
  ```

3. Build and package the solution

  ```bash
  npm run build
  ```

4. Upload and deploy the package to the tenant app catalog

  - Upload `sharepoint/solution/o365c-copilot-api-explorer.sppkg`
  - Select **Deploy**

5. Approve required API permissions (if prompted)

  - Go to **SharePoint Admin Center** → **Advanced** → **API access**
  - Approve pending Microsoft Graph permission requests for this solution

6. Start local development after permissions are approved

  ```bash
  npm run start
  ```

7. Open your SharePoint page and append the SPFx debug query string

  ```text
  ?debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fbuild%2Fmanifests.js&debug=true&noredir=true
  ```

  Example:
  `https://{tenant}.sharepoint.com/sites/{site}/SitePages/{page}.aspx?debugManifestsFile=https%3A%2F%2Flocalhost%3A4321%2Ftemp%2Fbuild%2Fmanifests.js&debug=true&noredir=true`

## References

- [Getting started with SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft Teams](https://learn.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://learn.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Microsoft 365 Copilot APIs overview](https://learn.microsoft.com/microsoft-365-copilot/extensibility/copilot-apis-overview)
- [Microsoft 365 Copilot APIs in Microsoft Graph](https://learn.microsoft.com/graph/api/resources/copilot-overview)
- [Heft Documentation](https://heft.rushstack.io/)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-copilot-apis-explorer" alt="Visitor stats" />