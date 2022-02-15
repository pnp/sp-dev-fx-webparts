# Modern Experience Theme Manager

## Summary
This sample web part provides a user interface for creating, updating, deleting and applying a Modern Experience SharePoint theme in SharePoint Online.

The Theme Palette can be generated using the UI Fabric Theme Generator at: https://developer.microsoft.com/en-us/fabric#/styles/themegenerator

### The following four features are available within this sample:

#### Create a theme:
Using a provided theme name and theme color palette a Modern Experience them is created and available at the tenant level.
![preview](./assets/create-a-theme.png)

#### Update a theme:
By selecting a pre-existing theme from the dropdown, the theme at the tenant level will be updated with the palette provided in the Theme Palette texbox.
![preview](./assets/update-a-theme.png)

#### Delete a theme:
By selecting a pre-existing theme from the dropdown, the theme will be deleted from the tenant level.
![preview](./assets/delete-a-theme.png)

#### Apply a theme:
By providing a Site Collection URL, along with a theme name and palette, the theme will be applied to the Site Collection directly without being added to the tenant Company Theme options.<br>
NOTE: This is a great option to provide theme management of a Site Collection without adding a theme to the "Company Themes" choices within the "Change the Look" options at the tenant level. The web part could be added to a Site Collection App Catalog to ensure availability of the web part is only available to those approved for theme management.
![preview](./assets/apply-a-theme.png)



## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to SharePoint themes")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Solution

Solution|Author(s)
--------|---------
js-theme-manager (Upgrade) | Hugo Bernier ([@bernierh](https://twitter.com/bernierh) / [Tahoe Ninjas](https://tahoeninjas.blog))
js-theme-manager | Beau Cameron ([@Beau__Cameron](https://twitter.com/@Beau__Cameron) / [Blog](https://beaucameron.net/))
js-theme-manager | Beau Cameron ([@Beau__Cameron](https://twitter.com/@Beau__Cameron) / [Blog](https://beaucameron.net/))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 27, 2019|Initial release
2.0|June 1, 2020|Upgraded to SPFx 1.10.0

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.



## Features
This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Using the SharePoint Online REST API to manage Modern Experience Themes

## Additional Information:

- [Office UI Fabric Theme Palette Generator](https://developer.microsoft.com/en-us/fabric#/styles/themegenerator)


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-theme-manager") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-theme-manager) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-theme-manager&template=bug-report.yml&sample=js-theme-manager&authors=@bcameron1231%20@hugoabernier&title=js-theme-manager%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-theme-manager&template=question.yml&sample=js-theme-manager&authors=@bcameron1231%20@hugoabernier&title=js-theme-manager%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-theme-manager&template=question.yml&sample=js-theme-manager&authors=@bcameron1231%20@hugoabernier&title=js-theme-manager%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-theme-manager" />
