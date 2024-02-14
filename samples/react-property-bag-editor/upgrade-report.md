# Upgrade project react-property-bag-editor to v1.17.1

Date: 2/14/2024

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.17.1. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.17.1
```

File: [./package.json:11:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.17.1
```

File: [./package.json:12:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.17.1
```

File: [./package.json:8:3](./package.json)

### FN001034 @microsoft/sp-adaptive-card-extension-base | Optional

Install SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-adaptive-card-extension-base@1.17.1
```

File: [./package.json:8:3](./package.json)

### FN002022 @microsoft/eslint-plugin-spfx | Required

Install SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-plugin-spfx@1.17.1
```

File: [./package.json:26:3](./package.json)

### FN002023 @microsoft/eslint-config-spfx | Required

Install SharePoint Framework dev dependency package @microsoft/eslint-config-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-config-spfx@1.17.1
```

File: [./package.json:26:3](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.17.1
```

File: [./package.json:27:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.17.1
```

File: [./package.json:28:5](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.17.1"
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN002020 @microsoft/rush-stack-compiler-4.5 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-4.5

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-4.5@0.4.0
```

File: [./package.json:26:3](./package.json)

### FN002024 eslint | Required

Install SharePoint Framework dev dependency package eslint

Execute the following command:

```sh
npm i -DE eslint@8.7.0
```

File: [./package.json:26:3](./package.json)

### FN007002 serve.json initialPage | Required

Update serve.json initialPage URL

```json
{
  "initialPage": "https://{tenantDomain}/_layouts/workbench.aspx"
}
```

File: [./config/serve.json:3:3](./config/serve.json)

### FN010010 .yo-rc.json @microsoft/teams-js SDK version | Recommended

Update @microsoft/teams-js SDK version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/teams-js": "2.9.1"
    }
  }
}
```

File: [./.yo-rc.json:2:3](./.yo-rc.json)

### FN015009 config\sass.json | Required

Add file config\sass.json

Execute the following command:

```sh
cat > "config\sass.json" << EOF 
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/sass.schema.json"
}
EOF
```

File: [config\sass.json](config\sass.json)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i -SE react@17.0.1
```

File: [./package.json:21:5](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@17.0.1
```

File: [./package.json:22:5](./package.json)

### FN001022 office-ui-fabric-react | Required

Upgrade SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@7.199.1
```

File: [./package.json:20:5](./package.json)

### FN002015 @types/react | Required

Install SharePoint Framework dev dependency package @types/react

Execute the following command:

```sh
npm i -DE @types/react@17.0.45
```

File: [./package.json:26:3](./package.json)

### FN002016 @types/react-dom | Required

Install SharePoint Framework dev dependency package @types/react-dom

Execute the following command:

```sh
npm i -DE @types/react-dom@17.0.17
```

File: [./package.json:26:3](./package.json)

### FN010008 .yo-rc.json nodeVersion | Recommended

Update nodeVersion in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "nodeVersion": "16.20.0"
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN010009 .yo-rc.json @microsoft/microsoft-graph-client SDK version | Recommended

Update @microsoft/microsoft-graph-client SDK version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/microsoft-graph-client": "3.0.2"
    }
  }
}
```

File: [./.yo-rc.json:2:3](./.yo-rc.json)

### FN021003 package.json engines.node | Required

Update package.json engines.node property

```json
{
  "engines": {
    "node": ">=16.13.0 <17.0.0"
  }
}
```

File: [./package.json:6:5](./package.json)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\propertyBagDisplay\components\PropertyBagDisplay.module.scss](src\webparts\propertyBagDisplay\components\PropertyBagDisplay.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\propertyBagEditor\components\PropertyBagEditor.module.scss](src\webparts\propertyBagEditor\components\PropertyBagEditor.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\propertyBagFilteredSiteList\components\PropertyBagFilteredSiteList.module.scss](src\webparts\propertyBagFilteredSiteList\components\PropertyBagFilteredSiteList.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\propertyBagGlobalNav\components\PropertyBagGlobalNav.module.scss](src\webparts\propertyBagGlobalNav\components\PropertyBagGlobalNav.module.scss)

### FN002026 typescript | Required

Install SharePoint Framework dev dependency package typescript

Execute the following command:

```sh
npm i -DE typescript@4.5.5
```

File: [./package.json:26:3](./package.json)

### FN012020 tsconfig.json noImplicitAny | Required

Add noImplicitAny in tsconfig.json

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN007001 serve.json schema | Required

Update serve.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/spfx-serve.schema.json"
}
```

File: [./config/serve.json:1:1](./config/serve.json)

### FN001033 tslib | Required

Install SharePoint Framework dependency package tslib

Execute the following command:

```sh
npm i -SE tslib@2.3.1
```

File: [./package.json:8:3](./package.json)

### FN002007 ajv | Required

Install SharePoint Framework dev dependency package ajv

Execute the following command:

```sh
npm i -DE ajv@6.12.5
```

File: [./package.json:26:3](./package.json)

### FN002013 @types/webpack-env | Required

Install SharePoint Framework dev dependency package @types/webpack-env

Execute the following command:

```sh
npm i -DE @types/webpack-env@1.15.2
```

File: [./package.json:26:3](./package.json)

### FN002021 @rushstack/eslint-config | Required

Install SharePoint Framework dev dependency package @rushstack/eslint-config

Execute the following command:

```sh
npm i -DE @rushstack/eslint-config@2.5.1
```

File: [./package.json:26:3](./package.json)

### FN002025 eslint-plugin-react-hooks | Required

Install SharePoint Framework dev dependency package eslint-plugin-react-hooks

Execute the following command:

```sh
npm i -DE eslint-plugin-react-hooks@4.3.0
```

File: [./package.json:26:3](./package.json)

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
      "mpnId": "Undefined-1.15.0"
    }
  }
}
```

File: [./config/package-solution.json:2:3](./config/package-solution.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-4.5/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json:1:1](./tsconfig.json)

### FN015003 tslint.json | Required

Remove file tslint.json

Execute the following command:

```sh
rm "tslint.json"
```

File: [tslint.json](tslint.json)

### FN015008 .eslintrc.js | Required

Add file .eslintrc.js

Execute the following command:

```sh
cat > ".eslintrc.js" << EOF 
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname }
};
EOF
```

File: [.eslintrc.js](.eslintrc.js)

### FN023002 .gitignore '.heft' folder | Required

To .gitignore add the '.heft' folder


File: [./.gitignore](./.gitignore)

### FN002009 @microsoft/sp-tslint-rules | Required

Install SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.14.0
```

File: [./package.json:26:3](./package.json)

### FN006005 package-solution.json metadata | Required

In package-solution.json add metadata section

```json
{
  "solution": {
    "metadata": {
      "shortDescription": {
        "default": "react-property-bag-editor description"
      },
      "longDescription": {
        "default": "react-property-bag-editor description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    }
  }
}
```

File: [./config/package-solution.json:2:3](./config/package-solution.json)

### FN006006 package-solution.json features | Required

In package-solution.json add features for components

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagDisplayWebPart Feature",
        "description": "The feature that activates PropertyBagDisplayWebPart from the react-property-bag-editor solution.",
        "id": "fa63037d-d7bd-4d52-894a-b40127773283",
        "version": "1.0.0.0",
        "componentIds": [
          "fa63037d-d7bd-4d52-894a-b40127773283"
        ]
      }
    ]
  }
}
```

File: [./config/package-solution.json:2:3](./config/package-solution.json)

### FN006006 package-solution.json features | Required

In package-solution.json add features for components

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagEditorWebPart Feature",
        "description": "The feature that activates PropertyBagEditorWebPart from the react-property-bag-editor solution.",
        "id": "f3ac8a07-2a9b-47a1-8a7e-a093cad63f98",
        "version": "1.0.0.0",
        "componentIds": [
          "f3ac8a07-2a9b-47a1-8a7e-a093cad63f98"
        ]
      }
    ]
  }
}
```

File: [./config/package-solution.json:2:3](./config/package-solution.json)

### FN006006 package-solution.json features | Required

In package-solution.json add features for components

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagFilteredSiteListWebPart Feature",
        "description": "The feature that activates PropertyBagFilteredSiteListWebPart from the react-property-bag-editor solution.",
        "id": "b81a6789-e93b-4be5-baa7-59f34004694a",
        "version": "1.0.0.0",
        "componentIds": [
          "b81a6789-e93b-4be5-baa7-59f34004694a"
        ]
      }
    ]
  }
}
```

