## SPFx webpart to Test PnpJS SharePoint Methods 

This web part will allow SPFx developers to test PnPjs methods and it displays response in JSON viewer to identify properties/attributes returned by method/API. This web part can be used as separate component to test PnP Js methods and know the response returned by a particular method/API. To maximise productivity, we should package and deploy it to a test(developer) site collection which then can be used side by side when we are doing development of SPFx solutions.

Note - As of now it only supports to test Pnp JS method from sp(SharePoint) packages which contains the fluent API used to call the SharePoint rest services. 

You can refer to this blog [link](https://siddharthvaghasia.com/2020/08/16/usage-guide-on-spfx-pnpjs-tester-web-part/) for usage guidance on How to use this webpart.

![Web part in action](assets/pnpjstesterinaction.gif?raw=true "Webpart in action")

Idea behind this web part

* Most of the SharePoint developers are using PnP JS to develop SPFx solutions.
* During the development, there are times when we wanted to know what properties/attributes will be returned in response 
* To get these details, we either use console.log to log response or debug the JavaScript and check what properties/attributes are returned etc.
* This web part can be used so that we can quickly test any SharePoint REST API methods using PnP JS.

Feel free to connect on twitter:@siddh_me or twitter:@sanganikunj for any details.

### Notes on Webpart

* WebPart to test PnP JS SharePoint package methods
* Response will be displayed in a code format.
* By default, it will run in context of current site collection.
* Optional option to enter different site collection or sub site url to set PnP JS context to different url(other than current context)
* Support for Get and Post methods.
* Option to see some examples which can be copied and tested just by changing list/libraries/column names.

## Used SharePoint Framework Version

![SPFx 1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

### Package and Deploy

Note - If you don't want to build and package on your own, you can directly download package at this [location](./sharepoint/solution/react-pnpjsexplorer.sppkg) and upload to app catalog and install app on required site collection. Skip below steps and directly go to How to use section.
Clone the solution and make sure there is no error before packaging. Try first on local work bench.

```bash
git clone the repo
npm i
gulp serve
```

- Execute the following gulp task to bundle your solution. This executes a release build of your project by using a dynamic label as the host URL for your assets. This URL is automatically updated based on your tenant CDN settings:

```bash
gulp bundle --ship
```

- Execute the following task to package your solution. This creates an updated webpart `.sppkg` package on the `sharepoint/solution` folder.

```bash
gulp package-solution --ship
```

- Upload or drag and drop the newly created client-side solution package to the app catalog in your tenant.
- Based on your tenant settings, if you would not have CDN enabled in your tenant, and the `includeClientSideAssets` setting would be true in the `package-solution.json`, the loading URL for the assets would be dynamically updated and pointing directly to the `ClientSideAssets` folder located in the app catalog site collection.


## Solution

Solution|Author(s)
--------|---------
react-PnPjsTester | [Siddharth Vaghasia](https://www.linkedin.com/in/siddharthvaghasia/) and [Kunj Sangani](https://www.linkedin.com/in/kunj-sangani/)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Aug 14, 2020|Initial Release


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

For any issue or help, Buzz us on twitter:([siddh_me](https://twitter.com/siddh_me/)) or ([sanganikunj](https://twitter.com/sanganikunj))

> Sharing is caring!

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-pnpjsexplorer" />
