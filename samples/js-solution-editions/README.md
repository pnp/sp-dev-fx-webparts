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
  createdDate: 9/1/2017 12:00:00 AM
---
# Handling Multiple Editions of SPFx Solution
## Summary
This sample shows a possible approach of handling multiple editions (e.g. trial, lite, full) of SharePoint Framework solution.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

Solution|Author(s)
--------|---------
js-solution-editions | Alex Terentiev ([Sharepointalist Inc.](http://www.sharepointalist.com), [AJIXuMuK](https://github.com/AJIXuMuK))

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 23, 2017|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Description

### Use Case
You are an ISV and developing some product that has multiple editions, let's say, trial, lite, full. You want to have a separate package file (`.sppkg`) for each edition and also reference different CDNs based on the edition.

### Problems to address
Thinking about the use case in details we can point several problems that should be addressed: 
- When we're creating a new version we should create 3 separate `.sppkg` files
- Each `.sppkg` file should contain manifest that references different CDN endpoints
- It should be easy to upgrade customer from trial to lite and then to full; or directly from trial to full
- You should know current edition in the code to execute the logic based on the edition's restrictions

### Approach
This sample shows the approach that is based on a custom Gulp task that should be run before bundling and packaging the solution.
The name of the task is `change-build-edition`. Parameter: `edition`.
The task updates SPFx solution configuration files to contain edition-specific information:
- deploy-azure-storage.json is updated to contain correct `container` value
- package-solution.json is updated to contain correct `solution.version` and `paths.zippedPackage` values. In this sample I'm using version's revision - 4th digit - to specify the edition: 0 for trial, 1 for lite, 2 for full. It allows to easily update customers. zippedPackage path is modified to create sppkg in subfolder based on edition configuration.
- write-manifests.json is updated to contain the correct CDN endpoint URL.

Additionally, the web part's source code folder contains `custom-config.json` file with `edition` property:
```
{
    "edition": "full"
}
```
This file is modified by a custom task as well to contain the correct edition.
Later `custom-config.json` is referenced (`require('./custom-config.json')`) in web part code to provide custom logic based on current edition.

Use the following commands to build specific edition version:
```
gulp change-build-edition --edition lite
gulp bundle --ship
gulp package-solution --ship
gulp deploy-azure-storage
```

## Resources
[Handling Multiple Editions of SPFx Solution](http://tricky-sharepoint.blogspot.com/2017/08/handling-multiple-editions-of-spfx.html)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-solution-editions" />
