# Interactive Map

## Summary

This web parts displays a (world) map. An editor can set custom markers directly in the map. Each marker can configured individually. It is possible to determine the color of the pin, the icon in the pin or what should happen when the pin is clicked. It is even possible to change the tile layer in the web part properties.

Markers are added and configured directly in the map (right-click *"Add a new marker here"* in edit mode), each with its category, click behaviour, colour, icon, tooltip and rich Panel/Dialog or URL content.

The web part also supports:

* **Set start location** — a property-pane dialog with a small map and a place search (OpenStreetMap) to pick the view visitors see when the page loads. Panning the map and using the right-click *"Make this view as start position"* still works as a secondary path.
* **Fit to markers** — an optional toggle (on by default) that frames all markers when the page loads, so visitors see every point without zooming out. Falls back to the start location when off or when there are no markers.
* **Map style presets** — a *"Map style"* dropdown on the Tile layer page with ready-made, no-API-key base maps: Streets (OpenStreetMap), Satellite (Esri) and Topographic (Esri), plus Custom for pasting your own tile URL.
* **Visitor location search** — an optional toggle (*"Let visitors search for locations"*) that surfaces a place search above the map at run time.
* **Paged property pane** — settings are organised across pages (general, categories, controls, tile layer) instead of one long list.


![EditMode](assets/WPPreview.png)

### Create new marker

![Create new Marker](assets/CreateNewMarker.png)

### Preview

Search for a location, then click a marker to open its panel or follow its link:

![Interactive Map web part preview](assets/MapWPOverview.gif)

### Switching the map style

The property pane is organised across pages. The Tile layer page offers ready-made base maps — including satellite imagery — with no API key required:

![Switching the map style to satellite imagery](assets/MapStyleSatellite.gif)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.23.0](https://img.shields.io/badge/SPFx-1.23.0-green.svg)
![Node.js v22.15.0](https://img.shields.io/badge/Node.js-%20v22.15.0-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors

* [Sergej Schwabauer](https://github.com/SPFxAppDev)
* [Nello D'Andrea](https://github.com/ferrarirosso)

## Version history

Version|Date|Comments
-------|----|--------
1.1.0   | July 2026 | Upgraded to 1.23.0; reorganised the property pane into pages; added map-style presets (incl. satellite), a start-location dialog, a fit-to-markers toggle and a visitor location-search bar; hardened the OpenStreetMap search
1.0|January 19, 2023|Initial release


## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-interactive-map) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-interactive-map`, located under `samples`)
* in the command line run:
  * `npm install`
  * `npm run serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* [Fluent UI React Controls](https://developer.microsoft.com/en-us/fluentui#/controls/web), including the `SearchBox` for place search
* [LeafletJS](https://leafletjs.com/) and the [react-leaflet](https://react-leaflet.js.org/) wrapper
* [Leaflet Plugin "Marker cluster"](https://github.com/Leaflet/Leaflet.markercluster) and the [react-leaflet-markercluster](https://www.npmjs.com/package/react-leaflet-markercluster) wrapper
* Switchable base maps: [OpenStreetMap](https://www.openstreetmap.org/) and [Esri](https://www.esri.com/) (satellite / topographic) tiles, all without an API key
* [OpenStreetMap Nominatim](https://nominatim.org/) geocoding for place search (no API key)
* A multi-page property pane with `PropertyPaneDropdown` and button-launched dialogs

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-interactive-map%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-interactive-map) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-interactive-map&template=bug-report.yml&sample=react-interactive-map&authors=@SPFxAppDev&title=react-interactive-map%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-interactive-map&template=question.yml&sample=react-interactive-map&authors=@SPFxAppDev&title=react-interactive-map%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-interactive-map&template=suggestion.yml&sample=react-interactive-map&authors=@SPFxAppDev&title=react-interactive-map%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-interactive-map" />