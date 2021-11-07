---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: tools
  technologies:
  - SharePoint Framework
  createdDate: 1/1/2016 12:00:00 AM
---
# Integrating custom gulp tasks to SharePoint Framwork toolchain

## Summary
SharePoint client-side development tools use gulp as the build process task runner to:

- Bundle and minify JavaScript and CSS files.
- Run tools to call the bundling and minification tasks before each build.
- Compile LESS or SASS files to CSS.
- Compile TypeScript files to JavaScript.

One common task you would want add to the SharePoint Framework toolchain is to integrate your custom gulp tasks and execute them.

This sample shows how to integrate custom gulp tasks using the [gulp-image-resize](https://www.npmjs.com/package/gulp-image-resize) task that resizes images.

Read the following documentation for detailed information on integrating gulp tasks in SharePoint Framework:

- [Integrate custom gulp tasks in the SharePoint Framework toolchain](https://docs.microsoft.com/sharepoint/dev/spfx/toolchain/integrate-gulp-tasks-in-build-pipeline)


## Compatibility

![SPFx 0.7.0](https://img.shields.io/badge/SPFx-0.7.0-orange.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)



## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 First Release Tenants](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Pre-requisites

### GraphicsMagick or ImageMagick
Make sure GraphicsMagick or ImageMagick is installed on your system and properly set up in your PATH.

#### Ubuntu:

```
apt-get install imagemagick
apt-get install graphicsmagick
```

#### Mac OS X (using Homebrew):

```
brew install imagemagick
brew install graphicsmagick
```

#### Windows & others:

http://www.imagemagick.org/script/binary-releases.php

Confirm that ImageMagick is properly set up by executing convert -help in a terminal.

## Solution

Solution|Author(s)
--------|---------
js-extend-gulp | Chakkaradeep Chandran (@chakkaradeep)

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

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-extend-gulp" />
