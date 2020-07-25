# Stock Information web part

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/stockInformation.

This web part provides you the ability to display basic stock information for one publicly traded stock on a web page. The web part may be configured to display a stock based on stock symbol as well as be set to automatically refresh the stock information every 60 (sixty) seconds. The web part depends on a service provided by [Alpha Advantage](https://www.alphavantage.co/). [Learn how to register for your api key](https://github.com/SharePoint/sp-starter-kit/blob/master/documentation/tenant-settings.md#request-a-custom-api-key-to-alpha-vantage).

The api key provided by Alpha Advantage is added as a tenant property by the Starter Kit provisioning process. [Use the -StockAPIKey parameter when deploying the kit](https://github.com/SharePoint/sp-starter-kit/tree/master/provisioning#-stockapikey).

By default, the `Stock Information` web part will use the stock symbol set during the Starter Kit provisioning process when the [-StockSymbol](https://github.com/SharePoint/sp-starter-kit/tree/master/provisioning#-stocksymbol) parameter is provided. The default stock symbol is `MSFT`. The stock symbol may be customized per web part instance.

![Stock Information](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-stock.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Stock Information** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Stock Information` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Stock Code | stockSymbol | string | no | Default: MSFT - overrides the default stock, MSFT, with a preferred stock symbol |
| Automatic Refresh | autoRefresh | bool | no | Default: false - If true, the web part will auto refresh every 60 seconds |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part requires access to the Microsoft Graph.

# Screenshots

![Stock Information](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-stock.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/stockInformation

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-stock-information" />