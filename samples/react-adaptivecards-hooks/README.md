# react-adaptivecards-hooks

## Summary

A version of [react-adaptivecards](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-adaptivecards) using React Hooks.

![Adaptive Cards in SharePoint](assets/preview.png)

## Used SharePoint Framework Version

![1.11.0](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-adaptivecards-hooks | Paul Schaeflein (http://www.schaeflein.net)
react-adaptivecards-hooks | Hugo Bernier ([Tahoe Ninjas](https://tahoeninjas.blog), [@bernier](https://twitter.com/bernierh))

## Version history

Version|Date|Comments
-------|----|--------
1.0|April 27, 2020|Initial release
2.0|August 25, 2020|Upgraded to SPFx 1.11 and added support for May 2020 changes to Adaptive Cards

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

### Code structure

| File                         | Type                                             |  Description   |
|------------------------------|--------------------------------------------------|----------------|
| AdaptiveCardViewerWebPart.ts | React Class component (derives from BaseWebPart) | Used to define web part properties and bootstrap the component tree|
| RootComponent.tsx            | React Function component                         | Interrogates webpart properties and establishes AppContext and initial state.<br/>Monitors CardService state and dispatches updates to viewer state. |
| AppContext.ts                | React context provider                           | Exposes the SPFx webpart context, the webpart instance and the state dispatch to all components via `React.useContext()`  |
| CardService.ts               | React Hook                                       | Abstracts the SP HttpClient        |
| CardServiceReducer.ts        | React Reducer                                    | Reducer/state for CardService hook |
| AdaptiveCardViewer.tsx       | React Function component                         | Top-level UI component. |
| AdaptiveCardHost.tsx         | React Function component                         | Renders placeholder if template/data are missing. Handles card actions. |
| AdaptiveCard.tsx             | React Class component                            | Responsible for rendering adaptive card and expanding card with data |

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-adaptivecards-hooks" />