File: [./config/package-solution.json:2:3](./config/package-solution.json)

### FN006006 package-solution.json features | Required

In package-solution.json add features for components

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagGlobalNavWebPart Feature",
        "description": "The feature that activates PropertyBagGlobalNavWebPart from the react-property-bag-editor solution.",
        "id": "8634e32b-eda4-483d-8fe9-5f2075339eb8",
        "version": "1.0.0.0",
        "componentIds": [
          "8634e32b-eda4-483d-8fe9-5f2075339eb8"
        ]
      }
    ]
  }
}
```

File: [./config/package-solution.json:2:3](./config/package-solution.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Remove SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm un -D @microsoft/sp-webpart-workbench
```

File: [./package.json:29:5](./package.json)

### FN007003 serve.json api | Required

From serve.json remove the api property

```json

```

File: [./config/serve.json:5:3](./config/serve.json)

### FN015007 config\copy-assets.json | Required

Remove file config\copy-assets.json

Execute the following command:

```sh
rm "config\copy-assets.json"
```

File: [config\copy-assets.json](config\copy-assets.json)

### FN005002 deploy-azure-storage.json workingDir | Required

Update deploy-azure-storage.json workingDir

```json
{
  "workingDir": "./release/assets/"
}
```

File: [./config/deploy-azure-storage.json:2:3](./config/deploy-azure-storage.json)

### FN023001 .gitignore 'release' folder | Required

To .gitignore add the 'release' folder


File: [./.gitignore](./.gitignore)

### FN002004 gulp | Required

Upgrade SharePoint Framework dev dependency package gulp

Execute the following command:

```sh
npm i -DE gulp@4.0.2
```

File: [./package.json:30:5](./package.json)

### FN002005 @types/chai | Required

Remove SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm un -D @types/chai
```

File: [./package.json:31:5](./package.json)

### FN002006 @types/mocha | Required

Remove SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm un -D @types/mocha
```

File: [./package.json:32:5](./package.json)

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

File: [./tsconfig.json:2:22](./tsconfig.json)

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

File: [./tslint.json:1:1](./tslint.json)

### FN021002 engines | Required

Remove package.json property

```json
{
  "engines": "undefined"
}
```

File: [./package.json:5:3](./package.json)

### FN001005 @types/react | Required

Remove SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm un -S @types/react
```

File: [./package.json:13:5](./package.json)

### FN001006 @types/react-dom | Required

Remove SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm un -S @types/react-dom
```

File: [./package.json:17:5](./package.json)

### FN001007 @types/webpack-env | Required

