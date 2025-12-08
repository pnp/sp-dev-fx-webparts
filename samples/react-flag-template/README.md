# React Flag Template

## Summary

Displays SharePoint list items as colorful hanging banner cards with an optional logo, title, (optional) description and a full‑card link. Each banner can have its own background and text colors.

![Sample](./assets/Screenshot.png)


## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors


* [sudeepghatak](https://github.com/sudeepghatak)
 
## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|September 14, 2025|Initial release|


## Prerequisites

### SharePoint List

Create (or reuse) a Custom List (default view OK). Recommended columns:

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| Title | Single line | Yes | Flag title |
| Description | Multiple lines (Plain) | No | Shown if present |
| Icon | Single line (Text) | No | Image URL (PNG/SVG/JPG/Data URI) |
| BackgroundColor | Single line (Text) | No | Hex (fallback palette if missing) |
| Color | Single line (Text) | No | Text/logo color hex (defaults to `#FFFFFF`) |
| Url | Single line (or Hyperlink) | No | Destination link (opens in new tab) |

## Web Part Property

| Property | Description |
|----------|-------------|
| listName | Title of the SharePoint list supplying data |

## Features

- Data‑driven flags
- Custom background & text colors
- Responsive horizontal layout
- Hover animation
- Clickable flags


## Minimal path to awesome

1. `npm i`
2. `gulp build`
3. `gulp serve --nobrowser`
4. Open hosted workbench: `https://<tenant>.sharepoint.com/sites/<site>/_layouts/15/workbench.aspx`
5. Add the web part and set List name.

## Help

If something does not work:

1. Run environment diagnostics:  
   `npx @pnp/cli-microsoft365 spfx doctor`
2. Confirm Node + SPFx version compatibility: https://aka.ms/spfx-matrix
3. Clear old build artifacts:  
   `gulp clean && gulp build`

Community support (GitHub Issues in pnp/sp-dev-fx-webparts):

- Report a bug:  
  https://github.com/pnp/sp-dev-fx-webparts/issues/new?labels=Needs%3A+Triage+%3Amag%3A,type%3Abug-suspected,sample%3A+react-flag-template&template=bug-report.yml&sample=react-flag-template&title=react-flag-template%3A+Bug
- Ask a question:  
  https://github.com/pnp/sp-dev-fx-webparts/issues/new?labels=Needs%3A+Triage+%3Amag%3A,type%3Aquestion,sample%3A+react-flag-template&template=question.yml&sample=react-flag-template&title=react-flag-template%3A+Question
- Suggest an enhancement:  
  https://github.com/pnp/sp-dev-fx-webparts/issues/new?labels=Needs%3A+Triage+%3Amag%3A,type%3Aenhancement,sample%3A+react-flag-template&template=feature-request.yml&sample=react-flag-template&title=react-flag-template%3A+Enhancement

(Replace any outdated template names if the repo updates its issue forms.)

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-flag"/>