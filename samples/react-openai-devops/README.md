# OpenAI Azure DevOps Bot

## Summary

The SPFx web part is a SharePoint Framework web part that allows users to view recent tasks, bugs, and commits assigned to them from a specific project in Azure DevOps. The web part uses the Open AI function calling feature to determine the user's request and intention, and then processes the relevant function using the Azure DevOps API.

![Sample Web part showing Azure DevOps integration with OpenAI](./assets/demo.gif)

## Compatibility

| :warning: Important                                                                                                                                                                                                                                                                           |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node. |
| Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.                                                                                                                                                                                                             |

![SPFx 1.17.4](https://img.shields.io/badge/SPFx-1.17.4-green.svg)
![Node.js v16.18.1](https://img.shields.io/badge/Node.js-v16.18.1-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](<https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg> "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to a user's user and group ids")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/m365devprogram)

## Prerequisites

1. Access to a SharePoint online site with various tenant users granted access to various site resources directly, via AAD groups and via SharePoint groups.

2. Create [OpenAI account](https://beta.openai.com/) and get API key

3. Create and configure Azure DevOps organizations [Click here for more detail](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/create-organization?view=azure-devops).

4. Configure atleast one project and git repositoy. [Click here for more detail](https://learn.microsoft.com/en-us/azure/devops/repos/git/create-new-repo?view=azure-devops). Assign yourself some tasks, bugs.

## Contributors

- [Ejaz Hussain](https://github.com/ejazhussain)

## Version history

| Version | Date          | Comments        |
| ------- | ------------- | --------------- |
| 1.0.0   | July 30, 2023 | Initial release |

## Minimal Path to Awesome

1. Clone this repository
2. From your command line, change your current directory to the directory containing this sample (`react-openai-devops`, located under `samples`)
3. In the command line run:

```cmd
  `npm install`
  `gulp bundle`
  `gulp package-solution`
```

4. Deploy the package to your app catalog
5. Approve the following API permission request from the SharePoint admin

```JSON
      {
        "resource": "Azure DevOps",
        "scope": "user_impersonation"
      }
```

7. In the command-line run:

```cmd
  gulp serve --nobrowser
```

8. Open the hosted workbench on a SharePoint site - i.e. https://_tenant_.sharepoint.com/site/_sitename_/_layouts/workbench.aspx

- Add the [O3C] Smart DevOps web part to the page.
- In the web part properties, Add OpenAPI Key
  under Open API Key field.
- Select the required Azure DevOps organization from the list under Organization name
  dropdown. This dropdown will be auto populated based on your Azure DevOps configurations in your tenant
- Close the web part properties pane and save and reload the page

9. Here are some sample questions. You must provide the project name in the message to retrieve bugs and tasks. You must provide the project and repo name for recent commits.

```
1. show me all tasks assigned to me in O3C project
2. show me bugs assigned to me in O3C project
3. show me recent commits from spfx-dev-webparts repo in O3C project?

```

## Features

**The web part has three main functions:**

- **Show all recent tasks assigned to me from a specific project:** This function retrieves all recent tasks that have been assigned to the user from the specified project in Azure DevOps. The tasks are displayed in a list, and the user can click on a task to view more information about it.

- **Show all bugs assigned to me from a specific project:** This function retrieves all recent bugs that have been assigned to the user from the specified project in Azure DevOps. The bugs are displayed in a list, and the user can click on a bug to view more information about it.

- **Show recent commits in a specific repository under a given project:** This function retrieves all recent commits that have been made to a specific repository under the specified project in Azure DevOps. The commits are displayed in a list, and the user can click on a commit to view more information about it.
