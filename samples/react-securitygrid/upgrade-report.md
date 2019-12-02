# Upgrade project C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid to v1.9.1

Date: 2019-12-1

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.9.1. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.9.1
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.9.1
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
npm i -DE @microsoft/sp-build-web@1.9.1
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.9.1
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i -DE @microsoft/sp-webpart-workbench@1.9.1
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Install SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.9.1
```

File: [./package.json](./package.json)

### FN002011 @microsoft/rush-stack-compiler-2.9 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-2.9

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
    "version": "1.9.1"
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

### FN022002 Scss file import | Optional

Add scss file import

In file [src\webparts\spSecurity\components\SpSecurity.module.scss](src\webparts\spSecurity\components\SpSecurity.module.scss) update the code as follows:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

File: [src\webparts\spSecurity\components\SpSecurity.module.scss](src\webparts\spSecurity\components\SpSecurity.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

In file [src\webparts\spSecurity\components\SpSecurity.scss](src\webparts\spSecurity\components\SpSecurity.scss) update the code as follows:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

File: [src\webparts\spSecurity\components\SpSecurity.scss](src\webparts\spSecurity\components\SpSecurity.scss)

### FN012017 tsconfig.json extends property | Required

Update tsconfig.json extends property

In file [./tsconfig.json](./tsconfig.json) update the code as follows:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.9/includes/tsconfig-web.json"
}
```

File: [./tsconfig.json](./tsconfig.json)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

In file [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json) update the code as follows:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json)

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

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

In file [src\webparts\spSecurity\components\ISpSecurityProps.ts](src\webparts\spSecurity\components\ISpSecurityProps.ts) update the code as follows:

```ts
import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
```

File: [src\webparts\spSecurity\components\ISpSecurityProps.ts:3:1](src\webparts\spSecurity\components\ISpSecurityProps.ts)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

