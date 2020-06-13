# Modern Experience Theme Manager

## Summary
This sample web part provides a user interface for applying a Modern Experience theme in SharePoint 2019 on-premises.

The Theme Palette can be generated using the UI Fabric Theme Generator at: https://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9318/merge/theming-designer/index.html.

### The following feature is available within this sample:

#### Apply a theme:
By providing a Site Collection URL, along with a theme name and palette, the theme will be applied to the Site Collection directly without being added to the tenant Company Theme options.<br>
NOTE: This is a great option to provide theme management of a Site Collection without adding a theme to the "Company Themes" choices within the "Change the Look" options at the tenant level. The web part could be added to a Site Collection App Catalog to ensure availability of the web part is only available to those approved for theme management.
![preview](./assets/apply-a-theme.png)


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.8.2-orange.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* SharePoint 2019 on-premises


## Solution

Solution|Author(s)
--------|---------
js-theme-manager-2019 | David Warner II ([@DavidWarnerII](https://twitter.com/davidwarnerii) / [Warner Digital](http://warner.digital))
js-theme-manager-2019 | Beau Cameron ([@Beau__Cameron](https://twitter.com/@Beau__Cameron) / [Blog](https://beaucameron.net/))
js-theme-manager-2019 | Biju Basheer
js-theme-manager-2019 | Eric Skaggs ([@skaggej](https://twitter.com/skaggej) / [ericskaggs.net](http://www.ericskaggs.net/))

## Version history

Version|Date|Comments
-------|----|--------
2019.0.0.0|June 17, 2019|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`



## Features
This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Using the SharePoint Online REST API to apply Modern Experience Themes

## Additional Information:

- [Office UI Fabric Theme Palette Generator](https://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/pull/9318/merge/theming-designer/index.html)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-theme-manager-2019" />
