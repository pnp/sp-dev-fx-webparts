# HelloPropertyPane

Text and slider property pane fields with validation, plus a custom continent selector field.

This project is the completed solution for the exercise **Build custom property pane fields** in the Microsoft Learn module [Enable SharePoint Framework web part configuration with property panes](https://learn.microsoft.com/training/modules/sharepoint-spfx-web-part-property-pane/). For compatibility, prerequisites, and help, see the [tutorial README](../README.md).

![HelloPropertyPane web part with the custom continent selector in the property pane](../assets/preview-hellopropertypane.png)

## Checkpoints

The `checkpoints` folder contains the code as it was at the end of each earlier exercise:

* [Work with the web part property pane](checkpoints/3-exercise-web-part-property-pane/README.md)

## Minimal path to awesome

* Clone this repository, or [download this tutorial as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/tutorials/mslearn-module-web-part-property-pane) and unzip it.
* From your command line, change to the `tutorials/mslearn-module-web-part-property-pane/HelloPropertyPane` folder.
* Ensure that you're using a supported Node.js version. If you use nvm, run `nvm use`.
* Set the `SPFX_SERVE_TENANT_DOMAIN` environment variable to your SharePoint Online domain, for example `contoso.sharepoint.com`. If `config/serve.json` contains `<site-name>` or a site path, change it to a site you can test on.
* In the command line, run:
  * `npm install`
  * `npm run start`
* To build a deployable package, run `npm run build`. The package is saved in the `sharepoint/solution` folder.
