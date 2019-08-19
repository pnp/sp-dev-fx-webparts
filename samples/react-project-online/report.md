# Upgrade project C:\Users\Joel.Rodrigues\Documents\GitHub\sp-dev-fx-webparts\samples\react-project-online to v1.6.0

Date: 2018-10-3

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.6.0.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i @microsoft/sp-core-library@1.6.0 -SE
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i @microsoft/sp-lodash-subset@1.6.0 -SE
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i @microsoft/sp-office-ui-fabric-core@1.6.0 -SE
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i @microsoft/sp-webpart-base@1.6.0 -SE
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i @microsoft/sp-build-web@1.6.0 -DE
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i @microsoft/sp-module-interfaces@1.6.0 -DE
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i @microsoft/sp-webpart-workbench@1.6.0 -DE
```

File: [./package.json](./package.json)

### FN002008 tslint-microsoft-contrib | Required

Install SharePoint Framework dev dependency package tslint-microsoft-contrib

Execute the following command:

```sh
npm i tslint-microsoft-contrib@5.0.0 -DE
```

File: [./package.json](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.6.0"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN012011 tsconfig.json compiler options outDir | Required

Update tsconfig.json outDir value

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "outDir": "lib"
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012012 tsconfig.json include property | Required

Update tsconfig.json include property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "include": [
    "src/**/*.ts"
  ]
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012013 tsconfig.json exclude property | Required

Update tsconfig.json exclude property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "exclude": [
    "node_modules",
    "lib"
  ]
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN015004 ./config/tslint.json | Required

Remove file ./config/tslint.json

Execute the following command:

```sh
rm ./config/tslint.json
```

File: [./config/tslint.json](./config/tslint.json)

### FN015005 ./src/index.ts | Required

Add file ./src/index.ts

Execute the following command:

```sh
cat > ./src/index.ts << EOF
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
```

File: [./src/index.ts](./src/index.ts)

### FN001007 @types/webpack-env | Required

Upgrade SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm i @types/webpack-env@1.13.1 -SE
```

File: [./package.json](./package.json)

### FN001010 @types/es6-promise | Required

Install SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm i @types/es6-promise@0.0.33 -SE
```

File: [./package.json](./package.json)

### FN002005 @types/chai | Required

Upgrade SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm i @types/chai@3.4.34 -DE
```

File: [./package.json](./package.json)

### FN002006 @types/mocha | Required

Upgrade SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm i @types/mocha@2.2.38 -DE
```

File: [./package.json](./package.json)

### FN003001 config.json schema | Required

Update config.json schema URL

In file [./config/config.json](./config/config.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json"
}
```

File: [./config/config.json](./config/config.json)

### FN004001 copy-assets.json schema | Required

Update copy-assets.json schema URL

In file [./config/copy-assets.json](./config/copy-assets.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/copy-assets.schema.json"
}
```

File: [./config/copy-assets.json](./config/copy-assets.json)

### FN005001 deploy-azure-storage.json schema | Required

Update deploy-azure-storage.json schema URL

In file [./config/deploy-azure-storage.json](./config/deploy-azure-storage.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json"
}
```

File: [./config/deploy-azure-storage.json](./config/deploy-azure-storage.json)

### FN006001 package-solution.json schema | Required

Update package-solution.json schema URL

In file [./config/package-solution.json](./config/package-solution.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json"
}
```

File: [./config/package-solution.json](./config/package-solution.json)

### FN007001 serve.json schema | Required

Update serve.json schema URL

In file [./config/serve.json](./config/serve.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json"
}
```

File: [./config/serve.json](./config/serve.json)

### FN008001 tslint.json schema | Required

Update tslint.json schema URL

In file [./config/tslint.json](./config/tslint.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/tslint.schema.json"
}
```

File: [./config/tslint.json](./config/tslint.json)

### FN009001 write-manifests.json schema | Required

Update write-manifests.json schema URL

In file [./config/write-manifests.json](./config/write-manifests.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json"
}
```

File: [./config/write-manifests.json](./config/write-manifests.json)

### FN010002 .yo-rc.json isCreatingSolution | Recommended

Update isCreatingSolution in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "isCreatingSolution": true
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN010003 .yo-rc.json packageManager | Recommended

Update packageManager in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "packageManager": "npm"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN010004 .yo-rc.json componentType | Recommended

Update componentType in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "componentType": "webpart"
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN011001 Web part manifest schema | Required

Update schema in manifest

In file [src\webparts\reactProjectOnline\ReactProjectOnlineWebPart.manifest.json](src\webparts\reactProjectOnline\ReactProjectOnlineWebPart.manifest.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

File: [src\webparts\reactProjectOnline\ReactProjectOnlineWebPart.manifest.json](src\webparts\reactProjectOnline\ReactProjectOnlineWebPart.manifest.json)

### FN012001 tsconfig.json module | Required

Update module type in tsconfig.json

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN012002 tsconfig.json moduleResolution | Required

Update moduleResolution in tsconfig.json

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

File: [./tsconfig.json](./tsconfig.json)

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
npm i @microsoft/sp-core-library@1.6.0 @microsoft/sp-lodash-subset@1.6.0 @microsoft/sp-office-ui-fabric-core@1.6.0 @microsoft/sp-webpart-base@1.6.0 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33 -SE
npm i @microsoft/sp-build-web@1.6.0 @microsoft/sp-module-interfaces@1.6.0 @microsoft/sp-webpart-workbench@1.6.0 tslint-microsoft-contrib@5.0.0 @types/chai@3.4.34 @types/mocha@2.2.38 -DE
rm ./config/tslint.json
cat > ./src/index.ts << EOF
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
npm dedupe
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.6.0"
  }
}
```

```json
{
  "@microsoft/generator-sharepoint": {
    "isCreatingSolution": true
  }
}
```

```json
{
  "@microsoft/generator-sharepoint": {
    "packageManager": "npm"
  }
}
```

```json
{
  "@microsoft/generator-sharepoint": {
    "componentType": "webpart"
  }
}
```

#### [./tsconfig.json](./tsconfig.json)

```json
{
  "compilerOptions": {
    "outDir": "lib"
  }
}
```

```json
{
  "include": [
    "src/**/*.ts"
  ]
}
```

```json
{
  "exclude": [
    "node_modules",
    "lib"
  ]
}
```

```json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

#### [./config/config.json](./config/config.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json"
}
```

#### [./config/copy-assets.json](./config/copy-assets.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/copy-assets.schema.json"
}
```

#### [./config/deploy-azure-storage.json](./config/deploy-azure-storage.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json"
}
```

#### [./config/package-solution.json](./config/package-solution.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json"
}
```

#### [./config/serve.json](./config/serve.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json"
}
```

#### [./config/tslint.json](./config/tslint.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/tslint.schema.json"
}
```

#### [./config/write-manifests.json](./config/write-manifests.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json"
}
```

#### [src\webparts\reactProjectOnline\ReactProjectOnlineWebPart.manifest.json](src\webparts\reactProjectOnline\ReactProjectOnlineWebPart.manifest.json)

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```
