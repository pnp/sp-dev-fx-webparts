# React Calendar

## Summary
This Web Part allows you to manage events in a calendar.
Uses a list of existing calendars on any website.
The location and name of the list and the dates of the events to be displayed are defined in the properties of the web part.

The Events are created in Site TimeZone, defined in site Regional Settings.

Each category has its own color that is generated in the load.

The Web Part checks the user's permissions for the View, Add, Edit, and Delete events.

The Web Part does not show recurring events, I will work on it soon.



##  
![callendar](/samples/react-calendar/assets/animatevideo.gif)  


##  Web Part  - Screenshots
![callendar](/samples/react-calendar//assets/screen1.png)


![callendar](/samples/react-calendar/assets/screen1.0.jpg)


![callendar](/samples/react-calendar/assets/screen1.1.png)


![callendar](/samples/react-calendar/assets/screen1.2.png)


![callendar](/samples/react-calendar/assets/screen1.3.png)


![callendar](/samples/react-calendar//assets/screen1.4.png)


![callendar](/samples/react-calendar//assets/screen2.png)



![callendar](/samples/react-calendar/assets/screen3.png)



![callendar](/samples/react-calendar//assets/screen4.png)



![callendar](/samples/react-calendar/assets/screen5.png)


![callendar](/samples/react-calendar//assets/screen6.png)


![callendar](/samples/react-calendar//assets/screen7.png)


![callendar](/samples/react-calendar/assets/screen8.png)



![callendar](/samples/react-calendar//assets/screen9.png)
##   
 

 



## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

> Update accordingly as needed.

## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
Site Url of Calendar List | Text| yes|
Calendar list| Text| yes|  this is filled with all list of  type "event list" created
Start Date | Date | yes | Event Date 
End Date| Date| yes | Event Date
 

## Solution
The Web Part Use PnPjs library, Office-ui-fabric-react components. react Big-Calendar Compoment

Solution|Author(s)
--------|---------
Calendar  Web Part|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|April 25, 2019|Initial release

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
  - `Add to AppCatalog and deploy`




<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/readme-template" />
