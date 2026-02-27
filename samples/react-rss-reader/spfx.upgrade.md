# Upgrade project PnP Sample - React RssReader to v1.22.2

Date: 2/27/2026

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.22.2. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.22.2
```

File: [./package.json:17:5](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.22.2
```

File: [./package.json:18:5](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.22.2
```

File: [./package.json:19:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.22.2
```

File: [./package.json:21:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.22.2
```

File: [./package.json:20:5](./package.json)

### FN001034 @microsoft/sp-adaptive-card-extension-base | Optional

Upgrade SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-adaptive-card-extension-base@1.22.2
```

File: [./package.json:16:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.22.2
```

File: [./package.json:43:5](./package.json)

### FN002022 @microsoft/eslint-plugin-spfx | Required

Upgrade SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-plugin-spfx@1.22.2
```

File: [./package.json:40:5](./package.json)

### FN002023 @microsoft/eslint-config-spfx | Required

Upgrade SharePoint Framework dev dependency package @microsoft/eslint-config-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-config-spfx@1.22.2
```

File: [./package.json:39:5](./package.json)

### FN002030 @microsoft/spfx-web-build-rig | Required

Install SharePoint Framework dev dependency package @microsoft/spfx-web-build-rig

Execute the following command:

```sh
npm i -DE @microsoft/spfx-web-build-rig@1.22.2
```

File: [./package.json:38:3](./package.json)

### FN002034 @microsoft/spfx-heft-plugins | Required

Install SharePoint Framework dev dependency package @microsoft/spfx-heft-plugins

Execute the following command:

```sh
npm i -DE @microsoft/spfx-heft-plugins@1.22.2
```

File: [./package.json:38:3](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.22.2"
  }
}
```

File: [./.yo-rc.json:5:5](./.yo-rc.json)

### FN002001 @microsoft/sp-build-web | Required

Remove SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm un -D @microsoft/sp-build-web
```

File: [./package.json:42:5](./package.json)

### FN002004 gulp | Required

Remove SharePoint Framework dev dependency package gulp

Execute the following command:

```sh
npm un -D gulp
```

File: [./package.json:53:5](./package.json)

### FN002007 ajv | Required

Remove SharePoint Framework dev dependency package ajv

Execute the following command:

```sh
npm un -D ajv
```

File: [./package.json:50:5](./package.json)

### FN002021 @rushstack/eslint-config | Required

Upgrade SharePoint Framework dev dependency package @rushstack/eslint-config

Execute the following command:

```sh
npm i -DE @rushstack/eslint-config@4.5.2
```

File: [./package.json:44:5](./package.json)

### FN002026 typescript | Required

Upgrade SharePoint Framework dev dependency package typescript

Execute the following command:

```sh
npm i -DE typescript@~5.8.0
```

File: [./package.json:56:5](./package.json)

### FN002029 @microsoft/rush-stack-compiler-5.3 | Required

Remove SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-5.3

Execute the following command:

```sh
npm un -D @microsoft/rush-stack-compiler-5.3
```

File: [./package.json:38:22](./package.json)

### FN002031 @rushstack/heft | Required

Install SharePoint Framework dev dependency package @rushstack/heft

Execute the following command:

```sh
npm i -DE @rushstack/heft@1.1.2
```

File: [./package.json:38:3](./package.json)

### FN002032 @typescript-eslint/parser | Required

Upgrade SharePoint Framework dev dependency package @typescript-eslint/parser

Execute the following command:

```sh
npm i -DE @typescript-eslint/parser@8.46.2
```

File: [./package.json:49:5](./package.json)

### FN002033 css-loader | Required

Install SharePoint Framework dev dependency package css-loader

Execute the following command:

```sh
npm i -DE css-loader@7.1.2
```

File: [./package.json:38:3](./package.json)

### FN002035 @types/heft-jest | Required

Install SharePoint Framework dev dependency package @types/heft-jest

Execute the following command:

```sh
npm i -DE @types/heft-jest@1.0.2
```

File: [./package.json:38:3](./package.json)

### FN010011 .yo-rc.json useGulp | Recommended

Update useGulp property in .yo-rc.json

```json
{
    "useGulp": false
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN014003 .vscode/launch.json | Recommended

In the .vscode folder, add the launch.json file

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Hosted workbench",
      "type": "msedge",
      "request": "launch",
      "url": "https://{tenantDomain}/_layouts/workbench.aspx",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*",
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222",
        "-incognito"
      ]
    }
  ]
}
```

File: [.vscode/launch.json](.vscode/launch.json)

### FN015005 src\index.ts | Required

Remove file src\index.ts

Execute the following command:

```sh
Remove-Item "src\index.ts"
```

File: [src\index.ts](src\index.ts)

### FN015010 gulpfile.js | Required

Remove file gulpfile.js

Execute the following command:

```sh
Remove-Item "gulpfile.js"
```

File: [gulpfile.js](gulpfile.js)

### FN015014 config\rig.json | Required

Add file config\rig.json

Execute the following command:

```sh
@'
{
  // The "rig.json" file directs tools to look for their config files in an external package.
  // Documentation for this system: https://www.npmjs.com/package/@rushstack/rig-package
  "$schema": "https://developer.microsoft.com/json-schemas/rig-package/rig.schema.json",

  "rigPackageName": "@microsoft/spfx-web-build-rig"
}

