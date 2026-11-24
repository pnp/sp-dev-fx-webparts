# MSGraphSPFx

Calls Microsoft Graph with `MSGraphClientV3` and shows the current user in a Persona card.

This project is the completed solution for the exercise **Call Microsoft Graph from SharePoint Framework components** in the Microsoft Learn module [Use Microsoft Graph and non-Microsoft APIs in SharePoint Framework solutions](https://learn.microsoft.com/training/modules/sharepoint-spfx-graph-3rd-party-apis/). For compatibility, prerequisites, and help, see the [tutorial README](../README.md).

![GraphPersona web part showing the current user in a Persona card](../assets/preview-msgraphspfx.png)

## Prerequisites

* Deploy the package to the app catalog, and approve the **Microsoft Graph** permission request **User.ReadBasic.All** on the **API access** page of the SharePoint admin center

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-graph-3rd-party-apis) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-graph-3rd-party-apis/MSGraphSPFx` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* In `config/serve.json`, replace the page URL (`initialPage`, or `pageUrl` for extensions) with a page in a site you can test on. Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