Remove SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm un -S @types/webpack-env
```

File: [./package.json:18:5](./package.json)

### FN002014 @types/es6-promise | Required

Install SharePoint Framework dev dependency package @types/es6-promise

Execute the following command:

```sh
npm i -DE @types/es6-promise@0.0.33
```

File: [./package.json:26:3](./package.json)

### FN012012 tsconfig.json include property | Required

Add to the tsconfig.json include property

```json
{
  "include": [
    "src/**/*.tsx"
  ]
}
```

File: [./tsconfig.json:1:1](./tsconfig.json)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.ts:5:1](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.ts)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.ts:5:1](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.ts)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle, PropertyPaneChoiceGroup } from "@microsoft/sp-property-pane";
```

File: [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.ts:4:1](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.ts)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.ts:4:1](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.ts)

### FN020001 @types/react | Required

Add resolution for package @types/react

```json
{
  "resolutions": {
    "@types/react": "16.8.8"
  }
}
```

File: [./package.json:1:1](./package.json)

### FN021001 main | Required

Add package.json property

```json
{
  "main": "lib/index.js"
}
```

File: [./package.json:1:1](./package.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json:1:1](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json:1:1](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json:1:1](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json:1:1](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json)

### FN012014 tsconfig.json compiler options inlineSources | Required

Update tsconfig.json inlineSources value

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012015 tsconfig.json compiler options strictNullChecks | Required

Update tsconfig.json strictNullChecks value

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012016 tsconfig.json compiler options noUnusedLocals | Required

Update tsconfig.json noUnusedLocals value

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN018001 Web part Microsoft Teams tab resources folder | Optional

Create folder for Microsoft Teams tab resources

Execute the following command:

```sh
mkdir "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor/teams"
```

File: [teams](teams)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\fa63037d-d7bd-4d52-894a-b40127773283_outline.png"
```

File: [teams\fa63037d-d7bd-4d52-894a-b40127773283_outline.png](teams\fa63037d-d7bd-4d52-894a-b40127773283_outline.png)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\f3ac8a07-2a9b-47a1-8a7e-a093cad63f98_outline.png"
```

File: [teams\f3ac8a07-2a9b-47a1-8a7e-a093cad63f98_outline.png](teams\f3ac8a07-2a9b-47a1-8a7e-a093cad63f98_outline.png)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\b81a6789-e93b-4be5-baa7-59f34004694a_outline.png"
```

File: [teams\b81a6789-e93b-4be5-baa7-59f34004694a_outline.png](teams\b81a6789-e93b-4be5-baa7-59f34004694a_outline.png)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\8634e32b-eda4-483d-8fe9-5f2075339eb8_outline.png"
```

File: [teams\8634e32b-eda4-483d-8fe9-5f2075339eb8_outline.png](teams\8634e32b-eda4-483d-8fe9-5f2075339eb8_outline.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\fa63037d-d7bd-4d52-894a-b40127773283_color.png"
```

File: [teams\fa63037d-d7bd-4d52-894a-b40127773283_color.png](teams\fa63037d-d7bd-4d52-894a-b40127773283_color.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\f3ac8a07-2a9b-47a1-8a7e-a093cad63f98_color.png"
```

File: [teams\f3ac8a07-2a9b-47a1-8a7e-a093cad63f98_color.png](teams\f3ac8a07-2a9b-47a1-8a7e-a093cad63f98_color.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\b81a6789-e93b-4be5-baa7-59f34004694a_color.png"
```

File: [teams\b81a6789-e93b-4be5-baa7-59f34004694a_color.png](teams\b81a6789-e93b-4be5-baa7-59f34004694a_color.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\rgove\AppData\Roaming\npm\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor\teams\8634e32b-eda4-483d-8fe9-5f2075339eb8_color.png"
```

File: [teams\8634e32b-eda4-483d-8fe9-5f2075339eb8_color.png](teams\8634e32b-eda4-483d-8fe9-5f2075339eb8_color.png)

### FN006003 package-solution.json isDomainIsolated | Required

Update package-solution.json isDomainIsolated

```json
{
  "solution": {
    "isDomainIsolated": false
  }
}
```

File: [./config/package-solution.json:2:15](./config/package-solution.json)

### FN010007 .yo-rc.json isDomainIsolated | Recommended

Update isDomainIsolated in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "isDomainIsolated": false
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN019001 tslint.json rulesDirectory | Required

Remove rulesDirectory from tslint.json

```json
{
  "rulesDirectory": []
}
```

File: [./tslint.json:2:5](./tslint.json)

### FN002008 tslint-microsoft-contrib | Required

Install SharePoint Framework dev dependency package tslint-microsoft-contrib

Execute the following command:

```sh
npm i -DE tslint-microsoft-contrib@5.0.0
```

File: [./package.json:26:3](./package.json)

### FN012011 tsconfig.json compiler options outDir | Required

Update tsconfig.json outDir value

```json
{
  "compilerOptions": {
    "outDir": "lib"
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012013 tsconfig.json exclude property | Required

Update tsconfig.json exclude property

```json
{
  "exclude": [
    "node_modules",
    "lib"
  ]
}
```

File: [./tsconfig.json:1:1](./tsconfig.json)

### FN015004 config\tslint.json | Required

Remove file config\tslint.json

Execute the following command:

```sh
rm "config\tslint.json"
```

File: [config\tslint.json](config\tslint.json)

### FN015005 src\index.ts | Required

Add file src\index.ts

Execute the following command:

```sh
cat > "src\index.ts" << EOF 
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
```

File: [src\index.ts](src\index.ts)

### FN001010 @types/es6-promise | Required

Install SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm i -SE @types/es6-promise@0.0.33
```

File: [./package.json:8:3](./package.json)

### FN003001 config.json schema | Required

Update config.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json"
}
```

File: [./config/config.json:1:1](./config/config.json)

### FN005001 deploy-azure-storage.json schema | Required

Update deploy-azure-storage.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json"
}
```

File: [./config/deploy-azure-storage.json:1:1](./config/deploy-azure-storage.json)

### FN006001 package-solution.json schema | Required

Update package-solution.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json"
}
```

File: [./config/package-solution.json:1:1](./config/package-solution.json)

### FN009001 write-manifests.json schema | Required

Update write-manifests.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json"
}
```

