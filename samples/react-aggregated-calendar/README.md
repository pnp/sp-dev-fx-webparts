# Aggregated Calendar

## Summary

This is a sample web part developed using React Framework to gather the aggregated events from the multiple calendars from multiple sites using Full Calendar from fullcalendar.io


![The web part in action](./assets/react-aggregated-calendar.gif)

The web part was designed to create an aggregated view of calendar to fetch events from multiple calendars across the sites and site collection.
The web part will show the event information using the callout functionality of Office UI Fabric

Web part is developed using below technologies 
* React Framework
* Full Calendar(fullcalendar.io)
* jQuery
* Office UI Fabric

## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v8 | v6](https://img.shields.io/badge/Node.js-v8%20%7C%20v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
Before you can use this web part example, you will need at least one Out of the Box Calendar created.

It is required that the users have view access on the calendar.

## Solution

Solution|Author(s)
--------|---------
react-aggregated-calendar | [Dhaval Shah](https://www.linkedin.com/in/dhavalshah27) ([@beingdhavalshah](https://twitter.com/BeingDhavalShah))

## Version history

Version|Date|Comments
-------|----|--------
1.0 |July 16, 2018 | Initial Release



## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


## Features

This Web Part displays the events from multiple calendars located in various sites/site collection of SharePoint:

- Aggregated events for Calendar
- Supports Sub-Sites and Site Collection level
- Display of Legend for each Calendar
- Formatted Date time
- Display of Event Details over event click

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-aggregated-calendar" />

## React Aggregated Calendar

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean
gulp test
gulp serve
gulp bundle
gulp package-solution


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-aggregated-calendar" />
