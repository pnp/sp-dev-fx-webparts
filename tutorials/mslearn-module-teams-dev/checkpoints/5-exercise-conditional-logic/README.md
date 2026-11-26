# Checkpoint: Add conditional logic for SharePoint or Microsoft Teams

This folder contains the **spfxteams** project as it is at the end of the exercise **Add conditional logic for SharePoint or Microsoft Teams** in the Microsoft Learn module [Build Microsoft Teams customization using the SharePoint Framework](https://learn.microsoft.com/training/modules/sharepoint-spfx-teams-dev/).

Use it to compare your code with the expected result, or as a starting point for the next exercise. The next exercise, **Update configuration settings**, adds a **Custom Setting** property and stops users from changing the configuration of a new tab.

The completed solution is in the [spfxteams project folder](../../README.md). For compatibility, prerequisites, and help, see the [tutorial README](../../README.md).

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-teams-dev) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-teams-dev/checkpoints/5-exercise-conditional-logic` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`. If `config/serve.json` contains `<site-name>` or a site path, change it to a site you can test on.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
* To run the web part in Microsoft Teams, upload the package from `sharepoint/solution` to the tenant app catalog, select **Make this solution available to all sites in the organization**, and select **Deploy**.
* In Microsoft Teams, upload the app package `teams/TeamsSPFxApp.zip` with **Apps** > **Manage your apps** > **Upload an app**, then add the app as a tab in a team channel.