File: [./config/write-manifests.json:1:1](./config/write-manifests.json)

### FN010002 .yo-rc.json isCreatingSolution | Recommended

Update isCreatingSolution in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "isCreatingSolution": true
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN010003 .yo-rc.json packageManager | Recommended

Update packageManager in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "packageManager": "npm"
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN010004 .yo-rc.json componentType | Recommended

Update componentType in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "componentType": "webpart"
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN011001 Web part manifest schema | Required

Update schema in manifest

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

File: [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json:2:3](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json)

### FN011001 Web part manifest schema | Required

Update schema in manifest

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

File: [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json:2:3](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json)

### FN011001 Web part manifest schema | Required

Update schema in manifest

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

File: [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json:2:3](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json)

### FN011001 Web part manifest schema | Required

Update schema in manifest

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

File: [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json:2:3](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json)

### FN012001 tsconfig.json module | Required

Update module type in tsconfig.json

```json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```

File: [./tsconfig.json:5:5](./tsconfig.json)

### FN012002 tsconfig.json moduleResolution | Required

Update moduleResolution in tsconfig.json

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN001015 @types/react-addons-shallow-compare | Required

Remove SharePoint Framework dependency package @types/react-addons-shallow-compare

Execute the following command:

```sh
npm un -S @types/react-addons-shallow-compare
```

File: [./package.json:14:5](./package.json)

### FN001016 @types/react-addons-update | Required

Remove SharePoint Framework dependency package @types/react-addons-update

Execute the following command:

```sh
npm un -S @types/react-addons-update
```

File: [./package.json:16:5](./package.json)

### FN001017 @types/react-addons-test-utils | Required

Remove SharePoint Framework dependency package @types/react-addons-test-utils

Execute the following command:

```sh
npm un -S @types/react-addons-test-utils
```

File: [./package.json:15:5](./package.json)

### FN006002 package-solution.json includeClientSideAssets | Required

Update package-solution.json includeClientSideAssets

```json
{
  "solution": {
    "includeClientSideAssets": true
  }
}
```

File: [./config/package-solution.json:2:15](./config/package-solution.json)

### FN012003 tsconfig.json skipLibCheck | Required

Update skipLibCheck in tsconfig.json

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012004 tsconfig.json typeRoots ./node_modules/@types | Required

Add ./node_modules/@types to typeRoots in tsconfig.json

```json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types"
    ]
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012005 tsconfig.json typeRoots ./node_modules/@microsoft | Required

Add ./node_modules/@microsoft to typeRoots in tsconfig.json

```json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@microsoft"
    ]
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012007 tsconfig.json es5 lib | Required

Add es5 lib in tsconfig.json

