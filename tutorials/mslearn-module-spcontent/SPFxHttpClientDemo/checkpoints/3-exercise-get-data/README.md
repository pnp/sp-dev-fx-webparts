# Checkpoint: Retrieve and display list data with the SharePoint REST API

This folder contains the **SPFxHttpClientDemo** project as it is at the end of the exercise **Retrieve and display list data with the SharePoint REST API** in the Microsoft Learn module [Work with SharePoint Content using the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-spcontent/).

Use it to compare your code with the expected result, or as a starting point for the next exercise. The next exercise, **Write operations using the SharePoint Framework APIs and SharePoint REST API**, adds buttons that create, update, and delete list items.

The completed solution is in the [SPFxHttpClientDemo project folder](../../README.md). For compatibility, prerequisites, and help, see the [tutorial README](../../../README.md).

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-spcontent) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-spcontent/SPFxHttpClientDemo/checkpoints/3-exercise-get-data` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* In `config/serve.json`, replace the page URL (`initialPage`, or `pageUrl` for extensions) with a page in a site you can test on. Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
