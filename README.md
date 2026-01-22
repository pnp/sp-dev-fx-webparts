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


## Compatibility

|:warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to Toolchain this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.22.0](https://img.shields.io/badge/SPFx-1.22.0-green.svg)
![Node.js v22](https://img.shields.io/badge/Node.js-v22-green.svg)
![Toolchain: Heft](https://img.shields.io/badge/Toolchain-Heft-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)
## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- SharePoint Online tenant with Microsoft 365 Copilot license
- Admin approval for the required Microsoft Graph API permissions (Chat.Read, Mail.Read, People.Read.All, etc.)
- Node.js and npm installed locally

## Contributors

[Siddharth Vaghasia](https://github.com/siddharth-vaghasia)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | January 22, 2026 | Initial release |



## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
  - `heft start`

> Include any additional steps as needed.

Other build commands can be listed using `heft --help`.

## Concepts Explored

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

Note - Some code has been generated with vibe coding Github Copilot.

## Help

Search for:
react-copilot-chat-api-demo

Search for:
@siddharth-vaghasia



- [Use MSGraphClientV3 to connect to Microsoft Graph](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-msgraph)
- [Consume Microsoft Graph in SharePoint Framework](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/use-aad-tutorial#consume-microsoft-graph)
- [Microsoft Graph Copilot API Documentation](https://learn.microsoft.com/en-us/graph/api/resources/copilot?view=graph-rest-beta)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
- [Heft Documentation](https://heft.rushstack.io/)

## Disclaimer

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20YOUR-SOLUTION-NAME%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=YOUR-SOLUTION-NAME) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20YOUR-SOLUTION-NAME&template=bug-report.yml&sample=YOUR-SOLUTION-NAME&authors=@YOURGITHUBUSERNAME&title=YOUR-SOLUTION-NAME%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20YOUR-SOLUTION-NAME&template=question.yml&sample=YOUR-SOLUTION-NAME&authors=@YOURGITHUBUSERNAME&title=YOUR-SOLUTION-NAME%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20YOUR-SOLUTION-NAME&template=suggestion.yml&sample=YOUR-SOLUTION-NAME&authors=@YOURGITHUBUSERNAME&title=YOUR-SOLUTION-NAME%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-copilot-chat-api-demo" />