```json
{
  "compilerOptions": {
    "lib": [
      "es5"
    ]
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012008 tsconfig.json dom lib | Required

Add dom lib in tsconfig.json

```json
{
  "compilerOptions": {
    "lib": [
      "dom"
    ]
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN012009 tsconfig.json es2015.collection lib | Required

Add es2015.collection lib in tsconfig.json

```json
{
  "compilerOptions": {
    "lib": [
      "es2015.collection"
    ]
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN013001 gulpfile.js ms-Grid sass suppression | Recommended

Add suppression for ms-Grid sass warning

```js
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
```

File: [./gulpfile.js](./gulpfile.js)

### FN014002 .vscode/extensions.json | Recommended

In the .vscode folder, add the extensions.json file

```json
{
  "recommendations": [
    "msjsdiag.debugger-for-chrome"
  ]
}
```

File: [.vscode/extensions.json](.vscode/extensions.json)

### FN014003 .vscode/launch.json | Recommended

In the .vscode folder, add the launch.json file

```json
{
  /**
    Install Chrome Debugger Extension for Visual Studio Code
    to debug your components with the Chrome browser:
    https://aka.ms/spfx-debugger-extensions
    */
  "version": "0.2.0",
  "configurations": [{
      "name": "Local workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://localhost:4321/temp/workbench.html",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ]
    },
    {
      "name": "Hosted workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://enter-your-SharePoint-site/_layouts/workbench.aspx",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
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

### FN003002 config.json version | Required

Update config.json version number

```json
{
  "version": "2.0"
}
```

File: [./config/config.json:1:1](./config/config.json)

### FN003003 config.json bundles | Required

In config.json add the 'bundles' property

```json
{
  "bundles": {
    "property-bag-editor-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagEditor/PropertyBagEditorWebPart.js",
          "manifest": "./src/webparts/propertyBagEditor/PropertyBagEditorWebPart.manifest.json"
        }
      ]
    },
    "property-bag-display-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.js",
          "manifest": "./src/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.manifest.json"
        }
      ]
    },
    "property-bag-filtered-site-list-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.js",
          "manifest": "./src/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.manifest.json"
        }
      ]
    },
    "property-bag-global-nav-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.js",
          "manifest": "./src/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.manifest.json"
        }
      ]
    }
  }
}
```

File: [./config/config.json:1:1](./config/config.json)

### FN003004 config.json entries | Required

Remove the "entries" property in ./config/config.json

```json
{
  "entries": [
    {
      "entry": "./lib/webparts/propertyBagEditor/PropertyBagEditorWebPart.js",
      "manifest": "./src/webparts/propertyBagEditor/PropertyBagEditorWebPart.manifest.json",
      "outputPath": "./dist/property-bag-editor.bundle.js"
    },
    {
      "entry": "./lib/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.js",
      "manifest": "./src/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.manifest.json",
      "outputPath": "./dist/property-bag-display.bundle.js"
    },
    {
      "entry": "./lib/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.js",
      "manifest": "./src/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.manifest.json",
      "outputPath": "./dist/property-bag-filtered-site-list.bundle.js"
    },
    {
      "entry": "./lib/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.js",
      "manifest": "./src/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.manifest.json",
      "outputPath": "./dist/property-bag-global-nav.bundle.js"
    }
  ]
}
```

File: [./config/config.json:2:3](./config/config.json)

### FN003005 Update path of the localized resource | Required

In the config.json file, update the path of the localized resource

```json
{
  "localizedResources": {
    "propertyBagEditorStrings": "lib/webparts/propertyBagEditor/loc/{locale}.js"
  }
}
```

File: [./config/config.json:53:5](./config/config.json)

### FN003005 Update path of the localized resource | Required

In the config.json file, update the path of the localized resource

```json
{
  "localizedResources": {
    "propertyBagDisplayStrings": "lib/webparts/propertyBagDisplay/loc/{locale}.js"
  }
}
```

File: [./config/config.json:54:5](./config/config.json)

### FN003005 Update path of the localized resource | Required

In the config.json file, update the path of the localized resource

```json
{
  "localizedResources": {
    "propertyBagFilteredSiteListStrings": "lib/webparts/propertyBagFilteredSiteList/loc/{locale}.js"
  }
}
```

File: [./config/config.json:55:5](./config/config.json)

### FN003005 Update path of the localized resource | Required

In the config.json file, update the path of the localized resource

```json
{
  "localizedResources": {
    "propertyBagGlobalNavStrings": "lib/webparts/propertyBagGlobalNav/loc/{locale}.js"
  }
}
```

File: [./config/config.json:56:5](./config/config.json)

### FN001018 @microsoft/sp-client-base | Required

Remove SharePoint Framework dependency package @microsoft/sp-client-base

Execute the following command:

```sh
npm un -S @microsoft/sp-client-base
```

File: [./package.json:9:5](./package.json)

### FN010005 .yo-rc.json environment | Recommended

Update environment in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "environment": "spo"
  }
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN010006 .yo-rc.json framework | Recommended

Remove framework in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "framework": ""
  }
}
```

File: [./.yo-rc.json:5:5](./.yo-rc.json)

### FN011009 Web part manifest safeWithCustomScriptDisabled | Required

Update the safeWithCustomScriptDisabled property in the manifest

```json
{
  "safeWithCustomScriptDisabled": false
}
```

File: [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json:1:1](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json)

### FN011009 Web part manifest safeWithCustomScriptDisabled | Required

Update the safeWithCustomScriptDisabled property in the manifest

```json
{
  "safeWithCustomScriptDisabled": false
}
```

File: [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json:1:1](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json)

### FN011009 Web part manifest safeWithCustomScriptDisabled | Required

Update the safeWithCustomScriptDisabled property in the manifest

```json
{
  "safeWithCustomScriptDisabled": false
}
```

File: [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json:1:1](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json)

### FN011009 Web part manifest safeWithCustomScriptDisabled | Required

Update the safeWithCustomScriptDisabled property in the manifest

```json
{
  "safeWithCustomScriptDisabled": false
}
```

File: [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json:1:1](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json)

### FN011010 Web part manifest version | Optional

Update version in manifest to use automated component versioning

```json
{
  "version": "*",
}
```

File: [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json:6:3](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json)

### FN011010 Web part manifest version | Optional

Update version in manifest to use automated component versioning

```json
{
  "version": "*",
}
```

File: [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json:7:3](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json)

### FN011010 Web part manifest version | Optional

Update version in manifest to use automated component versioning

```json
{
  "version": "*",
}
```

File: [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json:6:3](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json)

### FN011010 Web part manifest version | Optional

Update version in manifest to use automated component versioning

```json
{
  "version": "*",
}
```

File: [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json:6:3](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json)

### FN012010 tsconfig.json compiler options experimental decorators | Required

Enable tsconfig.json experimental decorators

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

File: [./tsconfig.json:2:22](./tsconfig.json)

### FN014005 Missing vscode settings file | Required

Create file ./.vscode/settings.json with provided content

```json
// Place your settings in this file to overwrite default and user settings.
{
  // Configure glob patterns for excluding files and folders in the file explorer.
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/bower_components": true,
    "**/coverage": true,
    "**/lib-amd": true,
    "src/**/*.scss.ts": true
  },
  "typescript.tsdk": ".\node_modules\typescript\lib",
  "json.schemas": [
    {
      "fileMatch": [
        "/config/config.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-web/lib/schemas/config.schema.json"
    },
    {
      "fileMatch": [
        "/config/copy-assets.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/copyAssets/copy-assets.schema.json"
    },
    {
      "fileMatch": [
        "/config/deploy-azure-storage.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/deployAzureStorage/deploy-azure-storage.schema.json"
    },
    {
      "fileMatch": [
        "/config/package-solution.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/packageSolution/package-solution.schema.json"
    },
    {
      "fileMatch": [
        "/config/serve.json"
      ],
      "url": "./node_modules/@microsoft/gulp-core-build-serve/lib/serve.schema.json"
    },
    {
      "fileMatch": [
        "/config/tslint.json"
      ],
      "url": "./node_modules/@microsoft/gulp-core-build-typescript/lib/schemas/tslint.schema.json"
    },
    {
      "fileMatch": [
        "/config/write-manifests.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/writeManifests/write-manifests.schema.json"
    },
    {
      "fileMatch": [
        "/config/configure-webpack.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/configureWebpack/configure-webpack.schema.json"
    },
    {
      "fileMatch": [
        "/config/configure-external-bundling-webpack.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/configureWebpack/configure-webpack-external-bundling.schema.json"
    },
    {
      "fileMatch": [
        "/copy-static-assets.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/copyStaticAssets/copy-static-assets.schema.json"
    }
  ]
}
```

File: [./.vscode/settings.json](./.vscode/settings.json)

### FN015001 typings\tsd.d.ts | Required

Remove file typings\tsd.d.ts

Execute the following command:

```sh
rm "typings\tsd.d.ts"
```

File: [typings\tsd.d.ts](typings\tsd.d.ts)

### FN015002 typings\@ms\odsp.d.ts | Required

Remove file typings\@ms\odsp.d.ts

Execute the following command:

```sh
rm "typings\@ms\odsp.d.ts"
```

File: [typings\@ms\odsp.d.ts](typings\@ms\odsp.d.ts)

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
npm un -S @types/react @types/react-dom @types/webpack-env @types/react-addons-shallow-compare @types/react-addons-update @types/react-addons-test-utils @microsoft/sp-client-base
npm un -D @microsoft/sp-webpart-workbench @types/chai @types/mocha
npm i -SE @microsoft/sp-core-library@1.17.1 @microsoft/sp-webpart-base@1.17.1 @microsoft/sp-property-pane@1.17.1 @microsoft/sp-adaptive-card-extension-base@1.17.1 react@17.0.1 react-dom@17.0.1 office-ui-fabric-react@7.199.1 tslib@2.3.1 @types/es6-promise@0.0.33
npm i -DE @microsoft/eslint-plugin-spfx@1.17.1 @microsoft/eslint-config-spfx@1.17.1 @microsoft/sp-build-web@1.17.1 @microsoft/sp-module-interfaces@1.17.1 @microsoft/rush-stack-compiler-4.5@0.4.0 eslint@8.7.0 @types/react@17.0.45 @types/react-dom@17.0.17 typescript@4.5.5 ajv@6.12.5 @types/webpack-env@1.15.2 @rushstack/eslint-config@2.5.1 eslint-plugin-react-hooks@4.3.0 @microsoft/sp-tslint-rules@1.14.0 gulp@4.0.2 @types/es6-promise@0.0.33 tslint-microsoft-contrib@5.0.0
npm dedupe
cat > "config\sass.json" << EOF 
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/sass.schema.json"
}
EOF
rm "tslint.json"
cat > ".eslintrc.js" << EOF 
require('@rushstack/eslint-config/patch/modern-module-resolution');
module.exports = {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname }
};
EOF
rm "config\copy-assets.json"
mkdir "C:\Users\rgove\github\sp-dev-fx-webparts\samples\react-property-bag-editor/teams"
rm "config\tslint.json"
cat > "src\index.ts" << EOF 
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
rm "typings\tsd.d.ts"
rm "typings\@ms\odsp.d.ts"
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.17.1"
  }
}
```

Update @microsoft/teams-js SDK version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/teams-js": "2.9.1"
    }
  }
}
```

Update nodeVersion in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "nodeVersion": "16.20.0"
  }
}
```

Update @microsoft/microsoft-graph-client SDK version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/microsoft-graph-client": "3.0.2"
    }
  }
}
```

Update isDomainIsolated in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "isDomainIsolated": false
  }
}
```

Update isCreatingSolution in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "isCreatingSolution": true
  }
}
```

Update packageManager in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "packageManager": "npm"
  }
}
```

