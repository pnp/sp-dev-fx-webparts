# Upgrade project C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion to v1.10.0

Date: 1/18/2020

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.10.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.10.0
```

File: [./package.json](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.10.0
```

File: [./package.json](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.10.0
```

File: [./package.json](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.10.0
```

File: [./package.json](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Install SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.10.0
```

File: [./package.json](./package.json)

### FN002001 @microsoft/sp-build-web | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm i -DE @microsoft/sp-build-web@1.10.0
```

File: [./package.json](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.10.0
```

File: [./package.json](./package.json)

### FN002003 @microsoft/sp-webpart-workbench | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-webpart-workbench

Execute the following command:

```sh
npm i -DE @microsoft/sp-webpart-workbench@1.10.0
```

File: [./package.json](./package.json)

### FN002009 @microsoft/sp-tslint-rules | Required

Install SharePoint Framework dev dependency package @microsoft/sp-tslint-rules

Execute the following command:

```sh
npm i -DE @microsoft/sp-tslint-rules@1.10.0
```

File: [./package.json](./package.json)

### FN002012 @microsoft/rush-stack-compiler-3.3 | Required

Install SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-3.3

Execute the following command:

```sh
npm i -DE @microsoft/rush-stack-compiler-3.3@0.3.5
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

In file [src\webparts\reactAccordion\ReactAccordionWebPart.ts](src\webparts\reactAccordion\ReactAccordionWebPart.ts) update the code as follows:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField } from "@microsoft/sp-property-pane";
```

File: [src\webparts\reactAccordion\ReactAccordionWebPart.ts:4:1](src\webparts\reactAccordion\ReactAccordionWebPart.ts)

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

Install SharePoint Framework dependency package office-ui-fabric-react

Execute the following command:

```sh
npm i -SE office-ui-fabric-react@6.189.2
```

File: [./package.json](./package.json)

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

In file [src\webparts\reactAccordion\components\ReactAccordion.module.scss](src\webparts\reactAccordion\components\ReactAccordion.module.scss) update the code as follows:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

File: [src\webparts\reactAccordion\components\ReactAccordion.module.scss](src\webparts\reactAccordion\components\ReactAccordion.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

In file [src\webparts\reactAccordion\components\ReactAccordion.module.scss](src\webparts\reactAccordion\components\ReactAccordion.module.scss) update the code as follows:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

File: [src\webparts\reactAccordion\components\ReactAccordion.module.scss](src\webparts\reactAccordion\components\ReactAccordion.module.scss)

### FN011011 Web part manifest supportedHosts | Required

Update the supportedHosts property in the manifest

In file [src\webparts\reactAccordion\ReactAccordionWebPart.manifest.json](src\webparts\reactAccordion\ReactAccordionWebPart.manifest.json) update the code as follows:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
```

File: [src\webparts\reactAccordion\ReactAccordionWebPart.manifest.json](src\webparts\reactAccordion\ReactAccordionWebPart.manifest.json)

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
mkdir C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion/teams_reactAccordion
```

File: [teams_reactAccordion](teams_reactAccordion)

### FN018002 Web part Microsoft Teams tab manifest | Optional

Create Microsoft Teams tab manifest for the web part

Execute the following command:

```sh
cat > C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion\teams_reactAccordion\manifest.json << EOF 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "React Accordion App",
  "id": "97a28c00-64ee-4ec7-b373-723e39069a96",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "React Accordion App"
  },
  "description": {
    "short": "SPFx webpart which shows SharePoint list data in Accordion format",
    "full": "SPFx webpart which shows SharePoint list data in Accordion format"
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=97a28c00-64ee-4ec7-b373-723e39069a96",
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

File: [teams_reactAccordion\manifest.json](teams_reactAccordion\manifest.json)

### FN018003 Web part Microsoft Teams tab small icon | Optional

Create Microsoft Teams tab small icon for the web part

Execute the following command:

```sh
cp C:\Users\Admin\AppData\Roaming\npm\node_modules\@pnp\office365-cli\dist\o365\spfx\commands\project\project-upgrade\assets\tab20x20.png C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion\teams_reactAccordion\tab20x20.png
```

File: [teams_reactAccordion\tab20x20.png](teams_reactAccordion\tab20x20.png)

### FN018004 Web part Microsoft Teams tab large icon | Optional

Create Microsoft Teams tab large icon for the web part

Execute the following command:

```sh
cp C:\Users\Admin\AppData\Roaming\npm\node_modules\@pnp\office365-cli\dist\o365\spfx\commands\project\project-upgrade\assets\tab96x96.png C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion\teams_reactAccordion\tab96x96.png
```

File: [teams_reactAccordion\tab96x96.png](teams_reactAccordion\tab96x96.png)

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
npm i -SE @microsoft/sp-core-library@1.10.0 @microsoft/sp-lodash-subset@1.10.0 @microsoft/sp-office-ui-fabric-core@1.10.0 @microsoft/sp-webpart-base@1.10.0 @microsoft/sp-property-pane@1.10.0 @types/react@16.8.8 @types/react-dom@16.8.3 office-ui-fabric-react@6.189.2 react@16.8.5 react-dom@16.8.5
npm i -DE @microsoft/sp-build-web@1.10.0 @microsoft/sp-module-interfaces@1.10.0 @microsoft/sp-webpart-workbench@1.10.0 @microsoft/sp-tslint-rules@1.10.0 @microsoft/rush-stack-compiler-3.3@0.3.5 tslint-microsoft-contrib@5.0.0
mkdir C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion\teams
cat > C:\Projects\Muges01\sp-dev-fx-webparts\samples\react-accordion\teams\manifest.json << EOF 
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.2/MicrosoftTeams.schema.json",
  "manifestVersion": "1.2",
  "packageName": "React Accordion App",
  "id": "97a28c00-64ee-4ec7-b373-723e39069a96",
  "version": "0.1",
  "developer": {
    "name": "SPFx + Teams Dev",
    "websiteUrl": "https://products.office.com/en-us/sharepoint/collaboration",
    "privacyUrl": "https://privacy.microsoft.com/en-us/privacystatement",
    "termsOfUseUrl": "https://www.microsoft.com/en-us/servicesagreement"
  },
  "name": {
    "short": "React Accordion App"
  },
  "description": {
    "short": "SPFx webpart which shows SharePoint list data in Accordion format",
    "full": "SPFx webpart which shows SharePoint list data in Accordion format"
  },
  "icons": {
    "outline": "tab20x20.png",
    "color": "tab96x96.png"
  },
  "accentColor": "#004578",
  "configurableTabs": [
    {
      "configurationUrl": "https://{teamSiteDomain}{teamSitePath}/_layouts/15/TeamsLogon.aspx?SPFX=true&dest={teamSitePath}/_layouts/15/teamshostedapp.aspx%3FopenPropertyPane=true%26teams%26componentId=97a28c00-64ee-4ec7-b373-723e39069a96",
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
    "version": "1.10.0"
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

#### [src\webparts\reactAccordion\ReactAccordionWebPart.ts](src\webparts\reactAccordion\ReactAccordionWebPart.ts)

Refactor the code to import property pane property from the @microsoft/sp-property-pane npm package instead of the @microsoft/sp-webpart-base package:

```ts
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField } from "@microsoft/sp-property-pane";
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

#### [src\webparts\reactAccordion\components\ReactAccordion.module.scss](src\webparts\reactAccordion\components\ReactAccordion.module.scss)

Remove scss file import:

```scss
@import '~@microsoft/sp-office-ui-fabric-core/dist/sass/SPFabricCore.scss'
```

Add scss file import:

```scss
@import '~office-ui-fabric-react/dist/sass/References.scss'
```

#### [src\webparts\reactAccordion\ReactAccordionWebPart.manifest.json](src\webparts\reactAccordion\ReactAccordionWebPart.manifest.json)

Update the supportedHosts property in the manifest:

```json
{
  "supportedHosts": ["SharePointWebPart"]
}
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