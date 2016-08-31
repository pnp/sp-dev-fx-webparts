# Getting started with client-side web parts

## Summary

This *web-part-tutorials* client-side project includes the web parts detailed in the Getting Started walkthroughs. The solution contains the following web parts:

| Web part  | Getting Started Walkthrough | Video
| ------------- | ------------- | ------------- |
| helloWorld  | [Build your first web part](https://github.com/SharePoint/sp-dev-docs/wiki/HelloWorld-WebPart)   | [video](https://www.youtube.com/watch?v=ralspfOBgic)  |
| helloWorldSharePoint  | [Connect your client-side web part to SharePoint](https://github.com/SharePoint/sp-dev-docs/wiki/HelloWorld,-Talking-to-SharePoint)  | [video](https://www.youtube.com/watch?v=rokWJlXoFWk)  |
| jQuery  | [Add jQueryUI Accordion to your SharePoint client-side web part](https://github.com/SharePoint/sp-dev-docs/wiki/jQueryUI-Accordion-WebPart)  | [video](https://www.youtube.com/watch?v=YcECe5JbAnA)  |
| documentCardExample  | [Use Office UI Fabric React components in your SharePoint client-side web part](https://github.com/SharePoint/sp-dev-docs/wiki/Using-Office-UI-Fabric-Components)  | [video](https://www.youtube.com/watch?v=P8WmNhcSWHU)  |

You can also other SharePoint Framework releated videos from [SharePoint PnP YouTube Channel](https://aka.ms/SPPnP-Videos).

## Applies to

* [SharePoint Framework Developer Preview](https://github.com/SharePoint/sp-dev-docs/wiki)
* [Office 365 developer tenant](https://github.com/SharePoint/sp-dev-docs/wiki/Setup-SharePoint-Tenant)

## Solution

| Solution  | Author(s) |
| ------------- | ------------- |
| web-part-tutorials  | Microsoft SharePoint Framework Team   |

## Version history

| Version  | Date | Comments |
| ------------- | ------------- | ------------- |
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

Now run the following command to install the npm packages:

```
npm i
```

This will install the required npm packages and depedencies to build and run the client-side project.

Once the npm packages are installed, run the command to preview your web parts in SharePoint Workbench:

```
gulp serve
```
