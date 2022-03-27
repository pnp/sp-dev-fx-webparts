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
  - React
  createdDate: 1/1/2016 12:00:00 AM
---
# Web part with React and Redux

## Summary

Sample web part implementation that uses [Redux](https://github.com/reactjs/redux) to keep track of its state.

### Reactive

![](https://i.gyazo.com/729c4addf6c992513f8eb91a3fa0e302.gif)

### Non-Reactive

![](https://i.gyazo.com/1981f22fa6a162931a29ce8dad9c2657.gif)


## Compatibility

![SPFx 0.4.0](https://img.shields.io/badge/SPFx-0.4.0-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)



## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-redux | Kevin Mees <kev.mees@gmail.com> (Experts Inside GmbH, @kmees)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 28, 2016|Initial release

## Minimal Path to Awesome

```

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.sh
$ git clone https://github.com/pnp/sp-dev-fx-webparts
$ cd sp-dev-fx-webparts/samples/react-redux
$ npm install
$ gulp serve
```

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

* Presentational (dumb) components live in `./components`
* Container (smart) components live in `./container`
* Redux reducers are defined in `./reducers` with a sample web part reducer that stores the web part properties.
  Web part reducer implementation follows the [ducks pattern](https://github.com/erikras/ducks-modular-redux).
* Redux store configuration defined in `./store`


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-redux" />
