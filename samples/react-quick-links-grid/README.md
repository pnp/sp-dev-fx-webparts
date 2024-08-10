# webpart-quick-links

## Summary

This project is a SharePoint Framework (SPFx) WebPart that displays a set of quick links fetched from a SharePoint list. The quick links are displayed with icons and titles in a responsive grid layout.

https://github.com/user-attachments/assets/90ab66f0-e26f-4838-9803-131b42cbdc65

## Features

- **Dynamic Data Fetching**: Retrieves quick links dynamically from a SharePoint list, allowing for easy updates without modifying code.
- **Customizable List Fields**: Configurable property pane options for specifying the list title and internal names of the fields for title, URL, and icon.
- **Responsive Design**: Adapts to different screen sizes with a responsive grid layout, ensuring a consistent look on various devices.
- **Modern UI**: Displays quick links in a modern card layout with rounded corners and a hover effect for improved user experience.
- **Theming Support**: Uses SharePoint theme colors for a consistent look with the rest of the SharePoint site, including theme-based colors for icons and text.
- **Error Handling**: Includes error handling for data fetching to manage issues with retrieving list items gracefully.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.19.0-green.svg)
1.19.0

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

- Node.js (v18.20.4)
- SharePoint Online environment
- A SharePoint list containing the quick links. This list is configured with columns
  Title - Single line of text
  URL - Hyperlink or Picture
  Icon - Single line of text // Fluent Icon names can be referred from (https://developer.microsoft.com/en-us/fluentui#/styles/web/icons)

## Installation

1. Clone the repository:
   git clone <repository-url>
2. Navigate to the project directory:
   cd react-quick-links-grid
3. Install the dependencies:
   npm install

## Configuration

Before running the WebPart, you need to configure the property pane to point to the correct SharePoint list and fields.

## Property Pane Fields

List Title: The title of the SharePoint list to fetch data from.
Title Field: The internal name of the Title field in the SharePoint list.
URL Field: The internal name of the URL field in the SharePoint list.
Icon Field: The internal name of the Icon field in the SharePoint list.

## Usage

Run the WebPart locally:

gulp serve
Open the SharePoint Workbench to add the WebPart and configure the property pane fields.

## Project Structure

The project includes the following key files:

PnPQuickLinksGridWebPart.ts: Defines the main WebPart class and handles rendering and property pane configuration.
QuickLinksGrid.tsx: Defines the React component that fetches and displays the quick links.
PnPQuickLinksGridWebPart.module.scss: Contains the CSS styles for the QuickLinks component.

## Building the Project

To build the project, run the following command:

gulp build

## Deploying the WebPart

## Solution

| Solution    | Author(s)               |
| ----------- | ----------------------- |
| react-quick-links-grid | Venkadesh Sundaramurthy |

## Version history

| Version | Date            | Comments        |
| ------- | --------------- | --------------- |
| 1.0     | August 11, 2024 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
