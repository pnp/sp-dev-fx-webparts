# Workbench customizer

## Summary

This sample shows how the Workbench page can be customized to display in a way that better mimics a modern SharePoint page.
This is done using CSS overrides on some of the page styles, which does not cause any negative impact on your site as the web part is not intended to be consumed by final users, only developers.
The web part also has some properties that control which customizations are applied to the workbench page (all enabled by default). There is also an option to switch the page to Preview after the page is loaded, which gives a UI more close to what end users will see on a published page - this is very useful when doing UI work.

![Demo](./assets/Preview.png)

## Usage

### Deploy to tenant

The easiest way to use the solution is to package it up and deploy to the App Catalog. You can then add the web part to the bottom of the O365 Workbench page when developing your custom solutions.

### Run locally

Alternatively, you can add the output files for the web part to a custom SPFx project and the web part will also be served and available both from the local or hosted Workbench page:

* Generate the output files for the solution by executing `gulp bundle --ship`
* Copy all files from `js-workbench-customizer\dist` to the `dist` folder of your custom solution
* Copy the `workbenchCustomizer` folder from `js-workbench-customizer\lib\webparts` to the corresponding webparts folder of your custom solution

> **Note:** This approach will not "pollute" your solution with additional resources or dependencies as the SPFx toolchain will ignore those additional files by default when you package your solution. You can also clean everything by running `gulp clean` as both the lib and dist folders are deleted and recreated again. Git will also ignore dist and lib folders by default, so the files will never be added to source control.

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%202019-Not%20compatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%202016%20(Feature%20Pack%202)-Not%20compatible-red.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Prerequisites

* Office 365 subscription with SharePoint Online license
* SharePoint Framework [development environment](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment) already set up.

## Solution

Solution|Author(s)
--------|---------
workbench-customizer|[Joel Rodrigues](https://github.com/joelfmrodrigues)

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 24, 2019|Initial release
1.1|February 05, 2020|Update to SPFx 1.10.0
1.2|June 04, 2020|Added full-width support
1.3|July 07, 2020|Simplified web part
1.4|July 28, 2020|Update styles to minimise toolbar overlap
1.5|July 30, 2020|Update styles to improve full-width mode

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Video

[![Workbench customizer for improved debugging experience](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=u1Bnb7yn3_w "Workbench customizer for improved debugging experience")

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20js-workbench-customizer") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=js-workbench-customizer) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20js-workbench-customizer&template=bug-report.yml&sample=js-workbench-customizer&authors=@joelfmrodrigues&title=js-workbench-customizer%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20js-workbench-customizer&template=question.yml&sample=js-workbench-customizer&authors=@joelfmrodrigues&title=js-workbench-customizer%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20js-workbench-customizer&template=question.yml&sample=js-workbench-customizer&authors=@joelfmrodrigues&title=js-workbench-customizer%20-%20).


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/js-workbench-customizer" />
