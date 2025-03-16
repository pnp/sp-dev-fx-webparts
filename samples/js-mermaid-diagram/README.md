# Mermaid Diagram Web Part for SharePoint Online

## Summary

I created this web part to add **Mermaid diagram support** in SharePoint Online as part of my tutorial series. While working on it, I found this discussion thread: [Displaying Mermaid Diagrams in SharePoint Online Markdown Web Parts](https://techcommunity.microsoft.com/discussions/sharepoint_general/displaying-mermaid-diagrams-in-sharepoint-online-markdown-web-parts/4043819), which highlights the need for a proper solution.

Since the native **Markdown web part in SharePoint Online does not support Mermaid diagrams**, I built this SPFx web part to enable rendering Mermaid syntax directly. I'm sharing this in case others find it useful or have suggestions for improvements.

![Mermaid](https://github.com/user-attachments/assets/a347e747-0653-47df-8755-a1f6bb6c419c)


<img width="446" alt="image" src="https://github.com/user-attachments/assets/128c01b7-f77d-483e-b1ad-f5343f8c9c81" />


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)


## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | March 16, 2025   | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---
## Contributor
- [Clavin Fernandes](https://github.com/cfernandes-muhimbi)

  
## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

## Features
- Render **Mermaid.js** diagrams in SharePoint Online
- Supports flowcharts, sequence diagrams, Gantt charts, and more
- Easy integration with existing SharePoint pagesShare your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

Happy diagramming!

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
