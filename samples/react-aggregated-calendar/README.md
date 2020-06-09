# React Aggregated Calendar Webpart

## Summary
This is a sample webpart developed using React Framework to gather the aggregated events from the multiple calendars from multiple sites using Full Calendar from fullcalendar.io


![The web part in action](./assets/react-aggregated-calendar.gif)



The webpart was designed to create an aggregated view of calendar to fetch events from multiple calendars across the sites and site collection.
The webpart will show the event information using the callout functionality of Office UI Fabric

Webpart is developed using below technologies 
* React Framework
* Full Calendar(fullcalendar.io)
* jQuery
* Office UI Fabric


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)



## Prerequisites
 
Before you can use this webpart example, you will need at least one Out of the Box Calendar created.

It is required that the users have view access on the calendar.

## Solution

Solution|Author(s)
--------|---------
react-aggregated-calendar | [Dhaval Shah](https://www.linkedin.com/in/dhavalshah27) ([@beingdhavalshah](https://twitter.com/BeingDhavalShah))

## Version history

Version|Date|Comments
-------|----|--------
1.0 |July 16, 2018 | Initial Release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`


## Features
This Web Part displays the events from multiple calendars located in various sites/site collection of sharepoint:

- Aggregated events for Calendar
- Supports Sub-Sites and Site Collection level
- Display of Legend for each Calendar
- Formatted Date time
- Display of Event Details over event click

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-aggregated-calendar" />

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-aggregated-calendar" />
