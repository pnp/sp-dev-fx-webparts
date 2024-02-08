# Personal tools list / "My tools"


## Summary

This webpart allows users to select tools from a predefined list and save them in their own personalized view.
It has the fundamental functionality - a great starting point to build upon if you need something more advanced.

The available tools are added to a list
![](./assets/availableTools.png)

And the user can select from this list what link(s) he/she wants to be displayed for them.

![](./assets/MyToolsDemo1.gif)

The webpart saves to another list..
![](./assets/mytoolslist.png)

The webpart title can be changed from the property pane, here you can also select to display the tools in two columns (defaults to 1 column if this is not selected)
![](./assets/MyToolsDemo2.gif)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.18.0](https://img.shields.io/badge/SPFx-1.18.0-green.svg)
![Node.js v16 | v18](https://img.shields.io/badge/Node.js-v16%20%7C%20v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](https://aka.ms/m365/devprogram)

## Contributors


* [Eli Schei](https://github.com/Eli-Schei/)

## Version history

Version|Date|Comments
-------|----|--------
| 1.0     | February 08, 2024 | Initial release |

## Prerequisites

You need to run the script in the env-setup folder to create the content types and lists used in the code. If you create them manually you might need to change the code to use the correct list and field names.

For manual creation here is what you need:
- List named "AvailableTools", needs to have fields "tool_name" and "tool_url" (both text fields);
- List named:"PersonalTools", needs to have fields "tool_username" (text) and "tool_usertools" (note / multi line text field)

## Minimal path to awesome
- Clone this repository
- Run the script in the "env-setup" folder ([you need pnp-poweshell to run this](https://pnp.github.io/powershell/))
- In your CLI navigate to thesolution folder (the folder where this readme file lives)
- in the command-line run:
  - **npm install**
  - **gulp serve**

### Package and deploy webpart
[Here is a blogpost that takes you through every step](https://elischei.com/deploy-your-spfx-solution-using-pnp-powershell/)
#### Package
First you need to package the solution for production
```powershell
gulp build
gulp bundle --ship
gulp package-solution --ship
```
Then you can upload the sppkg to your appcatalog manually, or using PnP powershell as shown below. 
```powershell
Connect-PnPOnline "appcatalogurl" -Interactive

$appCatConnection = Connect-PnPOnline $appcatalog -ReturnConnection -Interactive

Add-PnPApp -Path "./project-wp.sppkg" -Connection $appCatConnection -Publish -SkipFeatureDeployment -Overwrite
```

## Features

Admin/editor can add predefined tools (aka links) to a list, and the users will be able to select which tools they want in their own list.


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

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20YOUR-SOLUTION-NAME%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=YOUR-SOLUTION-NAME) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20YOUR-SOLUTION-NAME&template=bug-report.yml&sample=YOUR-SOLUTION-NAME&authors=@YOURGITHUBUSERNAME&title=YOUR-SOLUTION-NAME%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20YOUR-SOLUTION-NAME&template=question.yml&sample=YOUR-SOLUTION-NAME&authors=@YOURGITHUBUSERNAME&title=YOUR-SOLUTION-NAME%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20YOUR-SOLUTION-NAME&template=suggestion.yml&sample=YOUR-SOLUTION-NAME&authors=@YOURGITHUBUSERNAME&title=YOUR-SOLUTION-NAME%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-personal-tools-list" />
