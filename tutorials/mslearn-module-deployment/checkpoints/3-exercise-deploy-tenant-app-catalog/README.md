# Checkpoint: Deploy SharePoint Framework solutions to tenant App Catalog

This folder contains the **DeploymentDemo** project as it is at the end of the exercise **Deploy SharePoint Framework solutions to tenant App Catalog** in the Microsoft Learn module [Deploy SharePoint Framework components to production](https://learn.microsoft.com/training/modules/sharepoint-spfx-deployment/).

Use it to compare your code with the expected result, or as a starting point for the next exercise. The next exercise, **Deploy SharePoint Framework solutions to a site collection App Catalog**, deploys this same package without code changes. The exercise after it adds a second web part and a command set, and changes the component and package versions.

The completed solution is in the [DeploymentDemo project folder](../../README.md). For compatibility, prerequisites, and help, see the [tutorial README](../../README.md).

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-deployment) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-deployment/checkpoints/3-exercise-deploy-tenant-app-catalog` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* In `config/serve.json`, replace the page URL (`initialPage`, or `pageUrl` for extensions) with a page in a site you can test on. Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
