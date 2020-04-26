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
  createdDate: 04/25/2017 12:00:00 AM
---
# React Calendar

## Summary
This Web Part allows you to manage events in a calendar. 
Uses a list of existing calendars on any website.
The location and name of the list and the dates of the events to be displayed are defined in the properties of the web part.

Each category has its own color that is generated in the load.

The Web Part checks the user's permissions for the View, Add, Edit, and Delete events.

![calendar](assets/animatevideo.gif) 


![calendar](assets/weekly_moderncalendar.gif) 

![calendar](assets/modercalendar_monthly.gif) 


![calendar](assets/moderncalendar_yearly.gif) 


##  Web Part  - Screenshots

![calendar](assets/calendar_teams.jpg)

![calendar](assets/calendar_teams2.jpg)

![calendar](assets/screen1.png)


![calendar](assets/screen1.0.png)


![calendar](assets/screen1.1.png)


![calendar](assets/screen1.2.png)


![calendar](assets/screen1.3.png)


![calendar](assets/screen1.4.png)


![calendar](assets/screen2.png)


![calendar](assets/screen3.png)


![calendar](assets/screen4.png)


![calendar](assets/screen5.png)


![calendar](assets/screen6.png)


![calendar](assets/screen7.png)


![calendar](assets/screen8.png)



![calendar](assets/screen9.png)

## Used SharePoint Framework Version 

![1.8.2](https://img.shields.io/badge/version-1.8.2-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Site Url of Calendar List | Text| yes|
Calendar list| Choice/Dropdown | yes|  this is filled with all list of  type "event list" created
Start Date | Date | yes | Event Date 
End Date| Date| yes | Event Date

## Solution
The Web Part Use PnPjs library, Office-ui-fabric-react components. react Big-Calendar Compoment

Solution|Author(s)
--------|---------
Calendar Web Part|João Mendes
Calendar Web Part|Mohamed Derhalli

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 25, 2019|Initial release
1.0.1|June 10, 2019|update add recurrence events
1.0.2|April 25, 2020|Update styles according to the applied theme

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - Add to **AppCatalog** and deploy

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-calendar" />
