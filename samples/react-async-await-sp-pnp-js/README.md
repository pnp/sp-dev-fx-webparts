---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - react
  createdDate: 5/1/2017 12:00:00 AM
---
# React sample showing the use of @pnp/js with Async / Await

## Summary
This webpart demonstrates how to use [PnPJS](https://pnp.github.io/pnpjs/) with Async functions into the SharePoint Framework as well as integrating [PnP JS and SPFx Logging systems](https://blog.josequinto.com/2017/04/30/how-to-integrate-pnp-js-core-and-sharepoint-framework-logging-systems/). Real example querying SharePoint library to show document sizes.

![React-sp-pnp-js-async-await](./assets/async-await-sp-pnp-js.png)


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.4.1-green.svg)


## Applies to
* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-async-await-sp-pnp-js | Jose Quinto ([@jquintozamora](https://twitter.com/jquintozamora) , [blog.josequinto.com](https://blog.josequinto.com))

## Version history

Version|Date|Comments
-------|----|--------
1.2|Jul 20, 2018|Replaced deprecated sp-pnp-js with @pnp/js
1.1|Mar 6, 2018|Update to 1.4.1
1.0|May 1, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome
- clone this repo
- `$ npm i`
- `$ gulp trust-dev-cert`
- `$ gulp serve `

### Local Mode
A browser in local mode (localhost) will be opened.
https://localhost:4321/temp/workbench.html

### SharePoint Mode
If you want to try on a real environment, open:
https://your-domain.sharepoint.com/_layouts/15/workbench.aspx

## Usage
![React-sp-pnp-js-async-await-code](./assets/async-await-sp-pnp-js-2.png)


## Features
- [Async / Await functionality working with PnP JS sample](https://github.com/jquintozamora/spfx-react-async-await-sp-pnp-js/blob/master/src/webparts/asyncAwaitPnPJs/components/AsyncAwaitPnPJs.tsx#L93)
  - Tested and working on IE11 (as TypeScript config provides Promise polyfill)
- React Container for the initial load. [Smart Component](https://github.com/jquintozamora/spfx-react-async-await-sp-pnp-js/blob/master/src/webparts/asyncAwaitPnPJs/components/IAsyncAwaitPnPJsState.ts)
- [Interface best practices](https://github.com/jquintozamora/spfx-react-async-await-sp-pnp-js/tree/master/src/webparts/asyncAwaitPnPJs/interfaces)
- [PnP JS and SPFx Logging systems integration](https://blog.josequinto.com/2017/04/30/how-to-integrate-pnp-js-core-and-sharepoint-framework-logging-systems)
![React-sp-pnp-js-async-await-code](./assets/pnp-js-logging-spfx.png)



<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-async-await-sp-pnp-js" />
