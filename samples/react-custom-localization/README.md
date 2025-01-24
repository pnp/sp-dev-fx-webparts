# Custom Localization

## Summary

This web part shows how you can load localization files (e.g. fr-fr.js) and use the localized strings if you have requirements to display localized text outside the [normal SPFx/SPO processing](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/localize-web-parts)

<!--
Please provide a high-quality screenshot of your web parts below. It should be stored in a folder called `assets`. 

If possible, use a resolution of 1920x1080.

If your web part uses a placeholder screen and requires the user to configure it, please use a screenshot of the web part as it appears **after** it has been configured.

You can add as many screen shots as you'd like to help users understand your web part without having to download it and install it.
-->

![Detect page translations](assets/page-translation-detection.png)

![Specific language](assets/specific-language.png)

![Default behavior](assets/default-behavior.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.18.2](https://img.shields.io/badge/SPFx-1.18.2-green.svg)
![Node.js v16 | v18](https://img.shields.io/badge/Node.js-v16%20%7C%20v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
<!--![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)-->
![Teams No: Not designed for Microsoft Teams](https://img.shields.io/badge/Teams-No-red.svg "Not designed for Microsoft Teams")

<!--
If using SPFx 1.18
![SPFx 1.18.2](https://img.shields.io/badge/SPFx-1.18.2-green.svg)
![Node.js v16 | v18](https://img.shields.io/badge/Node.js-v16%20%7C%20v18-green.svg)

If using SPFx 1.17.4
![SPFx 1.17.4](https://img.shields.io/badge/SPFx-1.17.4-green.svg)
![Node.js v16.13+](https://img.shields.io/badge/Node.js-v16.13+-green.svg)

If using SPFx 1.16
![SPFx 1.16.1](https://img.shields.io/badge/SPFx-1.16.1-green.svg)
![Node.js v16 | v14 | v12](https://img.shields.io/badge/Node.js-v16%20%7C%20v14%20%7C%20v12-green.svg)

If using SPFX 1.14, update the SPFx and Node.js tags as per below:
![SPFx 1.14](https://img.shields.io/badge/SPFx-1.14-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg)

  If using SPFx 1.13.1, update the SPFx and Node.js tags accordingly:
![SPFx 1.13.1](https://img.shields.io/badge/SPFx-1.13.1-green.svg)

  If using SPFx 1.12.1, update the SPFx and Node.js tags accordingly:
![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js v14 | v12 | v10](https://img.shields.io/badge/Node.js-v14%20%7C%20v12%20%7C%20v10-green.svg) 

  If using an older version of SPFx, update the SPFx and Node.js compatibility tag accordingly:

  SPFx 1.11
![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 

 SPFx 1.10
![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 

 SPFx 1.4.1
![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v6 | v8](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20v8-green.svg)

  If you built this sample specifically for SharePoint 2016, or SharePoint 2019 support, update the SharePoint compatibility tag accordingly:
![Works with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)

  If you know your web part only works on the hosted workbench, you can use this for the workbench compatibility tag:
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "EXPLAIN WHY IT WORK WORK IN LOCAL WORKBENCH")

  Otherwise:
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)

  If your web part needs permissions before working in the hosted workbench, let people know;
![Hosted Workbench (Requires permissions))](https://img.shields.io/badge/Hosted%20Workbench-(Requires%20permissions%)-yellow.svg "Requires permissions to be granted before this solution can work on the hosted workbench")

  or:
![Hosted Workbench Partially)](https://img.shields.io/badge/Hosted%20Workbench-Partially-yellow.svg "EXPLAIN WHY THE SOLUTION DOESN'T FULL WORK IN THE HOSTED WORKBENCH")

  Otherwise:
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

 If you specifically built and tested this web part to work with Teams, use this for the Teams compatibility tag:
    ![Teams Yes: Designed for Microsoft Teams](https://img.shields.io/badge/Teams-Yes-green.svg "Designed for Microsoft Teams")
 And if you know for sure that it is NOT compatible with Teams, use this:
    ![Teams No: Not designed for Microsoft Teams](https://img.shields.io/badge/Teams-No-red.svg "Not designed for Microsoft Teams")

Don't worry if you're unsure about the compatibility matrix above. We'll verify it when we approve the PR. 
-->

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors
<!--
We use this section to recognize and promote your contributions. Please provide one author per line -- even if you worked together on it.

We'll only use the info you provided here. Make sure to include your full name, not just your GitHub username.

Provide a link to your GitHub profile to help others find more cool things you have done. The only link we'll accept is a link to your GitHub profile.

If you want to provide links to your social media, blog, and employer name, make sure to update your GitHub profile.
-->

* [Brian McCullough](https://github.com/brianpmccullough)

## Version history

|Version|Date|Comments|
|-------|----|--------|
|1.0|January 23, 2025|Initial release|

## Prerequisites

<!--
Any special pre-requisites? Include any lists, permissions, offerings to the demo gods, or whatever else needs to be done for this web part to work.

Please describe the steps to configure the pre-requisites. Feel free to add screen shots, but make sure that there is a text description of the steps to perform.
 
-->

## Minimal path to awesome

<!-- 
PRO TIP:

For commands, use the `code syntax`

For button labels, page names, dialog names, etc. as they appear on the screen, use **Bold**

Don't use "click", use "select" or "use"

As tempting as it may be, don't just use images to describe the steps. Let's be as inclusive as possible and think about accessibility.

-->

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-custom-localization) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-custom-localization`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

Description of the web part with possible additional details than in short summary.
This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Working with localization (a.k.a multilingual user interface or internationalization or globalization)
* Additional support for translated pages where you need to ensure the web part contents are displayed in the translated page's language, rather than the user, web, or browser settings/preferences.
* Dynamic module loading

<!--
Note that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions in advance! You rock ❤.
-->

<!--
RESERVED FOR REPO MAINTAINERS

We'll add the video from the community call recording here

## Video

[![YouTube video title](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=XXXXX "YouTube video title")
-->

## Help

<!--
You can just search and replace this page with the following values:

Search for:
YOUR-SOLUTION-NAME

Replace with your sample folder name. E.g.: react-my-cool-sample

Search for:
@YOURGITHUBUSERNAME

Replace with your GitHub username, prefixed with an "@". If you have more than one author, use %20 to separate them, making sure to prefix everyone's username individually with an "@".

Example:
@hugoabernier

Or:
@hugoabernier%20@VesaJuvonen%20@PopWarner
-->

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-custom-localization%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-custom-localization) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-custom-localization&template=bug-report.yml&sample=react-custom-localization&authors=@brianpmccullough&title=react-custom-localization%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-custom-localization&template=question.yml&sample=react-custom-localization&authors=@brianpmccullough&title=react-custom-localization%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-custom-localization&template=suggestion.yml&sample=react-custom-localization&authors=@brianpmccullough&title=react-custom-localization%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-custom-localization" />