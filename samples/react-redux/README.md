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
# Webpart with React and Redux

## Summary
Sample webpart implementation that uses [Redux](https://github.com/reactjs/redux) to keep track of its state.

### Reactive
![](https://i.gyazo.com/729c4addf6c992513f8eb91a3fa0e302.gif)

### Non-Reactive
![](https://i.gyazo.com/1981f22fa6a162931a29ce8dad9c2657.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-drop5-red.svg)

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

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

```sh
$ git clone https://github.com/SharePoint/sp-dev-fx-webparts
$ cd sp-dev-fx-webparts/samples/react-redux
$ npm install
$ gulp serve
```

## Features

* Presentational (dumb) components live in `./components`
* Container (smart) components live in `./container`
* Redux reducers are defined in `./reducers` with a sample webpart reducer that stores the webpart properties.
  Webpart reducer implementation follows the [ducks pattern](https://github.com/erikras/ducks-modular-redux).
* Redux store configuration defined in `./store`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-redux" />
