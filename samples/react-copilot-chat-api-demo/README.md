# Copilot chat-api-playground

## Summary

The Copilot Chat API Demo is a SharePoint Framework (SPFx) web part that demonstrates how to consume the Microsoft 365 Copilot Chat API (beta) using the native MSGraphClientV3 HTTP client. This sample showcases best practices for integrating Microsoft Graph endpoints in SharePoint Framework solutions.

### Key Features:

- **Create Conversations**: Initiates a new Copilot conversation automatically on first message
- **Send Messages**: Send user queries to Copilot with required location hint context
- **Auto-Creation Pattern**: Conversation is created automatically if it doesn't exist, avoiding redundant API calls
- **Reset Functionality**: Clear conversation state and start fresh with a single button click
- **Error Handling**: Comprehensive error handling and user feedback

### Technologies Used:

- **MSGraphClientV3**: Native Microsoft Graph client for SPFx (no external dependencies like PnPjs)
- **Microsoft Graph Beta API**: Copilot conversations endpoint
- **React**: Component-based UI with state management
- **TypeScript**: Type-safe development

## Screen Demo

![Copilot Chat API Demo Web Part](./src/webparts/copiltChatApiDemo/assets/copilot-chat-api-demo-screenshot.png)


## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.22.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- SharePoint Online tenant with Microsoft 365 Copilot license
- Admin approval for the required Microsoft Graph API permissions (Chat.Read, Mail.Read, People.Read.All, etc.)
- Node.js and npm installed locally

## Contributors

| Solution | Author(s) |
| --- | --- |
| Copilot Chat API Demo | [Siddharth Vaghasia](https://github.com/siddharth-vaghasia) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | January 22, 2026 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `heft start`

> Include any additional steps as needed.

Other build commands can be listed using `heft --help`.

## Features

This web part demonstrates the following concepts and best practices:

- **MSGraphClientV3 Integration**: Shows how to properly use the native Microsoft Graph client in SPFx without external HTTP libraries
- **Promise-Based API Calls**: Wraps callback-based MSGraphClientV3 methods in Promises for better async/await handling
- **Auto-Initialization Pattern**: Intelligently creates API resources on-demand without redundant calls
- **State Management**: Effective React component state management for API responses and user interactions
- **Error Handling**: Comprehensive error catching and user-friendly error messages
- **API Permission Configuration**: Demonstrates how to declare required Graph API scopes in package-solution.json
- **Beta API Usage**: Shows how to version API calls to beta endpoints

### Copilot Chat API Workflow:

1. **Create Conversation**: `POST /beta/copilot/conversations` - Initiates a new conversation
2. **Send Message**: `POST /beta/copilot/conversations/{id}/chat` - Sends a message with optional location hints
3. **Receive Response**: Gets Copilot's response with adaptive cards and attributions

### Required Permissions:

The web part requires the following Microsoft Graph scopes:
- `Chat.Read`
- `Mail.Read`
- `People.Read.All`
- `Sites.Read.All`
- `ChannelMessage.Read.All`
- `OnlineMeetingTranscript.Read.All`
- `ExternalItem.Read.All`

## References

- [Use MSGraphClientV3 to connect to Microsoft Graph](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph)
- [Consume Microsoft Graph in SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#consume-microsoft-graph)
- [Microsoft Graph Copilot API Documentation](https://learn.microsoft.com/en-us/graph/api/resources/copilot?view=graph-rest-beta)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)