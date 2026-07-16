# MCP Client Web Part

## Summary

An SPFx 1.23.2 web part that connects to MCP servers through a local bridge, lists the available tools, and invokes them with user-supplied arguments.

> **Local-only limitation:** The bridge requires a local Node.js process and cannot be deployed to a production SharePoint environment.

## Prerequisites

- Node.js >= 22.14.0
- SharePoint Framework 1.23.2
- A local bridge server, started with `npm --prefix server run start`

## This sample illustrates...

- Connecting an SPFx web part to Model Context Protocol (MCP) servers through a local bridge.
- Discovering and displaying tools exposed by an MCP server.
- Invoking MCP tools with arguments supplied by the user.

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

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-mcp-client" />