In file [src\webparts\spSecurity\SpSecurityWebPart.ts](src\webparts\spSecurity\SpSecurityWebPart.ts) update the code as follows:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneCheckbox, IPropertyPaneDropdownOption, PropertyPaneDropdown, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
```

File: [src\webparts\spSecurity\SpSecurityWebPart.ts:6:1](src\webparts\spSecurity\SpSecurityWebPart.ts)

### FN016004 Property pane property import change to @microsoft/sp-property-pane | Required

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package

In file [src\webparts\spSecurity\SpSecurityWebPart.ts](src\webparts\spSecurity\SpSecurityWebPart.ts) update the code as follows:

```ts
import {  } from "@microsoft/sp-webpart-base";
import { PropertyPaneSlider } from "@microsoft/sp-property-pane";
```

File: [src\webparts\spSecurity\SpSecurityWebPart.ts:20:1](src\webparts\spSecurity\SpSecurityWebPart.ts)

### FN006003 package-solution.json isDomainIsolated | Required

Update package-solution.json isDomainIsolated

In file [./config/package-solution.json](./config/package-solution.json) update the code as follows:

```json
{
  "solution": {
    "isDomainIsolated": false
  }
}
```

File: [./config/package-solution.json](./config/package-solution.json)

### FN010007 .yo-rc.json isDomainIsolated | Recommended

Update isDomainIsolated in .yo-rc.json

In file [./.yo-rc.json](./.yo-rc.json) update the code as follows:

```json
{
  "@microsoft/generator-sharepoint": {
    "isDomainIsolated": false
  }
}
```

File: [./.yo-rc.json](./.yo-rc.json)

### FN018001 Web part Microsoft Teams tab resources folder | Optional

Create folder for Microsoft Teams tab resources

Execute the following command:

```sh
mkdir C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid/teams_spSecurity
```

File: [teams_spSecurity](teams_spSecurity)

### FN018002 Web part Microsoft Teams tab manifest | Optional

Create Microsoft Teams tab manifest for the web part

Execute the following command:

```sh
cat > C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid\teams_spSecurity\manifest.json << EOF 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "SPSecurity",
  "id": "41e37f03-2ea8-4f19-b77a-f2121a1e7c45",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "SPSecurity"
  },
  "description": {
    "short": "Security Grid Display",
    "full": "Security Grid Display"
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=41e37f03-2ea8-4f19-b77a-f2121a1e7c45",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}
EOF
```

File: [teams_spSecurity\manifest.json](teams_spSecurity\manifest.json)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp C:\Users\trwg1\AppData\Roaming\npm\node_modules\@pnp\office365-cli\dist\o365\spfx\commands\project\project-upgrade\assets\tab20x20.png C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid\teams_spSecurity\tab20x20.png
```

File: [teams_spSecurity\tab20x20.png](teams_spSecurity\tab20x20.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp C:\Users\trwg1\AppData\Roaming\npm\node_modules\@pnp\office365-cli\dist\o365\spfx\commands\project\project-upgrade\assets\tab96x96.png C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid\teams_spSecurity\tab96x96.png
```

File: [teams_spSecurity\tab96x96.png](teams_spSecurity\tab96x96.png)

### FN019001 tslint.json rulesDirectory | Required

Remove rulesDirectory from tslint.json

In file [./tslint.json](./tslint.json) update the code as follows:

```json
{
  "rulesDirectory": []
}
```

File: [./tslint.json](./tslint.json)

### FN019002 tslint.json extends | Required

Update tslint.json extends property

In file [./tslint.json](./tslint.json) update the code as follows:

```json
{
  "extends": "@microsoft/sp-tslint-rules/base-tslint.json"
}
```

File: [./tslint.json](./tslint.json)

### FN002008 tslint-microsoft-contrib | Required

Install SharePoint Framework dev dependency package tslint-microsoft-contrib

Execute the following command:

```sh
npm i -DE tslint-microsoft-contrib@5.0.0
```

File: [./package.json](./package.json)

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

### FN015004 config\tslint.json | Required

Remove file config\tslint.json

Execute the following command:

```sh
rm config\tslint.json
```

File: [config\tslint.json](config\tslint.json)

### FN015005 src\index.ts | Required

Add file src\index.ts

Execute the following command:

```sh
cat > src\index.ts << EOF 
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
```

File: [src\index.ts](src\index.ts)

### FN001007 @types/webpack-env | Required

Upgrade SharePoint Framework dependency package @types/webpack-env

Execute the following command:

```sh
npm i -SE @types/webpack-env@1.13.1
```

File: [./package.json](./package.json)

### FN001010 @types/es6-promise | Required

Install SharePoint Framework dependency package @types/es6-promise

Execute the following command:

```sh
npm i -SE @types/es6-promise@0.0.33
```

File: [./package.json](./package.json)

### FN002005 @types/chai | Required

Upgrade SharePoint Framework dev dependency package @types/chai

Execute the following command:

```sh
npm i -DE @types/chai@3.4.34
```

File: [./package.json](./package.json)

### FN002006 @types/mocha | Required

Upgrade SharePoint Framework dev dependency package @types/mocha

Execute the following command:

```sh
npm i -DE @types/mocha@2.2.38
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

In file [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json) update the code as follows:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx/client-side-web-part-manifest.schema.json"
}
```

File: [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json)

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

### FN001015 @types/react-addons-shallow-compare | Required

Remove SharePoint Framework dependency package @types/react-addons-shallow-compare

Execute the following command:

```sh
npm un -S @types/react-addons-shallow-compare
```

File: [./package.json](./package.json)

### FN001016 @types/react-addons-update | Required

Remove SharePoint Framework dependency package @types/react-addons-update

Execute the following command:

```sh
npm un -S @types/react-addons-update
```

File: [./package.json](./package.json)

### FN001017 @types/react-addons-test-utils | Required

Remove SharePoint Framework dependency package @types/react-addons-test-utils

Execute the following command:

```sh
npm un -S @types/react-addons-test-utils
```

File: [./package.json](./package.json)

### FN006002 package-solution.json includeClientSideAssets | Required

Update package-solution.json includeClientSideAssets

In file [./config/package-solution.json](./config/package-solution.json) update the code as follows:

```json
{
  "solution": {
    "includeClientSideAssets": true
  }
}
```

File: [./config/package-solution.json](./config/package-solution.json)

### FN002007 ajv | Required

Install SharePoint Framework dev dependency package ajv

Execute the following command:

```sh
npm i -DE ajv@5.2.2
```

File: [./package.json](./package.json)

### FN014002 .vscode/extensions.json | Recommended

In the .vscode folder, add the extensions.json file

In file [.vscode/extensions.json](.vscode/extensions.json) update the code as follows:

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

In file [.vscode/launch.json](.vscode/launch.json) update the code as follows:

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

In file [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json) update the code as follows:

```json
{
  "preconfiguredEntries": [{
    "group": { "default": "Other" }
  }]
}
```

File: [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json)

### FN003005 Update path of the localized resource | Required

In the config.json file, update the path of the localized resource

In file [./config/config.json](./config/config.json) update the code as follows:

```json
{
  "localizedResources": {
    "k": "lib/./node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js"
  }
}
```

File: [./config/config.json](./config/config.json)

### FN011008 Client-side component manifest requiresCustomScript property | Required

In the manifest rename the safeWithCustomScriptDisabled property to requiresCustomScript and invert its value

In file [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json) update the code as follows:

```json
{
  "requiresCustomScript": true

```

File: [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json)

### FN011009 Web part manifest safeWithCustomScriptDisabled | Required

Remove the safeWithCustomScriptDisabled property in the manifest

In file [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json) update the code as follows:

```json
{
  "safeWithCustomScriptDisabled": false
}
```

File: [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json)

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
npm i -SE @microsoft/sp-core-library@1.9.1 @microsoft/sp-webpart-base@1.9.1 @types/react@16.8.8 @types/react-dom@16.8.3 office-ui-fabric-react@6.189.2 react@16.8.5 react-dom@16.8.5 @types/webpack-env@1.13.1 @types/es6-promise@0.0.33
npm i -DE @microsoft/sp-build-web@1.9.1 @microsoft/sp-module-interfaces@1.9.1 @microsoft/sp-webpart-workbench@1.9.1 @microsoft/sp-tslint-rules@1.9.1 @microsoft/rush-stack-compiler-2.9@0.7.16 tslint-microsoft-contrib@5.0.0 @types/chai@3.4.34 @types/mocha@2.2.38 ajv@5.2.2
npm un -S @types/react-addons-shallow-compare @types/react-addons-update @types/react-addons-test-utils
mkdir C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid/teams_spSecurity
cat > C:\Users\trwg1\GitHub\sp-dev-fx-webparts\samples\react-securitygrid\teams_spSecurity\manifest.json << EOF 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "SPSecurity",
  "id": "41e37f03-2ea8-4f19-b77a-f2121a1e7c45",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "SPSecurity"
  },
  "description": {
    "short": "Security Grid Display",
    "full": "Security Grid Display"
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=41e37f03-2ea8-4f19-b77a-f2121a1e7c45",
      "canUpdateConfiguration": true,
      "scopes": [
        "team"
      ]
    }
  ],
  "validDomains": [
    "*.login.microsoftonline.com",
    "*.sharepoint.com",
    "*.sharepoint-df.com",
    "spoppe-a.akamaihd.net",
    "spoprod-a.akamaihd.net",
    "resourceseng.blob.core.windows.net",
    "msft.spoppe.com"
  ],
  "webApplicationInfo": {
    "resource": "https://{teamSiteDomain}",
    "id": "00000003-0000-0ff1-ce00-000000000000"
  }
}
EOF
rm config\tslint.json
cat > src\index.ts << EOF 
// A file is required to be in the root of the /src directory by the TypeScript compiler

EOF
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.9.1"
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

#### [src\webparts\spSecurity\components\SpSecurity.module.scss](src\webparts\spSecurity\components\SpSecurity.module.scss)

Add scss file import:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

#### [src\webparts\spSecurity\components\SpSecurity.scss](src\webparts\spSecurity\components\SpSecurity.scss)

Add scss file import:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

#### [./tsconfig.json](./tsconfig.json)

Update tsconfig.json extends property:

```json
{
  "extends": "./node_modules/@microsoft/rush-stack-compiler-2.9/includes/tsconfig-web.json"
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

Update tsconfig.json include property:

```json
{
  "include": [
    "src/**/*.ts"
  ]
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

#### [src\webparts\spSecurity\SpSecurityWebPart.manifest.json](src\webparts\spSecurity\SpSecurityWebPart.manifest.json)

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

```

Remove the safeWithCustomScriptDisabled property in the manifest:

```json
{
  "safeWithCustomScriptDisabled": false
}
```

#### [src\webparts\spSecurity\components\ISpSecurityProps.ts](src\webparts\spSecurity\components\ISpSecurityProps.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import {  } from "@microsoft/sp-webpart-base";
import { IPropertyPaneDropdownOption, PropertyPaneDropdown } from "@microsoft/sp-property-pane";
```

#### [src\webparts\spSecurity\SpSecurityWebPart.ts](src\webparts\spSecurity\SpSecurityWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneCheckbox, IPropertyPaneDropdownOption, PropertyPaneDropdown, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
```

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import {  } from "@microsoft/sp-webpart-base";
import { PropertyPaneSlider } from "@microsoft/sp-property-pane";
```

#### [./config/package-solution.json](./config/package-solution.json)

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

#### [./tslint.json](./tslint.json)

Remove rulesDirectory from tslint.json:

```json
{
  "rulesDirectory": []
}
```

Update tslint.json extends property:

```json
{
  "extends": "@microsoft/sp-tslint-rules/base-tslint.json"
}
```

#### [./config/config.json](./config/config.json)

Update config.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/config.2.0.schema.json"
}
```

In the config.json file, update the path of the localized resource:

```json
{
  "localizedResources": {
    "k": "lib/./node_modules/@pnp/spfx-property-controls/lib/loc/{locale}.js"
  }
}
```

#### [./config/copy-assets.json](./config/copy-assets.json)

Update copy-assets.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/copy-assets.schema.json"
}
```

#### [./config/deploy-azure-storage.json](./config/deploy-azure-storage.json)

Update deploy-azure-storage.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/spfx-build/deploy-azure-storage.schema.json"
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