Update componentType in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "componentType": "webpart"
  }
}
```

Update environment in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "environment": "spo"
  }
}
```

Remove framework in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "framework": ""
  }
}
```

#### [./config/serve.json](./config/serve.json)

Update serve.json initialPage URL:

```json
{
  "initialPage": "https://{tenantDomain}/_layouts/workbench.aspx"
}
```

Update serve.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/spfx-serve.schema.json"
}
```

From serve.json remove the api property:

```json

```

#### [./package.json](./package.json)

Update package.json engines.node property:

```json
{
  "engines": {
    "node": ">=16.13.0 <17.0.0"
  }
}
```

Remove package.json property:

```json
{
  "engines": "undefined"
}
```

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

#### [src\webparts\propertyBagDisplay\components\PropertyBagDisplay.module.scss](src\webparts\propertyBagDisplay\components\PropertyBagDisplay.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src\webparts\propertyBagEditor\components\PropertyBagEditor.module.scss](src\webparts\propertyBagEditor\components\PropertyBagEditor.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src\webparts\propertyBagFilteredSiteList\components\PropertyBagFilteredSiteList.module.scss](src\webparts\propertyBagFilteredSiteList\components\PropertyBagFilteredSiteList.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src\webparts\propertyBagGlobalNav\components\PropertyBagGlobalNav.module.scss](src\webparts\propertyBagGlobalNav\components\PropertyBagGlobalNav.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [./tsconfig.json](./tsconfig.json)

