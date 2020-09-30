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
  - React
  createdDate: 4/10/2020 12:00:00 AM
---
## Version Display

## Summary

Display your SharePoint solution version within your web parts.

![Version Display](./assets/VersionDisplay.gif)

## Used SharePoint Framework Version

![1.10.0](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

There are no pre-requisites.

## Solution

Solution|Author(s)
--------|---------
react-versiondisplay | Hugo Bernier ([Tahoe Ninjas](https://tahoeninjas.blog), [@bernier](https://twitter.com/bernierh))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 31, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* Set the `version` node in the `package.json` file, or by using `npm version major`, `npm version minor` or `npm version patch`
* in the command line run:
  * `npm install`
  * `gulp serve`

## Features

The sample uses a custom `gulp` task to synchronize the `version` node from the NodeJS `package.json` to the SharePoint solution's `package-solution.json`.

The solution demonstrates how to import the `package-solution.json` into a web part using a static `import` and a `require` statement.

### Using npm version to set the version

To change the `package.json` version (which will also change your SharePoint solution version), use [`npm version`](https://docs.npmjs.com/cli/version), using one of the following parameters:

```cmd
npm version major
npm version minor
npm version patch
```

The following table shows when you should call which `npm version` command, depending on the types of changes you're making to your solution:

|Type of change|Stage|Versioning rule|Example version| NPM command
|---|---|---|---|---|
|First release|New solution|Start with 1.0.0|1.0.0| `npm version major`
|Backward compatible bug fixes|Patch release|Increment the third digit|1.0.1| `npm version patch`
|Backward compatible new features|Minor release|Increment the middle digit and reset last digit to zero|1.1.0| `npm version minor`
|Changes that break backward compatibility|Major release|Increment the first digit and reset middle and last digits to zero|2.0.0| `npm version major`

### To use the custom gulp task in your solutions

> NOTE: if you use the [PnP SPFx Yeoman generator](https://pnp.github.io/generator-spfx/), there is already a built-in `gulp` command that will synchronize your version number when you use `npm version`. You only need to follow the steps below if you use the regular SPFx Yeoman generator.

If you'd like to use the custom `gulp` task in your solutions, copy the code from this solution's `gulpfile.js` between:

```typescript
// BEGIN: Add custom version sync task
```

and

```typescript
// END: Add custom version sync task
```

To your own `gulpfile.js`.

### To use the version using the web part's manifest

The `BaseClientSideWebPart` class `context` property provides a `manifest` which contains a `version` property. To use it in your web part, simply use:

```typescript
this.context.manifest.version
```

This approach provides a version number that follows the `1.0.0` format, instead of the usual `1.0.0.0` format. However, since the `gulp` tasks describe above append an additional `.0` to the end of the `package.json` version number, you can choose to append `.0` yourself when displaying the manifest version. For example:

```typescript
this.context.manifest.version + '.0'
```

### To use the version using a static import

1. Copy the content of this solution's `src\typings.d.ts` to your own `src` folder in your own project.
2. In the code where you want to insert the solution version, add the following `import` statement:
```typescript
import * as packageSolution from '../../../config/package-solution.json';
```

Keep in mind that you may have to adjust the path to your `package-solution.json` depending on where you're adding the code within your solution.

### To use the version using a require

In the code where you want to insert the solution version, add the following `require` statement:
```typescript
const packageSolution: any = require("../../../config/package-solution.json");
```

Keep in mind that you may have to adjust the path to your `package-solution.json` depending on where you're adding the code within your solution.

## For More Information

If you'd like to read more about the concepts illustrated in this sample, please refer to the following links:

* [Semantic Versioning](https://semver.org/)
* [npm version](https://docs.npmjs.com/cli/version)
* [PropertyPaneWebPartInformation](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyPaneWebPartInformation/)
* [Displaying the solution version in your web part](https://tahoeninjas.blog/2020/03/30/display-the-solution-version-in-your-web-part/)
* [How to version new SharePoint Framework projects](https://n8d.at/how-to-version-new-sharepoint-framework-projects/)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-versiondisplay" />
