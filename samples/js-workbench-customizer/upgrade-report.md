# Upgrade project C:\Users\joelf\dev\GitHub\sp-dev-fx-webparts\samples\js-workbench-customizer to v1.10.0

Date: 1/21/2020

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.10.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
pnpm i -E @microsoft/sp-core-library@1.10.0
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
pnpm i -E @microsoft/sp-lodash-subset@1.10.0
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
pnpm i -E @microsoft/sp-office-ui-fabric-core@1.10.0
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
pnpm i -E @microsoft/sp-webpart-base@1.10.0
```

File: [./package.json](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
pnpm i -E @microsoft/sp-property-pane@1.10.0
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
pnpm i -DE @microsoft/sp-build-web@1.10.0
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
pnpm i -DE @microsoft/sp-module-interfaces@1.10.0
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
pnpm i -DE @microsoft/sp-webpart-workbench@1.10.0
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
pnpm i -DE @microsoft/sp-tslint-rules@1.10.0
```

File: [./package.json](./package.json)

### FN002012 @microsoft/rush-stack-compiler-3.3 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-3.3

Execute the following command:

```sh
pnpm i -DE @microsoft/rush-stack-compiler-3.3@0.3.5
```

File: [./package.json](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.10.0"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.3/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

In file [src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.ts](src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.ts) update the code as follows:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneToggle } from "@microsoft/sp-property-pane";
```

File: [src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.ts:2:1](src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.ts)

### FN021001 main | Required

Add package.json property

In file [./package.json](./package.json) update the code as follows:

```json
{
  "main": "lib/index.js"
}
```

File: [./package.json](./package.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

In file [src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.manifest.json](src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.manifest.json) update the code as follows:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.manifest.json](src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.manifest.json)

### FN012014 tsconfig.json compiler options inlineSources | Required

Update tsconfig.json inlineSources value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012015 tsconfig.json compiler options strictNullChecks | Required

Update tsconfig.json strictNullChecks value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012016 tsconfig.json compiler options noUnusedLocals | Required

Update tsconfig.json noUnusedLocals value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

## Summary

### Execute script

```sh
pnpm i -E @microsoft/sp-core-library@1.10.0 @microsoft/sp-lodash-subset@1.10.0 @microsoft/sp-office-ui-fabric-core@1.10.0 @microsoft/sp-webpart-base@1.10.0 @microsoft/sp-property-pane@1.10.0
pnpm i -DE @microsoft/sp-build-web@1.10.0 @microsoft/sp-module-interfaces@1.10.0 @microsoft/sp-webpart-workbench@1.10.0 @microsoft/sp-tslint-rules@1.10.0 @microsoft/rush-stack-compiler-3.3@0.3.5
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.10.0"
  }
}
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.3/includes/tsconfig-web.json"
}
```

Update tsconfig.json inlineSources value:

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

Update tsconfig.json strictNullChecks value:

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

Update tsconfig.json noUnusedLocals value:

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

#### [src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.ts](src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneToggle } from "@microsoft/sp-property-pane";
```

#### [./package.json](./package.json)

Add package.json property:

```json
{
  "main": "lib/index.js"
}
```

#### [src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.manifest.json](src\webparts\workbenchCustomizer\WorkbenchCustomizerWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```