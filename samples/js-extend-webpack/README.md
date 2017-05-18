# Extending webpack in the SharePoint Framework toolchain

## Summary
[Webpack](https://webpack.github.io/) is a JavaScript module bundler that takes your JavaScript files and its dependencies and generates one or more JavaScript bundles so you can load different bundles for different scenarios.

One common task you would want to add to the SharePoint Framework toolchain is to extend the webpack configuration with custom loaders and plugins.

This sample shows how to use the webpack [markdown-loader](https://www.npmjs.com/package/markdown-loader) to preprocess markdown files to HTML string.

Read the following documentation for detailed information on working with webpack loaders in SharePoint Framework:

- [Extending webpack in the SharePoint Framework toolchain](https://aka.ms/spfx-extend-webpack)

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-RC0-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 First Release Tenants](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
js-extend-webpack | Chakkaradeep Chandran (@chakkaradeep)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 25th, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-extend-webpack" />