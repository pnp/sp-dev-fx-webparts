# Local Azure Function and SPFx Web Part Development to consume third party APIs

This sample shows how to consume third-party APIs through an Azure Functions by a Web Part. In this scenario, Vimeo is the representative third party API.
This project contains two separate project folders:

* [VimeoRequest](./VimeoRequest) - contain the Azure Function written in JavaScript
* [VimeoWebPart](./VimeoWebPart) - contain the web part consuming the local running Azure Function

## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v6 | v8](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20v8-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Limited](https://img.shields.io/badge/Local%20Workbench-Limited-yellow.svg "Functionality may be limited")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-azfunc-vimeo | [Stefan Bauer](https://github.com/n8design) - n8d ([@stfbauer](https://twitter.com/stfbauer))

## Version history

Version|Date|Comments
-------|----|--------
1.0|July 24, 2018|Initial release

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

* `lib/*` - intermediate-stage commonjs build artifacts
* `dist/*` - the bundled script, along with other resources
* `deploy/*` - all resources which should be uploaded to a CDN.

## Further information
- Overall Overview: [A smart stupid web part for SharePoint - Part 1](https://n8d.at/blog/smart-stupid-web-parts-with-sharepoint-framework-part-1/)
- Details to Azure function implementation: [An Azure Function for an smart stupid web part – Part 2](https://n8d.at/blog/an-azure-function-for-an-smart-stupid-web-part-part-2/)
- Web Part Details: [A smart stupid web part consumes a third party API through Azure Functions – Part 3](https://n8d.at/blog/a-smart-stupid-web-part-consumes-a-third-party-api-through-azure-functions-part-3/)


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-azfunc-vimeo") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-azfunc-vimeo) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-azfunc-vimeo&template=bug-report.yml&sample=react-azfunc-vimeo&authors=@n8design&title=react-azfunc-vimeo%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-azfunc-vimeo&template=question.yml&sample=react-azfunc-vimeo&authors=@n8design&title=react-azfunc-vimeo%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-azfunc-vimeo&template=question.yml&sample=react-azfunc-vimeo&authors=@n8design&title=react-azfunc-vimeo%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-azfunc-vimeo" />

