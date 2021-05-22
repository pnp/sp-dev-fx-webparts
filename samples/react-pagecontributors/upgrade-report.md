# Upgrade project Source to v1.12.1

Date: 5/21/2021

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.12.1. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.12.1
```

File: [./package.json:9:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.12.1
```

File: [./package.json:10:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.12.1
```

File: [./package.json:8:3](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.12.1
```

File: [./package.json:22:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.12.1
```

File: [./package.json:23:5](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i -DE @microsoft/sp-webpart-workbench@1.12.1
```

File: [./package.json:24:5](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Install SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.12.1
```

File: [./package.json:21:3](./package.json)

### FN004002 copy-assets.json deployCdnPath | Required

Update copy-assets.json deployCdnPath

```json
{
  "deployCdnPath": "./release/assets/"
}
```

File: [./config/copy-assets.json:2:3](./config/copy-assets.json)

### FN005002 deploy-azure-storage.json workingDir | Required

Update deploy-azure-storage.json workingDir

```json
{
  "workingDir": "./release/assets/"
}
```

File: [./config/deploy-azure-storage.json:2:3](./config/deploy-azure-storage.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.12.1"
  }
}
```

File: [./.yo-rc.json:3:5](./.yo-rc.json)

### FN023001 .gitignore 'release' folder | Required

To .gitignore add the 'release' folder


File: [./.gitignore](./.gitignore)

### FN001008 react | Required

Upgrade SharePoint Framework dependency package react

Execute the following command:

```sh
npm i -SE react@16.9.0
```

File: [./package.json:17:5](./package.json)

### FN001009 react-dom | Required

Upgrade SharePoint Framework dependency package react-dom

Execute the following command:

```sh
npm i -SE react-dom@16.9.0
```

File: [./package.json:18:5](./package.json)

### FN001022 office-ui-fabric-react | Required

Install SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@7.156.0
```

File: [./package.json:8:3](./package.json)

### FN002004 gulp | Required

Upgrade SharePoint Framework dev dependency package gulp

Execute the following command:

```sh
npm i -DE gulp@4.0.2
```

File: [./package.json:25:5](./package.json)

### FN002005 @types/chai | Required

Remove SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm un -D @types/chai
```

File: [./package.json:26:5](./package.json)

### FN002006 @types/mocha | Required

Remove SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm un -D @types/mocha
```

File: [./package.json:27:5](./package.json)

### FN002017 @microsoft/rush-stack-compiler-3.7 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-3.7

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-3.7@0.2.3
```

File: [./package.json:21:3](./package.json)

### FN002015 @types/react | Required

Install SharePoint Framework dev dependency package @types/react

Execute the following command:

```sh
npm i -DE @types/react@16.9.36
```

File: [./package.json:21:3](./package.json)

### FN002016 @types/react-dom | Required

Install SharePoint Framework dev dependency package @types/react-dom

Execute the following command:

```sh
npm i -DE @types/react-dom@16.9.8
```

File: [./package.json:21:3](./package.json)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.7/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json:1:1](./tsconfig.json)

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

File: [./tsconfig.json:11:7](./tsconfig.json)

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

File: [./package.json:11:5](./package.json)

### FN001006 @types/react-dom | Required

Remove SharePoint Framework dependency package @types/react-dom

Execute the following command:

```sh
npm un -S @types/react-dom
```

File: [./package.json:15:5](./package.json)

### FN001007 @types/webpack-env | Required

Remove SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm un -S @types/webpack-env
```

File: [./package.json:16:5](./package.json)

### FN002013 @types/webpack-env | Required

Install SharePoint Framework dev dependency package @types/webpack-env

Execute the following command:

```sh
npm i -DE @types/webpack-env@1.13.1
```

File: [./package.json:21:3](./package.json)

### FN002014 @types/es6-promise | Required

Install SharePoint Framework dev dependency package @types/es6-promise

Execute the following command:

```sh
npm i -DE @types/es6-promise@0.0.33
```

File: [./package.json:21:3](./package.json)

### FN006004 package-solution.json developer | Optional

In package-solution.json add developer section

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

File: [./config/package-solution.json:2:3](./config/package-solution.json)

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
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneDropdown, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\pageContributors\PageContributorsWebPart.ts:4:1](src\webparts\pageContributors\PageContributorsWebPart.ts)

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

File: [src\webparts\pageContributors\PageContributorsWebPart.manifest.json:1:1](src\webparts\pageContributors\PageContributorsWebPart.manifest.json)

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
mkdir "D:\project\sharing minds\source\Subscription Engine\External WebParts\Page Contributors\Source/teams"
```

File: [teams](teams)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp "C:\Users\Ari\AppData\Roaming\nvm\v10.20.1\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "D:\project\sharing minds\source\Subscription Engine\External WebParts\Page Contributors\Source\teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_outline.png"
```

File: [teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_outline.png](teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_outline.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp "C:\Users\Ari\AppData\Roaming\nvm\v10.20.1\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "D:\project\sharing minds\source\Subscription Engine\External WebParts\Page Contributors\Source\teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_color.png"
```

File: [teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_color.png](teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_color.png)

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

File: [./package.json:21:3](./package.json)

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

### FN004001 copy-assets.json schema | Required

Update copy-assets.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/copy-assets.schema.json"
}
```

File: [./config/copy-assets.json:1:1](./config/copy-assets.json)

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

### FN007001 serve.json schema | Required

Update serve.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json"
}
```

File: [./config/serve.json:1:1](./config/serve.json)

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

File: [src\webparts\pageContributors\PageContributorsWebPart.manifest.json:2:3](src\webparts\pageContributors\PageContributorsWebPart.manifest.json)

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

File: [./package.json:12:5](./package.json)

### FN001016 @types/react-addons-update | Required

Remove SharePoint Framework dependency package @types/react-addons-update

Execute the following command:

```sh
npm un -S @types/react-addons-update
```

File: [./package.json:14:5](./package.json)

### FN001017 @types/react-addons-test-utils | Required

Remove SharePoint Framework dependency package @types/react-addons-test-utils

Execute the following command:

```sh
npm un -S @types/react-addons-test-utils
```

File: [./package.json:13:5](./package.json)

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

### FN012006 tsconfig.json es6-collections types | Required

Remove es6-collections type in tsconfig.json

```json
{
  "compilerOptions": {
    "types": [
      "es6-collections"
    ]
  }
}
```

File: [./tsconfig.json:12:7](./tsconfig.json)

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

### FN002007 ajv | Required

Install SharePoint Framework dev dependency package ajv

Execute the following command:

```sh
npm i -DE ajv@5.2.2
```

File: [./package.json:21:3](./package.json)

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

### FN011005 Web part manifest default group | Required

In the manifest update the default group value

```json
{
  "preconfiguredEntries": [{
    "group": { "default": "Other" }
  }]
}
```

File: [src\webparts\pageContributors\PageContributorsWebPart.manifest.json:13:16](src\webparts\pageContributors\PageContributorsWebPart.manifest.json)

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
    "page-contributors-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/pageContributors/PageContributorsWebPart.js",
          "manifest": "./src/webparts/pageContributors/PageContributorsWebPart.manifest.json"
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
      "entry": "./lib/webparts/pageContributors/PageContributorsWebPart.js",
      "manifest": "./src/webparts/pageContributors/PageContributorsWebPart.manifest.json",
      "outputPath": "./dist/page-contributors.bundle.js"
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
    "pageContributorsStrings": "lib/webparts/pageContributors/loc/{locale}.js"
  }
}
```

File: [./config/config.json:11:5](./config/config.json)

### FN011008 Client-side component manifest requiresCustomScript property | Required

In the manifest rename the safeWithCustomScriptDisabled property to requiresCustomScript and invert its value

```json
{
  "requiresCustomScript": true
}
```

File: [src\webparts\pageContributors\PageContributorsWebPart.manifest.json:9:3](src\webparts\pageContributors\PageContributorsWebPart.manifest.json)

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
npm un -S @types/react @types/react-dom @types/webpack-env @types/react-addons-shallow-compare @types/react-addons-update @types/react-addons-test-utils
npm un -D @types/chai @types/mocha
npm i -SE @microsoft/sp-core-library@1.12.1 @microsoft/sp-webpart-base@1.12.1 @microsoft/sp-property-pane@1.12.1 react@16.9.0 react-dom@16.9.0 office-ui-fabric-react@7.156.0 @types/es6-promise@0.0.33
npm i -DE @microsoft/sp-build-web@1.12.1 @microsoft/sp-module-interfaces@1.12.1 @microsoft/sp-webpart-workbench@1.12.1 @microsoft/sp-tslint-rules@1.12.1 gulp@4.0.2 @microsoft/rush-stack-compiler-3.7@0.2.3 @types/react@16.9.36 @types/react-dom@16.9.8 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33 tslint-microsoft-contrib@5.0.0 ajv@5.2.2
npm dedupe
rm ".editorconfig"
mkdir "D:\project\sharing minds\source\Subscription Engine\External WebParts\Page Contributors\Source/teams"
cp "C:\Users\Ari\AppData\Roaming\nvm\v10.20.1\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab20x20.png" "D:\project\sharing minds\source\Subscription Engine\External WebParts\Page Contributors\Source\teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_outline.png"
cp "C:\Users\Ari\AppData\Roaming\nvm\v10.20.1\node_modules\@pnp\cli-microsoft365\dist\m365\spfx\commands\project\project-upgrade\assets\tab96x96.png" "D:\project\sharing minds\source\Subscription Engine\External WebParts\Page Contributors\Source\teams\dfb5229a-c1c3-4e98-870b-c40dd6e4ec4b_color.png"
rm "config\tslint.json"
cat > "src\index.ts" << EOF 
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
```

