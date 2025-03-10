# React UseReducer Hook with PnPjs

## Summary

This SPFx web part demonstrates how to use the **React useReducer hook** with the **PnPjs library** to fetch items from a SharePoint list. By using `useReducer`, developers can better manage complex state within their React components, making it easier to handle asynchronous data fetching, loading states, and error handling.

![Web Part Preview](assets/preview_01.png)
![Web Part Preview](assets/preview_02.png)

[Blog: How to Use useReducer Hook for Managing Complex State in SPFx Projects: Step-by-Step Guide](https://pnp.github.io/blog/post/how-to-use-the-usereducer-hook-for-managing-complex-state-in-spfx-projects-step-by-step-guide)

## Prerequisites

- **Node.js**: v18.19.1 or higher is recommended.
- **PnP.js**: This sample uses PnP.js to connect to SharePoint data.
- **SPFx Development Environment**: [Set up your SPFx environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment) before running the web part.

### Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.20.2](https://img.shields.io/badge/SPFx-1.20.2-green.svg)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors

- [Ahmad Jad Alhak](https://github.com/ahmad-jad-alhak) |

## Version history

| Version | Date       | Comments         |
|---------|------------|------------------|
| 1.0     | Jan 17, 2025 | Initial release |

## Minimal path to awesome

1. **Clone the repository:**

  Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-use-reducer-hook) then unzip it)

  From your command line, change your current directory to the directory containing this sample (`react-use-reducer-hook`, located under `samples`)

   > This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

1. **Install dependencies:**

   ```bash
   npm install 

1. **Install dependencies:**

   ```bash
   gulp serve 

## Deployment

Follow these steps to deploy the web part:

1. **Pre-requisites:**
   - Ensure you have the correct [SPFx development environment](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment) set up.
   - Install Node.js LTS (v18.x).

2. **Build the solution:**
   - Clone the repository to your local machine.
   - Navigate to the project folder in your terminal and run:
  
     ```bash
     npm install
     gulp build
     ```

3. **Package the solution:**
   - Once built, package the solution with:

     ```bash
     gulp bundle --ship
     gulp package-solution --ship
     ```

4. **Upload the package:**
   - Upload the `.sppkg` file located in the `sharepoint/solution` folder to your SharePoint App Catalog.

5. **Deploy the solution:**
   - Once uploaded, select the package in the App Catalog and click on "Deploy".

6. Add the web part to any SharePoint page

## Features

### useReducer State Management

The sample demonstrates how to apply the `useReducer` hook to handle data fetching, loading states, and error messages in a clear and organized manner.

### Integration with PnP.js

Simplifies interaction with SharePoint lists and data sources, making it easy to retrieve and display data dynamically.

### Conditional Rendering Based on State

The web part shows how to conditionally render loading spinners, fetched data, and error messages depending on the current state managed by the reducer.

### Fluent UI Components

Incorporates Fluent UI controls (e.g., `Spinner`) for consistent and visually appealing UI elements.

## Configuration

To configure the web part, you need to provide the following properties:

- **Site URL**: The URL of the SharePoint site where the list is located.
- **List Name**: The name of the SharePoint list from which to fetch items.

### Steps to Configure

1. Add the web part to a SharePoint page.
2. Open the property pane by clicking the "Configure" button or the edit icon.
3. Enter the **Site URL** and **List Name** in the respective fields.
4. Save the configuration.

### Example Configuration

- **Site URL**: `https://contoso.sharepoint.com/sites/example`
- **List Name**: `Tasks`


## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft Teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples, and open-source controls for your Microsoft 365 development

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-use-reducer-hook%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-use-reducer-hook) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-use-reducer-hook&template=bug-report.yml&sample=react-use-reducer-hook&authors=@ahmad-jad-alhak&title=react-use-reducer-hook%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-use-reducer-hook&template=question.yml&sample=react-use-reducer-hook&authors=@ahmad-jad-alhak&title=react-use-reducer-hook%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-use-reducer-hook&template=suggestion.yml&sample=react-use-reducer-hook&authors=@ahmad-jad-alhak&title=react-use-reducer-hook%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-use-reducer-hook" />

