# M365 Copilot Agent Chat

## Summary

An SPFx 1.23.2 web part that connects to M365 Copilot agents using the `@microsoft/agents-m365copilot` SDK. Provides an in-page chat experience with M365 Copilot Agent from SharePoint.

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-copilot-agent-webpart" />

## Prerequisites

- Node.js >= 22.14.0
- SharePoint Framework 1.23.2
- M365 Copilot Agent endpoint and credentials

## This sample illustrates...

- Connecting a SharePoint Framework web part to M365 Copilot Agent Service.
- Using the `@microsoft/agents-m365copilot` SDK from an SPFx solution.
- Property pane configuration for agent endpoint and name.
- Fluent UI v9 components, Heft build system.

## Compatibility

| Component | Version / Platform |
| --- | --- |
| SharePoint Framework | 1.23.2 |
| Node.js | 22.x |
| SharePoint | SharePoint Online |

## Contributors

| Author(s) |
| --- |
| [Vilius Vystartas](https://github.com/vystartasv) |

## Version history

| Version | Date | Comments |
| --- | --- | --- |
| 1.0 | July 2026 | Initial Release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `gulp serve`

## Features

This extension illustrates the following concepts:

- Using the `@microsoft/agents-m365copilot` SDK from an SPFx web part
- Building a chat interface with Fluent UI v9
- Configuring the agent endpoint via the property pane
