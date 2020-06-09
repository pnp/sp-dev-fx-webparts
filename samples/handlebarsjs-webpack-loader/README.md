---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - Handlebars
  createdDate: 3/5/2017 12:00:00 AM
---
## SPFx Sample with Handlebars.js

This sample demonstrate how to set up SPFx to use [Handlebars](http://handlebarsjs.com) through [webpack loader](https://webpack.github.io/docs/loaders.html).


## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-1.4.1-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
SPFx-Handlebars | Stefan Bauer - n8d ([@stfbauer](https://twitter.com/stfbauer))

## Version history

Version|Date|Comments
-------|----|--------
1.1|March 21, 2018|Update to Version 1.4.1
1.0|March 5, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp serve
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/handlebarsjs-webpack-loader" />
