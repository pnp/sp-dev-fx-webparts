---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - react
  createdDate: 03/07/2022 12:00:00 AM
---
# Frequently Asked Questions with Property Feld Colection Data

## Summary

- This Web Part allows users to create Frequently Asked Questions using Property Field Collection Data for SharePoint Online.
- This web part allows to search within questions and answers which are stored in a Property Field Collection Data and can be easily edited inline within the webpart using Property Pane. Search text is highligted in the search results.
- Provides options to view as an Accordion or Tab.
- In mobile browser defaults to Accordion view.

![Web part preview](assets/FAQWebpart.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.13-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

There are no pre-requisites to use these samples.

## Solution

Solution|Author(s)
--------|---------
react-Faqs | Arun Kumar Perumal - LinkedIn:  https://www.linkedin.com/in/arunkumarperumal/

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 07, 2022|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**


## Features

This Web Part allows users to create Frequently Asked Questions using Property Field Collection Data for SharePoint Online.

Has the following features:

- Ability to create FAQ Categories
- Ability to create FAQs with Rich Text Editor for Answer using PnP Rich Text Control 
- Ability to sort FAQs with capability from PnP Property Pane PropertyFieldCollectionData
- Ability to view the FAQs as an Accordion or Tab 
- Ability to search based on FAQ Question and Answer and highlights the search term in the results
- Defaults to Accordion in Mobile displays
- Uses Custom Accordion components included in the code.
- Use the site Primary colors and themes for display- 
- Uses Office UI Fabric Search Box for the search functionality


> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development