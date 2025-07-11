# react-people-slick

## Summary

this webpart are using @pnp/sp to get sp list value and react-slick to display the content
![Preview](./assets/react-people-slick.gif)
![Preview](./assets/Screenshot.png)

## Used SharePoint Framework Version

![SPFx 1.21.1](https://img.shields.io/badge/version-1.21.1-green.svg)
![Node.js v22 ](https://img.shields.io/badge/Node.js-v20-green.svg) 

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

pre-create the list with the format below
| Column Name| Type                                               |
| -----------| ------------------------------------------------------- |
| Title          | Single Line of Text  | - default, not using
| Email  | People & Group  |
| Published  | DateTime  |
| RedirectURL    | Hyperlink  |
| Tags         | Choice  |



## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-people-slick | Author details (Lew Chin Hoong @ https://www.facebook.com/woolei) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | July 8, 2025| Initial release - read from custom list and display people carousel |

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

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- React-Slick
- @pnp/sp

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development


<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-people-slick" />