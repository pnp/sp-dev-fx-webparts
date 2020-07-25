# Personal Calendar web part

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/personalCalendar.

This web part provides you the ability to add a particular user's personal calendar on a web page. The web part may be configured to automatically refresh, as well as display up to seven days of events and a pre-defined number of events at a time. This web part is powered by the Microsoft Graph and currently requires that the Office 365 tenant be configured for targeted release for all users.

![Personal Calendar](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-personal-calendar.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Personal Calendar** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Personal Calendar` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Upcoming Events | title | string | no | The web part title, editable inline with the web part itself |
| How often to check for new upcoming meetings (in minutes) | refreshInterval | number | no | Default: 5 - the interval in minutes between auto refresh |
| How many days in advance to retrieve meetings for? 0 - today only | daysInAdvance | number | no | Default: 0 (Today only) - the interval in minutes between auto refresh |
| How many meetings to show? 0 - show all retrieved meetings | numMeetings | number | no | Default: 0 (all) - the interval in minutes between auto refresh |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part requires access to the Microsoft Graph.

# Screenshots

![Personal Calendar](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-personal-calendar.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/personalCalendar

# Minimal Path to Awesome

- Clone this repository
- Move to Solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

# Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-personal-calendar" />