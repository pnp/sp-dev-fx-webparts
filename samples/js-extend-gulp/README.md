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
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)



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
js-extend-gulp | [Chakkaradeep Chandran](https://github.com/chakkaradeep) (@chakkaradeep)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 25th, 2017|Initial release

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-extend-gulp%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-extend-gulp) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-extend-gulp&template=bug-report.yml&sample=js-extend-gulp&authors=@chakkaradeep&title=js-extend-gulp%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-extend-gulp&template=question.yml&sample=js-extend-gulp&authors=@chakkaradeep&title=js-extend-gulp%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-extend-gulp&template=suggestion.yml&sample=js-extend-gulp&authors=@chakkaradeep&title=js-extend-gulp%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-extend-gulp" />
