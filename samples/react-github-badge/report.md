# Upgrade project C:\github\sp-dev-fx-webparts\samples\react-github-badge to v1.8.2

Date: 2019-6-6

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.8.2. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i @microsoft/sp-core-library@1.8.2 -SE
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i @microsoft/sp-lodash-subset@1.8.2 -SE
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i @microsoft/sp-office-ui-fabric-core@1.8.2 -SE
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i @microsoft/sp-webpart-base@1.8.2 -SE
```

File: [./package.json](./package.json)

### FN001005 @types/react | Required

Upgrade SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm i @types/react@16.7.22 -SE
```

File: [./package.json](./package.json)

### FN001006 @types/react-dom | Required

Upgrade SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm i @types/react-dom@16.8.0 -SE
```

File: [./package.json](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i @microsoft/sp-property-pane@1.8.2 -SE
```

File: [./package.json](./package.json)

### FN001022 office-ui-fabric-react | Required

Install SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i office-ui-fabric-react@6.143.0 -SE
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i @microsoft/sp-build-web@1.8.2 -DE
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i @microsoft/sp-module-interfaces@1.8.2 -DE
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i @microsoft/sp-webpart-workbench@1.8.2 -DE
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i @microsoft/sp-tslint-rules@1.8.2 -DE
```

File: [./package.json](./package.json)

### FN002010 @microsoft/rush-stack-compiler-2.7 | Required

Remove SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-2.7

Execute the following command:

```sh
npm un @microsoft/rush-stack-compiler-2.7 -D
```

File: [./package.json](./package.json)

### FN002011 @microsoft/rush-stack-compiler-2.9 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-2.9

Execute the following command:

```sh
npm i @microsoft/rush-stack-compiler-2.9@0.7.7 -DE
```

File: [./package.json](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.8.2"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.9/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN020001 @types/react | Required

Add resolution for package @types/react

In file [./package.json](./package.json) update the code as follows:

```json
{
  "resolutions": {
    "@types/react": "16.7.22"
  }
}
```

File: [./package.json](./package.json)

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
npm i @microsoft/sp-core-library@1.8.2 @microsoft/sp-lodash-subset@1.8.2 @microsoft/sp-office-ui-fabric-core@1.8.2 @microsoft/sp-webpart-base@1.8.2 @types/react@16.7.22 @types/react-dom@16.8.0 @microsoft/sp-property-pane@1.8.2 office-ui-fabric-react@6.143.0 -SE
npm i @microsoft/sp-build-web@1.8.2 @microsoft/sp-module-interfaces@1.8.2 @microsoft/sp-webpart-workbench@1.8.2 @microsoft/sp-tslint-rules@1.8.2 @microsoft/rush-stack-compiler-2.9@0.7.7 -DE
npm un @microsoft/rush-stack-compiler-2.7 -D
npm dedupe
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.8.2"
  }
}
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.9/includes/tsconfig-web.json"
}
```

#### [./package.json](./package.json)

Add resolution for package @types/react:

```json
{
  "resolutions": {
    "@types/react": "16.7.22"
  }
}
```
