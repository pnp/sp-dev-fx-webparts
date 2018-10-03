# Upgrade project C:\Users\Joel.Rodrigues\Documents\GitHub\sp-dev-fx-webparts\samples\react-visio to v1.6.0

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
npm i @microsoft/sp-core-library@1.6.0 @microsoft/sp-lodash-subset@1.6.0 @microsoft/sp-office-ui-fabric-core@1.6.0 @microsoft/sp-webpart-base@1.6.0 -SE
npm i @microsoft/sp-build-web@1.6.0 @microsoft/sp-module-interfaces@1.6.0 @microsoft/sp-webpart-workbench@1.6.0 tslint-microsoft-contrib@5.0.0 -DE
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
