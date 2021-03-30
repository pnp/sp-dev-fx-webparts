# Upgrade project react-tenant-properties to v1.11.0

Date: 10/20/2020

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.11.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.11.0
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.11.0
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.11.0
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.11.0
```

File: [./package.json](./package.json)

### FN001005 @types/react | Required

Remove SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm un -S @types/react
```

File: [./package.json](./package.json)

### FN001006 @types/react-dom | Required

Remove SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm un -S @types/react-dom
```

File: [./package.json](./package.json)

### FN001007 @types/webpack-env | Required

Remove SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm un -S @types/webpack-env
```

File: [./package.json](./package.json)

### FN001010 @types/es6-promise | Required

Remove SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm un -S @types/es6-promise
```

File: [./package.json](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.11.0
```

File: [./package.json](./package.json)

### FN001022 office-ui-fabric-react | Required

Install SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@6.214.0
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.11.0
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.11.0
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i -DE @microsoft/sp-webpart-workbench@1.11.0
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.11.0
```

File: [./package.json](./package.json)

### FN002013 @types/webpack-env | Required

Install SharePoint Framework dev dependency package @types/webpack-env

Execute the following command:

```sh
npm i -DE @types/webpack-env@1.13.1
```

File: [./package.json](./package.json)

### FN002014 @types/es6-promise | Required

Install SharePoint Framework dev dependency package @types/es6-promise

Execute the following command:

```sh
npm i -DE @types/es6-promise@0.0.33
```

File: [./package.json](./package.json)

### FN002015 @types/react | Required

Install SharePoint Framework dev dependency package @types/react

Execute the following command:

```sh
npm i -DE @types/react@16.8.8
```

File: [./package.json](./package.json)

### FN002016 @types/react-dom | Required

Install SharePoint Framework dev dependency package @types/react-dom

Execute the following command:

```sh
npm i -DE @types/react-dom@16.8.3
```

File: [./package.json](./package.json)

### FN006004 package-solution.json developer | Optional

In package-solution.json add developer section

In file [./config/package-solution.json](./config/package-solution.json) update the code as follows:

```json
{
  "solution": {
    "developer": {
      "name": "Contoso",
      "privacyUrl": "https://contoso.com/privacy",
      "termsOfUseUrl": "https://contoso.com/terms-of-use",
      "websiteUrl": "https://contoso.com/my-app",
      "mpnId": "000000"
    }
  }
}
```

File: [./config/package-solution.json](./config/package-solution.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.11.0"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN012012 tsconfig.json include property | Required

Update tsconfig.json include property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "include": [
    "src/**/*.tsx"
  ]
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN002012 @microsoft/rush-stack-compiler-3.3 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-3.3

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-3.3@0.3.5
```

File: [./package.json](./package.json)

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

In file [src/webparts/tenantProperties/TenantPropertiesWebPart.ts](src/webparts/tenantProperties/TenantPropertiesWebPart.ts) update the code as follows:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src/webparts/tenantProperties/TenantPropertiesWebPart.ts:4:1](src/webparts/tenantProperties/TenantPropertiesWebPart.ts)

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

In file [src/webparts/tenantProperties/components/TenantProperties.module.scss](src/webparts/tenantProperties/components/TenantProperties.module.scss) update the code as follows:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

File: [src/webparts/tenantProperties/components/TenantProperties.module.scss](src/webparts/tenantProperties/components/TenantProperties.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

In file [src/webparts/tenantProperties/components/TenantProperties.module.scss](src/webparts/tenantProperties/components/TenantProperties.module.scss) update the code as follows:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

File: [src/webparts/tenantProperties/components/TenantProperties.module.scss](src/webparts/tenantProperties/components/TenantProperties.module.scss)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

In file [src/webparts/tenantProperties/TenantPropertiesWebPart.manifest.json](src/webparts/tenantProperties/TenantPropertiesWebPart.manifest.json) update the code as follows:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src/webparts/tenantProperties/TenantPropertiesWebPart.manifest.json](src/webparts/tenantProperties/TenantPropertiesWebPart.manifest.json)

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

