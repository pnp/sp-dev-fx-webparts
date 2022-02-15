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
  - React
  createdDate: 07/08/2020 12:00:00 AM
---
# Timeline

## Summary 

This sample displays list of events in chronological order. It is typically a graphic design showing a long bar labelled with dates paralleling it, and coexisting events. This web part helps to draw the timeline based from SharePoint list with pre-defined schema.

![Web part preview][figure1]

When added to SharePoint site, the source list containing timeline information, layout, date format, and sort direction can be configured from web part properties.

![SharePoint list schema][figure2]

Users with "Manage Web" permissions will be able to add, edit, and delete events from web part.

![Event CRUD][figure3]

### Layouts

The sample helps to represent the timeline in 2 layouts:

**Vertical layout**

Represents the events vertically one below other.

![Vertical layout][figure4]


**Horizontal layout**

Represents the events horizontally one after other.

![Horizontal layout][figure5]

### SharePoint Asset

A SharePoint list (named "Timeline") is provisioned to store the timeline information, along with supported site columns and content type. The schema of the list is as below.
![List Schema][figure6]

- The "Title" column stores the event title.
- The "Event Date" column represents the date of event.
- The "Picture" column stores the url of image to be displayed for the event.
- The "Link" column represents the url to event.
- The "Description" column represents the more information about the event.

The sample also provisions sample data to the "Timeline" list, which can be used as an example to start using the web part.
![List Sample Data][figure7]

### NPM Packages Used

Below NPM package is used to develop this sample.
1. @pnp/sp (https://www.npmjs.com/package/@pnp/sp)
2. @pnp/spfx-controls-react (https://pnp.github.io/sp-dev-fx-controls-react/)
3. @pnp/spfx-property-controls (https://pnp.github.io/sp-dev-fx-property-controls/)
4. Moment (https://www.npmjs.com/package/moment)


## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-timeline|[Nanddeep Nachan](https://www.linkedin.com/in/nanddeepnachan/) (SharePoint Consultant, [@NanddeepNachan](https://http://twitter.com/NanddeepNachan) )
&nbsp;|[Ravi Kulkarni](https://www.linkedin.com/in/ravi-kulkarni-a5381723/) (SharePoint Consultant)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|July 08, 2020|Initial release

## Prerequisites

- SharePoint Online tenant 
- Site Collection created under the **/sites/** or **/**

## Minimal Path to Awesome

- Clone this repository.
- On the command prompt, navigate to the web part folder and execute:
- `npm i`
- `gulp bundle --ship`
- `gulp package-solution --ship`
- The package can be found at `\react-timeline\sharepoint\solution\react-timeline.sppkg`
- [Deploy the package](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#deploy-the-helloworld-package-to-app-catalog) to the app catalog.
- [Install the client-side solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#install-the-client-side-solution-on-your-site) to your SharePoint site.
- [Add web part to your SharePoint page](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/serve-your-web-part-in-a-sharepoint-page#add-the-helloworld-web-part-to-modern-page) named "Timeline".

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


## Features

This sample web part displays list of events in chronological order with data stored in a SharePoint list.
- SharePoint assets provisioning
- Creating extensible services
- Using @pnp/sp


[figure1]: ./assets/webpart-preview.gif
[figure2]: ./assets/wepart-propertypane.png
[figure3]: ./assets/event-crud.gif
[figure4]: ./assets/layout-vertical.png
[figure5]: ./assets/layout-horizontal.png
[figure6]: ./assets/list-schema.png
[figure7]: ./assets/list-sample-data.png


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-timeline" />
