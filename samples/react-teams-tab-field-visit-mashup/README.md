# Teams Tab - Field Visit Demo (Mashup)

## Summary
A web part for use in Microsoft Teams that displays a mashup of information partaining to customer visits. Visits are obtained from the Team's shared calendar and displayed by user. When a visit is selected, the solution displays:
 * customer information (from the Northwind database)
 * documents (from SharePoint)
 * recent transactions (mock)
 * a map (Bing maps)
 * current weather (Open Weather Map)
 * photos (from SharePoint)
 * a text box for sending messages to the Teams channel with deep links back to the selected visit

The solution demonstrates:

 * A Teams tab using SharePoint Framework
 * Accessing the hosting Team using the teams context and the Graph API
 * Deep linking to a SharePoint Framework tab
 * A mashup using React components

![Field Visit Demo](./documentation/FieldVisitDemo.png)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/drop-1.8.0-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Building Microsoft Teams Tabs using SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/integrate-with-teams-introduction)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Solution

Solution|Author(s)
--------|---------
field-visit-demo-tab | Bob German ([@Bob1German](http://www.twitter.com/Bob1German))

Many thanks to [Arbindo Chattopadhyay](https://www.linkedin.com/in/arbindoc/) for writing the [detailed installation instructions ](./documentation/setup.md) and compiling [links to resources](./documentation/resources.md).

## Version history

Version|Date|Comments
-------|----|--------
1.1|April 20, 2019|Updated for SPFx 1.8, moved to sp-dev-fx-webparts
1.0|April 5, 2019|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

The quickest path to building the web part and running it with mock data:

 * Obtain API keys for [Bing Maps](https://docs.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key) and [Open Weather Maps](https://openweathermap.org/api). In src/webparts/fieldVisitTab/, copy constants.sample.ts to constants.ts and add the API keys.
 * npm install
 * gulp serve

To work with real data, the web part requires content to be in place including:

* A Microsoft Team
* Calendar items in the Team's shared calendar, encoded with Northwind database customer IDs
* Documents and photos in SharePoint

[Detailed setup instructions are here](./documentation/setup.md).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-teams-tab-field-visit-mashup" />
