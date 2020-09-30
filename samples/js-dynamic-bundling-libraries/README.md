# Dynamics Bundling & Loading of SPFx Packages

## Summary
This sample illustrates how SPFx functionality and packages can be bundled in multiple '.js' files then be dynamically & asynchronously loaded into the page at execution time, such as with a button click.

Pre Button Click:
![preview](./assets/WebPart-Preview-PreClick.jpg)

Post Button Click that imports jQuery and additional functionality:
![preview](./assets/WebPart-Preview-PostjQueryClick.jpg)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.7.0-orange.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Solution

Solution|Author(s)
--------|---------
js-dynamic-bundling-libaries | David Warner II ([@DavidWarnerII](https://twitter.com/davidwarnerii) / [Warner Digital](http://warner.digital))

## Version history

Version|Date|Comments
-------|----|--------
1.0|September 21, 2018|Initial release
1.1|December 3, 2018|Updated for SPFx 1.7.0

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`



## Features
This Web Part illustrates the following concepts on top of the SharePoint Framework:

- How to separate SPFx functionality into multiple bundled files
- How to asynchronously load the seperate bundled files at execution time
- Including a library in the separate bundled file.

## Additional Information:
- [Dynamic loading of packages in SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/dynamic-loading)

- Video Demonstration on using, building and code specifics for the sample web part:<br>   http://warner.digital/dynamic-spfx-package-bundling/ 

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-dynamic-bundling-libraries" />
