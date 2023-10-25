# Using Azure OpenAI Connectors API

## Summary

This (__experimental__) web part, shows how to use the new feature (_in preview at the moment of building this sample_) Azure OpenAI Data Connectors.

![./assets/react-azure-openai-connector.gif](./assets/react-azure-openai-connector.gif)

The web part is calling the Azure OpenAI API, with a specific Data source configured to an existing Azure Search service that contains the Hotels index provided by Microsoft. The following screenshots shows how you can configure the connector through the new Azure OpenAI Studio. This is __NOT required__ for the sample, but helps to understand what the web part is doing behind the scenes.

First, you have configured your Search service (any tier except the free one) importing the Hotels data sample provided by Microsoft

![./assets/studio01.png](./assets/studio01.png)

![./assets/studio02.png](./assets/studio02.png)

Now, from the [Azure OpenAI Studio](https://oai.azure.com/portal), in the _Chat playground_, you can configure your data connector:

![./assets/studio03.png](./assets/studio03.png)

Connect it to your Azure Search Hotels index:

![./assets/studio04.png](./assets/studio04.png)
![./assets/studio05.png](./assets/studio05.png)

Follow the assistant to create the Connector. Once is done, you can use chatGPT to find hotels using natural language:

![./assets/studio06.png](./assets/studio06.png)

The web part offers the same functionality, showing how to call the Azure OpenAI API, with a pre-configured Data source.

__Note__: this is an experimental sample, based on the preview of the Azure OpenAI service, and the preview of the Data Connectors. Ensure you check the _prerequisites_ section if you are planning to run this sample.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.17.4-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

- Your Azure Subscription has the Azure OpenAI service available. You will see this message if you try to add Azure OpenAI service in your Subscription (follow the link in the Azure portal to request access).

> Azure OpenAI Service is currently available to customers via an application form. The selected subscription has not been enabled for use of the service and does not have quota for any pricing tiers. Click here to request access to Azure OpenAI service.

- You have created an Azure OpenAI service in your subscription (create it in a US region, as some features may not be available in other regions)
- Grab the Azure OpenAI Key (go to your _Azure OpenAI service -> Keys and Endpoint_)
- You have configured an Azure Search service with at least a Basic plan (Free tier is not working with the Azure OpenAI Connectors feature), and have deployed the "Hotels" index that is provided as sample by Microsoft.
- Grab the Azure Search endpoint URL (you can see it in the _Overview_ section)
- Grab the Azure Search API key (_Keys_ section)

## Contributors

- [Luis Mañez](https://github.com/luismanez)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | July 26, 2023 | Initial release |
| 1.1     | October 6, 2023 | Ctrl + enter to submit the query. Auto-scroll in the Messages list. |

## Minimal Path to Awesome

- Install the MS Graph Toolkit for SPFx package. [Follow this](https://learn.microsoft.com/graph/toolkit/get-started/mgt-spfx)
- Clone this repository
- Ensure that you are at the solution folder
- Edit the file `Constants.ts` with your values (see _prerequisites_ section)
- in the command-line run:
  - `npm install`
  - `gulp serve`
- Add the web part in the SharePoint workbench or any SharePoint page (appending _?debug=true&noredir=true&debugManifestsFile=<https://localhost:4321/temp/manifests.js>_ to the page URL)

## Features

This extension illustrates the following concepts:

- Calling Azure OpenAI _completions_ endpoint with a configured Azure Search connector
- Using MS Graph toolkit with the Person component
- Multiple FluentUI components

## References

- [Azure OpenAI REST API completions endpoint](https://learn.microsoft.com/azure/ai-services/openai/reference#chat-completions)
- [MS Graph toolkit for SPFx installation](https://learn.microsoft.com/graph/toolkit/get-started/mgt-spfx)
- [Getting started with SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development

## Video

[![Using Azure Open AI custom data sources with SPFx](./assets/video-thumbnail.png)](https://youtu.be/VVjNkwh2W3U?si=tYSpsBdcn5abiC-m&t=1750 "Using Azure Open AI custom data sources with SPFx")

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-azure-openai-connector%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-azure-openai-connector) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-azure-openai-connector&template=bug-report.yml&sample=react-azure-openai-connector&authors=@luismanez&title=react-azure-openai-connector%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-azure-openai-connector&template=question.yml&sample=react-azure-openai-connector&authors=@luismanez&title=react-azure-openai-connector%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-azure-openai-connector&template=suggestion.yml&sample=react-azure-openai-connector&authors=@luismanez&title=react-azure-openai-connector%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-azure-openai-connector" />
