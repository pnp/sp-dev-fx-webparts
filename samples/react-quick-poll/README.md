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
> * Poll questions with the same **'Start Date'** and **'End Date'** will follow the sort order to display the latest question to the end user.
> * Once the user started to response to the poll, do not delete the question from the question collection. All the questions are mapped based on the **ID** auto generated. It cannot be recovered once deleted.
> * Make sure the **Multi Choice** option is chosen wisely, do not change once the user started to response to the poll.


## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted: Does not work with local workbench](https://img.shields.io/badge/Workbench-Hosted-yellow.svg "Does not work with local workbench")

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-quick-poll | [Sudharsan K.](https://github.com/sudharsank) ([@sudharsank](https://twitter.com/sudharsank), [Know More](https://spknowledge.com/))
react-quick-poll | [Dipen Shah](https://github.com/dips365) ([@Dips_365](https://twitter.com/Dips_365))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0.1|Feb 24 2020|Initial release
2.0.0.0|Oct 17 2020|Initial release
2.1.0.0|June 30, 2021|Updated simple poll component

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Add the `.sppkg` file to the app catalog and add the **Quick Poll** web part to the page.

## Features

- Used [PnP Property Pane Controls](https://sharepoint.github.io/sp-dev-fx-property-controls/) to create the property pane controls
    * [PropertyFieldToggleWithCallout](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldToggleWithCallout/)
    * [PropertyFieldCollectionData](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldCollectionData/)
    * [PropertyFieldChoiceGroupWithCallout](https://sharepoint.github.io/sp-dev-fx-property-controls/controls/PropertyFieldChoiceGroupWithCallout/)
    * PropertyPaneTextField (From base property controls)
- Used [PnP Reusable React Controls](https://sharepoint.github.io/sp-dev-fx-controls-react/)
    * [Placeholder](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/Placeholder/)
    * [ChartControl](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/ChartControl/)
- Used few styles and controls (Text, MessageBar, ProgressIndicator, PrimaryButton, ChoiceGroup, List, Checkbox) from [Office UI Fabric](https://developer.microsoft.com/en-us/fabric)
- Used [PnP](https://pnp.github.io/pnpjs/) for communication with SharePoint.
- Used [Moment.js](https://momentjs.com/) for datetime formatting.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=react-quick-poll&authors=@sudharsank%20@dips365&title=react-quick-poll%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=react-quick-poll&authors=@sudharsank%20@dips365&title=react-quick-poll%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=react-quick-poll&authors=@sudharsank%20@dips365&title=react-quick-poll%20-%20).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-quick-poll" />

