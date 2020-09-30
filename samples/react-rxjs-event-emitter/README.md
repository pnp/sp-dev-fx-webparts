---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: tools
  technologies:
  - SharePoint Framework
  platforms:
  - react
  createdDate: 9/1/2017 12:00:00 AM
---
# SPFx ReactiveX (RxJs) Event Emitter Sample #

## Summary

This sample shows how we can use the [ReactiveX (RxJs)](http://reactivex.io/) library with the SharePoint Framework to communicate between web parts through broadcasting events utilizing the [Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish–subscribe_pattern). It enables a webpart or component to emit event (broadcast message) and that event is received by other web parts or components that have been subscribed to receive it. Please note this is custom implementation of the [Publish–subscribe pattern](https://en.wikipedia.org/wiki/Publish–subscribe_pattern) by using the [ReactiveX (RxJs)](http://reactivex.io/) library. The SPFx will nativelly support this in future without the need of custom implementation through new SPFx api called Event Aggregator, but it is still in Alpha.

![SPFx ReactiveX (RxJs) Event Emitter Sample](./assets/spfx-event-emitter.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.7.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Prerequisites

- Office 365 subscription with SharePoint Online.
- SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Solution

Solution|Author(s)
--------|---------
react-rxjs-event-emitter | Velin Georgiev ( [@VelinGeorgiev](https://twitter.com/velingeorgiev) )

## Version history

Version|Date|Comments
-------|----|--------
0.0.1|August 22, 2017 | Initial commit
0.0.2|April 20, 2018 | Updated to SPFx v1.4.1
0.0.3|December 10, 2018 | Updated to SPFx v1.7.0

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository.
- Open the command line, navigate to the web part folder and execute:
    - `npm i`
    - `gulp serve`

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Using React for building SharePoint Framework client-side web parts.
- Using Office UI Fabric React styles for building user experience consistent with SharePoint and Office.
- The use the ReactiveX (RxJs) Event Emitter to broadcast messages (events).
- The use the ReactiveX (RxJs) Event Emitter to subscribe and receive broadcasted messages (events).

## Making the RxJsEventEmitter external SPFx library.

The RxJsEventEmitter library can be turned into external library so it can be used by multiple SPFx solutions.
There is a very good [blog post](https://blog.mastykarz.nl/dll-code-sharepoint-framework/) by @waldekmastykarz how this can be done.


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-rxjs-event-emitter" />
