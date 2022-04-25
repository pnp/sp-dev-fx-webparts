# Upgrade project react-page-sections-navigation to v1.14.0

Date: 4/25/2022

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.14.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.14.0
```

File: [./package.json:14:5](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.14.0
```

File: [./package.json:15:5](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.14.0
```

File: [./package.json:16:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.14.0
```

File: [./package.json:17:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.14.0
```

File: [./package.json:13:3](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.14.0
```

File: [./package.json:31:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.14.0
```

File: [./package.json:33:5](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.14.0
```

File: [./package.json:32:5](./package.json)

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
        "default": "page-sections-navigation description"
      },
      "longDescription": {
        "default": "page-sections-navigation description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    }
  }
}
```

File: [./config/package-solution.json:3:3](./config/package-solution.json)

### FN006006 package-solution.json features | Required

In package-solution.json add features section

```json
{
  "solution": {
    "features": [
      {
        "title": "page-sections-navigation Feature",
        "description": "The feature that activates elements of the page-sections-navigation solution.",
        "id": "50df5ee0-812b-4221-8650-e4d769f2f755",
        "version": "1.0.0.4"
      }
    ]
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

File: [./package.json:22:5](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@16.13.1
```

File: [./package.json:23:5](./package.json)

### FN001022 office-ui-fabric-react | Required

Install SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@7.174.1
```

File: [./package.json:13:3](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Remove SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm un -D @microsoft/sp-webpart-workbench
```

File: [./package.json:34:5](./package.json)

### FN002015 @types/react | Required

Install SharePoint Framework dev dependency package @types/react

Execute the following command:

```sh
npm i -DE @types/react@16.9.51
```

File: [./package.json:30:3](./package.json)

### FN002018 @microsoft/rush-stack-compiler-3.9 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-3.9

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-3.9@0.4.47
```

File: [./package.json:30:3](./package.json)

### FN007002 serve.json initialPage | Required

Update serve.json initialPage URL

```json
{
  "initialPage": "https://enter-your-SharePoint-site/_layouts/workbench.aspx"
}
```

File: [./config/serve.json:5:3](./config/serve.json)

### FN007003 serve.json api | Required

From serve.json remove the api property

```json

```

File: [./config/serve.json:6:3](./config/serve.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.9/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json:2:3](./tsconfig.json)

### FN015007 config\copy-assets.json | Required

Remove file config\copy-assets.json

Execute the following command:

```sh
rm "config\copy-assets.json"
```

File: [config\copy-assets.json](config\copy-assets.json)

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

File: [./package.json:36:5](./package.json)

### FN002005 @types/chai | Required

Remove SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm un -D @types/chai
```

File: [./package.json:37:5](./package.json)

### FN002006 @types/mocha | Required

Remove SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm un -D @types/mocha
```

File: [./package.json:38:5](./package.json)

### FN002016 @types/react-dom | Required

Install SharePoint Framework dev dependency package @types/react-dom

Execute the following command:

```sh
npm i -DE @types/react-dom@16.9.8
```

File: [./package.json:30:3](./package.json)

### FN012013 tsconfig.json exclude property | Required

Remove tsconfig.json exclude property

```json
{
  "exclude": []
}
```

File: [./tsconfig.json:31:3](./tsconfig.json)

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

File: [./tsconfig.json:22:5](./tsconfig.json)

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

File: [./tsconfig.json:19:7](./tsconfig.json)

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

### FN015006 .editorconfig | Required

Remove file .editorconfig

Execute the following command:

```sh
rm ".editorconfig"
```

File: [.editorconfig](.editorconfig)

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

File: [./package.json:5:3](./package.json)

### FN001005 @types/react | Required

Remove SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm un -S @types/react
```

File: [./package.json:19:5](./package.json)

### FN001006 @types/react-dom | Required

Remove SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm un -S @types/react-dom
```

File: [./package.json:20:5](./package.json)

### FN001007 @types/webpack-env | Required

Remove SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm un -S @types/webpack-env
```

File: [./package.json:21:5](./package.json)

### FN001010 @types/es6-promise | Required

Remove SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm un -S @types/es6-promise
```

File: [./package.json:18:5](./package.json)

### FN002013 @types/webpack-env | Required

Install SharePoint Framework dev dependency package @types/webpack-env

Execute the following command:

```sh
npm i -DE @types/webpack-env@1.13.1
```

File: [./package.json:30:3](./package.json)

### FN002014 @types/es6-promise | Required

Install SharePoint Framework dev dependency package @types/es6-promise

Execute the following command:

```sh
npm i -DE @types/es6-promise@0.0.33
```

File: [./package.json:30:3](./package.json)

### FN012012 tsconfig.json include property | Required

Add to the tsconfig.json include property

```json
{
  "include": [
    "src/**/*.tsx"
  ]
}
```

File: [./tsconfig.json:28:3](./tsconfig.json)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneChoiceGroup, PropertyPaneCheckbox, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.ts:4:1](src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.ts)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneCheckbox } from "@microsoft/sp-property-pane";
```

File: [src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.ts:4:1](src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.ts)

### FN020001 @types/react | Required

Add resolution for package @types/react

```json
{
  "resolutions": {
    "@types/react": "16.8.8"
  }
}
```

File: [./package.json:28:5](./package.json)

### FN021001 main | Required

Add package.json property

```json
{
  "main": "lib/index.js"
}
```

File: [./package.json:1:1](./package.json)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

File: [src\webparts\pageSectionsNavigation\components\PageSectionsNavigation.module.scss](src\webparts\pageSectionsNavigation\components\PageSectionsNavigation.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

File: [src\webparts\pageSectionsNavigation\components\PageSectionsNavigation.module.scss](src\webparts\pageSectionsNavigation\components\PageSectionsNavigation.module.scss)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.manifest.json:1:1](src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.manifest.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.manifest.json:1:1](src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.manifest.json)

### FN012014 tsconfig.json compiler options inlineSources | Required

Update tsconfig.json inlineSources value

```json
{
  "compilerOptions": {
    "inlineSources": false
  }
}
```

File: [./tsconfig.json:3:22](./tsconfig.json)

### FN012015 tsconfig.json compiler options strictNullChecks | Required

Update tsconfig.json strictNullChecks value

```json
{
  "compilerOptions": {
    "strictNullChecks": false
  }
}
```

File: [./tsconfig.json:3:22](./tsconfig.json)

### FN012016 tsconfig.json compiler options noUnusedLocals | Required

Update tsconfig.json noUnusedLocals value

```json
{
  "compilerOptions": {
    "noUnusedLocals": false
  }
}
```

File: [./tsconfig.json:3:22](./tsconfig.json)

### FN018001 Web part Microsoft Teams tab resources folder | Optional

Create folder for Microsoft Teams tab resources

Execute the following command:

```sh
mkdir "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation/teams"
```

File: [teams](teams)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\54bf2203-2546-44b4-ab33-61aee56349ff_outline.png"
```

File: [teams\54bf2203-2546-44b4-ab33-61aee56349ff_outline.png](teams\54bf2203-2546-44b4-ab33-61aee56349ff_outline.png)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_outline.png"
```

File: [teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_outline.png](teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_outline.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\54bf2203-2546-44b4-ab33-61aee56349ff_color.png"
```

File: [teams\54bf2203-2546-44b4-ab33-61aee56349ff_color.png](teams\54bf2203-2546-44b4-ab33-61aee56349ff_color.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_color.png"
```

File: [teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_color.png](teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_color.png)

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
npm i -SE @microsoft/sp-core-library@1.14.0 @microsoft/sp-lodash-subset@1.14.0 @microsoft/sp-office-ui-fabric-core@1.14.0 @microsoft/sp-webpart-base@1.14.0 @microsoft/sp-property-pane@1.14.0 react@16.13.1 react-dom@16.13.1 office-ui-fabric-react@7.174.1
npm i -DE @microsoft/sp-build-web@1.14.0 @microsoft/sp-module-interfaces@1.14.0 @microsoft/sp-tslint-rules@1.14.0 @types/react@16.9.51 @microsoft/rush-stack-compiler-3.9@0.4.47 gulp@4.0.2 @types/react-dom@16.9.8 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33
npm dedupe
rm "config\copy-assets.json"
rm ".editorconfig"
mkdir "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation/teams"
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\54bf2203-2546-44b4-ab33-61aee56349ff_outline.png"
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_outline.png"
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\54bf2203-2546-44b4-ab33-61aee56349ff_color.png"
cp "C:\Users\aterentiev\AppData\Local\nvs\node\14.19.0\x64\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "D:\at\repos\sp-dev-fx-webparts\samples\react-page-sections-navigation\teams\a4e172ec-a30d-456c-b81a-f38e043db5ae_color.png"
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
        "default": "page-sections-navigation description"
      },
      "longDescription": {
        "default": "page-sections-navigation description"
      },
      "screenshotPaths": [],
      "videoUrl": "",
      "categories": []
    }
  }
}
```

In package-solution.json add features section:

```json
{
  "solution": {
    "features": [
      {
        "title": "page-sections-navigation Feature",
        "description": "The feature that activates elements of the page-sections-navigation solution.",
        "id": "50df5ee0-812b-4221-8650-e4d769f2f755",
        "version": "1.0.0.4"
      }
    ]
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

#### [src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.ts](src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneChoiceGroup, PropertyPaneCheckbox, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

#### [src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.ts](src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneCheckbox } from "@microsoft/sp-property-pane";
```

#### [src\webparts\pageSectionsNavigation\components\PageSectionsNavigation.module.scss](src\webparts\pageSectionsNavigation\components\PageSectionsNavigation.module.scss)

Remove scss file import:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

Add scss file import:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

#### [src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.manifest.json](src\webparts\pageSectionsNavigation\PageSectionsNavigationWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

#### [src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.manifest.json](src\webparts\pageSectionsNavigationAnchor\PageSectionsNavigationAnchorWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```