'@ | Out-File -FilePath "config\rig.json"
```

File: [config\rig.json](config\rig.json)

### FN015015 config\typescript.json | Required

Add file config\typescript.json

Execute the following command:

```sh
@'
{
  "extends": "@microsoft/spfx-web-build-rig/profiles/default/config/typescript.json",

  "staticAssetsToCopy": {
    "fileExtensions": [".resx", ".jpg", ".png", ".woff", ".eot", ".ttf", ".svg", ".gif"],

    "includeGlobs": ["webparts/*/loc/*.js"]
  }
}

'@ | Out-File -FilePath "config\typescript.json"
```

File: [config\typescript.json](config\typescript.json)

### FN020001 @types/react | Required

Add resolution for package @types/react

```json
{
  "resolutions": {
    "@types/react": "17.0.45"
  }
}
```

File: [./package.json:1:1](./package.json)

### FN021001 main | Required

Remove package.json property

```json
{
  "main": "undefined"
}
```

File: [./package.json:8:3](./package.json)

### FN021004 package.json scripts.build | Required

Update package.json scripts.build property

```json
{
  "scripts": {
    "build": "heft test --clean --production && heft package-solution --production"
  }
}
```

File: [./package.json:10:5](./package.json)

### FN021005 package.json scripts.test | Required

Remove package.json scripts.test property

```json
{
  "scripts": {
    "test": ""
  }
}
```

File: [./package.json:12:5](./package.json)

### FN021006 package.json scripts.clean | Required

Update package.json scripts.clean property

```json
{
  "scripts": {
    "clean": "heft clean"
  }
}
```

File: [./package.json:11:5](./package.json)

### FN021007 package.json scripts.start | Required

Update package.json scripts.start property

```json
{
  "scripts": {
    "start": "heft start --clean"
  }
}
```

File: [./package.json:9:14](./package.json)

### FN021008 package.json scripts.eject-webpack | Required

Update package.json scripts.eject-webpack property

```json
{
  "scripts": {
    "eject-webpack": "heft eject-webpack"
  }
}
```

File: [./package.json:9:14](./package.json)

### FN021009 package.json overrides.@rushstack/heft | Required

Update package.json overrides.@rushstack/heft property

```json
{
  "overrides": {
    "@rushstack/heft": "1.1.2"
  }
}
```

File: [./package.json:1:1](./package.json)

### FN023003 .gitignore 'lib-dts' folder | Required

To .gitignore add the 'lib-dts' folder


File: [./.gitignore](./.gitignore)

### FN023004 .gitignore 'lib-commonjs' folder | Required

To .gitignore add the 'lib-commonjs' folder


File: [./.gitignore](./.gitignore)

### FN023005 .gitignore 'lib-esm' folder | Required

To .gitignore add the 'lib-esm' folder


File: [./.gitignore](./.gitignore)

### FN023006 .gitignore 'jest-output' folder | Required

To .gitignore add the 'jest-output' folder


File: [./.gitignore](./.gitignore)

### FN025002 .eslintrc.js override rule @rushstack/import-requires-chunk-name | Required

Add override rule @rushstack/import-requires-chunk-name in .eslintrc.js

```js
// Require chunk names for dynamic imports in SPFx projects. https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/import-requires-chunk-name': 1,

