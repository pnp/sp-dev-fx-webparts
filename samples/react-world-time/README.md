# World Time web part

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/worldTime.

This web part provides you the ability to display basic clock for a given time zone on a web page. The clock is based on the user's workstation time with an offset from UTC to the selected time zone.

![World Time](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-world-time.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **World Time** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `World Time` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Description | description | string | no | Default: UTC Time - The clock description |
| Time Zone | timeZoneOffset | number | no | Default: 0 - The clock offset where 0 = UTC, -8 = PST (UTC−08:00), etc |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant.

# Screenshots

![World Time](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-world-time.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/worldTime

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-world-time" />