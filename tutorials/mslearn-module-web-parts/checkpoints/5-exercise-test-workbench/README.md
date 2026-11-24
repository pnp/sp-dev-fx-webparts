# Checkpoint: Test web parts on SharePoint pages

This folder contains the **HelloWorld** project as it is at the end of the exercise **Test web parts on SharePoint pages** in the Microsoft Learn module [Develop web parts with the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-web-parts/).

Use it to compare your code with the expected result, or as a starting point for the next exercise. The next exercise, **Exploring the SharePoint Framework API**, adds the page display mode, environment type, logging, and a loading indicator.

The completed solution is in the [HelloWorld project folder](../../README.md). For compatibility, prerequisites, and help, see the [tutorial README](../../README.md).

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-web-parts) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-web-parts/checkpoints/5-exercise-test-workbench` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* In `config/serve.json`, replace the page URL (`initialPage`, or `pageUrl` for extensions) with a page in a site you can test on. Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
