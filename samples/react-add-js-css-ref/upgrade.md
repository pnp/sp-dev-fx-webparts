# Upgrade project react-add-js-css-ref to v1.14.0

Date: 10/19/2022

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.14.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.14.0
```

File: [./package.json:17:5](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.14.0
```

File: [./package.json:19:5](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.14.0
```

File: [./package.json:20:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.14.0
```

File: [./package.json:21:5](./package.json)

### FN001011 @microsoft/sp-dialog | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-dialog

Execute the following command:

```sh
npm i -SE @microsoft/sp-dialog@1.14.0
```

File: [./package.json:18:5](./package.json)

### FN001012 @microsoft/sp-application-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-application-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-application-base@1.14.0
```

File: [./package.json:16:5](./package.json)

### FN001013 @microsoft/decorators | Required

Upgrade SharePoint Framework dependency package @microsoft/decorators

Execute the following command:

```sh
npm i -SE @microsoft/decorators@1.14.0
```

File: [./package.json:15:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.14.0
```

File: [./package.json:14:3](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.14.0
```

File: [./package.json:35:5](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.14.0
```

File: [./package.json:34:5](./package.json)

### FN006004 package-solution.json developer | Optional

In package-solution.json add developer section

```json
{
  "solution": {
    "developer": {
      "name": "",
      "privacyUrl": "",
      "termsOfUseUrl": "",
      "websiteUrl": "",
      "mpnId": "Undefined-1.14.0"
    }
  }
}
```

File: [./config/package-solution.json:3:3](./config/package-solution.json)

### FN006005 package-solution.json metadata | Required

In package-solution.json add metadata section

```json
{
  "solution": {
    "metadata": {
      "shortDescription": {
        "default": "react-add-js-css-ref description"
      },
      "longDescription": {
        "default": "react-add-js-css-ref description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    }
  }
}
```

File: [./config/package-solution.json:3:3](./config/package-solution.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.14.0"
  }
}
```

File: [./.yo-rc.json:5:5](./.yo-rc.json)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i -SE react@16.13.1
```

File: [./package.json:29:5](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@16.13.1
```

File: [./package.json:30:5](./package.json)

### FN001022 office-ui-fabric-react | Required

Upgrade SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@7.174.1
```

File: [./package.json:28:5](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Remove SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm un -D @microsoft/sp-webpart-workbench
```

File: [./package.json:36:5](./package.json)

### FN002015 @types/react | Required

Install SharePoint Framework dev dependency package @types/react

Execute the following command:

```sh
npm i -DE @types/react@16.9.51
```

File: [./package.json:32:3](./package.json)

### FN002018 @microsoft/rush-stack-compiler-3.9 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-3.9

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-3.9@0.4.47
```

File: [./package.json:32:3](./package.json)

### FN007002 serve.json initialPage | Required

Update serve.json initialPage URL

```json
{
  "initialPage": "https://enter-your-SharePoint-site/_layouts/workbench.aspx"
}
```

File: [./config/serve.json:29:3](./config/serve.json)

### FN007003 serve.json api | Required

From serve.json remove the api property

```json

```

File: [./config/serve.json:30:3](./config/serve.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.9/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json:2:3](./tsconfig.json)

### FN015007 config/copy-assets.json | Required

Remove file config/copy-assets.json

Execute the following command:

```sh
rm "config/copy-assets.json"
```

File: [config/copy-assets.json](config/copy-assets.json)

### FN024001 Create .npmignore | Required

Create the .npmignore file


File: [./.npmignore](./.npmignore)

### FN005002 deploy-azure-storage.json workingDir | Required

Update deploy-azure-storage.json workingDir

```json
{
  "workingDir": "./release/assets/"
}
```

File: [./config/deploy-azure-storage.json:3:3](./config/deploy-azure-storage.json)

### FN023001 .gitignore 'release' folder | Required

To .gitignore add the 'release' folder


File: [./.gitignore](./.gitignore)

### FN002004 gulp | Required

Upgrade SharePoint Framework dev dependency package gulp

Execute the following command:

```sh
npm i -DE gulp@4.0.2
```

File: [./package.json:38:5](./package.json)

### FN002005 @types/chai | Required

Remove SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm un -D @types/chai
```

File: [./package.json:39:5](./package.json)

### FN002006 @types/mocha | Required

Remove SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm un -D @types/mocha
```

File: [./package.json:40:5](./package.json)

### FN002016 @types/react-dom | Required

Install SharePoint Framework dev dependency package @types/react-dom

Execute the following command:

```sh
npm i -DE @types/react-dom@16.9.8
```

File: [./package.json:32:3](./package.json)

### FN012013 tsconfig.json exclude property | Required

Remove tsconfig.json exclude property

```json
{
  "exclude": []
}
```

File: [./tsconfig.json:34:3](./tsconfig.json)

### FN012018 tsconfig.json es2015.promise lib | Required

Add es2015.promise lib in tsconfig.json

```json
{
  "compilerOptions": {
    "lib": [
      "es2015.promise"
    ]
  }
}
```

File: [./tsconfig.json:25:5](./tsconfig.json)

### FN012019 tsconfig.json es6-promise types | Required

Remove es6-promise type in tsconfig.json

```json
{
  "compilerOptions": {
    "types": [
      "es6-promise"
    ]
  }
}
```

File: [./tsconfig.json:22:7](./tsconfig.json)

### FN013002 gulpfile.js serve task | Required

Before 'build.initialize(require('gulp'));' add the serve task

```js
var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

```

File: [./gulpfile.js](./gulpfile.js)

### FN019002 tslint.json extends | Required

Update tslint.json extends property

```json
{
  "extends": "./node_modules/@microsoft/sp-tslint-rules/base-tslint.json"
}
```

File: [./tslint.json:2:3](./tslint.json)

### FN021002 engines | Required

Remove package.json property

```json
{
  "engines": "undefined"
}
```

File: [./package.json:6:3](./package.json)

### FN001005 @types/react | Required

Remove SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm un -S @types/react
```

File: [./package.json:25:5](./package.json)

### FN001006 @types/react-dom | Required

Remove SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm un -S @types/react-dom
```

File: [./package.json:26:5](./package.json)

### FN001007 @types/webpack-env | Required

Remove SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm un -S @types/webpack-env
```

File: [./package.json:27:5](./package.json)

### FN001010 @types/es6-promise | Required

Remove SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm un -S @types/es6-promise
```

File: [./package.json:24:5](./package.json)

### FN002013 @types/webpack-env | Required

Install SharePoint Framework dev dependency package @types/webpack-env

Execute the following command:

```sh
npm i -DE @types/webpack-env@1.13.1
```

File: [./package.json:32:3](./package.json)

### FN002014 @types/es6-promise | Required

Install SharePoint Framework dev dependency package @types/es6-promise

Execute the following command:

```sh
npm i -DE @types/es6-promise@0.0.33
```

File: [./package.json:32:3](./package.json)

### FN012012 tsconfig.json include property | Required

Add to the tsconfig.json include property

```json
{
  "include": [
    "src/**/*.tsx"
  ]
}
```

File: [./tsconfig.json:31:3](./tsconfig.json)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src/webparts/addJsCssReference/AddJsCssReferenceWebPart.ts:4:1](src/webparts/addJsCssReference/AddJsCssReferenceWebPart.ts)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm un -S @types/react @types/react-dom @types/webpack-env @types/es6-promise
npm un -D @microsoft/sp-webpart-workbench @types/chai @types/mocha
npm i -SE @microsoft/sp-core-library@1.14.0 @microsoft/sp-lodash-subset@1.14.0 @microsoft/sp-office-ui-fabric-core@1.14.0 @microsoft/sp-webpart-base@1.14.0 @microsoft/sp-dialog@1.14.0 @microsoft/sp-application-base@1.14.0 @microsoft/decorators@1.14.0 @microsoft/sp-property-pane@1.14.0 react@16.13.1 react-dom@16.13.1 office-ui-fabric-react@7.174.1
npm i -DE @microsoft/sp-module-interfaces@1.14.0 @microsoft/sp-tslint-rules@1.14.0 @types/react@16.9.51 @microsoft/rush-stack-compiler-3.9@0.4.47 gulp@4.0.2 @types/react-dom@16.9.8 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33
npm dedupe
rm "config/copy-assets.json"
```

### Modify files

#### [./config/package-solution.json](./config/package-solution.json)

In package-solution.json add developer section:

```json
{
  "solution": {
    "developer": {
      "name": "",
      "privacyUrl": "",
      "termsOfUseUrl": "",
      "websiteUrl": "",
      "mpnId": "Undefined-1.14.0"
    }
  }
}
```

In package-solution.json add metadata section:

```json
{
  "solution": {
    "metadata": {
      "shortDescription": {
        "default": "react-add-js-css-ref description"
      },
      "longDescription": {
        "default": "react-add-js-css-ref description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    }
  }
}
```

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.14.0"
  }
}
```

#### [./config/serve.json](./config/serve.json)

Update serve.json initialPage URL:

```json
{
  "initialPage": "https://enter-your-SharePoint-site/_layouts/workbench.aspx"
}
```

From serve.json remove the api property:

```json

```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.9/includes/tsconfig-web.json"
}
```

Remove tsconfig.json exclude property:

```json
{
  "exclude": []
}
```

Add es2015.promise lib in tsconfig.json:

```json
{
  "compilerOptions": {
    "lib": [
      "es2015.promise"
    ]
  }
}
```

Remove es6-promise type in tsconfig.json:

```json
{
  "compilerOptions": {
    "types": [
      "es6-promise"
    ]
  }
}
```

Add to the tsconfig.json include property:

```json
{
  "include": [
    "src/**/*.tsx"
  ]
}
```

#### [./.npmignore](./.npmignore)

Create the .npmignore file:

```text
!dist
config

gulpfile.js

release
src
temp

tsconfig.json
tslint.json

*.log

.yo-rc.json
.vscode

```

#### [./config/deploy-azure-storage.json](./config/deploy-azure-storage.json)

Update deploy-azure-storage.json workingDir:

```json
{
  "workingDir": "./release/assets/"
}
```

#### [./.gitignore](./.gitignore)

To .gitignore add the 'release' folder:

```text
release
```

#### [./gulpfile.js](./gulpfile.js)

Before 'build.initialize(require('gulp'));' add the serve task:

```js
var getTasks = build.rig.getTasks;
build.rig.getTasks = function () {
  var result = getTasks.call(build.rig);

  result.set('serve', result.get('serve-deprecated'));

  return result;
};

```

#### [./tslint.json](./tslint.json)

Update tslint.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/sp-tslint-rules/base-tslint.json"
}
```

#### [./package.json](./package.json)

Remove package.json property:

```json
{
  "engines": "undefined"
}
```

#### [src/webparts/addJsCssReference/AddJsCssReferenceWebPart.ts](src/webparts/addJsCssReference/AddJsCssReferenceWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```
