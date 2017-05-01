# React sample showing the use of sp-pnp-js with Async / Await

## Summary
This webpart demonstrates how to use [PnP JS Core](https://github.com/SharePoint/PnP-JS-Core) with Async functions into the SharePoint Framework as well as integrating [PnP JS and SPFx Logging systems](https://blog.josequinto.com/2017/04/30/how-to-integrate-pnp-js-core-and-sharepoint-framework-logging-systems/). Real example querying SharePoint library to show document sizes.

![React-sp-pnp-js-async-await](./assets/async-await-sp-pnp-js.png)


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-GA-green.svg)


## Applies to
* [SharePoint Framework](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-async-await-sp-pnp-js | Jose Quinto ([@jquintozamora](https://twitter.com/jquintozamora) , [blog.josequinto.com](https://blog.josequinto.com))

## Version history

Version|Date|Comments
-------|----|--------
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
- React Container for the initial load. [Smart Component](https://github.com/jquintozamora/spfx-react-async-await-sp-pnp-js/blob/master/src/webparts/asyncAwaitPnPJs/components/IAsyncAwaitPnPJsState.ts)
- [Interface best practices](https://github.com/jquintozamora/spfx-react-async-await-sp-pnp-js/tree/master/src/webparts/asyncAwaitPnPJs/interfaces)
- [PnP JS and SPFx Logging systems integration](https://blog.josequinto.com/2017/04/30/how-to-integrate-pnp-js-core-and-sharepoint-framework-logging-systems)
![React-sp-pnp-js-async-await-code](./assets/pnp-js-logging-spfx.png)



## License
BSD 3-Clause License

Copyright (c) 2017, [José Quinto](https://blog.josequinto.com) All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-async-await-sp-pnp-js" />