Add noImplicitAny in tsconfig.json:

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
}
```

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-4.5/includes/tsconfig-web.json"
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

Add to the tsconfig.json include property:

```json
{
  "include": [
    "src/**/*.tsx"
  ]
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

Update tsconfig.json outDir value:

```json
{
  "compilerOptions": {
    "outDir": "lib"
  }
}
```

Update tsconfig.json exclude property:

```json
{
  "exclude": [
    "node_modules",
    "lib"
  ]
}
```

Update module type in tsconfig.json:

```json
{
  "compilerOptions": {
    "module": "esnext"
  }
}
```

Update moduleResolution in tsconfig.json:

```json
{
  "compilerOptions": {
    "moduleResolution": "node"
  }
}
```

Update skipLibCheck in tsconfig.json:

```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

Add ./node_modules/@types to typeRoots in tsconfig.json:

```json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@types"
    ]
  }
}
```

Add ./node_modules/@microsoft to typeRoots in tsconfig.json:

```json
{
  "compilerOptions": {
    "typeRoots": [
      "./node_modules/@microsoft"
    ]
  }
}
```

Add es5 lib in tsconfig.json:

```json
{
  "compilerOptions": {
    "lib": [
      "es5"
    ]
  }
}
```

Add dom lib in tsconfig.json:

```json
{
  "compilerOptions": {
    "lib": [
      "dom"
    ]
  }
}
```

Add es2015.collection lib in tsconfig.json:

```json
{
  "compilerOptions": {
    "lib": [
      "es2015.collection"
    ]
  }
}
```

Enable tsconfig.json experimental decorators:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

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
      "mpnId": "Undefined-1.15.0"
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
        "default": "react-property-bag-editor description"
      },
      "longDescription": {
        "default": "react-property-bag-editor description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    }
  }
}
```

In package-solution.json add features for components:

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagDisplayWebPart Feature",
        "description": "The feature that activates PropertyBagDisplayWebPart from the react-property-bag-editor solution.",
        "id": "fa63037d-d7bd-4d52-894a-b40127773283",
        "version": "1.0.0.0",
        "componentIds": [
          "fa63037d-d7bd-4d52-894a-b40127773283"
        ]
      }
    ]
  }
}
```

In package-solution.json add features for components:

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagEditorWebPart Feature",
        "description": "The feature that activates PropertyBagEditorWebPart from the react-property-bag-editor solution.",
        "id": "f3ac8a07-2a9b-47a1-8a7e-a093cad63f98",
        "version": "1.0.0.0",
        "componentIds": [
          "f3ac8a07-2a9b-47a1-8a7e-a093cad63f98"
        ]
      }
    ]
  }
}
```

In package-solution.json add features for components:

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagFilteredSiteListWebPart Feature",
        "description": "The feature that activates PropertyBagFilteredSiteListWebPart from the react-property-bag-editor solution.",
        "id": "b81a6789-e93b-4be5-baa7-59f34004694a",
        "version": "1.0.0.0",
        "componentIds": [
          "b81a6789-e93b-4be5-baa7-59f34004694a"
        ]
      }
    ]
  }
}
```

In package-solution.json add features for components:

```json
{
  "solution": {
    "features": [
      {
        "title": "react-property-bag-editor PropertyBagGlobalNavWebPart Feature",
        "description": "The feature that activates PropertyBagGlobalNavWebPart from the react-property-bag-editor solution.",
        "id": "8634e32b-eda4-483d-8fe9-5f2075339eb8",
        "version": "1.0.0.0",
        "componentIds": [
          "8634e32b-eda4-483d-8fe9-5f2075339eb8"
        ]
      }
    ]
  }
}
```

Update package-solution.json isDomainIsolated:

```json
{
  "solution": {
    "isDomainIsolated": false
  }
}
```

Update package-solution.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/package-solution.schema.json"
}
```

Update package-solution.json includeClientSideAssets:

```json
{
  "solution": {
    "includeClientSideAssets": true
  }
}
```

#### [./.gitignore](./.gitignore)

To .gitignore add the '.heft' folder:

```text
.heft
```

To .gitignore add the 'release' folder:

```text
release
```

#### [./config/deploy-azure-storage.json](./config/deploy-azure-storage.json)

Update deploy-azure-storage.json workingDir:

```json
{
  "workingDir": "./release/assets/"
}
```

Update deploy-azure-storage.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json"
}
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

Add suppression for ms-Grid sass warning:

```js
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);
```

#### [./tslint.json](./tslint.json)

Update tslint.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/sp-tslint-rules/base-tslint.json"
}
```

Remove rulesDirectory from tslint.json:

```json
{
  "rulesDirectory": []
}
```

#### [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.ts](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

#### [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.ts](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

#### [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.ts](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle, PropertyPaneChoiceGroup } from "@microsoft/sp-property-pane";
```

#### [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.ts](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

#### [src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json](src\webparts\propertyBagDisplay\PropertyBagDisplayWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

Update schema in manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

Update the safeWithCustomScriptDisabled property in the manifest:

```json
{
  "safeWithCustomScriptDisabled": false
}
```

Update version in manifest to use automated component versioning:

```json
{
  "version": "*",
}
```

#### [src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json](src\webparts\propertyBagEditor\PropertyBagEditorWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

Update schema in manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

Update the safeWithCustomScriptDisabled property in the manifest:

```json
{
  "safeWithCustomScriptDisabled": false
}
```

Update version in manifest to use automated component versioning:

```json
{
  "version": "*",
}
```

#### [src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json](src\webparts\propertyBagFilteredSiteList\PropertyBagFilteredSiteListWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

Update schema in manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

Update the safeWithCustomScriptDisabled property in the manifest:

```json
{
  "safeWithCustomScriptDisabled": false
}
```

Update version in manifest to use automated component versioning:

```json
{
  "version": "*",
}
```

#### [src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json](src\webparts\propertyBagGlobalNav\PropertyBagGlobalNavWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

Update schema in manifest:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

Update the safeWithCustomScriptDisabled property in the manifest:

```json
{
  "safeWithCustomScriptDisabled": false
}
```

Update version in manifest to use automated component versioning:

```json
{
  "version": "*",
}
```

#### [./config/config.json](./config/config.json)

