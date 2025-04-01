# Upgrade project react-image-editor-client-side-solution to v1.20.0

Date: 4/1/2025

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.20.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.20.0
```

File: [./package.json:16:5](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.20.0
```

File: [./package.json:17:5](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.20.0
```

File: [./package.json:18:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.20.0
```

File: [./package.json:19:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.20.0
```

File: [./package.json:15:3](./package.json)

### FN001034 @microsoft/sp-adaptive-card-extension-base | Optional

Install SharePoint Framework dependency package @microsoft/sp-adaptive-card-extension-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-adaptive-card-extension-base@1.20.0
```

File: [./package.json:15:3](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.20.2
```

File: [./package.json:28:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.20.2
```

File: [./package.json:29:5](./package.json)

### FN002021 @rushstack/eslint-config | Required

Install SharePoint Framework dev dependency package @rushstack/eslint-config

Execute the following command:

```sh
npm i -DE @rushstack/eslint-config@4.0.1
```

File: [./package.json:25:3](./package.json)

### FN002024 eslint | Required

Install SharePoint Framework dev dependency package eslint

Execute the following command:

```sh
npm i -DE eslint@8.57.0
```

File: [./package.json:25:3](./package.json)

### FN002022 @microsoft/eslint-plugin-spfx | Required

Install SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-plugin-spfx@1.20.2
```

File: [./package.json:25:3](./package.json)

### FN002023 @microsoft/eslint-config-spfx | Required

Install SharePoint Framework dev dependency package @microsoft/eslint-config-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-config-spfx@1.20.2
```

File: [./package.json:25:3](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.20.0"
  }
}
```

File: [./.yo-rc.json:5:5](./.yo-rc.json)

### FN010010 .yo-rc.json @microsoft/teams-js SDK version | Recommended

Update @microsoft/teams-js SDK version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/teams-js": "2.24.0"
    }
  }
}
```

File: [./.yo-rc.json:2:3](./.yo-rc.json)

### FN001022 office-ui-fabric-react | Required

Remove SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm un -S office-ui-fabric-react
```

File: [./package.json:21:5](./package.json)

### FN001035 @fluentui/react | Required

Install SharePoint Framework dependency package @fluentui/react

Execute the following command:

```sh
npm i -SE @fluentui/react@8.106.4
```

File: [./package.json:15:3](./package.json)

### FN002026 typescript | Required

Install SharePoint Framework dev dependency package typescript

Execute the following command:

```sh
npm i -DE typescript@4.7.4
```

File: [./package.json:25:3](./package.json)

### FN002028 @microsoft/rush-stack-compiler-4.7 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-4.7

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-4.7@0.1.0
```

File: [./package.json:25:3](./package.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-4.7/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json:1:1](./tsconfig.json)

### FN021003 package.json engines.node | Required

Update package.json engines.node property

```json
{
  "engines": {
    "node": ">=16.13.0 <17.0.0 || >=18.17.1 <19.0.0"
  }
}
```

File: [./package.json:7:5](./package.json)

### FN007002 serve.json initialPage | Required

Update serve.json initialPage URL

```json
{
  "initialPage": "https://{tenantDomain}/_layouts/workbench.aspx"
}
```

File: [./config/serve.json:5:3](./config/serve.json)

### FN015009 config/sass.json | Required

Add file config/sass.json

Execute the following command:

```sh
cat > "config/sass.json" << EOF 
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/sass.schema.json"
}
EOF
```

File: [config/sass.json](config/sass.json)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i -SE react@17.0.1
```

File: [./package.json:22:5](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@17.0.1
```

File: [./package.json:23:5](./package.json)

### FN002015 @types/react | Required

Upgrade SharePoint Framework dev dependency package @types/react

Execute the following command:

```sh
npm i -DE @types/react@17.0.45
```

File: [./package.json:26:5](./package.json)

### FN002016 @types/react-dom | Required

Upgrade SharePoint Framework dev dependency package @types/react-dom

Execute the following command:

```sh
npm i -DE @types/react-dom@17.0.17
```

File: [./package.json:27:5](./package.json)

### FN010008 .yo-rc.json nodeVersion | Recommended

Update nodeVersion in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "nodeVersion": "18.20.3"
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

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/components/ImageManipulation/ImageManipulation.module.scss](src/components/ImageManipulation/ImageManipulation.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/components/ImageManipulation/components/ImageCrop.module.scss](src/components/ImageManipulation/components/ImageCrop.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/components/ImageManipulation/components/ImageGrid.module.scss](src/components/ImageManipulation/components/ImageGrid.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/components/ImageManipulation/components/ItemOrder.module.scss](src/components/ImageManipulation/components/ItemOrder.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src/webparts/reactImageEditor/components/ReactImageEditor.module.scss](src/webparts/reactImageEditor/components/ReactImageEditor.module.scss)

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

File: [./config/serve.json:2:3](./config/serve.json)

### FN001033 tslib | Required

Install SharePoint Framework dependency package tslib

Execute the following command:

```sh
npm i -SE tslib@2.3.1
```

File: [./package.json:15:3](./package.json)

### FN002007 ajv | Required

Upgrade SharePoint Framework dev dependency package ajv

Execute the following command:

```sh
npm i -DE ajv@6.12.5
```

File: [./package.json:34:5](./package.json)

### FN002013 @types/webpack-env | Required

Upgrade SharePoint Framework dev dependency package @types/webpack-env

Execute the following command:

```sh
npm i -DE @types/webpack-env@1.15.2
```

File: [./package.json:35:5](./package.json)

### FN002025 eslint-plugin-react-hooks | Required

Install SharePoint Framework dev dependency package eslint-plugin-react-hooks

Execute the following command:

```sh
npm i -DE eslint-plugin-react-hooks@4.3.0
```

File: [./package.json:25:3](./package.json)

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

File: [./config/package-solution.json:3:3](./config/package-solution.json)

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
export default {
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

File: [./package.json:25:3](./package.json)

### FN006005 package-solution.json metadata | Required

In package-solution.json add metadata section

```json
{
  "solution": {
    "metadata": {
      "shortDescription": {
        "default": "react-image-editor description"
      },
      "longDescription": {
        "default": "react-image-editor description"
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

In package-solution.json add features for components

```json
{
  "solution": {
    "features": [
      {
        "title": "react-image-editor ReactImageEditorWebPart Feature",
        "description": "The feature that activates ReactImageEditorWebPart from the react-image-editor solution.",
        "id": "51c2d476-67e1-453f-888c-ae193bad7bc6",
        "version": "1.0.0.0",
        "componentIds": [
          "51c2d476-67e1-453f-888c-ae193bad7bc6"
        ]
      }
    ]
  }
}
```

File: [./config/package-solution.json:3:3](./config/package-solution.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Remove SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm un -D @microsoft/sp-webpart-workbench
```

File: [./package.json:30:5](./package.json)

### FN007003 serve.json api | Required

From serve.json remove the api property

```json

```

File: [./config/serve.json:6:3](./config/serve.json)

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

File: [./package.json:31:5](./package.json)

### FN002005 @types/chai | Required

Remove SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm un -D @types/chai
```

File: [./package.json:32:5](./package.json)

### FN002006 @types/mocha | Required

Remove SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm un -D @types/mocha
```

File: [./package.json:33:5](./package.json)

### FN002014 @types/es6-promise | Required

Remove SharePoint Framework dev dependency package @types/es6-promise

Execute the following command:

```sh
npm un -D @types/es6-promise
```

File: [./package.json:36:5](./package.json)

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

File: [./tsconfig.json:20:5](./tsconfig.json)

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

File: [./tsconfig.json:17:7](./tsconfig.json)

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
import { IPropertyPaneConfiguration, PropertyPaneLabel, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
```

File: [src/webparts/reactImageEditor/ReactImageEditorWebPart.ts:4:1](src/webparts/reactImageEditor/ReactImageEditorWebPart.ts)

### FN001005 @types/react | Required

Install SharePoint Framework dependency package @types/react

Execute the following command:

```sh
npm i -SE @types/react@16.8.8
```

File: [./package.json:15:3](./package.json)

### FN001006 @types/react-dom | Required

Install SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm i -SE @types/react-dom@16.8.3
```

File: [./package.json:15:3](./package.json)

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

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

File: [src/webparts/reactImageEditor/components/ReactImageEditor.module.scss](src/webparts/reactImageEditor/components/ReactImageEditor.module.scss)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src/webparts/reactImageEditor/ReactImageEditorWebPart.manifest.json:1:1](src/webparts/reactImageEditor/ReactImageEditorWebPart.manifest.json)

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
mkdir "/Users/pkirschner/github/petkir/pnp/sp-dev-fx-webparts/samples/react-image-editor/teams"
```

File: [teams](teams)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "/Users/pkirschner/.nvm/versions/node/v18.20.3/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab20x20.png" "/Users/pkirschner/github/petkir/pnp/sp-dev-fx-webparts/samples/react-image-editor/teams/51c2d476-67e1-453f-888c-ae193bad7bc6_outline.png"
```

File: [teams/51c2d476-67e1-453f-888c-ae193bad7bc6_outline.png](teams/51c2d476-67e1-453f-888c-ae193bad7bc6_outline.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "/Users/pkirschner/.nvm/versions/node/v18.20.3/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab96x96.png" "/Users/pkirschner/github/petkir/pnp/sp-dev-fx-webparts/samples/react-image-editor/teams/51c2d476-67e1-453f-888c-ae193bad7bc6_color.png"
```

File: [teams/51c2d476-67e1-453f-888c-ae193bad7bc6_color.png](teams/51c2d476-67e1-453f-888c-ae193bad7bc6_color.png)

### FN006003 package-solution.json isDomainIsolated | Required

Update package-solution.json isDomainIsolated

```json
{
  "solution": {
    "isDomainIsolated": false
  }
}
```

File: [./config/package-solution.json:3:15](./config/package-solution.json)

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

### FN002008 tslint-microsoft-contrib | Required

Install SharePoint Framework dev dependency package tslint-microsoft-contrib

Execute the following command:

```sh
npm i -DE tslint-microsoft-contrib@5.0.0
```

File: [./package.json:25:3](./package.json)

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

### FN001007 @types/webpack-env | Required

Install SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm i -SE @types/webpack-env@1.13.1
```

File: [./package.json:15:3](./package.json)

### FN001010 @types/es6-promise | Required

Install SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm i -SE @types/es6-promise@0.0.33
```

File: [./package.json:15:3](./package.json)

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
npm un -S office-ui-fabric-react
npm un -D @microsoft/sp-webpart-workbench @types/chai @types/mocha @types/es6-promise
npm i -SE @microsoft/sp-core-library@1.20.0 @microsoft/sp-lodash-subset@1.20.0 @microsoft/sp-office-ui-fabric-core@1.20.0 @microsoft/sp-webpart-base@1.20.0 @microsoft/sp-property-pane@1.20.0 @microsoft/sp-adaptive-card-extension-base@1.20.0 @fluentui/react@8.106.4 react@17.0.1 react-dom@17.0.1 tslib@2.3.1 @types/react@16.8.8 @types/react-dom@16.8.3 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33
npm i -DE @microsoft/sp-build-web@1.20.2 @microsoft/sp-module-interfaces@1.20.2 @rushstack/eslint-config@4.0.1 eslint@8.57.0 @microsoft/eslint-plugin-spfx@1.20.2 @microsoft/eslint-config-spfx@1.20.2 typescript@4.7.4 @microsoft/rush-stack-compiler-4.7@0.1.0 @types/react@17.0.45 @types/react-dom@17.0.17 ajv@6.12.5 @types/webpack-env@1.15.2 eslint-plugin-react-hooks@4.3.0 @microsoft/sp-tslint-rules@1.14.0 gulp@4.0.2 tslint-microsoft-contrib@5.0.0
npm dedupe
cat > "config/sass.json" << EOF 
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/sass.schema.json"
}
EOF
rm "tslint.json"
cat > ".eslintrc.js" << EOF 
require('@rushstack/eslint-config/patch/modern-module-resolution');
export default {
  extends: ['@microsoft/eslint-config-spfx/lib/profiles/react'],
  parserOptions: { tsconfigRootDir: __dirname }
};
EOF
rm "config/copy-assets.json"
mkdir "/Users/pkirschner/github/petkir/pnp/sp-dev-fx-webparts/samples/react-image-editor/teams"
cp "/Users/pkirschner/.nvm/versions/node/v18.20.3/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab20x20.png" "/Users/pkirschner/github/petkir/pnp/sp-dev-fx-webparts/samples/react-image-editor/teams/51c2d476-67e1-453f-888c-ae193bad7bc6_outline.png"
cp "/Users/pkirschner/.nvm/versions/node/v18.20.3/lib/node_modules/@pnp/cli-microsoft365/dist/m365/spfx/commands/project/project-upgrade/assets/tab96x96.png" "/Users/pkirschner/github/petkir/pnp/sp-dev-fx-webparts/samples/react-image-editor/teams/51c2d476-67e1-453f-888c-ae193bad7bc6_color.png"
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.20.0"
  }
}
```

Update @microsoft/teams-js SDK version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "sdkVersions": {
      "@microsoft/teams-js": "2.24.0"
    }
  }
}
```

Update nodeVersion in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "nodeVersion": "18.20.3"
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

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-4.7/includes/tsconfig-web.json"
}
```

Add noImplicitAny in tsconfig.json:

```json
{
  "compilerOptions": {
    "noImplicitAny": true
  }
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

#### [./package.json](./package.json)

Update package.json engines.node property:

```json
{
  "engines": {
    "node": ">=16.13.0 <17.0.0 || >=18.17.1 <19.0.0"
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

#### [src/components/ImageManipulation/ImageManipulation.module.scss](src/components/ImageManipulation/ImageManipulation.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src/components/ImageManipulation/components/ImageCrop.module.scss](src/components/ImageManipulation/components/ImageCrop.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src/components/ImageManipulation/components/ImageGrid.module.scss](src/components/ImageManipulation/components/ImageGrid.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src/components/ImageManipulation/components/ItemOrder.module.scss](src/components/ImageManipulation/components/ItemOrder.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

#### [src/webparts/reactImageEditor/components/ReactImageEditor.module.scss](src/webparts/reactImageEditor/components/ReactImageEditor.module.scss)

Add scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Remove scss file import:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
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
        "default": "react-image-editor description"
      },
      "longDescription": {
        "default": "react-image-editor description"
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
        "title": "react-image-editor ReactImageEditorWebPart Feature",
        "description": "The feature that activates ReactImageEditorWebPart from the react-image-editor solution.",
        "id": "51c2d476-67e1-453f-888c-ae193bad7bc6",
        "version": "1.0.0.0",
        "componentIds": [
          "51c2d476-67e1-453f-888c-ae193bad7bc6"
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

#### [./.gitignore](./.gitignore)

To .gitignore add the '.heft' folder:

```text
.heft
```

To .gitignore add the 'release' folder:

```text
release
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

#### [src/webparts/reactImageEditor/ReactImageEditorWebPart.ts](src/webparts/reactImageEditor/ReactImageEditorWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneLabel, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
```

#### [src/webparts/reactImageEditor/ReactImageEditorWebPart.manifest.json](src/webparts/reactImageEditor/ReactImageEditorWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```
