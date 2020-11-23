# Soccer Highlights Web Part

## Summary

- This react web part sample displays Soccer Highlights from a public Soccer API.  
- It shows a maximum of 100 highlights at one time.  
- The web part show live status of game scores and ability to watch them live in small or full screen view.
- You can view the highlights as FilmStrip Control (Thanks to Hugo for the tip and great blog) or Flat Mode.
- You can configure highlights per page and use Paging.

![Web Part](./assets/SoccerHighlightsV1.png)

### Web Part in Action

![Web Part in Action](./assets/SoccerHighlights.gif)

### Usage

1) Deploy the package to SharePoint Online App Catalog.

2) Add the Web Part to Page, Configure the web Part, provide Title and Page Size.

3) Add the Web Part to Page, Configure the web Part, provide Title and Page Size.

4) Click on Pager to move Pages or arrows or dots in filmstrip view.

## Used SharePoint Framework Version

![SPFx 1.11.0](https://img.shields.io/badge/version-1.11.0-green.svg)

## Applies to

- [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
- [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

None

## Solution

| Solution              | Author(s)                                |
| --------------------- | ---------------------------------------- |
| Soccer Highlights Web Part | [Jerry Yasir](https://github.com/jyasir) |

## Version history

| Version | Date               | Comments      |
| ------- | ------------------ | ------------- |
| 1.0     | October 30, 2020 | First Version |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone or download this repository
- Run in command line:
  - `npm install` to install the npm dependencies
  - `gulp serve` to display in Developer Workbench (recommend using your tenant workbench so you can test with real lists within your site)
- To package and deploy:
  - Use `gulp bundle --ship` & `gulp package-solution --ship`
  - Add the `.sppkg` to your SharePoint App Catalog

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/soccerhighlights" />
