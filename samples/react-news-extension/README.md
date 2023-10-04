# Targeted News using Microsoft Graph Open Extension

## Summary

This samples contains two SPFx web parts:

**User preferences web part:**

This web part allows users to save their preferences in the Microsoft Graph Open Extension. This means that users can access their preferences from any device or application that uses the Microsoft Graph.

**Curated news web part:**

This web part allows users to view news topics they care about based on the selected preferences. This is a great way to help users stay informed about the topics that are most important to them.

![Targeted news web part](./assets/curated-news.png)
![User preferences web part](./assets/user-preferences-model.png)
![Targeted news using Microsoft Graph Open Extension](./assets/demo.gif)

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

Access to a SharePoint online site with various tenant users granted access to various site resources directly, via AAD groups and via SharePoint groups.

> User Preferences web part configurations

1. Provide name for Microsoft Graph Open Extension

2. Provide Term Set ID for terms you would like to use for user preferences

![User preferences web part](./assets/user-preferences-config.jpg)

> Targeted news web part configurations

1. Provide name for Microsoft Graph Open Extension.

2. Provide Search managed property which you want to use to filter results. For example department or topic etc

![User preferences web part](./assets/targted-news-config.jpg)

## Contributors

- [Ejaz Hussain](https://github.com/ejazhussain)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0.0   | October 04, 2023 | Initial release |

## Minimal Path to Awesome

1. Clone this repository
2. From your command line, change your current directory to the directory containing this sample (`react-news-extension`, located under `samples`)
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
        "resource": "Microsoft Graph",
        "scope": "User.ReadWrite"
      }
```

7. In the command-line run:

```cmd
  gulp serve --nobrowser
```

8. Open the hosted workbench on a SharePoint site - i.e. https://_tenant_.sharepoint.com/site/_sitename_/_layouts/workbench.aspx

9. Configure user preferences and targeted news web parts as per above configurations

## Features

- User preferences web part allows users to save their preferences in the Microsoft Graph Open Extension. This means that users can access their preferences from any device or application that uses the Microsoft Graph.

- This web part allows users to view news topics they care about based on the selected preferences. This is a great way to help users stay informed about the topics that are most important to them.
