# Getting started with client-side web parts

## Summary

This sub folders contains client-side projects includes the web parts detailed in the Getting Started walkthroughs. Technically these web parts could have remaind in one single solution, but to ensure that they match exactly what's in the tutorials, we have seperated them to dedicated solutions. Sub folders contains the following web parts:

| Solution  | Getting Started Walkthrough | Video
| ------------- | ------------- | ------------- |
| hello-world  | [Build your first web part](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/build-a-hello-world-web-part)   | [video](https://www.youtube.com/watch?v=QbDtsMg88Js)  |
| hello-world-sp  | [Connect your client-side web part to SharePoint](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/connect-to-sharepoint)  | [video](https://www.youtube.com/watch?v=9VMwjb2pbQ8)  |
| jquery-webpart  | [Add jQueryUI Accordion to your SharePoint client-side web part](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/add-jqueryui-accordion-to-web-part)  | [video](https://www.youtube.com/watch?v=-3m__hRQxEI)  |
| documentcardexample-webpart  | [Use Office UI Fabric React components in your SharePoint client-side web part](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/use-fabric-react-components)  | [video](https://www.youtube.com/watch?v=1N6kNvLxyg4)  |
| asset-deployment-webpart  | [Provision SharePoint assets from SharePoint Framework solutions](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/get-started/provision-sp-assets-from-package)  | TBD  |

You can also other SharePoint Framework releated videos from [SharePoint PnP YouTube Channel](https://aka.ms/SPPnP-Videos).

## Used SharePoint Framework Version
![GA](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

| Solution  | Author(s) |
| ------------- | ------------- |
| web-part-tutorials  | Microsoft SharePoint Framework Team   |

## Version history

| Version  | Date | Comments |
| ------------- | ------------- | ------------- |
| 0.3.0  | February 28th 2017   | Updated to GA level. |
| 0.2.0  | February 15th 2017   | Updated to RC0 level. |
| 0.1.0  | December 16th 2016   | Updated to drop 6 level. |
| 0.0.1  | August 31st 2016   | Initial release supporting SharePoint Framework developer preview. |

## Disclaimer

**THIS CODE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

----------

## Build and run the tutorials

To build and run this client-side project, you will need to clone and build the tutorials project.

Clone this repo by executing the following command in your console:

```
git clone https://github.com/SharePoint/sp-dev-fx-webparts.git
```

Navigate to the cloned repo folder which should be the same as the repo name:

```
cd sp-dev-fx-webparts
```

Navigate to the `tutorials` folder:

```
cd tutorials
```

Navigate to the `specific web part` folder:

```
cd 'subfolder'
```


Now run the following command to install the npm packages:

```
npm install
```

This will install the required npm packages and depedencies to build and run the client-side project.

Once the npm packages are installed, run the command to preview your web parts in SharePoint Workbench:

```
gulp serve
```
<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/tutorials" />