# Property Pane Navigation

## Summary

This sample showcase how to handle the navigation between property pane pages.

![Property pane navigation in action](./assets/navigation_in_action.gif)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.18.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-property-pane-navigation | Guido Zambarda - [PiaSys.com](https://www.piasys.com/) - [@iamguidozam](https://twitter.com/iamguidozam) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | February 27, 2024 | Initial release |


---

## Minimal path to awesome


* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-property-pane-navigation) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-property-pane-navigation`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.


## Features

This sample showcase how to handle the navigation between property pane pages using the web part `getPropertyPaneConfiguration` method like the following:

```ts
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
	return {
		pages: [{
			header: { ... },
			groups: [ ... ],
		},
  		{
    			header: { ... },
			groups: [ ... ],
		},
		{
			header: { ... },
			groups: [ ... ],
		}],
	};
  }
```

Each element in the `pages` array represents a property pane page, the SharePoint Framework will enable navigation and will render the pages in the order they are defined in the array. The first page in the array will be the first page to be rendered, and so on.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Integrate web part properties with SharePoint](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/integrate-web-part-properties-with-sharepoint)
- [Make your SharePoint client-side web part configurable](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane)
- [Validate web part property values](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/validate-web-part-property-values)

<!--
RESERVED FOR REPO MAINTAINERS

We'll add the video from the community call recording here

## Video

[![YouTube video title](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=XXXXX "YouTube video title")
-->

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-property-pane-navigation" />