```

File: [.eslintrc.js:14:7](.eslintrc.js)

### FN025003 .eslintrc.js override rule @rushstack/pair-react-dom-render-unmount | Required

Add override rule @rushstack/pair-react-dom-render-unmount in .eslintrc.js

```js
// Ensure that React components rendered with ReactDOM.render() are unmounted with ReactDOM.unmountComponentAtNode(). https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/pair-react-dom-render-unmount': 1,

```

File: [.eslintrc.js:14:7](.eslintrc.js)

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
npm un -D @microsoft/sp-build-web gulp ajv @microsoft/rush-stack-compiler-5.3
npm i -SE @microsoft/sp-core-library@1.22.2 @microsoft/sp-lodash-subset@1.22.2 @microsoft/sp-office-ui-fabric-core@1.22.2 @microsoft/sp-webpart-base@1.22.2 @microsoft/sp-property-pane@1.22.2 @microsoft/sp-adaptive-card-extension-base@1.22.2
npm i -DE @microsoft/sp-module-interfaces@1.22.2 @microsoft/eslint-plugin-spfx@1.22.2 @microsoft/eslint-config-spfx@1.22.2 @microsoft/spfx-web-build-rig@1.22.2 @microsoft/spfx-heft-plugins@1.22.2 @rushstack/eslint-config@4.5.2 typescript@~5.8.0 @rushstack/heft@1.1.2 @typescript-eslint/parser@8.46.2 css-loader@7.1.2 @types/heft-jest@1.0.2
npm dedupe
Remove-Item "src\index.ts"
Remove-Item "gulpfile.js"
@'
{
  "extends": "@microsoft/spfx-web-build-rig/profiles/default/config/typescript.json",

  "staticAssetsToCopy": {
    "fileExtensions": [".resx", ".jpg", ".png", ".woff", ".eot", ".ttf", ".svg", ".gif"],

    "includeGlobs": ["webparts/*/loc/*.js"]
  }
}

'@ | Out-File -FilePath "config\typescript.json"
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.22.2"
  }
}
```

Update useGulp property in .yo-rc.json:

```json
{
    "useGulp": false
}
```

#### [.vscode/launch.json](.vscode/launch.json)

In the .vscode folder, add the launch.json file:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Hosted workbench",
      "type": "msedge",
      "request": "launch",
      "url": "https://{tenantDomain}/_layouts/workbench.aspx",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///.././src/*": "${webRoot}/src/*",
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222",
        "-incognito"
      ]
    }
  ]
}
```

#### [./package.json](./package.json)

Add resolution for package @types/react:

```json
{
  "resolutions": {
    "@types/react": "17.0.45"
  }
}
```

Remove package.json property:

```json
{
  "main": "undefined"
}
```

Update package.json scripts.build property:

```json
{
  "scripts": {
    "build": "heft test --clean --production && heft package-solution --production"
  }
}
```

Remove package.json scripts.test property:

```json
{
  "scripts": {
    "test": ""
  }
}
```

Update package.json scripts.clean property:

```json
{
  "scripts": {
    "clean": "heft clean"
  }
}
```

Update package.json scripts.start property:

```json
{
  "scripts": {
    "start": "heft start --clean"
  }
}
```

Update package.json scripts.eject-webpack property:

```json
{
  "scripts": {
    "eject-webpack": "heft eject-webpack"
  }
}
```

Update package.json overrides.@rushstack/heft property:

```json
{
  "overrides": {
    "@rushstack/heft": "1.1.2"
  }
}
```

#### [./.gitignore](./.gitignore)

To .gitignore add the 'lib-dts' folder:

```text
lib-dts
```

To .gitignore add the 'lib-commonjs' folder:

```text
lib-commonjs
```

To .gitignore add the 'lib-esm' folder:

```text
lib-esm
```

To .gitignore add the 'jest-output' folder:

```text
jest-output
```

#### [.eslintrc.js](.eslintrc.js)

Add override rule @rushstack/import-requires-chunk-name in .eslintrc.js:

```js
// Require chunk names for dynamic imports in SPFx projects. https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/import-requires-chunk-name': 1,

```

Add override rule @rushstack/pair-react-dom-render-unmount in .eslintrc.js:

```js
// Ensure that React components rendered with ReactDOM.render() are unmounted with ReactDOM.unmountComponentAtNode(). https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/pair-react-dom-render-unmount': 1,

```