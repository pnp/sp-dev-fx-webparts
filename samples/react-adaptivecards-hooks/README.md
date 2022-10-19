# Adaptive Cards using React Hooks

## Summary

A version of [react-adaptivecards](https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-adaptivecards) using React Hooks.

![Adaptive Cards in SharePoint](assets/preview.png)


## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Local | Hosted](https://img.shields.io/badge/Workbench-Local%20%7C%20Hosted-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

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

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

### Code structure

| File                         | Type                                             |  Description   |
|------------------------------|--------------------------------------------------|----------------|
| AdaptiveCardViewerWebPart.ts | React Class component (derives from BaseWebPart) | Used to define web part properties and bootstrap the component tree|
| RootComponent.tsx            | React Function component                         | Interrogates web part properties and establishes AppContext and initial state.<br/>Monitors CardService state and dispatches updates to viewer state. |
| AppContext.ts                | React context provider                           | Exposes the SPFx web part context, the web part instance and the state dispatch to all components via `React.useContext()`  |
| CardService.ts               | React Hook                                       | Abstracts the SP HttpClient        |
| CardServiceReducer.ts        | React Reducer                                    | Reducer/state for CardService hook |
| AdaptiveCardViewer.tsx       | React Function component                         | Top-level UI component. |
| AdaptiveCardHost.tsx         | React Function component                         | Renders placeholder if template/data are missing. Handles card actions. |
| AdaptiveCard.tsx             | React Class component                            | Responsible for rendering adaptive card and expanding card with data |


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-adaptivecards-hooks&template=bug-report.yml&sample=react-adaptivecards-hooks&authors=@pschaeflein&title=react-adaptivecards-hooks%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-adaptivecards-hooks&template=question.yml&sample=react-adaptivecards-hooks&authors=@pschaeflein&title=react-adaptivecards-hooks%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-adaptivecards-hooks&template=question.yml&sample=react-adaptivecards-hooks&authors=@pschaeflein&title=react-adaptivecards-hooks%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-adaptivecards-hooks" />

