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
  createdDate: 12/1/2017 12:00:00 AM
---

# React List Form WebPart

## Summary

The `React List Form web part` is a web part for adding a list form to any page. It provides a working example of implementing generic SharePoint list forms using the **SharePoint Framework (SPFx)** and the _React_ and _Office UI Fabric_ libraries.

The web part allows configuring which list to use and if a form for adding a new item, editing or displaying an existing item should be shown. When selecting display or edit form the ID can be defined either as a fixed number or as a query string parameter name. The form fields can be added, ordered using drag-and-drop or removed visually in the web part. A URL including placeholder for the ID can be provided to redirect to after successfully saving the form.

![Demo](./assets/React-ListForm-Overview.gif)

## Used SharePoint Framework Version

![SPFx 1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

| Solution        | Author(s)                                                         |
| --------------- | ----------------------------------------------------------------- |
| react-list-form | Dany Wyss                                                         |
| react-list-form | Harsha Vardhini ([@harshagracy](https://twitter.com/harshagracy)) |

## Version history

| Version | Date              | Comments                                                                                                  |
| ------- | ----------------- | --------------------------------------------------------------------------------------------------------- |
| 1.0.0   | November 24, 2017 | Initial release                                                                                           |
| 1.0.1   | February 22, 2019 | Updated to SPFx 1.7.1 and dependencies, Added Turkish translation, Added RichText Mode and Tinymce Editor |
| 1.0.2   | October 14, 2019  | Updated to SPFx 1.9.1 and dependencies                                                                    |
| 1.0.3   | July 7, 2020      | Updated to SPFx 1.10.0 and dependencies. Fixed required field validation (Harsha Vardhini)                |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side web parts.
- Using React controlled components for SharePoint form fields.
- Using SharePoint REST services to retrieve and update schema and data for lists and fields.
- Using Office UI Fabric React components and styles for building user experience consistent with SharePoint and Office.
- Integrating drag and drop to provide better user experience for configuring web parts visually.
- Using custom drop-down property editors in the property pane.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-list-form" />