### FN018001 Web part Microsoft Teams tab resources folder | Optional

Create folder for Microsoft Teams tab resources

Execute the following command:

```sh
mkdir /home/jfmr/dev/github/sp-dev-fx-webparts/samples/react-tenant-properties/teams
```

File: [teams](teams)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp /home/jfmr/.nvm/versions/node/v10.20.1/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab20x20.png /home/jfmr/dev/github/sp-dev-fx-webparts/samples/react-tenant-properties/teams/fe85bc01-3650-4533-9c42-5c078fdd579c_outline.png
```

File: [teams/fe85bc01-3650-4533-9c42-5c078fdd579c_outline.png](teams/fe85bc01-3650-4533-9c42-5c078fdd579c_outline.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp /home/jfmr/.nvm/versions/node/v10.20.1/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab96x96.png /home/jfmr/dev/github/sp-dev-fx-webparts/samples/react-tenant-properties/teams/fe85bc01-3650-4533-9c42-5c078fdd579c_color.png
```

File: [teams/fe85bc01-3650-4533-9c42-5c078fdd579c_color.png](teams/fe85bc01-3650-4533-9c42-5c078fdd579c_color.png)

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
npm i -SE @microsoft/sp-core-library@1.11.0 @microsoft/sp-lodash-subset@1.11.0 @microsoft/sp-office-ui-fabric-core@1.11.0 @microsoft/sp-webpart-base@1.11.0 @microsoft/sp-property-pane@1.11.0 office-ui-fabric-react@6.214.0 react@16.8.5 react-dom@16.8.5
npm i -DE @microsoft/sp-build-web@1.11.0 @microsoft/sp-module-interfaces@1.11.0 @microsoft/sp-webpart-workbench@1.11.0 @microsoft/sp-tslint-rules@1.11.0 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33 @types/react@16.8.8 @types/react-dom@16.8.3 @microsoft/rush-stack-compiler-3.3@0.3.5
npm un -S @types/react @types/react-dom @types/webpack-env @types/es6-promise
npm dedupe
mkdir /home/jfmr/dev/github/sp-dev-fx-webparts/samples/react-tenant-properties/teams
cp /home/jfmr/.nvm/versions/node/v10.20.1/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab20x20.png /home/jfmr/dev/github/sp-dev-fx-webparts/samples/react-tenant-properties/teams/fe85bc01-3650-4533-9c42-5c078fdd579c_outline.png
cp /home/jfmr/.nvm/versions/node/v10.20.1/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab96x96.png /home/jfmr/dev/github/sp-dev-fx-webparts/samples/react-tenant-properties/teams/fe85bc01-3650-4533-9c42-5c078fdd579c_color.png
```

### Modify files

#### [./config/package-solution.json](./config/package-solution.json)

In package-solution.json add developer section:

```json
{
  "solution": {
    "developer": {
      "name": "Contoso",
      "privacyUrl": "https://contoso.com/privacy",
      "termsOfUseUrl": "https://contoso.com/terms-of-use",
      "websiteUrl": "https://contoso.com/my-app",
      "mpnId": "000000"
    }
  }
}
```

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.11.0"
  }
}
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json include property:

```json
{
  "include": [
    "src/**/*.tsx"
  ]
}
```

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

#### [src/webparts/tenantProperties/TenantPropertiesWebPart.ts](src/webparts/tenantProperties/TenantPropertiesWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
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

#### [src/webparts/tenantProperties/components/TenantProperties.module.scss](src/webparts/tenantProperties/components/TenantProperties.module.scss)

Remove scss file import:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

Add scss file import:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

#### [src/webparts/tenantProperties/TenantPropertiesWebPart.manifest.json](src/webparts/tenantProperties/TenantPropertiesWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```