### Modify files

#### [./config/copy-assets.json](./config/copy-assets.json)

Update copy-assets.json deployCdnPath:

```json
{
  "deployCdnPath": "./release/assets/"
}
```

Update copy-assets.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/copy-assets.schema.json"
}
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

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.12.1"
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

#### [./.gitignore](./.gitignore)

To .gitignore add the 'release' folder:

```text
release
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-3.7/includes/tsconfig-web.json"
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

Remove es6-collections type in tsconfig.json:

```json
{
  "compilerOptions": {
    "types": [
      "es6-collections"
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

#### [src\webparts\pageContributors\PageContributorsWebPart.ts](src\webparts\pageContributors\PageContributorsWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneDropdown, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

#### [src\webparts\pageContributors\PageContributorsWebPart.manifest.json](src\webparts\pageContributors\PageContributorsWebPart.manifest.json)

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

In the manifest update the default group value:

```json
{
  "preconfiguredEntries": [{
    "group": { "default": "Other" }
  }]
}
```

In the manifest rename the safeWithCustomScriptDisabled property to requiresCustomScript and invert its value:

```json
{
  "requiresCustomScript": true
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
    "page-contributors-web-part": {
      "components": [
        {
          "entrypoint": "./lib/webparts/pageContributors/PageContributorsWebPart.js",
          "manifest": "./src/webparts/pageContributors/PageContributorsWebPart.manifest.json"
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
      "entry": "./lib/webparts/pageContributors/PageContributorsWebPart.js",
      "manifest": "./src/webparts/pageContributors/PageContributorsWebPart.manifest.json",
      "outputPath": "./dist/page-contributors.bundle.js"
    }
  ]
}
```

In the config.json file, update the path of the localized resource:

```json
{
  "localizedResources": {
    "pageContributorsStrings": "lib/webparts/pageContributors/loc/{locale}.js"
  }
}
```

#### [./config/serve.json](./config/serve.json)

Update serve.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/core-build/serve.schema.json"
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
