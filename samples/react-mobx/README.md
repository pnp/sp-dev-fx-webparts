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
# Using Mobx

## Summary
Sample web part implementation that uses [Mobx](https://github.com/mobxjs/mobx) to keep track of its state.

### Reactive
![](https://i.gyazo.com/e6f1903b9a9c8201985cd25cc1fe28bc.gif)

### Non-Reactive
![](https://i.gyazo.com/876858e31cf14de1b6d1a281a0636029.gif)


## Compatibility

![SPFx 0.5.1](https://img.shields.io/badge/SPFx-0.5.0-orange.svg)
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
react-mobx | Kevin Mees <kev.mees@gmail.com> (Experts Inside GmbH, @kmees)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 4, 2016|Initial release

## Minimal Path to Awesome

```

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.sh
$ git clone https://github.com/pnp/sp-dev-fx-webparts
$ cd sp-dev-fx-webparts/samples/react-mobx
$ npm install
$ gulp serve
```

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

* Presentational (dumb) components live in `./components`
* Container (smart) components live in `./container`
* Mobx stores are defined in `./store` with a sample web part store that keeps track of the web part properties.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-mobx" />
