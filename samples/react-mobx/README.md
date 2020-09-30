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
# Webpart with React and Mobx

## Summary
Sample webpart implementation that uses [Mobx](https://github.com/mobxjs/mobx) to keep track of its state.

### Reactive
![](https://i.gyazo.com/e6f1903b9a9c8201985cd25cc1fe28bc.gif)

### Non-Reactive
![](https://i.gyazo.com/876858e31cf14de1b6d1a281a0636029.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-drop5-red.svg)

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

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

```sh
$ git clone https://github.com/SharePoint/sp-dev-fx-webparts
$ cd sp-dev-fx-webparts/samples/react-mobx
$ npm install
$ gulp serve
```

## Features

* Presentational (dumb) components live in `./components`
* Container (smart) components live in `./container`
* Mobx stores are defined in `./store` with a sample webpart store that keeps track of the webpart properties.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-mobx" />
