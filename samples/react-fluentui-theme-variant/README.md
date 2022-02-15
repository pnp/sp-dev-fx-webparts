# React Fluent UI Theme Variant

## Summary
This web part provides an example of how to apply a custom theme or a variation of the current SharePoint theme directly to the web part.
In this way it is possible to implement the same mechanism that is currently implemented by default by the SharePoint page sections

![picture of the web part in action](assets/preview.gif)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js v14 | v12 | v10](https://img.shields.io/badge/Node.js-v14%20%7C%20v12%20%7C%20v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Local | Hosted](https://img.shields.io/badge/Workbench-Local%20%7C%20Hosted-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-fluentui-theme-variant | [Fabio Franzini](https://www.linkedin.com/in/fabiofranzini/) ([@franzinifabio](https://twitter.com/franzinifabio)), fabiofranzini.com

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 9, 2021|Initial release

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This example was born with the idea of overcoming the present default limit regarding the colors of the sections of the SharePoint pages.

Specifically, by default, it is only possible to change the color (also called Section Background Shading) of the sections but not of the individual Web Parts.

In this implementation it is instead possible to vary the "Background Shading" of the single Web Part in 3 ways:
* Use the colors applied to the section where the Web Part is present
* Select the color variations based on the theme applied at the Site level.
* Apply variations set to the json of a custom theme, created through the Fluent UI theme designer.

In all these cases, the component variation works automatically as much as the Fluent UI react controls are used, otherwise the variation will only work on the background and some HTML elements.

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-fluentui-theme-variant&template=bug-report.yml&sample=react-fluentui-theme-variant&authors=@fabiofranzini&title=react-fluentui-theme-variant%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-fluentui-theme-variant&template=question.yml&sample=react-fluentui-theme-variant&authors=@fabiofranzini&title=react-fluentui-theme-variant%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-fluentui-theme-variant&template=question.yml&sample=react-fluentui-theme-variant&authors=@fabiofranzini&title=react-fluentui-theme-variant%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-fluentui-theme-variant" />