Update config.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json"
}
```

Update config.json version number:

```json
{
  "version": "2.0"
}
```

In config.json add the 'bundles' property:

```json
{
  "bundles": {
    "property-bag-editor-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagEditor/PropertyBagEditorWebPart.js",
          "manifest": "./src/webparts/propertyBagEditor/PropertyBagEditorWebPart.manifest.json"
        }
      ]
    },
    "property-bag-display-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.js",
          "manifest": "./src/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.manifest.json"
        }
      ]
    },
    "property-bag-filtered-site-list-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.js",
          "manifest": "./src/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.manifest.json"
        }
      ]
    },
    "property-bag-global-nav-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.js",
          "manifest": "./src/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.manifest.json"
        }
      ]
    }
  }
}
```

Remove the "entries" property in ./config/config.json:

```json
{
  "entries": [
    {
      "entry": "./lib/webparts/propertyBagEditor/PropertyBagEditorWebPart.js",
      "manifest": "./src/webparts/propertyBagEditor/PropertyBagEditorWebPart.manifest.json",
      "outputPath": "./dist/property-bag-editor.bundle.js"
    },
    {
      "entry": "./lib/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.js",
      "manifest": "./src/webparts/propertyBagDisplay/PropertyBagDisplayWebPart.manifest.json",
      "outputPath": "./dist/property-bag-display.bundle.js"
    },
    {
      "entry": "./lib/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.js",
      "manifest": "./src/webparts/propertyBagFilteredSiteList/PropertyBagFilteredSiteListWebPart.manifest.json",
      "outputPath": "./dist/property-bag-filtered-site-list.bundle.js"
    },
    {
      "entry": "./lib/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.js",
      "manifest": "./src/webparts/propertyBagGlobalNav/PropertyBagGlobalNavWebPart.manifest.json",
      "outputPath": "./dist/property-bag-global-nav.bundle.js"
    }
  ]
}
```

In the config.json file, update the path of the localized resource:

```json
{
  "localizedResources": {
    "propertyBagEditorStrings": "lib/webparts/propertyBagEditor/loc/{locale}.js"
  }
}
```

In the config.json file, update the path of the localized resource:

```json
{
  "localizedResources": {
    "propertyBagDisplayStrings": "lib/webparts/propertyBagDisplay/loc/{locale}.js"
  }
}
```

In the config.json file, update the path of the localized resource:

```json
{
  "localizedResources": {
    "propertyBagFilteredSiteListStrings": "lib/webparts/propertyBagFilteredSiteList/loc/{locale}.js"
  }
}
```

In the config.json file, update the path of the localized resource:

```json
{
  "localizedResources": {
    "propertyBagGlobalNavStrings": "lib/webparts/propertyBagGlobalNav/loc/{locale}.js"
  }
}
```

#### [./config/write-manifests.json](./config/write-manifests.json)

Update write-manifests.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/write-manifests.schema.json"
}
```

#### [.vscode/extensions.json](.vscode/extensions.json)

In the .vscode folder, add the extensions.json file:

```json
{
  "recommendations": [
    "msjsdiag.debugger-for-chrome"
  ]
}
```

#### [.vscode/launch.json](.vscode/launch.json)

In the .vscode folder, add the launch.json file:

```json
{
  /**
    Install Chrome Debugger Extension for Visual Studio Code
    to debug your components with the Chrome browser:
    https://aka.ms/spfx-debugger-extensions
    */
  "version": "0.2.0",
  "configurations": [{
      "name": "Local workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://localhost:4321/temp/workbench.html",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
        "webpack:///../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../src/*": "${webRoot}/src/*",
        "webpack:///../../../../../src/*": "${webRoot}/src/*"
      },
      "runtimeArgs": [
        "--remote-debugging-port=9222"
      ]
    },
    {
      "name": "Hosted workbench",
      "type": "chrome",
      "request": "launch",
      "url": "https://enter-your-SharePoint-site/_layouts/workbench.aspx",
      "webRoot": "${workspaceRoot}",
      "sourceMaps": true,
      "sourceMapPathOverrides": {
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

#### [./.vscode/settings.json](./.vscode/settings.json)

Create file ./.vscode/settings.json with provided content:

```json
// Place your settings in this file to overwrite default and user settings.
{
  // Configure glob patterns for excluding files and folders in the file explorer.
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/bower_components": true,
    "**/coverage": true,
    "**/lib-amd": true,
    "src/**/*.scss.ts": true
  },
  "typescript.tsdk": ".\node_modules\typescript\lib",
  "json.schemas": [
    {
      "fileMatch": [
        "/config/config.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-web/lib/schemas/config.schema.json"
    },
    {
      "fileMatch": [
        "/config/copy-assets.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/copyAssets/copy-assets.schema.json"
    },
    {
      "fileMatch": [
        "/config/deploy-azure-storage.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/deployAzureStorage/deploy-azure-storage.schema.json"
    },
    {
      "fileMatch": [
        "/config/package-solution.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/packageSolution/package-solution.schema.json"
    },
    {
      "fileMatch": [
        "/config/serve.json"
      ],
      "url": "./node_modules/@microsoft/gulp-core-build-serve/lib/serve.schema.json"
    },
    {
      "fileMatch": [
        "/config/tslint.json"
      ],
      "url": "./node_modules/@microsoft/gulp-core-build-typescript/lib/schemas/tslint.schema.json"
    },
    {
      "fileMatch": [
        "/config/write-manifests.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/writeManifests/write-manifests.schema.json"
    },
    {
      "fileMatch": [
        "/config/configure-webpack.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/configureWebpack/configure-webpack.schema.json"
    },
    {
      "fileMatch": [
        "/config/configure-external-bundling-webpack.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/configureWebpack/configure-webpack-external-bundling.schema.json"
    },
    {
      "fileMatch": [
        "/copy-static-assets.json"
      ],
      "url": "./node_modules/@microsoft/sp-build-core-tasks/lib/copyStaticAssets/copy-static-assets.schema.json"
    }
  ]
}
```
