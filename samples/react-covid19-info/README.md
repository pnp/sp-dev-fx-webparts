# COVID 19 information web part

## Summary

This web part displays info about the COVID-19 virus for a given country.
The following info is displayed:
 - Confirmed cases
 - Deaths
 - Recovered

![COVID-19 info](./assets/covid-counter.gif)

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Solution

Solution|Author(s)
--------|---------
react-covid19-info | [Robin Agten](https://twitter.com/AgtenRobin)

## Web part properties

| Property                             	| Group                  	| Description                                                                                               	| Default 	|
|--------------------------------------	|------------------------	|-----------------------------------------------------------------------------------------------------------	|---------	|
| iso2 Country Code                    	| Country Settings       	| Defines the country for which the COVID-19 info should be displayed example: BE for Belgium               	| None    	|
| Show history button                  	| Web part configuration 	| Determines whether or not the history icon is shown. This can be used to show an graph of historical data 	| False   	|
| View more statistics                 	| Web part configuration 	| Provide an optional external link to more details statistics                                              	| None    	|
| Up count duration                    	| Web part configuration 	| Number of seconds for the counters to count up                                                            	| 2       	|
| Color for the Confirmed Cases number 	| Web part configuration 	| Defines the color of the Confirmed cases number                                                           	| #69797e 	|
| Color for the Deaths number          	| Web part configuration 	| Defines the color of the Deaths number                                                                    	| #d13438 	|
| Color for the Recovered number       	| Web part configuration 	| Defines the color of the Recovered number                                                                 	| #498205 	|

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 25, 2020|Initial Release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`


## Features

 * Configurable Country
 * Configurable Colors
 * Optional historical graph
 * Optional 'view more statistics' link

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using external APIs using httpClient
* [Office Fabric UI React](https://developer.microsoft.com/en-us/fabric#/)
* [SPFx Controls React](https://sharepoint.github.io/sp-dev-fx-controls-react/)
* [SPFx Property Controls](https://sharepoint.github.io/sp-dev-fx-property-controls/)
* [Recharts](http://recharts.org/en-US/)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-covid19-info" />

