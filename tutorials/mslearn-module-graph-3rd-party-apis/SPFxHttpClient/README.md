# SPFxHttpClient

Calls the anonymous NASA Image REST API and shows an Apollo 4 image.

This project is the completed solution for the exercise **Call anonymous non-Microsoft REST APIs** in the Microsoft Learn module [Use Microsoft Graph and non-Microsoft APIs in SharePoint Framework solutions](https://learn.microsoft.com/training/modules/sharepoint-spfx-graph-3rd-party-apis/). For compatibility, prerequisites, and help, see the [tutorial README](../README.md).

![SPFxHttpClient web part showing an Apollo 4 image from the NASA Image REST API](../assets/preview-spfxhttpclient.png)

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-graph-3rd-party-apis) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-graph-3rd-party-apis/SPFxHttpClient` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`. If `config/serve.json` contains `<site-name>` or a site path, change it to a site you can test on.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
