# Upgrade project D:\SP\Samples\react-spfx-webcam to v1.9.0

Date: 2019-9-5

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.9.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.9.0
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.9.0
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.9.0
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.9.0
```

File: [./package.json](./package.json)

### FN001005 @types/react | Required

Upgrade SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm i -SE @types/react@16.8.8
```

File: [./package.json](./package.json)

### FN001006 @types/react-dom | Required

Upgrade SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm i -SE @types/react-dom@16.8.3
```

File: [./package.json](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.9.0
```

File: [./package.json](./package.json)

### FN001022 office-ui-fabric-react | Required

Upgrade SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@6.189.2
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.9.0
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.9.0
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i -DE @microsoft/sp-webpart-workbench@1.9.0
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.9.0
```

File: [./package.json](./package.json)

### FN002011 @microsoft/rush-stack-compiler-2.9 | Required

Upgrade SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-2.9

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-2.9@0.7.16
```

File: [./package.json](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.9.0"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN020001 @types/react | Required

Add resolution for package @types/react

In file [./package.json](./package.json) update the code as follows:

```json
{
  "resolutions": {
    "@types/react": "16.8.8"
  }
}
```

File: [./package.json](./package.json)

### FN021001 main | Required

Add package.json property

In file [./package.json](./package.json) update the code as follows:

```json
{
  "main": "lib/index.js"
}
```

File: [./package.json](./package.json)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i -SE react@16.8.5
```

File: [./package.json](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@16.8.5
```

File: [./package.json](./package.json)

### FN022001 Scss file import | Required

Remove scss file import


File: [src\webparts\spFxWebCam\components\SpFxWebCam.module.scss](src\webparts\spFxWebCam\components\SpFxWebCam.module.scss)

### FN022002 Scss file import | Optional

Add scss file import


File: [src\webparts\spFxWebCam\components\SpFxWebCam.module.scss](src\webparts\spFxWebCam\components\SpFxWebCam.module.scss)

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
npm i -SE @microsoft/sp-core-library@1.9.0 @microsoft/sp-lodash-subset@1.9.0 @microsoft/sp-office-ui-fabric-core@1.9.0 @microsoft/sp-webpart-base@1.9.0 @types/react@16.8.8 @types/react-dom@16.8.3 @microsoft/sp-property-pane@1.9.0 office-ui-fabric-react@6.189.2 react@16.8.5 react-dom@16.8.5
npm i -DE @microsoft/sp-build-web@1.9.0 @microsoft/sp-module-interfaces@1.9.0 @microsoft/sp-webpart-workbench@1.9.0 @microsoft/sp-tslint-rules@1.9.0 @microsoft/rush-stack-compiler-2.9@0.7.16
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.9.0"
  }
}
```

#### [./package.json](./package.json)

Add resolution for package @types/react:

```json
{
  "resolutions": {
    "@types/react": "16.8.8"
  }
}
```

Add package.json property:

```json
{
  "main": "lib/index.js"
}
```

#### [src\webparts\spFxWebCam\components\SpFxWebCam.module.scss](src\webparts\spFxWebCam\components\SpFxWebCam.module.scss)

Remove scss file import:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

Add scss file import:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```
