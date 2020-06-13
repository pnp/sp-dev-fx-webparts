## Local Azure Function and SPFx Web Part Development to consume third party APIs

This sample shows how to consume third-party APIs through an Azure Functions by a Web Part. In this scenario, Vimeo is the representative third party API.
This project contains two separate project folders:

* [VimeoRequest](./VimeoRequest) - contain the Azure Function written in JavaScript
* [VimeoWebPart](./VimeoWebPart) - contain the web part consuming the local running Azure Function

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-1.4.1-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-azfunc-vimeo | Stefan Bauer - n8d ([@stfbauer](https://twitter.com/stfbauer))

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 24, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Build Azure Function

To install and run the Azure Function navigate to the folder: [VimeoRequest](./VimeoRequest) and execute the following command.

```sh
npm install
```

This will install all the required NPM packages to run the Azure function

### Additional Configuration Vimeo Azure Function

The folder [VimeoRequest](./VimeoRequest) contains a Azure Function generated with the [Azure Function Core Tools](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local).
The access videos stored on this platform first a new application needs to be created first. To create a new Application navigate to the following website [https://developer.vimeo.com/apps/new?source=topnav](https://developer.vimeo.com/apps/new?source=topnav)
After the creation of a new Application, the created AppID and Secret must get stored in the local Azure function configuration. This configuration file can be found in the root folder of the Azure Function Host and is named [local.settings.json](./VimeoRequest/local.settings.json).

```jS
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "VimeoAPI": "<Enter APP ID here>",
    "VimeoSecret": "<Enter App Secret here>",
    "VimeoEndPoint": "https://api.vimeo.com"
  }
}
```

A detailed step by step guide on this Azure Function can be found on the blog post: [An Azure Function for a Web Part](https://n8d.at/blog/an-azure-function-for-an-smart-stupid-web-part-part-2/).

#### Run Azure Function

To run this Azure Function execute the following command from inside the VimeoRequest folder.

```sh
func start --useHttps --cert server.pfx --password 'password' --cors '*'
```

To check if the Azure Function is running and returns a result navigate to the following URL in your browser.

```
https://localhost:7071/api/Search?q=Hello%20World
```

#### Run Vimeo Web Part
  
To run the web part execute the following command:

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

## Further information
- Overall Overview: [A smart stupid web part for SharePoint - Part 1](https://n8d.at/blog/smart-stupid-web-parts-with-sharepoint-framework-part-1/)
- Details to Azure function implementation: [An Azure Function for an smart stupid web part – Part 2](https://n8d.at/blog/an-azure-function-for-an-smart-stupid-web-part-part-2/)
- Web Part Details: [A smart stupid web part consumes a third party API through Azure Functions – Part 3](https://n8d.at/blog/a-smart-stupid-web-part-consumes-a-third-party-api-through-azure-functions-part-3/)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-azfunc-vimeo" />

