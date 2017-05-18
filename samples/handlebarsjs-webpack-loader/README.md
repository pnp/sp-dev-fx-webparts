## SPFx Sample with Handlebars.js

This sample demonstrate how to set up SPFX to use [Handlebars](http://handlebarsjs.com) through [webpack loader](https://webpack.github.io/docs/loaders.html).


## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Applies to

* [SharePoint Framework Developer](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
SPFx-handlebars | Stefan Bauer - n8d ([@stfbauer](https://twitter.com/stfbauer))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 5, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/handlebarsjs-webpack-loader" />