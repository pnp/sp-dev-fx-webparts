# Quick Poll

## Summary

This component is developed for the users who really need to create a **Poll** within a minute and with less maintenance. **QuickPoll** list will be created automatically to store the user response.  

![React-Quick-Poll](./assets/react-quick-poll.gif)

Following are some of the features of this component.

* **Easy** to setup with most of the configurations are optional.
* **Flexible** to use without any critical configuration.
* More than one poll questions can be added.
* Schedule the poll questions in **advance** using the **date** parameters.
* Option to choose the poll that has to be visible to the end users.
* Poll response can be viewed via graphical representation as **charts**.

## Properties

1. **Display poll based on date** - This property will check for the **Start Date** and **End Date** on the poll questions to display the correct poll question to the end user. The **Start Date** and **End Date** on the poll question will be enabled only when this property is turned on.

2. **Poll Questions** - Manage the collection of poll questions and choices.

    * **Question Title** - Title of the question.
    * **Choices** - Choices separated by comma.
    * **Multi Selection** - Whether the users are allowed to choose one or multiple.
    * **Start Date** - Date when the end user can start seeing the poll question.
    * **End Date** - Last day of the poll question visible to the end user.

3. **Success Message** - Message to be displayed to the user after a successful submission. It is optional, if not provided the default message '**Thank you for your submission**' will be displayed.

4. **Response Message** - Message to be displayed to the user with the user response, once the user has submitted. It is optional, if not provided the default message '**You voted for: ~User Response~**' will be displayed below the chart.

5. **Submit button text** - Text to be displayed on the submit button. It is optional, if not provided the default text '**Submit Vote**' will be displayed.

6. **Preferred Chart Type** - Chart type to display the overall response for the question.

> **Note:**
>
> * Poll questions with the same **'Start Date'** and **'End Date'** will follow the sort order to display the latest question to the end user.
> * Once the user started to response to the poll, do not delete the question from the question collection. All the questions are mapped based on the **ID** auto generated. It cannot be recovered once deleted.
> * Make sure the **Multi Choice** option is chosen wisely, do not change once the user started to response to the poll.

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.13.1](https://img.shields.io/badge/SPFx-1.13.1-green.svg)
![Node.js v14 | v12](https://img.shields.io/badge/Node.js-v14%20%7C%20v12-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to lists on your SharePoint tenant")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Contributors

* [Sudharsan K.](https://github.com/sudharsank) ([@sudharsank](https://twitter.com/sudharsank), [Know More](https://spknowledge.com/))
* [Dipen Shah](https://github.com/dips365) ([@Dips_365](https://twitter.com/Dips_365))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.1|Feb 24 2020|Initial release
2.0.0.0|Oct 17 2020|Initial release
2.1.0.0|June 30, 2021|Updated simple poll component
2.1.1.0|March 16, 2022|Updated to SPFx 1.13.1

## Minimal path to awesome

* Clone this repository (or [download this solution as a .ZIP file](https://pnp.github.io/download-partial/?url=https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-quick-poll) then unzip it)
* From your command line, change your current directory to the directory containing this sample (`react-quick-poll`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp bundle --ship`
  * `gulp package-solution --ship`
* Add the `.sppkg` file to the app catalog and add the **Quick Poll** web part to the page.

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

## Features

* Used [PnP Property Pane Controls](https://sharepoint.github.io/sp-dev-fx-property-controls/) to create the property pane controls
  * [PropertyFieldToggleWithCallout](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldToggleWithCallout/)
  * [PropertyFieldCollectionData](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldCollectionData/)
  * [PropertyFieldChoiceGroupWithCallout](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldChoiceGroupWithCallout/)
  * PropertyPaneTextField (From base property controls)
* Used [PnP Reusable React Controls](https://sharepoint.github.io/sp-dev-fx-controls-react/)
  * [Placeholder](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/Placeholder/)
  * [ChartControl](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/ChartControl/)
* Used few styles and controls (Text, MessageBar, ProgressIndicator, PrimaryButton, ChoiceGroup, List, Checkbox) from [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)
* Used [PnP](https://pnp.github.io/pnpjs/) for communication with SharePoint.
* Used [Moment.js](https://momentjs.com/) for datetime formatting.

## Help


We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-quick-poll%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-quick-poll) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-quick-poll&template=bug-report.yml&sample=react-quick-poll&authors=@sudharsank%20@dips365&title=react-quick-poll%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-quick-poll&template=question.yml&sample=react-quick-poll&authors=@sudharsank%20@dips365&title=react-quick-poll%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-quick-poll&template=suggestion.yml&sample=react-quick-poll&authors=@sudharsank%20@dips365&title=react-quick-poll%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-quick-poll" />
